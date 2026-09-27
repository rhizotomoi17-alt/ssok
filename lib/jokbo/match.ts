// 계보 추론 엔진 (순수 함수, DB·네트워크 의존 없음)
//
// 점수 = 본인×0.30 + 부×0.35 + 조부×0.25 + 지역×0.10  (+3대 연속 일치 시 20, 최대 100)
// 본인이 g세라면 부는 g−1세, 조부는 g−2세 항렬과 비교한다.

import { SURNAME_ALIASES } from './data'
import type {
  Branch, Candidate, Clan, Evidence, FigureWithRelation, Hangryeol, HistoricalFigure,
  MatchInput, MatchResult, PersonInput, RegionEvidence, Relation,
} from './types'

export interface Dataset {
  clans: Clan[]
  branches: Branch[]
  hangryeol: Hangryeol[]
  figures: HistoricalFigure[]
}

const WEIGHTS: Record<Relation, number> = { self: 0.3, father: 0.35, grandfather: 0.25 }
const REGION_WEIGHT = 0.1
const CONSECUTIVE_BONUS = 20
const PERSON_MATCH_THRESHOLD = 60 // 이 점수 이상이어야 "일치"로 본다
const MAX_CANDIDATES = 3
// 결론 기준: 한자 1건 일치(30~35점) 또는 한글 2건 일치 이상.
// 한글 1글자만 겹치는 수준(18~21점)은 우연일 가능성이 커서 결론으로 제시하지 않는다.
export const CONCLUSIVE_THRESHOLD = 30

const SCORE = {
  hanja: 100,
  hangul: 60,
  hanjaWrongPosition: 50,
  hangulWrongPosition: 25,
} as const

export function normalizeSurname(s: string): string {
  const t = s.trim()
  return SURNAME_ALIASES[t] ?? t
}

// "충남 공주시" → ["충남", "공주"]
function regionTokens(s: string): string[] {
  return s
    .split(/[\s,·/]+/)
    .map((t) => t.replace(/(특별자치시|특별자치도|광역시|특별시|시|군|구|읍|면|동)$/, ''))
    .filter((t) => t.length >= 2)
}

function regionMatches(hometown: string, place: string): boolean {
  const home = regionTokens(hometown)
  // 시·군 단위(마지막 토큰)가 일치해야 인정. 도 단위만 같으면 불인정.
  const key = regionTokens(place).at(-1)
  return key !== undefined && home.includes(key)
}

export function scoreRegion(hometown: string | undefined, clan: Clan, branch: Branch | null): RegionEvidence {
  if (!hometown?.trim()) return { kind: 'skipped', matched: null, score: 0 }
  const settlement = branch?.mainSettlements.find((p) => regionMatches(hometown, p))
  if (settlement) return { kind: 'settlement', matched: settlement, score: 100 }
  if (regionMatches(hometown, clan.originRegion)) {
    return { kind: 'origin', matched: clan.originRegion, score: 50 }
  }
  return { kind: 'none', matched: null, score: 0 }
}

function chars(s: string | undefined): string[] {
  return Array.from((s ?? '').replace(/\s/g, ''))
}

function positionIndices(len: number, pos: Hangryeol['positionType']): number[] {
  if (len === 0) return []
  if (pos === 'FIRST') return [0]
  if (pos === 'LAST') return [len - 1]
  return [...Array(len).keys()]
}

