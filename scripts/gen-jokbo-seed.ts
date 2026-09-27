// lib/jokbo/data.ts → supabase/seed.sql
// 실행: pnpm jokbo:seed

import { writeFileSync } from 'node:fs'
import { branches, clans, figures, hangryeol } from '../lib/jokbo/data'

const q = (v: unknown): string => {
  if (v === null || v === undefined) return 'NULL'
  if (typeof v === 'number' || typeof v === 'boolean') return String(v)
  if (Array.isArray(v)) return q(`{${v.map((s) => `"${String(s).replace(/"/g, '\\"')}"`).join(',')}}`)
  return `'${String(v).replace(/'/g, "''")}'`
}

const insert = (table: string, cols: string[], rows: unknown[][]) =>
  `INSERT INTO ${table} (${cols.join(', ')}) VALUES\n` +
  rows.map((r) => `  (${r.map(q).join(', ')})`).join(',\n') + ';\n'

const sql = [
  '-- 자동 생성 파일. 직접 수정하지 말고 lib/jokbo/data.ts를 고친 뒤 pnpm jokbo:seed 실행.',
  '-- verified=false 행은 샘플/미검증 데이터다.',
  '',
  'BEGIN;',
  '',
  insert('clans',
    ['id', 'surname_hangul', 'surname_hanja', 'bon_gwan_hangul', 'bon_gwan_hanja', 'founder_name', 'origin_region', 'description'],
    clans.map((c) => [c.id, c.surnameHangul, c.surnameHanja, c.bonGwanHangul, c.bonGwanHanja, c.founderName, c.originRegion, c.description])),
  insert('branches',
    ['id', 'clan_id', 'parent_branch_id', 'branch_name', 'founder_name', 'main_settlements', 'verified', 'source'],
    branches.map((b) => [b.id, b.clanId, b.parentBranchId, b.branchName, b.founderName, b.mainSettlements, b.verified, b.source])),
  insert('hangryeol',
    ['clan_id', 'branch_id', 'generation_se', 'element_type', 'hanja', 'hangul', 'position_type', 'verified', 'source'],
    hangryeol.map((h) => [h.clanId, h.branchId, h.generationSe, h.elementType, h.hanja, h.hangul, h.positionType, h.verified, h.source])),
  insert('historical_figures',
    ['id', 'clan_id', 'branch_id', 'name', 'name_hanja', 'category', 'title_achievement', 'period', 'birth_year', 'death_year', 'honor', 'basis', 'image_url', 'verified', 'source'],
    figures.map((f) => [f.id, f.clanId, f.branchId, f.name, f.nameHanja, f.category, f.titleAchievement, f.period, f.birthYear, f.deathYear, f.honor, f.basis, f.imageUrl, f.verified, f.source])),
  "SELECT setval('clans_id_seq', (SELECT max(id) FROM clans));",
  "SELECT setval('branches_id_seq', (SELECT max(id) FROM branches));",
  "SELECT setval('historical_figures_id_seq', (SELECT max(id) FROM historical_figures));",
  '',
  'COMMIT;',
  '',
].join('\n')

writeFileSync(new URL('../supabase/seed.sql', import.meta.url), sql)
console.log('supabase/seed.sql written')
