import assert from 'node:assert/strict'
import { test } from 'node:test'
import * as data from './data'
import { matchGenealogy, scorePerson, scoreRegion } from './match'

const ds = data

test('3대 한자 일치 → 양후공파 26세, 연속 가산점', () => {
  // 양후공파 26세 = 燮(LAST), 25세 = 相(FIRST), 24세 = 洙(LAST)
  const r = matchGenealogy(ds, {
    surname: '이', clanId: 1,
    self: { hangul: '민섭', hanja: '敏燮' },
    father: { hangul: '상준', hanja: '相俊' },
    grandfather: { hangul: '영수', hanja: '永洙' },
  })
  const top = r.candidates[0]
  assert.equal(top.branch?.branchName, '양후공파')
  assert.equal(top.generationSe, 26)
  assert.equal(top.consecutiveBonus, true)
  assert.equal(top.confidence, 100)
  assert.equal(top.dataVerified, false)
  assert.ok(r.warnings.some((w) => w.includes('샘플')))
})

test('대동항렬 熙 → 정언공파가 양후공파보다 우선', () => {
  const r = matchGenealogy(ds, {
    surname: '이', clanId: 1,
    self: { hangul: '민희', hanja: '敏熙' },
    father: { hangul: '상준', hanja: '相俊' },
  })
  assert.equal(r.candidates[0].branch?.branchName, '정언공파')
  assert.equal(r.candidates[0].generationSe, 26)
})

test('본관 미지정 시 같은 성의 모든 본관을 후보로', () => {
  const r = matchGenealogy(ds, { surname: '이', self: { hangul: '재민' }, father: { hangul: '종호' } })
  // 장수 이씨: 22세 在(LAST)는 '재민'에서 위치 불일치, 23세 鍾(FIRST) 부 일치
  assert.equal(r.candidates[0].clan.bonGwanHangul, '장수')
  assert.equal(r.candidates[0].generationSe, 24)
})

test('한글만 같고 한자가 다르면 충돌로 판정', () => {
  const e = scorePerson('self', { hangul: '상민', hanja: '尙敏' }, 25,
    ds.hangryeol.find((h) => h.clanId === 1 && h.generationSe === 25))
  assert.equal(e.kind, 'hanja_conflict')
  assert.equal(e.score, 0)
})

test('순우리말 이름은 항렬 판정에서 제외', () => {
  const e = scorePerson('self', { hangul: '하늘', nativeKorean: true }, 25, undefined)
  assert.equal(e.kind, 'skipped')
})

test('지역: 시·군 단위 일치만 인정', () => {
  const clan = ds.clans[0]
  const branch = ds.branches[1] // 양후공파: 전북 장수, 충남 공주
  assert.equal(scoreRegion('충남 공주시', clan, branch).kind, 'settlement')
  assert.equal(scoreRegion('충남 논산', clan, branch).kind, 'none')
  assert.equal(scoreRegion('전라북도 장수군', clan, null).kind, 'origin')
})

test('일치하는 항렬이 없으면 세대를 추정하지 않는다', () => {
  const r = matchGenealogy(ds, { surname: '조', clanId: 2, self: { hangul: '가나' } })
  assert.equal(r.candidates[0].generationSe, null)
  assert.deepEqual(r.candidates[0].evidence, [])
})

test('항렬 데이터 없는 본관: 경고 + 인물만 제공', () => {
  const r = matchGenealogy(ds, { surname: '안', clanId: 8, self: { hangul: '민수' } })
  assert.equal(r.candidates[0].hasHangryeolData, false)
  assert.ok(r.figures.some((f) => f.name === '안중근'))
})

test('두음 표기 류 → 유', () => {
  const r = matchGenealogy(ds, { surname: '류', self: { hangul: '민수' } })
  assert.equal(r.candidates[0].clan.bonGwanHangul, '고흥')
})

test('미검증 친일 분류는 노출하지 않는다', () => {
  const extra = {
    ...ds,
    figures: [...ds.figures, { ...ds.figures[0], id: 999, clanId: 8, category: 'collaborator' as const, verified: false }],
  }
  const r = matchGenealogy(extra, { surname: '안', clanId: 8, self: { hangul: '민수' } })
  assert.ok(!r.figures.some((f) => f.id === 999))
})

test('같은 파 인물이 먼저 온다', () => {
  const r = matchGenealogy(ds, {
    surname: '이', clanId: 1,
    self: { hangul: '민섭', hanja: '敏燮' },
  })
  assert.equal(r.figures[0].name, '이종무')
  assert.equal(r.figures[0].relation, 'same_branch')
})

test('본관 모름 + 한글 한 글자 우연 일치 → 결론 보류, 인물 비노출', () => {
  const r = matchGenealogy(ds, { surname: '이', self: { hangul: '완수' } })
  assert.equal(r.clanKnown, false)
  assert.equal(r.candidates[0].conclusive, false)
  assert.deepEqual(r.figures, [])
  assert.ok(r.warnings.some((w) => w.includes('본관을 특정할 근거가 부족')))
})

test('본관 선택 + 근거 부족 → 본관 인물은 보이되 같은 파 표시는 없음', () => {
  const r = matchGenealogy(ds, { surname: '이', clanId: 1, self: { hangul: '완수' } })
  assert.equal(r.candidates[0].conclusive, false)
  assert.ok(r.figures.length > 0)
  assert.ok(r.figures.every((f) => f.relation === 'same_clan'))
})

test('점수 0 후보는 목록에서 제외', () => {
  const r = matchGenealogy(ds, { surname: '이', self: { hangul: '민섭', hanja: '敏燮' } })
  assert.ok(r.candidates.slice(1).every((c) => c.confidence > 0))
})

test('모든 본관은 본관을 선택하면 인물이 3명 이상 보인다', () => {
  for (const clan of ds.clans) {
    const r = matchGenealogy(ds, { surname: clan.surnameHangul, clanId: clan.id, self: { hangul: '가나' } })
    assert.ok(r.figures.length >= 3, `${clan.bonGwanHangul} ${clan.surnameHangul}씨: ${r.figures.length}명`)
  }
})

test('인물 id 중복 없음, 친일 분류는 모두 근거 있음', () => {
  const ids = ds.figures.map((f) => f.id)
  assert.equal(new Set(ids).size, ids.length)
  for (const f of ds.figures) {
    if (f.category === 'collaborator') assert.ok(f.basis, f.name)
    assert.ok(ds.clans.some((c) => c.id === f.clanId), f.name)
  }
})