export function scorePerson(
  relation: Relation,
  person: PersonInput | undefined,
  generationSe: number,
  entry: Hangryeol | undefined,
): Evidence {
  const base = { relation, generationSe }
  const expected = entry
    ? { hanja: entry.hanja, hangul: entry.hangul, position: entry.positionType }
    : null
  if (!person || !person.hangul.trim() || person.nativeKorean) {
    return { ...base, expected, kind: 'skipped', score: 0 }
  }
  if (!entry) return { ...base, expected, kind: 'mismatch', score: 0 }

  const hangul = chars(person.hangul)
  const hanja = chars(person.hanja)
  const hasHanja = hanja.length === hangul.length && hanja.length > 0
  const expectedIdx = new Set(positionIndices(hangul.length, entry.positionType))

  let best: Evidence = { ...base, expected, kind: 'mismatch', score: 0 }
  const consider = (kind: Evidence['kind'], score: number) => {
    if (score > best.score || (best.kind === 'mismatch' && kind === 'hanja_conflict')) {
      best = { ...base, expected, kind, score }
    }
  }

  hangul.forEach((ch, i) => {
    const inPosition = expectedIdx.has(i)
    if (hasHanja) {
      if (hanja[i] === entry.hanja) {
        consider(inPosition ? 'hanja' : 'position', inPosition ? SCORE.hanja : SCORE.hanjaWrongPosition)
      } else if (ch === entry.hangul && inPosition) {
        // 소리는 같지만 한자가 다르다 → 다른 항렬일 가능성이 높다
        consider('hanja_conflict', 0)
      }
    } else if (ch === entry.hangul) {
      consider(inPosition ? 'hangul' : 'position', inPosition ? SCORE.hangul : SCORE.hangulWrongPosition)
    }
  })
  return best
}

// 파별 실효 항렬 (파 고유 항렬 > 대동항렬). DB의 effective_hangryeol 뷰와 같은 규칙.
export function effectiveHangryeol(ds: Dataset, clanId: number, branchId: number | null): Map<number, Hangryeol> {
  const map = new Map<number, Hangryeol>()
  for (const h of ds.hangryeol) {
    if (h.clanId !== clanId || h.branchId !== null) continue
    map.set(h.generationSe, h)
  }
  if (branchId !== null) {
    for (const h of ds.hangryeol) {
      if (h.branchId === branchId) map.set(h.generationSe, h)
    }
  }
  return map
}

function evaluateLineage(ds: Dataset, input: MatchInput, clan: Clan, branch: Branch | null): Candidate {
  const table = effectiveHangryeol(ds, clan.id, branch?.id ?? null)
  const region = scoreRegion(input.hometown, clan, branch)
  const regionPart = region.score * REGION_WEIGHT

  const gens = [...table.keys()]
  const base = {
    clan, branch, region, hasHangryeolData: gens.length > 0,
  }

  if (gens.length === 0) {
    return {
      ...base, generationSe: null, confidence: Math.round(regionPart), conclusive: false,
      evidence: [], consecutiveBonus: false, dataVerified: false,
    }
  }

  // 본인 세 g 후보: 부·조부만 일치해도 추정할 수 있도록 표 범위 +2까지 탐색
  const lo = Math.min(...gens)
  const hi = Math.max(...gens) + 2
  let best: Candidate | null = null

  for (let g = lo; g <= hi; g++) {
    const evidence = [
      scorePerson('self', input.self, g, table.get(g)),
      scorePerson('father', input.father, g - 1, table.get(g - 1)),
      scorePerson('grandfather', input.grandfather, g - 2, table.get(g - 2)),
    ]
    const lineagePart = evidence.reduce((sum, e) => sum + e.score * WEIGHTS[e.relation], 0)
    const consecutive = evidence.every((e) => e.score >= PERSON_MATCH_THRESHOLD)
    const confidence = Math.min(
      100,
      Math.round(lineagePart + regionPart + (consecutive ? CONSECUTIVE_BONUS : 0)),
    )
    const anyMatch = evidence.some((e) => e.score >= PERSON_MATCH_THRESHOLD)
    const used = evidence.filter((e) => e.score > 0).map((e) => table.get(e.generationSe!))
    const candidate: Candidate = {
      ...base,
      generationSe: anyMatch ? g : null,
      confidence,
      conclusive: anyMatch && confidence >= CONCLUSIVE_THRESHOLD,
      evidence,
      consecutiveBonus: consecutive,
      dataVerified: used.length > 0 && used.every((h) => h?.verified),
    }
    if (!best || candidate.confidence > best.confidence) best = candidate
  }
  // 어떤 세대에서도 일치가 없으면 근거 목록도 비운다 (임의 세대 표시 방지)
  if (best!.generationSe === null) best = { ...best!, evidence: [] }
  return best!
}

