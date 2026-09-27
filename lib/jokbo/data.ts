// 족보Lab 데이터 원본. supabase/seed.sql은 이 파일에서 생성한다 (pnpm jokbo:seed).
//
// 검증 원칙
// - verified=true: 공개 백과·공공기관 자료로 확인한 사실만.
// - 항렬자와 집성촌은 현재 전부 샘플(verified=false). 실제 족보로 교체 필요.
// - 친일(collaborator)은 친일반민족행위진상규명위원회 공식 결정이 확인된
//   인물만 넣는다. verified=false인 collaborator는 엔진이 노출하지 않는다.

import type { Branch, Clan, Hangryeol, HistoricalFigure } from './types'

const WIKI = '공개 백과 자료 (위키백과·한국민족문화대백과)'
const COMMISSION_2006 = '친일반민족행위진상규명위원회 2006년 결정(106인 명단)'
const COMMISSION_2007 = '친일반민족행위진상규명위원회 2007년 결정(195인 명단)'

export const clans: Clan[] = [
  { id: 1, surnameHangul: '이', surnameHanja: '李', bonGwanHangul: '장수', bonGwanHanja: '長水',
    founderName: null, originRegion: '전북 장수',
    description: '조선 초 무신 이종무를 배출했다. 정언공파(이종화)와 양후공파(이종무) 두 대파로 나뉜다.' },
  { id: 2, surnameHangul: '조', surnameHanja: '趙', bonGwanHangul: '평양', bonGwanHanja: '平壤',
    founderName: '조춘(趙椿)', originRegion: '평양',
    description: '고려 후기 조인규가 가문을 크게 일으켰고, 그 증손 조준이 조선 개국 1등공신이 되었다.' },
  { id: 3, surnameHangul: '이', surnameHanja: '李', bonGwanHangul: '우봉', bonGwanHanja: '牛峰',
    founderName: null, originRegion: '황해도 금천',
    description: '본관 우봉은 황해도 금천 일대의 옛 지명이다.' },
  { id: 4, surnameHangul: '박', surnameHanja: '朴', bonGwanHangul: '반남', bonGwanHanja: '潘南',
    founderName: null, originRegion: '전남 나주',
    description: '본관 반남은 전남 나주시 반남면 일대다.' },
  { id: 5, surnameHangul: '이', surnameHanja: '李', bonGwanHangul: '전주', bonGwanHanja: '全州',
    founderName: '이한(李翰)', originRegion: '전북 전주',
    description: '조선 왕실의 성씨로, 수많은 왕자군 파로 나뉜다.' },
  { id: 6, surnameHangul: '권', surnameHanja: '權', bonGwanHangul: '안동', bonGwanHanja: '安東',
    founderName: '권행(權幸)', originRegion: '경북 안동',
    description: '고려 개국공신 권행을 시조로 한다.' },
  { id: 7, surnameHangul: '송', surnameHanja: '宋', bonGwanHangul: '은진', bonGwanHanja: '恩津',
    founderName: null, originRegion: '충남 논산',
    description: '본관 은진은 충남 논산시 은진면 일대다.' },
  { id: 8, surnameHangul: '안', surnameHanja: '安', bonGwanHangul: '순흥', bonGwanHanja: '順興',
    founderName: null, originRegion: '경북 영주',
    description: '안중근 일가를 비롯해 여러 독립운동가를 배출했다.' },
  { id: 9, surnameHangul: '윤', surnameHanja: '尹', bonGwanHangul: '파평', bonGwanHanja: '坡平',
    founderName: '윤신달(尹莘達)', originRegion: '경기 파주',
    description: '고려 개국공신 윤신달을 시조로 한다.' },
  { id: 10, surnameHangul: '김', surnameHanja: '金', bonGwanHangul: '안동', bonGwanHanja: '安東',
    founderName: null, originRegion: '경북 안동',
    description: '같은 "안동 김씨"라도 시조가 다른 두 계통(흔히 신안동·구안동)이 있다. 이 서비스는 아직 둘을 구분하지 않는다.' },
  { id: 11, surnameHangul: '이', surnameHanja: '李', bonGwanHangul: '경주', bonGwanHanja: '慶州',
    founderName: '이알평(李謁平)', originRegion: '경북 경주',
    description: '신라 6부 촌장 이알평을 시조로 한다. 이회영 6형제 일가가 독립운동에 투신했다.' },
  { id: 12, surnameHangul: '유', surnameHanja: '柳', bonGwanHangul: '고흥', bonGwanHanja: '高興',
    founderName: null, originRegion: '전남 고흥', description: null },
  { id: 13, surnameHangul: '이', surnameHanja: '李', bonGwanHangul: '연안', bonGwanHanja: '延安',
    founderName: '이무(李茂)', originRegion: '황해도 연안',
    description: '인조반정 1등공신 이귀를 배출했다.' },
  { id: 14, surnameHangul: '김', surnameHanja: '金', bonGwanHangul: '김해', bonGwanHanja: '金海',
    founderName: '김수로왕', originRegion: '경남 김해',
    description: '가락국 김수로왕을 시조로 하는 한국 최대 본관.' },
  { id: 15, surnameHangul: '박', surnameHanja: '朴', bonGwanHangul: '밀양', bonGwanHanja: '密陽',
    founderName: null, originRegion: '경남 밀양', description: null },
]

