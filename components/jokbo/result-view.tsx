'use client'

import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, CircleDashed, MapPin, RotateCcw, XCircle } from 'lucide-react'
import { useJokbo } from '@/lib/jokbo/store'
import type { Candidate, Evidence, RegionEvidence } from '@/lib/jokbo/types'
import { cn } from '@/lib/utils'
import { ConfidenceGauge } from './confidence-gauge'
import { FigureCards } from './figure-cards'
import { candidateLabel, lineageLabel, sesonLabel } from './lineage'
import { ShareCard } from './share-card'
import { Badge, GhostButton, Seal, serif } from './ui'

const WHO: Record<Evidence['relation'], string> = { self: '본인', father: '아버지', grandfather: '할아버지' }

function evidenceText(e: Evidence): { icon: typeof CheckCircle2; tone: string; text: string } {
  const exp = e.expected
  const target = exp ? `${e.generationSe}세 항렬자 '${exp.hangul}(${exp.hanja})'` : `${e.generationSe}세 항렬 데이터`
  switch (e.kind) {
    case 'hanja': return { icon: CheckCircle2, tone: 'text-[#2f6b3a]', text: `${target}와 한자·위치 모두 일치` }
    case 'hangul': return { icon: CheckCircle2, tone: 'text-[#c27a12]', text: `${target}와 한글 일치 (한자 미확인)` }
    case 'position': return { icon: AlertCircle, tone: 'text-[#c27a12]', text: `${target}를 쓰지만 이름 속 위치가 다름` }
    case 'hanja_conflict': return { icon: XCircle, tone: 'text-[#b3261e]', text: `소리는 ${target}와 같지만 한자가 다름` }
    case 'skipped': return { icon: CircleDashed, tone: 'text-[#a3937c]', text: '입력 없음 또는 순우리말 이름 — 판단 제외' }
    default: return { icon: XCircle, tone: 'text-[#a3937c]', text: `${target}와 일치하지 않음` }
  }
}

function regionText(r: RegionEvidence): string | null {
  switch (r.kind) {
    case 'settlement': return `고향이 이 파의 집성촌(${r.matched})과 일치`
    case 'origin': return `고향이 본관 지역(${r.matched})과 일치`
    case 'none': return '고향이 알려진 집성촌과 일치하지 않음'
    default: return null
  }
}

function Section({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="space-y-3"
    >
      <h3 className={cn(serif, 'text-lg font-bold')}>{title}</h3>
      {children}
    </motion.section>
  )
}

function OtherCandidate({ c }: { c: Candidate }) {
  return (
    <li className="flex items-center justify-between rounded-xl border border-[#e3d8c4] bg-white/50 px-4 py-3 text-sm">
      <span>
        {c.clan.bonGwanHangul} {c.clan.surnameHangul}씨 <span className="text-[#6b5a47]">{candidateLabel(c)}</span>
      </span>
      <span className="font-semibold tabular-nums">{c.confidence}</span>
    </li>
  )
}

