// 족보Lab 도메인 타입. DB 스키마(supabase/migrations)와 1:1 대응한다.

export type Element = '木' | '火' | '土' | '金' | '水'
export type Position = 'FIRST' | 'LAST' | 'ANY'
export type FigureCategory = 'historical' | 'independence' | 'collaborator'

export interface Clan {
  id: number
  surnameHangul: string
  surnameHanja: string
  bonGwanHangul: string
  bonGwanHanja: string
  founderName: string | null
  originRegion: string // 본관 지명의 현재 위치
  description: string | null
}

export interface Branch {
  id: number
  clanId: number
  parentBranchId: number | null
  branchName: string
  founderName: string | null
  mainSettlements: string[]
  verified: boolean
  source: string | null
}

export interface Hangryeol {
  clanId: number
  branchId: number | null // null = 대동항렬
  generationSe: number // 세(世). 시조 = 1세
  elementType: Element | null
  hanja: string
  hangul: string
  positionType: Position
  verified: boolean
  source: string | null
}

export interface HistoricalFigure {
  id: number
  clanId: number
  branchId: number | null
  name: string
  nameHanja: string | null
  category: FigureCategory
  titleAchievement: string
  period: string | null
  birthYear: number | null
  deathYear: number | null
  honor: string | null // 서훈 (예: 건국훈장 대한민국장)
  basis: string | null // 분류 근거 (친일은 공식 결정 필수)
  imageUrl: string | null
  verified: boolean
  source: string | null
}

// ---- 추론 API 입출력 ----

export interface PersonInput {
  hangul: string // 이름(성 제외). 예: 상희
  hanja?: string // 예: 相熙. 모르면 생략
  nativeKorean?: boolean // 순우리말 이름 → 항렬 판정 제외
}

export interface MatchInput {
  surname: string // 성(한글)
  clanId?: number // 본관을 알면 지정
  self: PersonInput
  father?: PersonInput
  grandfather?: PersonInput
  hometown?: string // 부모님 고향 (예: 충남 공주)
}

export type Relation = 'self' | 'father' | 'grandfather'

export type EvidenceKind =
  | 'hanja' // 한자·위치 일치
  | 'hangul' // 한글·위치 일치 (동음이의 가능)
  | 'position' // 글자는 같지만 위치가 다름
  | 'mismatch' // 항렬자 없음
  | 'hanja_conflict' // 한글은 같은데 한자가 다름
  | 'skipped' // 미입력·순우리말

export interface Evidence {
  relation: Relation
  generationSe: number | null
  expected: { hanja: string; hangul: string; position: Position } | null
  kind: EvidenceKind
  score: number // 0~100
}

export interface RegionEvidence {
  kind: 'settlement' | 'origin' | 'none' | 'skipped'
  matched: string | null
  score: number
}

export interface Candidate {
  clan: Clan
  branch: Branch | null
  generationSe: number | null // 본인의 세. null = 항렬로 판정 불가
  confidence: number // 0~100
  conclusive: boolean // 파·세대를 결론으로 제시할 만큼 근거가 있는지
  evidence: Evidence[]
  region: RegionEvidence
  consecutiveBonus: boolean
  hasHangryeolData: boolean
  dataVerified: boolean // 판정에 쓰인 항렬 데이터가 모두 검증됐는지
}

export interface FigureWithRelation extends HistoricalFigure {
  relation: 'same_branch' | 'same_clan'
}

export interface MatchResult {
  clanKnown: boolean // 사용자가 본관을 직접 선택했는지
  candidates: Candidate[]
  figures: FigureWithRelation[] // 1순위 후보 본관의 인물
  warnings: string[]
}
