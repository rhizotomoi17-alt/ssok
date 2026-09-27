-- 자동 생성 파일. 직접 수정하지 말고 lib/jokbo/data.ts를 고친 뒤 pnpm jokbo:seed 실행.
-- verified=false 행은 샘플/미검증 데이터다.

BEGIN;

INSERT INTO clans (id, surname_hangul, surname_hanja, bon_gwan_hangul, bon_gwan_hanja, founder_name, origin_region, description) VALUES
  (1, '이', '李', '장수', '長水', NULL, '전북 장수', '조선 초 무신 이종무를 배출했다. 정언공파(이종화)와 양후공파(이종무) 두 대파로 나뉜다.'),
  (2, '조', '趙', '평양', '平壤', '조춘(趙椿)', '평양', '고려 후기 조인규가 가문을 크게 일으켰고, 그 증손 조준이 조선 개국 1등공신이 되었다.'),
  (3, '이', '李', '우봉', '牛峰', NULL, '황해도 금천', '본관 우봉은 황해도 금천 일대의 옛 지명이다.'),
  (4, '박', '朴', '반남', '潘南', NULL, '전남 나주', '본관 반남은 전남 나주시 반남면 일대다.'),
  (5, '이', '李', '전주', '全州', '이한(李翰)', '전북 전주', '조선 왕실의 성씨로, 수많은 왕자군 파로 나뉜다.'),
  (6, '권', '權', '안동', '安東', '권행(權幸)', '경북 안동', '고려 개국공신 권행을 시조로 한다.'),
  (7, '송', '宋', '은진', '恩津', NULL, '충남 논산', '본관 은진은 충남 논산시 은진면 일대다.'),
  (8, '안', '安', '순흥', '順興', NULL, '경북 영주', '안중근 일가를 비롯해 여러 독립운동가를 배출했다.'),
  (9, '윤', '尹', '파평', '坡平', '윤신달(尹莘達)', '경기 파주', '고려 개국공신 윤신달을 시조로 한다.'),
  (10, '김', '金', '안동', '安東', NULL, '경북 안동', '같은 "안동 김씨"라도 시조가 다른 두 계통(흔히 신안동·구안동)이 있다. 이 서비스는 아직 둘을 구분하지 않는다.'),
  (11, '이', '李', '경주', '慶州', '이알평(李謁平)', '경북 경주', '신라 6부 촌장 이알평을 시조로 한다. 이회영 6형제 일가가 독립운동에 투신했다.'),
  (12, '유', '柳', '고흥', '高興', NULL, '전남 고흥', NULL),
  (13, '이', '李', '연안', '延安', '이무(李茂)', '황해도 연안', '인조반정 1등공신 이귀를 배출했다.'),
  (14, '김', '金', '김해', '金海', '김수로왕', '경남 김해', '가락국 김수로왕을 시조로 하는 한국 최대 본관.'),
  (15, '박', '朴', '밀양', '密陽', NULL, '경남 밀양', NULL);