function figuresFor(ds: Dataset, top: Candidate | undefined): FigureWithRelation[] {
  if (!top) return []
  const branchId = top.conclusive ? top.branch?.id ?? null : null
  return ds.figures
    .filter((f) => f.clanId === top.clan.id)
    // 친일 분류는 공식 결정이 검증된 경우에만 노출
    .filter((f) => f.category !== 'collaborator' || f.verified)
    .map((f) => ({
      ...f,
      relation: branchId !== null && f.branchId === branchId ? 'same_branch' as const : 'same_clan' as const,
    }))
    .sort((a, b) =>
      (a.relation === 'same_branch' ? 0 : 1) - (b.relation === 'same_branch' ? 0 : 1)
      || (a.birthYear ?? 9999) - (b.birthYear ?? 9999))
}

export function matchGenealogy(ds: Dataset, input: MatchInput): MatchResult {
  const warnings: string[] = []
  const surname = normalizeSurname(input.surname)

  const clans = input.clanId !== undefined
    ? ds.clans.filter((c) => c.id === input.clanId)
    : ds.clans.filter((c) => c.surnameHangul === surname)

  if (clans.length === 0) {
    warnings.push(
      input.clanId !== undefined
        ? '선택한 본관을 찾을 수 없습니다.'
        : `'${input.surname}' 성의 본관 데이터가 아직 없습니다.`,
    )
    return { clanKnown: input.clanId !== undefined, candidates: [], figures: [], warnings }
  }

  const candidates: Candidate[] = []
  for (const clan of clans) {
    const clanBranches = ds.branches.filter((b) => b.clanId === clan.id)
    if (clanBranches.length === 0) {
      candidates.push(evaluateLineage(ds, input, clan, null))
    } else {
      for (const b of clanBranches) candidates.push(evaluateLineage(ds, input, clan, b))
    }
  }

  candidates.sort((a, b) => b.confidence - a.confidence
    || Number(b.generationSe !== null) - Number(a.generationSe !== null))
  // 점수 0인 후보는 "후보"라 부를 근거가 없다 (1순위는 본관 표시용으로 유지)
  const top = candidates.filter((c, i) => i === 0 || c.confidence > 0).slice(0, MAX_CANDIDATES)
  const clanKnown = input.clanId !== undefined

  const people = [input.self, input.father, input.grandfather]
  if (people.every((p) => !p?.hangul.trim() || p.nativeKorean)) {
    warnings.push('항렬로 판단할 수 있는 이름이 없어 지역 정보만 사용했습니다.')
  }
  if (top[0] && !top[0].hasHangryeolData) {
    warnings.push(`${top[0].clan.bonGwanHangul} ${top[0].clan.surnameHangul}씨의 항렬 데이터가 아직 없어 파·세대를 추정할 수 없습니다.`)
  }
  if (top[0] && top[0].hasHangryeolData && !top[0].conclusive) {
    warnings.push(clanKnown
      ? '이름에서 파·세대를 판단할 근거가 부족합니다. 아버지·할아버지 이름이나 한자를 추가해 보세요.'
      : '본관을 특정할 근거가 부족합니다. 본관을 직접 고르거나 아버지·할아버지 이름과 한자를 추가해 보세요.')
  }
  if (top[0]?.conclusive && !top[0].dataVerified) {
    warnings.push('이 결과는 검증되지 않은 샘플 항렬 데이터에 기반합니다. 실제 족보와 다를 수 있습니다.')
  }
  if (top.length > 1 && top[0].conclusive && top[0].confidence - top[1].confidence < 10) {
    warnings.push('상위 후보 간 점수 차가 작습니다. 한자 이름을 입력하면 정확도가 올라갑니다.')
  }

  // 본관을 모르는 상태에서 결론이 없으면 특정 본관의 인물을 보여주지 않는다
  const figures = clanKnown || top[0]?.conclusive ? figuresFor(ds, top[0]) : []
  return { clanKnown, candidates: top, figures, warnings }
}
