-- 족보Lab 시드 데이터
--
-- ⚠ 항렬자는 전부 샘플(verified=false)이다. 실제 족보에서 확인하지 못했으므로
--   오행 상생 순서(木→火→土→金→水)에 맞춘 개발·테스트용 값이다.
--   실데이터로 교체할 때 verified=true, source=<족보명/종친회 URL>로 갱신할 것.
-- 인물·파조는 공개 백과 자료로 확인된 것만 verified=true.
--   이귀(李貴)는 연안 이씨이므로 제외했다.

BEGIN;

-- 1. 본관 ------------------------------------------------------------------
INSERT INTO clans (id, surname_hangul, surname_hanja, bon_gwan_hangul, bon_gwan_hanja,
                   founder_name, origin_region, description) VALUES
  (1, '이', '李', '장수', '長水', NULL, '전북 장수',
   '양후공 이종무와 그의 형 정언공 이종화를 파조로 하는 두 대파로 나뉜다.'),
  (2, '조', '趙', '평양', '平壤', '조춘(趙椿)', '평양',
   '조선 개국 1등공신 조준을 배출했다.');

-- 2. 분파 ------------------------------------------------------------------
INSERT INTO branches (id, clan_id, parent_branch_id, branch_name, founder_name,
                      main_settlements, verified, source) VALUES
  (1, 1, NULL, '정언공파', '이종화(李從和)', '{}', true,
   '백과 자료: 장수 이씨는 정언공파(이종화)·양후공파(이종무)로 분파'),
  (2, 1, NULL, '양후공파', '이종무(李從茂)', '{}', true,
   '백과 자료: 이종무 시호 양후(襄厚)'),
  -- 평양 조씨 두 파는 요청 명세에 따른 것이며 존재·파조 미확인
  (3, 2, NULL, '절도공파', NULL, '{}', false, 'sample'),
  (4, 2, NULL, '참판공파', NULL, '{}', false, 'sample');

-- 집성촌: 미확인 샘플. 지역 일치 점수(10%) 테스트용
UPDATE branches SET main_settlements = '{전북 장수,경기 용인}'   WHERE id = 1;
UPDATE branches SET main_settlements = '{전북 장수,충남 공주}'   WHERE id = 2;
UPDATE branches SET main_settlements = '{경기 화성,부산}'        WHERE id = 3;
UPDATE branches SET main_settlements = '{전북 완주,경기 화성}'   WHERE id = 4;

-- 3. 항렬 (샘플, 20~28세) -------------------------------------------------
-- 장수 이씨 대동항렬
INSERT INTO hangryeol (clan_id, branch_id, generation_se, element_type, hanja, hangul,
                       position_type, verified, source) VALUES
  (1, NULL, 20, '木', '根', '근', 'LAST',  false, 'sample'),
  (1, NULL, 21, '火', '炳', '병', 'FIRST', false, 'sample'),
  (1, NULL, 22, '土', '在', '재', 'LAST',  false, 'sample'),
  (1, NULL, 23, '金', '鍾', '종', 'FIRST', false, 'sample'),
  (1, NULL, 24, '水', '洙', '수', 'LAST',  false, 'sample'),
  (1, NULL, 25, '木', '相', '상', 'FIRST', false, 'sample'),
  (1, NULL, 26, '火', '熙', '희', 'LAST',  false, 'sample'),
  (1, NULL, 27, '土', '圭', '규', 'FIRST', false, 'sample'),
  (1, NULL, 28, '金', '鉉', '현', 'LAST',  false, 'sample'),
  -- 양후공파 고유 항렬 (대동항렬 덮어쓰기 테스트)
  (1, 2,    26, '火', '燮', '섭', 'LAST',  false, 'sample');

-- 평양 조씨 대동항렬
INSERT INTO hangryeol (clan_id, branch_id, generation_se, element_type, hanja, hangul,
                       position_type, verified, source) VALUES
  (2, NULL, 20, '土', '均', '균', 'FIRST', false, 'sample'),
  (2, NULL, 21, '金', '錫', '석', 'LAST',  false, 'sample'),
  (2, NULL, 22, '水', '泳', '영', 'FIRST', false, 'sample'),
  (2, NULL, 23, '木', '植', '식', 'LAST',  false, 'sample'),
  (2, NULL, 24, '火', '煥', '환', 'FIRST', false, 'sample'),
  (2, NULL, 25, '土', '基', '기', 'LAST',  false, 'sample'),
  (2, NULL, 26, '金', '鎬', '호', 'FIRST', false, 'sample'),
  (2, NULL, 27, '水', '淳', '순', 'LAST',  false, 'sample'),
  (2, NULL, 28, '木', '東', '동', 'FIRST', false, 'sample'),
  -- 참판공파 고유 항렬
  (2, 4,    25, '土', '培', '배', 'LAST',  false, 'sample');

-- 4. 대표 인물 -------------------------------------------------------------
INSERT INTO historical_figures (clan_id, branch_id, name, name_hanja, title_achievement,
                                period, birth_year, death_year, verified, source) VALUES
  (1, 2, '이종무', '李從茂',
   '세종 대 대마도 정벌을 이끈 무신. 시호 양후(襄厚), 양후공파 파조.',
   '고려 말~조선 초', 1360, 1425, true, '백과 자료'),
  (2, NULL, '조준', '趙浚',
   '조선 개국 1등공신, 과전법 개혁 주도. 평양부원군.',
   '고려 말~조선 초', 1346, 1405, true, '백과 자료'),
  (2, NULL, '조인규', '趙仁規',
   '고려 후기 문신·역관. 조준의 증조부.',
   '고려 후기', 1237, 1308, true, '백과 자료');

-- 명시적 id를 넣었으므로 시퀀스 동기화
SELECT setval('clans_id_seq',    (SELECT max(id) FROM clans));
SELECT setval('branches_id_seq', (SELECT max(id) FROM branches));

COMMIT;