INSERT INTO branches (id, clan_id, parent_branch_id, branch_name, founder_name, main_settlements, verified, source) VALUES
  (1, 1, NULL, '정언공파', '이종화(李從和)', '{"전북 장수","경기 용인"}', true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (2, 1, NULL, '양후공파', '이종무(李從茂)', '{"전북 장수","충남 공주"}', true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (3, 2, NULL, '절도공파', NULL, '{"경기 화성","부산"}', false, 'sample'),
  (4, 2, NULL, '참판공파', NULL, '{"전북 완주","경기 화성"}', false, 'sample');

INSERT INTO hangryeol (clan_id, branch_id, generation_se, element_type, hanja, hangul, position_type, verified, source) VALUES
  (1, NULL, 20, '木', '根', '근', 'LAST', false, 'sample'),
  (1, NULL, 21, '火', '炳', '병', 'FIRST', false, 'sample'),
  (1, NULL, 22, '土', '在', '재', 'LAST', false, 'sample'),
  (1, NULL, 23, '金', '鍾', '종', 'FIRST', false, 'sample'),
  (1, NULL, 24, '水', '洙', '수', 'LAST', false, 'sample'),
  (1, NULL, 25, '木', '相', '상', 'FIRST', false, 'sample'),
  (1, NULL, 26, '火', '熙', '희', 'LAST', false, 'sample'),
  (1, NULL, 27, '土', '圭', '규', 'FIRST', false, 'sample'),
  (1, NULL, 28, '金', '鉉', '현', 'LAST', false, 'sample'),
  (1, 2, 26, '火', '燮', '섭', 'LAST', false, 'sample'),
  (2, NULL, 20, '土', '均', '균', 'FIRST', false, 'sample'),
  (2, NULL, 21, '金', '錫', '석', 'LAST', false, 'sample'),
  (2, NULL, 22, '水', '泳', '영', 'FIRST', false, 'sample'),
  (2, NULL, 23, '木', '植', '식', 'LAST', false, 'sample'),
  (2, NULL, 24, '火', '煥', '환', 'FIRST', false, 'sample'),
  (2, NULL, 25, '土', '基', '기', 'LAST', false, 'sample'),
  (2, NULL, 26, '金', '鎬', '호', 'FIRST', false, 'sample'),
  (2, NULL, 27, '水', '淳', '순', 'LAST', false, 'sample'),
  (2, NULL, 28, '木', '東', '동', 'FIRST', false, 'sample'),
  (2, 4, 25, '土', '培', '배', 'LAST', false, 'sample');

INSERT INTO historical_figures (id, clan_id, branch_id, name, name_hanja, category, title_achievement, period, birth_year, death_year, honor, basis, image_url, verified, source) VALUES
  (1, 1, 2, '이종무', '李從茂', 'historical', '세종 즉위 초 대마도 정벌을 이끈 무신. 시호 양후(襄厚)로 양후공파의 파조가 되었다.', '고려 말~조선 초', 1360, 1425, NULL, NULL, NULL, true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (2, 2, NULL, '조준', '趙浚', 'historical', '조선 개국 1등공신. 과전법 등 토지개혁을 주도했고 평양부원군에 봉해졌다.', '고려 말~조선 초', 1346, 1405, NULL, NULL, NULL, true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (3, 2, NULL, '조인규', '趙仁規', 'historical', '고려 후기 몽골어 역관 출신으로 재상에 올라 평양 조씨를 명문으로 일으켰다. 조준의 증조부.', '고려 후기', NULL, NULL, NULL, NULL, NULL, true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (4, 13, NULL, '이귀', '李貴', 'historical', '인조반정을 주도한 1등 정사공신. 연평부원군.', '조선 중기', NULL, NULL, NULL, NULL, NULL, true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (10, 8, NULL, '안중근', '安重根', 'independence', '1909년 하얼빈역에서 이토 히로부미를 처단했다. 옥중에서 「동양평화론」을 집필.', '대한제국', 1879, 1910, '건국훈장 대한민국장', NULL, NULL, true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (11, 8, NULL, '안창호', '安昌浩', 'independence', '신민회·흥사단을 조직하고 대한민국 임시정부에 참여한 독립운동가·교육자.', '대한제국~일제강점기', 1878, 1938, '건국훈장 대한민국장', NULL, NULL, false, '본관 검증 필요'),
  (12, 9, NULL, '윤봉길', '尹奉吉', 'independence', '1932년 상하이 훙커우 공원에서 일본군 수뇌부를 향해 폭탄을 던졌다.', '일제강점기', 1908, 1932, '건국훈장 대한민국장', NULL, NULL, true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (13, 10, NULL, '김좌진', '金佐鎭', 'independence', '1920년 청산리 전투에서 북로군정서군을 이끌어 일본군을 격파했다.', '일제강점기', 1889, 1930, '건국훈장 대한민국장', NULL, NULL, true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (14, 10, NULL, '김구', '金九', 'independence', '대한민국 임시정부 주석. 한인애국단을 조직해 이봉창·윤봉길 의거를 지휘했다.', '일제강점기', 1876, 1949, '건국훈장 대한민국장', NULL, NULL, false, '본관 검증 필요'),
  (15, 11, NULL, '이회영', '李會榮', 'independence', '전 재산을 처분해 6형제 일가가 만주로 망명, 신흥무관학교의 기틀을 세웠다.', '대한제국~일제강점기', 1867, 1932, NULL, NULL, NULL, true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (16, 12, NULL, '유관순', '柳寬順', 'independence', '1919년 아우내 장터 만세운동을 주도하고 서대문형무소에서 순국했다.', '일제강점기', 1902, 1920, '건국훈장 대한민국장', NULL, NULL, false, '본관 검증 필요'),
  (17, 5, NULL, '이봉창', '李奉昌', 'independence', '1932년 도쿄에서 일왕 행렬에 폭탄을 던진 한인애국단 단원.', '일제강점기', 1900, 1932, '건국훈장 대한민국장', NULL, NULL, false, '본관 검증 필요'),
  (30, 3, NULL, '이완용', '李完用', 'collaborator', '학부대신으로 을사늑약(1905)에 찬성했고, 총리대신으로 한일병합조약(1910)을 체결했다.', '대한제국~일제강점기', 1858, 1926, NULL, '을사오적. 친일반민족행위진상규명위원회 2006년 결정(106인 명단)', NULL, true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (31, 4, NULL, '박제순', '朴齊純', 'collaborator', '외부대신으로 을사늑약에 서명했다.', '대한제국~일제강점기', 1858, 1916, NULL, '을사오적. 친일반민족행위진상규명위원회 2006년 결정(106인 명단)', NULL, true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (32, 5, NULL, '이근택', '李根澤', 'collaborator', '군부대신으로 을사늑약에 찬성했다.', '대한제국~일제강점기', NULL, NULL, NULL, '을사오적. 친일반민족행위진상규명위원회 2006년 결정(106인 명단)', NULL, true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (33, 5, NULL, '이지용', '李址鎔', 'collaborator', '내부대신으로 을사늑약에 찬성했다.', '대한제국~일제강점기', NULL, NULL, NULL, '을사오적. 친일반민족행위진상규명위원회 2007년 결정(195인 명단)', NULL, true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (34, 6, NULL, '권중현', '權重顯', 'collaborator', '농상공부대신으로 을사늑약에 찬성했다.', '대한제국~일제강점기', NULL, NULL, NULL, '을사오적. 친일반민족행위진상규명위원회 2006년 결정(106인 명단)', NULL, true, '공개 백과 자료 (위키백과·한국민족문화대백과)'),
  (35, 7, NULL, '송병준', '宋秉畯', 'collaborator', '일진회를 이끌며 한일병합을 적극 추진했다. 은진 송씨라는 계보 문헌 근거는 확인되지 않는다는 지적이 있다.', '대한제국~일제강점기', 1858, 1925, NULL, '친일반민족행위진상규명위원회 2007년 결정(195인 명단)', NULL, true, '공개 백과 자료 (위키백과·한국민족문화대백과)');

SELECT setval('clans_id_seq', (SELECT max(id) FROM clans));
SELECT setval('branches_id_seq', (SELECT max(id) FROM branches));
SELECT setval('historical_figures_id_seq', (SELECT max(id) FROM historical_figures));

COMMIT;