export function ResultView() {
  const { result, reset } = useJokbo()
  if (!result) return null
  const [top, ...others] = result.candidates

  if (!top) {
    return (
      <div className="space-y-5 py-10 text-center">
        <p className={cn(serif, 'text-xl font-bold')}>아직 이 가문의 데이터가 없어요</p>
        {result.warnings.map((w) => <p key={w} className="text-sm text-[#6b5a47]">{w}</p>)}
        <GhostButton onClick={reset} className="mx-auto">처음부터</GhostButton>
      </div>
    )
  }

  if (!result.clanKnown && !top.conclusive) {
    return (
      <div className="space-y-8">
        <header className="space-y-3 pt-2 text-center">
          <Seal className="size-14 text-3xl font-black">?</Seal>
          <p className={cn(serif, 'text-2xl font-black')}>본관을 특정하지 못했어요</p>
          <p className="text-sm leading-relaxed text-[#6b5a47]">
            {top.clan.surnameHangul}씨는 본관이 여러 개이고, 입력한 이름만으로는 어느 가문인지 가를 근거가 부족합니다.
            우연히 한 글자가 겹친 결과를 가문으로 단정하지 않기 위해 결론을 보류했어요.
          </p>
        </header>
        {result.warnings.map((w) => (
          <p key={w} className="flex gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
            <AlertCircle className="mt-0.5 size-3.5 shrink-0" /> {w}
          </p>
        ))}
        <Section title="약한 후보">
          <ul className="space-y-2">{result.candidates.map((c) => <OtherCandidate key={`${c.clan.id}-${c.branch?.id}`} c={c} />)}</ul>
        </Section>
        <GhostButton onClick={reset} className="flex w-full items-center justify-center gap-2">
          <RotateCcw className="size-4" /> 정보 추가해서 다시 찾기
        </GhostButton>
      </div>
    )
  }

  const seson = sesonLabel(top)
  const region = regionText(top.region)

  return (
    <div className="space-y-10">
      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-2 text-center">
        <Seal className="size-14 text-3xl font-black">{top.clan.surnameHanja}</Seal>
        <div>
          <p className={cn(serif, 'text-4xl font-black tracking-tight')}>
            {top.clan.bonGwanHangul} {top.clan.surnameHangul}씨
          </p>
          <p className={cn(serif, 'text-sm text-[#8a7862]')}>{top.clan.bonGwanHanja}{top.clan.surnameHanja}氏</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-[#241c15] px-4 py-1.5 text-sm font-semibold text-[#f6f0e4]">
            {lineageLabel(top)}{seson && <span className="ml-1 font-normal opacity-70">({seson})</span>}
          </span>
          {!top.dataVerified && top.conclusive && <Badge tone="warn">샘플 데이터</Badge>}
        </div>
        {top.hasHangryeolData ? (
          <ConfidenceGauge value={top.confidence} sample={top.conclusive && !top.dataVerified} />
        ) : (
          <p className="text-xs text-[#8a7862]">이 본관은 항렬 데이터를 준비 중이라 파·세대 추정을 건너뛰었어요.</p>
        )}
      </motion.header>

      {result.warnings.length > 0 && (
        <ul className="space-y-2">
          {result.warnings.map((w) => (
            <li key={w} className="flex gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
              <AlertCircle className="mt-0.5 size-3.5 shrink-0" /> {w}
            </li>
          ))}
        </ul>
      )}

      {top.hasHangryeolData && <Section title="이렇게 추정했어요" delay={0.2}>
        <ul className="space-y-2 rounded-2xl border border-[#e3d8c4] bg-white/60 p-4">
          {top.evidence.length === 0 && (
            <li className="text-sm text-[#6b5a47]">이름에서 이 가문의 항렬자를 찾지 못했습니다.</li>
          )}
          {top.evidence.map((e) => {
            const { icon: Icon, tone, text } = evidenceText(e)
            return (
              <li key={e.relation} className="flex gap-2 text-sm">
                <Icon className={cn('mt-0.5 size-4 shrink-0', tone)} />
                <span><b>{WHO[e.relation]}</b> · {text}</span>
              </li>
            )
          })}
          {region && (
            <li className="flex gap-2 text-sm">
              <MapPin className={cn('mt-0.5 size-4 shrink-0', top.region.score > 0 ? 'text-[#2f6b3a]' : 'text-[#a3937c]')} />
              <span><b>고향</b> · {region}</span>
            </li>
          )}
          {top.consecutiveBonus && (
            <li className="rounded-lg bg-emerald-50 p-2 text-xs font-medium text-emerald-900">
              3대 연속 항렬 일치 +20점
            </li>
          )}
        </ul>
      </Section>}

      <Section title="가문 이야기" delay={0.3}>
        <div className="space-y-2 rounded-2xl border border-[#e3d8c4] bg-white/60 p-4 text-sm leading-relaxed">
          {top.clan.founderName && <p><b>시조</b> {top.clan.founderName}</p>}
          <p><b>본관</b> {top.clan.bonGwanHangul}({top.clan.bonGwanHanja}) — 현재 {top.clan.originRegion} 일대</p>
          {top.branch && top.conclusive && (
            <p>
              <b>{top.branch.branchName}</b>
              {top.branch.founderName && ` — 파조 ${top.branch.founderName}`}
              {!top.branch.verified && <span className="ml-1"><Badge tone="warn">미검증</Badge></span>}
            </p>
          )}
          {top.clan.description && <p className="text-[#3d3228]">{top.clan.description}</p>}
        </div>
      </Section>

      <Section title="같은 가문의 인물들" delay={0.4}>
        <FigureCards figures={result.figures} />
      </Section>

      {others.length > 0 && (
        <Section title="다른 후보" delay={0.5}>
          <ul className="space-y-2">{others.map((c) => <OtherCandidate key={`${c.clan.id}-${c.branch?.id}`} c={c} />)}</ul>
        </Section>
      )}

      <Section title="결과 카드 공유" delay={0.6}>
        <ShareCard top={top} figures={result.figures} />
      </Section>

      <GhostButton onClick={reset} className="flex w-full items-center justify-center gap-2">
        <RotateCcw className="size-4" /> 다시 찾기
      </GhostButton>
    </div>
  )
}