export const branches: Branch[] = [
  { id: 1, clanId: 1, parentBranchId: null, branchName: '정언공파', founderName: '이종화(李從和)',
    mainSettlements: ['전북 장수', '경기 용인'], verified: true, source: WIKI },
  { id: 2, clanId: 1, parentBranchId: null, branchName: '양후공파', founderName: '이종무(李從茂)',
    mainSettlements: ['전북 장수', '충남 공주'], verified: true, source: WIKI },
  // 평양 조씨 두 파는 존재·파조 미확인 (샘플)
  { id: 3, clanId: 2, parentBranchId: null, branchName: '절도공파', founderName: null,
    mainSettlements: ['경기 화성', '부산'], verified: false, source: 'sample' },
  { id: 4, clanId: 2, parentBranchId: null, branchName: '참판공파', founderName: null,
    mainSettlements: ['전북 완주', '경기 화성'], verified: false, source: 'sample' },
]
// 주의: 파 verified는 파 존재·파조에 대한 것. mainSettlements는 전부 샘플.

type Row = [gen: number, el: Hangryeol['elementType'], hanja: string, hangul: string, pos: Hangryeol['positionType']]
const sample = (clanId: number, branchId: number | null, rows: Row[]): Hangryeol[] =>
  rows.map(([generationSe, elementType, hanja, hangul, positionType]) => ({
    clanId, branchId, generationSe, elementType, hanja, hangul, positionType,
    verified: false, source: 'sample',
  }))

// 항렬자: 오행 상생(木→火→土→金→水) 순서에 맞춘 개발용 샘플
export const hangryeol: Hangryeol[] = [
  ...sample(1, null, [
    [20, '木', '根', '근', 'LAST'], [21, '火', '炳', '병', 'FIRST'], [22, '土', '在', '재', 'LAST'],
    [23, '金', '鍾', '종', 'FIRST'], [24, '水', '洙', '수', 'LAST'], [25, '木', '相', '상', 'FIRST'],
    [26, '火', '熙', '희', 'LAST'], [27, '土', '圭', '규', 'FIRST'], [28, '金', '鉉', '현', 'LAST'],
  ]),
  ...sample(1, 2, [[26, '火', '燮', '섭', 'LAST']]), // 양후공파 고유
  ...sample(2, null, [
    [20, '土', '均', '균', 'FIRST'], [21, '金', '錫', '석', 'LAST'], [22, '水', '泳', '영', 'FIRST'],
    [23, '木', '植', '식', 'LAST'], [24, '火', '煥', '환', 'FIRST'], [25, '土', '基', '기', 'LAST'],
    [26, '金', '鎬', '호', 'FIRST'], [27, '水', '淳', '순', 'LAST'], [28, '木', '東', '동', 'FIRST'],
  ]),
  ...sample(2, 4, [[25, '土', '培', '배', 'LAST']]), // 참판공파 고유
]

