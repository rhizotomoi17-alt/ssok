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
    founderName: '이임간(李林幹)', originRegion: '전북 장수',
    description: '고려 충선왕 대 문하시중을 지낸 이임간이 장천부원군에 봉해지며 장수를 본관으로 삼았다. 5세 이종화·이종무 형제가 각각 정언공파·양후공파의 파조가 되었다.' },
  { id: 2, surnameHangul: '조', surnameHanja: '趙', bonGwanHangul: '평양', bonGwanHanja: '平壤',
    founderName: '조춘(趙椿)', originRegion: '평양',
    description: '고려 후기 조인규가 가문을 크게 일으켰고, 그 증손 조준이 조선 개국 1등공신이 되었다.' },
  { id: 3, surnameHangul: '이', surnameHanja: '李', bonGwanHangul: '우봉', bonGwanHanja: '牛峰',
    founderName: null, originRegion: '황해도 금천',
    description: '본관 우봉은 황해도 금천 일대의 옛 지명이다.' },
  { id: 4, surnameHangul: '박', surnameHanja: '朴', bonGwanHangul: '반남', bonGwanHanja: '潘南',
    founderName: '박응주(朴應珠)', originRegion: '전남 나주',
    description: '본관 반남은 전남 나주시 반남면 일대다.' },
  { id: 5, surnameHangul: '이', surnameHanja: '李', bonGwanHangul: '전주', bonGwanHanja: '全州',
    founderName: '이한(李翰)', originRegion: '전북 전주',
    description: '조선 왕실의 성씨로, 수많은 왕자군 파로 나뉜다.' },
  { id: 6, surnameHangul: '권', surnameHanja: '權', bonGwanHangul: '안동', bonGwanHanja: '安東',
    founderName: '권행(權幸)', originRegion: '경북 안동',
    description: '고려 개국공신 권행을 시조로 한다.' },
  { id: 7, surnameHangul: '송', surnameHanja: '宋', bonGwanHangul: '은진', bonGwanHanja: '恩津',
    founderName: '송대원(宋大源)', originRegion: '충남 논산',
    description: '본관 은진은 충남 논산시 은진면 일대다.' },
  { id: 8, surnameHangul: '안', surnameHanja: '安', bonGwanHangul: '순흥', bonGwanHanja: '順興',
    founderName: '안자미', originRegion: '경북 영주',
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
    founderName: '류영', originRegion: '전남 고흥',
    description: '시조 류영의 7세손 류청신을 중시조로 삼는다. 두음법칙에 따라 "류"로도 쓴다.' },
  { id: 13, surnameHangul: '이', surnameHanja: '李', bonGwanHangul: '연안', bonGwanHanja: '延安',
    founderName: '이무(李茂)', originRegion: '황해도 연안',
    description: '인조반정 1등공신 이귀를 배출했다.' },
  { id: 14, surnameHangul: '김', surnameHanja: '金', bonGwanHangul: '김해', bonGwanHanja: '金海',
    founderName: '김수로왕', originRegion: '경남 김해',
    description: '가락국 김수로왕을 시조로 하는 한국 최대 본관.' },
  { id: 15, surnameHangul: '박', surnameHanja: '朴', bonGwanHangul: '밀양', bonGwanHanja: '密陽',
    founderName: '박언침', originRegion: '경남 밀양',
    description: '신라 경명왕의 장남 밀성대군 박언침을 시조로 한다. 인구가 가장 많은 본관 중 하나다.' },
]

