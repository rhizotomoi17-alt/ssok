# 족보Lab DB

- `migrations/20260927000000_init_genealogy.sql` — 스키마 + `effective_hangryeol` 뷰
- `seed.sql` — 장수 이씨·평양 조씨 시드

## 적용

Supabase CLI: `supabase db reset` (마이그레이션 + seed 자동 실행)

일반 PostgreSQL 15+:

```sh
psql "$DATABASE_URL" -f supabase/migrations/20260927000000_init_genealogy.sql
psql "$DATABASE_URL" -f supabase/seed.sql
```

## 규칙

- `generation_se`는 세(世) 기준(시조 = 1세). 세손 = 세 − 1.
- `hangryeol.branch_id IS NULL` = 대동항렬, 값이 있으면 파 고유 항렬(우선 적용).
- `verified = false` 행은 샘플. 현재 시드의 항렬자·집성촌은 전부 미검증이다.