export const figures: HistoricalFigure[] = [
  // --- 역사 인물 ---
  { id: 1, clanId: 1, branchId: 2, name: '이종무', nameHanja: '李從茂', category: 'historical',
    titleAchievement: '세종 즉위 초 대마도 정벌을 이끈 무신. 시호 양후(襄厚)로 양후공파의 파조가 되었다.',
    period: '고려 말~조선 초', birthYear: 1360, deathYear: 1425, honor: null, basis: null,
    imageUrl: null, verified: true, source: WIKI },
  { id: 2, clanId: 2, branchId: null, name: '조준', nameHanja: '趙浚', category: 'historical',
    titleAchievement: '조선 개국 1등공신. 과전법 등 토지개혁을 주도했고 평양부원군에 봉해졌다.',
    period: '고려 말~조선 초', birthYear: 1346, deathYear: 1405, honor: null, basis: null,
    imageUrl: null, verified: true, source: WIKI },
  { id: 3, clanId: 2, branchId: null, name: '조인규', nameHanja: '趙仁規', category: 'historical',
    titleAchievement: '고려 후기 몽골어 역관 출신으로 재상에 올라 평양 조씨를 명문으로 일으켰다. 조준의 증조부.',
    period: '고려 후기', birthYear: null, deathYear: null, honor: null, basis: null,
    imageUrl: null, verified: true, source: WIKI },
  { id: 4, clanId: 13, branchId: null, name: '이귀', nameHanja: '李貴', category: 'historical',
    titleAchievement: '인조반정을 주도한 1등 정사공신. 연평부원군.',
    period: '조선 중기', birthYear: null, deathYear: null, honor: null, basis: null,
    imageUrl: null, verified: true, source: WIKI },

  // --- 독립운동가 ---
  { id: 10, clanId: 8, branchId: null, name: '안중근', nameHanja: '安重根', category: 'independence',
    titleAchievement: '1909년 하얼빈역에서 이토 히로부미를 처단했다. 옥중에서 「동양평화론」을 집필.',
    period: '대한제국', birthYear: 1879, deathYear: 1910, honor: '건국훈장 대한민국장', basis: null,
    imageUrl: null, verified: true, source: WIKI },
  { id: 11, clanId: 8, branchId: null, name: '안창호', nameHanja: '安昌浩', category: 'independence',
    titleAchievement: '신민회·흥사단을 조직하고 대한민국 임시정부에 참여한 독립운동가·교육자.',
    period: '대한제국~일제강점기', birthYear: 1878, deathYear: 1938, honor: '건국훈장 대한민국장', basis: null,
    imageUrl: null, verified: false, source: '본관 검증 필요' },
  { id: 12, clanId: 9, branchId: null, name: '윤봉길', nameHanja: '尹奉吉', category: 'independence',
    titleAchievement: '1932년 상하이 훙커우 공원에서 일본군 수뇌부를 향해 폭탄을 던졌다.',
    period: '일제강점기', birthYear: 1908, deathYear: 1932, honor: '건국훈장 대한민국장', basis: null,
    imageUrl: null, verified: true, source: WIKI },
  { id: 13, clanId: 10, branchId: null, name: '김좌진', nameHanja: '金佐鎭', category: 'independence',
    titleAchievement: '1920년 청산리 전투에서 북로군정서군을 이끌어 일본군을 격파했다.',
    period: '일제강점기', birthYear: 1889, deathYear: 1930, honor: '건국훈장 대한민국장', basis: null,
    imageUrl: null, verified: true, source: WIKI },
  { id: 14, clanId: 10, branchId: null, name: '김구', nameHanja: '金九', category: 'independence',
    titleAchievement: '대한민국 임시정부 주석. 한인애국단을 조직해 이봉창·윤봉길 의거를 지휘했다.',
    period: '일제강점기', birthYear: 1876, deathYear: 1949, honor: '건국훈장 대한민국장', basis: null,
    imageUrl: null, verified: false, source: '본관 검증 필요' },
  { id: 15, clanId: 11, branchId: null, name: '이회영', nameHanja: '李會榮', category: 'independence',
    titleAchievement: '전 재산을 처분해 6형제 일가가 만주로 망명, 신흥무관학교의 기틀을 세웠다.',
    period: '대한제국~일제강점기', birthYear: 1867, deathYear: 1932, honor: null, basis: null,
    imageUrl: null, verified: true, source: WIKI },
  { id: 16, clanId: 12, branchId: null, name: '유관순', nameHanja: '柳寬順', category: 'independence',
    titleAchievement: '1919년 아우내 장터 만세운동을 주도하고 서대문형무소에서 순국했다.',
    period: '일제강점기', birthYear: 1902, deathYear: 1920, honor: '건국훈장 대한민국장', basis: null,
    imageUrl: null, verified: false, source: '본관 검증 필요' },
  { id: 17, clanId: 5, branchId: null, name: '이봉창', nameHanja: '李奉昌', category: 'independence',
    titleAchievement: '1932년 도쿄에서 일왕 행렬에 폭탄을 던진 한인애국단 단원.',
    period: '일제강점기', birthYear: 1900, deathYear: 1932, honor: '건국훈장 대한민국장', basis: null,
    imageUrl: null, verified: false, source: '본관 검증 필요' },

  // --- 친일반민족행위자 (공식 결정만) ---
  { id: 30, clanId: 3, branchId: null, name: '이완용', nameHanja: '李完用', category: 'collaborator',
    titleAchievement: '학부대신으로 을사늑약(1905)에 찬성했고, 총리대신으로 한일병합조약(1910)을 체결했다.',
    period: '대한제국~일제강점기', birthYear: 1858, deathYear: 1926, honor: null,
    basis: `을사오적. ${COMMISSION_2006}`, imageUrl: null, verified: true, source: WIKI },
  { id: 31, clanId: 4, branchId: null, name: '박제순', nameHanja: '朴齊純', category: 'collaborator',
    titleAchievement: '외부대신으로 을사늑약에 서명했다.',
    period: '대한제국~일제강점기', birthYear: 1858, deathYear: 1916, honor: null,
    basis: `을사오적. ${COMMISSION_2006}`, imageUrl: null, verified: true, source: WIKI },
  { id: 32, clanId: 5, branchId: null, name: '이근택', nameHanja: '李根澤', category: 'collaborator',
    titleAchievement: '군부대신으로 을사늑약에 찬성했다.',
    period: '대한제국~일제강점기', birthYear: null, deathYear: null, honor: null,
    basis: `을사오적. ${COMMISSION_2006}`, imageUrl: null, verified: true, source: WIKI },
  { id: 33, clanId: 5, branchId: null, name: '이지용', nameHanja: '李址鎔', category: 'collaborator',
    titleAchievement: '내부대신으로 을사늑약에 찬성했다.',
    period: '대한제국~일제강점기', birthYear: null, deathYear: null, honor: null,
    basis: `을사오적. ${COMMISSION_2007}`, imageUrl: null, verified: true, source: WIKI },
  { id: 34, clanId: 6, branchId: null, name: '권중현', nameHanja: '權重顯', category: 'collaborator',
    titleAchievement: '농상공부대신으로 을사늑약에 찬성했다.',
    period: '대한제국~일제강점기', birthYear: null, deathYear: null, honor: null,
    basis: `을사오적. ${COMMISSION_2006}`, imageUrl: null, verified: true, source: WIKI },
  { id: 35, clanId: 7, branchId: null, name: '송병준', nameHanja: '宋秉畯', category: 'collaborator',
    titleAchievement: '일진회를 이끌며 한일병합을 적극 추진했다. 은진 송씨라는 계보 문헌 근거는 확인되지 않는다는 지적이 있다.',
    period: '대한제국~일제강점기', birthYear: 1858, deathYear: 1925, honor: null,
    basis: COMMISSION_2007, imageUrl: null, verified: true, source: WIKI },
]

// 성 표기 변형 (두음법칙 등)
export const SURNAME_ALIASES: Record<string, string> = {
  류: '유', 리: '이', 림: '임', 로: '노', 라: '나', 량: '양', 렴: '염', 룡: '용',
}