export const branches: Branch[] = [
  { id: 1, clanId: 1, parentBranchId: null, branchName: '정언공파', founderName: '이종화(李從華)',
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

type FigureSeed = Omit<HistoricalFigure, 'imageUrl' | 'verified' | 'source' | 'honor' | 'basis' | 'branchId' | 'birthYear' | 'deathYear' | 'nameHanja' | 'period'> &
  Partial<Pick<HistoricalFigure, 'honor' | 'basis' | 'branchId' | 'birthYear' | 'deathYear' | 'nameHanja' | 'period' | 'verified' | 'source'>>

const fig = (f: FigureSeed): HistoricalFigure => ({
  branchId: null, nameHanja: null, period: null, birthYear: null, deathYear: null,
  honor: null, basis: null, imageUrl: null, verified: true, source: WIKI, ...f,
})

// 모든 본관에 인물 3명 이상 (match.test.ts에서 검사)
export const figures: HistoricalFigure[] = [
  // 1 장수 이씨
  fig({ id: 1, clanId: 1, branchId: 2, name: '이종무', nameHanja: '李從茂', category: 'historical',
    titleAchievement: '왜구를 여러 차례 격퇴하고 세종 즉위 초 대마도 정벌을 이끈 무신. 시호 양후(襄厚)로 양후공파의 파조가 되었다.',
    period: '고려 말~조선 초', birthYear: 1360, deathYear: 1425 }),
  fig({ id: 5, clanId: 1, name: '이임간', nameHanja: '李林幹', category: 'historical',
    titleAchievement: '고려 충선왕 대 문하시중 평장사에 올라 장천부원군에 봉해졌다. 장수 이씨의 시조.',
    period: '고려 후기' }),
  fig({ id: 6, clanId: 1, branchId: 1, name: '이종화', nameHanja: '李從華', category: 'historical',
    titleAchievement: '이종무의 형. 태조 대 과거에 급제해 사간원 정언을 지냈고 정언공파의 파조가 되었다.',
    period: '조선 초' }),

  // 2 평양 조씨
  fig({ id: 2, clanId: 2, name: '조준', nameHanja: '趙浚', category: 'historical',
    titleAchievement: '조선 개국 1등공신. 과전법 등 토지개혁을 주도했고 평양부원군에 봉해졌다.',
    period: '고려 말~조선 초', birthYear: 1346, deathYear: 1405 }),
  fig({ id: 3, clanId: 2, name: '조인규', nameHanja: '趙仁規', category: 'historical',
    titleAchievement: '고려 후기 몽골어 역관 출신으로 재상에 올라 평양 조씨를 명문으로 일으켰다. 조준의 증조부.',
    period: '고려 후기' }),
  fig({ id: 7, clanId: 2, name: '조견', nameHanja: '趙狷', category: 'historical',
    titleAchievement: '조준의 동생. 개국공신에 책록되었으나 고려에 대한 절의를 지키려 사양했다고 전한다.',
    period: '고려 말~조선 초', birthYear: 1351, deathYear: 1425 }),

  // 3 우봉 이씨
  fig({ id: 30, clanId: 3, name: '이완용', nameHanja: '李完用', category: 'collaborator',
    titleAchievement: '학부대신으로 을사늑약(1905)에 찬성했고, 총리대신으로 한일병합조약(1910)을 체결했다.',
    period: '대한제국~일제강점기', birthYear: 1858, deathYear: 1926, basis: `을사오적. ${COMMISSION_2006}` }),
  fig({ id: 36, clanId: 3, name: '이윤용', nameHanja: '李潤用', category: 'collaborator',
    titleAchievement: '이완용의 이복형. 대한제국 군부대신 등을 지냈고 병합 후 조선귀족 남작 작위를 받았다.',
    period: '대한제국~일제강점기', basis: '친일반민족행위진상규명위원회 친일반민족행위자 결정' }),
  fig({ id: 20, clanId: 3, name: '이재', nameHanja: '李縡', category: 'historical',
    titleAchievement: '호는 도암. 숙종~영조 대의 성리학자로 대제학을 지냈다.',
    period: '조선 후기' }),

  // 4 반남 박씨
  fig({ id: 31, clanId: 4, name: '박제순', nameHanja: '朴齊純', category: 'collaborator',
    titleAchievement: '외부대신으로 을사늑약에 서명했다.',
    period: '대한제국~일제강점기', birthYear: 1858, deathYear: 1916, basis: `을사오적. ${COMMISSION_2006}` }),
  fig({ id: 21, clanId: 4, name: '박세당', nameHanja: '朴世堂', category: 'historical',
    titleAchievement: '숙종 대의 학자. 주자 해석에 얽매이지 않는 경전 주석으로 사문난적 논란을 겪었다.',
    period: '조선 후기' }),
  fig({ id: 22, clanId: 4, name: '박지원', nameHanja: '朴趾源', category: 'historical',
    titleAchievement: '호는 연암. 『열하일기』를 쓴 북학파 실학자.',
    period: '조선 후기', birthYear: 1737, deathYear: 1805 }),
  fig({ id: 23, clanId: 4, name: '박규수', nameHanja: '朴珪壽', category: 'historical',
    titleAchievement: '박지원의 손자. 개화사상의 선구자로 김옥균 등 개화파를 길러냈다.',
    period: '조선 말기', birthYear: 1807, deathYear: 1877 }),

  // 5 전주 이씨
  fig({ id: 24, clanId: 5, name: '이성계', nameHanja: '李成桂', category: 'historical',
    titleAchievement: '조선을 건국한 태조.',
    period: '고려 말~조선 초', birthYear: 1335, deathYear: 1408 }),
  fig({ id: 25, clanId: 5, name: '세종(이도)', nameHanja: '李祹', category: 'historical',
    titleAchievement: '조선 제4대 국왕. 훈민정음을 창제했다.',
    period: '조선 전기', birthYear: 1397, deathYear: 1450 }),
  fig({ id: 17, clanId: 5, name: '이봉창', nameHanja: '李奉昌', category: 'independence',
    titleAchievement: '한인애국단 단원. 1932년 도쿄에서 일왕 행렬에 폭탄을 던졌다.',
    period: '일제강점기', deathYear: 1932, honor: '건국훈장 대한민국장' }),
  fig({ id: 32, clanId: 5, name: '이근택', nameHanja: '李根澤', category: 'collaborator',
    titleAchievement: '군부대신으로 을사늑약에 찬성했다.',
    period: '대한제국~일제강점기', basis: `을사오적. ${COMMISSION_2006}` }),
  fig({ id: 33, clanId: 5, name: '이지용', nameHanja: '李址鎔', category: 'collaborator',
    titleAchievement: '내부대신으로 을사늑약에 찬성했다.',
    period: '대한제국~일제강점기', basis: `을사오적. ${COMMISSION_2007}` }),

  // 6 안동 권씨
  fig({ id: 26, clanId: 6, name: '권근', nameHanja: '權近', category: 'historical',
    titleAchievement: '여말선초의 성리학자이자 조선 개국공신. 안동 권씨가 조선의 명문으로 자리 잡는 기반을 닦았다.',
    period: '고려 말~조선 초', birthYear: 1352, deathYear: 1409 }),
  fig({ id: 27, clanId: 6, name: '권율', nameHanja: '權慄', category: 'historical',
    titleAchievement: '임진왜란 때 행주대첩을 승리로 이끈 도원수. 권근의 6대손.',
    period: '조선 중기', birthYear: 1537, deathYear: 1599 }),
  fig({ id: 34, clanId: 6, name: '권중현', nameHanja: '權重顯', category: 'collaborator',
    titleAchievement: '농상공부대신으로 을사늑약에 찬성했다.',
    period: '대한제국~일제강점기', basis: `을사오적. ${COMMISSION_2006}` }),

  // 7 은진 송씨
  fig({ id: 28, clanId: 7, name: '송시열', nameHanja: '宋時烈', category: 'historical',
    titleAchievement: '노론의 영수. 좌의정을 지냈고 문묘와 종묘에 배향되었다.',
    period: '조선 후기', birthYear: 1607, deathYear: 1689 }),
  fig({ id: 29, clanId: 7, name: '송준길', nameHanja: '宋浚吉', category: 'historical',
    titleAchievement: '송시열과 함께 "양송"으로 불린 성리학자. 문묘에 배향되었다.',
    period: '조선 후기', birthYear: 1606, deathYear: 1672 }),
  fig({ id: 35, clanId: 7, name: '송병준', nameHanja: '宋秉畯', category: 'collaborator',
    titleAchievement: '일진회를 이끌며 한일병합을 적극 추진했다. 은진 송씨라는 계보 문헌 근거는 확인되지 않는다는 지적이 있다.',
    period: '대한제국~일제강점기', birthYear: 1858, deathYear: 1925, basis: COMMISSION_2007 }),

  // 8 순흥 안씨
  fig({ id: 40, clanId: 8, name: '안향', nameHanja: '安珦', category: 'historical',
    titleAchievement: '고려에 성리학을 처음 들여온 학자. 시조 안자미의 증손.',
    period: '고려 후기', birthYear: 1243, deathYear: 1306 }),
  fig({ id: 10, clanId: 8, name: '안중근', nameHanja: '安重根', category: 'independence',
    titleAchievement: '1909년 하얼빈역에서 이토 히로부미를 처단했다. 옥중에서 「동양평화론」을 집필.',
    period: '대한제국', birthYear: 1879, deathYear: 1910, honor: '건국훈장 대한민국장' }),
  fig({ id: 11, clanId: 8, name: '안창호', nameHanja: '安昌浩', category: 'independence',
    titleAchievement: '신민회·흥사단을 조직하고 대한민국 임시정부에 참여한 독립운동가·교육자.',
    period: '대한제국~일제강점기', birthYear: 1878, deathYear: 1938, honor: '건국훈장 대한민국장' }),

  // 9 파평 윤씨
  fig({ id: 41, clanId: 9, name: '윤관', nameHanja: '尹瓘', category: 'historical',
    titleAchievement: '17만 대군으로 여진을 정벌하고 동북 9성을 쌓았다. 파평 윤씨의 중시조.',
    period: '고려 중기' }),
  fig({ id: 42, clanId: 9, name: '윤증', nameHanja: '尹拯', category: 'historical',
    titleAchievement: '숙종 대 소론의 영수로 꼽히는 성리학자.',
    period: '조선 후기' }),
  fig({ id: 12, clanId: 9, name: '윤봉길', nameHanja: '尹奉吉', category: 'independence',
    titleAchievement: '1932년 상하이 훙커우 공원에서 일본군 수뇌부를 향해 폭탄을 던졌다.',
    period: '일제강점기', birthYear: 1908, deathYear: 1932, honor: '건국훈장 대한민국장' }),

  // 10 안동 김씨
  fig({ id: 43, clanId: 10, name: '김상헌', nameHanja: '金尙憲', category: 'historical',
    titleAchievement: '병자호란 때 끝까지 항전을 주장한 척화파의 상징. 신 안동 김씨.',
    period: '조선 중기', birthYear: 1570, deathYear: 1652 }),
  fig({ id: 13, clanId: 10, name: '김좌진', nameHanja: '金佐鎭', category: 'independence',
    titleAchievement: '1920년 청산리 전투에서 북로군정서군을 이끌어 일본군을 격파했다.',
    period: '일제강점기', birthYear: 1889, deathYear: 1930, honor: '건국훈장 대한민국장' }),
  fig({ id: 14, clanId: 10, name: '김구', nameHanja: '金九', category: 'independence',
    titleAchievement: '대한민국 임시정부 주석. 한인애국단을 조직해 이봉창·윤봉길 의거를 지휘했다.',
    period: '일제강점기', birthYear: 1876, deathYear: 1949, honor: '건국훈장 대한민국장',
    verified: false, source: '본관 검증 필요' }),

  // 11 경주 이씨
  fig({ id: 44, clanId: 11, name: '이제현', nameHanja: '李齊賢', category: 'historical',
    titleAchievement: '호는 익재. 고려 말의 대표적 성리학자이자 문장가.',
    period: '고려 후기' }),
  fig({ id: 45, clanId: 11, name: '이항복', nameHanja: '李恒福', category: 'historical',
    titleAchievement: '호는 백사. "오성과 한음"의 오성으로, 임진왜란기 영의정을 지냈다.',
    period: '조선 중기' }),
  fig({ id: 15, clanId: 11, name: '이회영', nameHanja: '李會榮', category: 'independence',
    titleAchievement: '전 재산을 처분해 6형제 일가가 만주로 망명, 신흥무관학교의 기틀을 세웠다.',
    period: '대한제국~일제강점기', birthYear: 1867, deathYear: 1932 }),
  fig({ id: 46, clanId: 11, name: '이시영', nameHanja: '李始榮', category: 'independence',
    titleAchievement: '이회영의 동생. 임시정부에서 활동했고 대한민국 초대 부통령을 지냈다.',
    period: '대한제국~대한민국' }),
  fig({ id: 47, clanId: 11, name: '이상설', nameHanja: '李相卨', category: 'independence',
    titleAchievement: '1907년 헤이그 만국평화회의에 파견된 특사 3인 중 한 명.',
    period: '대한제국' }),

  // 12 고흥 유씨
  fig({ id: 48, clanId: 12, name: '류청신', nameHanja: '柳淸臣', category: 'historical',
    titleAchievement: '고흥 출신으로 1310년 정승에 올라 고흥부원군에 봉해졌다. 고흥 류씨의 중시조.',
    period: '고려 후기' }),
  fig({ id: 49, clanId: 12, name: '유몽인', nameHanja: '柳夢寅', category: 'historical',
    titleAchievement: '조선 중기 문신. 설화집 『어우야담』을 남겼다.',
    period: '조선 중기' }),
  fig({ id: 16, clanId: 12, name: '유관순', nameHanja: '柳寬順', category: 'independence',
    titleAchievement: '1919년 아우내 장터 만세운동을 주도하고 서대문형무소에서 순국했다.',
    period: '일제강점기', birthYear: 1902, deathYear: 1920, honor: '건국훈장 대한민국장' }),

  // 13 연안 이씨
  fig({ id: 4, clanId: 13, name: '이귀', nameHanja: '李貴', category: 'historical',
    titleAchievement: '인조반정을 주도한 1등 정사공신. 연평부원군.',
    period: '조선 중기' }),
  fig({ id: 50, clanId: 13, name: '이시백', nameHanja: '李時白', category: 'historical',
    titleAchievement: '이귀의 아들. 아버지와 함께 인조반정에 참여해 정사공신이 되었다.',
    period: '조선 중기' }),
  fig({ id: 51, clanId: 13, name: '이정구', nameHanja: '李廷龜', category: 'historical',
    titleAchievement: '호는 월사. 6조 판서를 두루 거쳐 좌의정에 오른 문장가로 대제학을 지냈다.',
    period: '조선 중기' }),

  // 14 김해 김씨
  fig({ id: 52, clanId: 14, name: '김수로왕', nameHanja: '金首露王', category: 'historical',
    titleAchievement: '금관가야(가락국)의 시조로 전해지는 인물이자 김해 김씨의 시조. 건국 설화가 전한다.',
    period: '가야' }),
  fig({ id: 53, clanId: 14, name: '구형왕', nameHanja: '仇衡王', category: 'historical',
    titleAchievement: '금관가야의 마지막 왕. 김유신의 증조부.',
    period: '가야' }),
  fig({ id: 54, clanId: 14, name: '김유신', nameHanja: '金庾信', category: 'historical',
    titleAchievement: '신라 무열왕과 함께 삼국통일을 이끈 명장.',
    period: '신라', birthYear: 595, deathYear: 673 }),

  // 15 밀양 박씨
  fig({ id: 55, clanId: 15, name: '박위', nameHanja: '朴葳', category: 'historical',
    titleAchievement: '1389년 전함 100척으로 대마도를 정벌해 왜선 300척을 불태웠다.',
    period: '고려 말~조선 초' }),
  fig({ id: 56, clanId: 15, name: '박연', nameHanja: '朴堧', category: 'historical',
    titleAchievement: '호는 난계. 세종 대 궁중음악을 정비해 왕산악·우륵과 함께 3대 악성으로 꼽힌다.',
    period: '조선 전기' }),
  fig({ id: 57, clanId: 15, name: '박수량', nameHanja: '朴守良', category: 'historical',
    titleAchievement: '명종 대의 대표적인 청백리.',
    period: '조선 전기' }),
]

// 성 표기 변형 (두음법칙 등)
export const SURNAME_ALIASES: Record<string, string> = {
  류: '유', 리: '이', 림: '임', 로: '노', 라: '나', 량: '양', 렴: '염', 룡: '용',
}
