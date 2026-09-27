-- 한국 성씨·본관·항렬 스키마 (PostgreSQL)
--
-- 세대 표기 규칙: generation_se = 세(世). 시조 = 1세.
--   세손(世孫)은 시조를 0으로 세므로 "26세손 = 27세". 족보마다 기준이 달라
--   입력 시 반드시 세(世)로 변환해 저장한다.

-- 1. 본관
CREATE TABLE clans (
    id               SERIAL PRIMARY KEY,
    surname_hangul   VARCHAR(10) NOT NULL,  -- 예: 이, 남궁
    surname_hanja    VARCHAR(10) NOT NULL,  -- 예: 李
    bon_gwan_hangul  VARCHAR(20) NOT NULL,  -- 예: 장수
    bon_gwan_hanja   VARCHAR(20) NOT NULL,  -- 예: 長水
    founder_name     VARCHAR(50),           -- 시조
    origin_region    VARCHAR(50),           -- 시조 발생지/본거지
    description      TEXT,
    -- 같은 한글 본관이라도 한자가 다른 별개 성씨가 있으므로 한자 기준으로 유일
    UNIQUE (surname_hanja, bon_gwan_hanja)
);

-- 2. 분파 (자기 참조 트리)
CREATE TABLE branches (
    id                SERIAL PRIMARY KEY,
    clan_id           INT NOT NULL REFERENCES clans(id) ON DELETE CASCADE,
    parent_branch_id  INT,                  -- 상위 대파 (NULL = 최상위 파)
    branch_name       VARCHAR(50) NOT NULL, -- 예: 양후공파
    founder_name      VARCHAR(50),          -- 파조
    founder_generation_se INT CHECK (founder_generation_se > 0), -- 파조의 세
    main_settlements  TEXT[],               -- 주요 집성촌
    UNIQUE (clan_id, branch_name),
    UNIQUE (clan_id, id),                   -- 아래 복합 FK 대상
    -- 상위 파는 반드시 같은 본관 소속
    FOREIGN KEY (clan_id, parent_branch_id)
        REFERENCES branches (clan_id, id) ON DELETE CASCADE,
    CHECK (parent_branch_id IS NULL OR parent_branch_id <> id)
);

-- 3. 세대별 항렬자
--    branch_id NULL  = 본관 전체 공통(대동항렬)
--    branch_id 지정  = 해당 파 고유 항렬 (대동항렬보다 우선)
CREATE TABLE hangryeol (
    id              SERIAL PRIMARY KEY,
    clan_id         INT NOT NULL REFERENCES clans(id) ON DELETE CASCADE,
    branch_id       INT,
    generation_se   INT NOT NULL CHECK (generation_se > 0),
    element_type    CHAR(1) CHECK (element_type IN ('木', '火', '土', '金', '水')),
    hanja           VARCHAR(10) NOT NULL,   -- 예: 相
    hangul          VARCHAR(10) NOT NULL,   -- 예: 상
    position_type   VARCHAR(5) NOT NULL DEFAULT 'ANY'
                    CHECK (position_type IN ('FIRST', 'LAST', 'ANY')),
    FOREIGN KEY (clan_id, branch_id)
        REFERENCES branches (clan_id, id) ON DELETE CASCADE
);

-- 같은 범위·세대에 항렬자 하나 (NULL branch도 중복 방지)
CREATE UNIQUE INDEX uq_hangryeol_clanwide
    ON hangryeol (clan_id, generation_se) WHERE branch_id IS NULL;
CREATE UNIQUE INDEX uq_hangryeol_branch
    ON hangryeol (branch_id, generation_se) WHERE branch_id IS NOT NULL;

-- 4. 역사적 대표 인물
CREATE TABLE historical_figures (
    id                 SERIAL PRIMARY KEY,
    clan_id            INT NOT NULL REFERENCES clans(id) ON DELETE CASCADE,
    branch_id          INT,
    name               VARCHAR(50) NOT NULL,
    name_hanja         VARCHAR(50),
    generation_se      INT CHECK (generation_se > 0),
    title_achievement  TEXT NOT NULL,       -- 주요 업적
    period             VARCHAR(50),         -- 시대 표기 (예: 조선 중기)
    birth_year         SMALLINT,            -- 정렬·필터용 (음수 = 기원전)
    death_year         SMALLINT,
    image_url          TEXT,
    FOREIGN KEY (clan_id, branch_id)
        REFERENCES branches (clan_id, id) ON DELETE SET NULL (branch_id),
    CHECK (death_year IS NULL OR birth_year IS NULL OR death_year >= birth_year)
);

-- 인덱스
-- 이름 글자 → 본관/세대 추론: 한글만 아는 경우가 많아 hangul 선두
CREATE INDEX idx_hangryeol_lookup  ON hangryeol (hangul, hanja, generation_se);
CREATE INDEX idx_clans_search      ON clans (surname_hangul, bon_gwan_hangul);
-- PostgreSQL은 FK에 인덱스를 자동 생성하지 않음
CREATE INDEX idx_branches_parent   ON branches (parent_branch_id);
CREATE INDEX idx_hangryeol_branch  ON hangryeol (branch_id);
CREATE INDEX idx_figures_clan      ON historical_figures (clan_id, branch_id);
