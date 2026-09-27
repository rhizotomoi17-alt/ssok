'use client'

import { AlertTriangle, Award, BookOpen, Flag } from 'lucide-react'
import { useState } from 'react'
import type { FigureCategory, FigureWithRelation } from '@/lib/jokbo/types'
import { cn } from '@/lib/utils'
import { Badge, serif } from './ui'

const CATEGORY: Record<FigureCategory, { label: string; icon: typeof Flag; accent: string }> = {
  historical: { label: '역사 인물', icon: BookOpen, accent: 'border-t-[#5a4a3a]' },
  independence: { label: '독립운동가', icon: Flag, accent: 'border-t-[#2f6b3a]' },
  collaborator: { label: '친일반민족행위자', icon: AlertTriangle, accent: 'border-t-[#b3261e]' },
}

const years = (f: FigureWithRelation) =>
  f.birthYear || f.deathYear ? `${f.birthYear ?? '?'}–${f.deathYear ?? '?'}` : f.period

function FigureCard({ f }: { f: FigureWithRelation }) {
  const meta = CATEGORY[f.category]
  const Icon = meta.icon
  return (
    <article
      className={cn(
        'flex w-[82%] shrink-0 snap-center flex-col rounded-2xl border border-t-4 border-[#e3d8c4] bg-white p-5 shadow-sm sm:w-72',
        meta.accent,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#6b5a47]">
          <Icon className="size-3.5" /> {meta.label}
        </span>
        {f.relation === 'same_branch' ? <Badge tone="good">같은 파</Badge> : <Badge>같은 본관</Badge>}
      </div>
      <div className="mt-4 flex items-end gap-2">
        <h4 className="text-xl font-bold">{f.name}</h4>
        {f.nameHanja && <span className={cn(serif, 'pb-0.5 text-sm text-[#8a7862]')}>{f.nameHanja}</span>}
      </div>
      <p className="text-xs text-[#8a7862]">{years(f)}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#3d3228]">{f.titleAchievement}</p>
      {f.honor && (
        <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[#2f6b3a]">
          <Award className="size-3.5" /> {f.honor}
        </p>
      )}
      {f.basis && <p className="mt-3 rounded-lg bg-[#f6f0e4] p-2 text-[11px] text-[#5a4a3a]">근거: {f.basis}</p>}
      {!f.verified && <p className="mt-2"><Badge tone="warn">본관 검증 필요</Badge></p>}
    </article>
  )
}

export function FigureCards({ figures }: { figures: FigureWithRelation[] }) {
  const available = (Object.keys(CATEGORY) as FigureCategory[]).filter((c) => figures.some((f) => f.category === c))
  const [tab, setTab] = useState<FigureCategory | 'all'>('all')
  const shown = tab === 'all' ? figures : figures.filter((f) => f.category === tab)

  if (figures.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-[#d9ccb4] p-5 text-center text-sm text-[#8a7862]">
        이 본관의 인물 데이터를 아직 모으는 중입니다.
      </p>
    )
  }

  return (
    <div>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3">
        {(['all', ...available] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setTab(c)}
            className={cn(
              'shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium',
              tab === c ? 'border-[#241c15] bg-[#241c15] text-[#f6f0e4]' : 'border-[#d9ccb4]',
            )}
          >
            {c === 'all' ? `전체 ${figures.length}` : `${CATEGORY[c].label} ${figures.filter((f) => f.category === c).length}`}
          </button>
        ))}
      </div>
      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
        {shown.map((f) => <FigureCard key={f.id} f={f} />)}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-[#8a7862]">
        같은 본관이라는 사실이 직계 조상·후손 관계를 뜻하지는 않습니다. 한 본관에는 수십만 명이 속하며,
        친일반민족행위자 분류는 대통령 소속 친일반민족행위진상규명위원회의 공식 결정만 반영합니다.
      </p>
    </div>
  )
}
