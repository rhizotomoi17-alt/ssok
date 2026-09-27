'use client'

import { Loader2, Lock } from 'lucide-react'
import { useState } from 'react'
import { onlyHanja } from '@/lib/jokbo/hanja'
import { useJokbo, type PersonForm } from '@/lib/jokbo/store'
import type { MatchInput, MatchResult, PersonInput } from '@/lib/jokbo/types'
import { cn } from '@/lib/utils'
import { GhostButton, PrimaryButton, TextField, serif } from './ui'

const PROVINCES = ['서울', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '황해', '평안', '함경']

function toPerson(p: PersonForm): PersonInput | undefined {
  const hangul = p.hangul.replace(/[^가-힣]/g, '')
  if (!hangul) return undefined
  return {
    hangul,
    hanja: p.unknownHanja || p.nativeKorean ? undefined : onlyHanja(p.hanja) || undefined,
    nativeKorean: p.nativeKorean || undefined,
  }
}

export function HometownStep() {
  const state = useJokbo()
  const { hometown, setHometown, setStep, setResult } = state
  const [province, ...rest] = hometown.split(' ')
  const [city, setCity] = useState(PROVINCES.includes(province) ? rest.join(' ') : hometown)
  const [selectedProvince, setSelectedProvince] = useState(PROVINCES.includes(province) ? province : '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const compose = (p: string, c: string) => setHometown([p, c.trim()].filter(Boolean).join(' '))

  async function submit() {
    setLoading(true)
    setError(null)
    const body: MatchInput = {
      surname: state.surname,
      clanId: state.clanId ?? undefined,
      self: toPerson(state.self)!,
      father: toPerson(state.father),
      grandfather: toPerson(state.grandfather),
      hometown: hometown || undefined,
    }
    try {
      const res = await fetch('/api/genealogy/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? '추론에 실패했습니다.')
      setResult(json as MatchResult)
      setStep(3)
      window.scrollTo({ top: 0 })
    } catch (e) {
      setError(e instanceof Error ? e.message : '네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm text-[#8a7862]">3 / 3</p>
        <h2 className={cn(serif, 'mt-1 text-2xl font-bold')}>본가는 어디인가요?</h2>
        <p className="mt-1 text-sm text-[#6b5a47]">
          아버지나 할아버지의 고향을 알려주세요. 파마다 모여 살던 마을(집성촌)이 달라 파를 가르는 단서가 됩니다.
        </p>
      </header>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-[#5a4a3a]">시·도</span>
        <div className="flex flex-wrap gap-2">
          {PROVINCES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                const next = selectedProvince === p ? '' : p
                setSelectedProvince(next)
                compose(next, city)
              }}
              className={cn(
                'rounded-lg border px-3 py-2 text-sm transition',
                selectedProvince === p ? 'border-[#241c15] bg-[#241c15] text-[#f6f0e4]' : 'border-[#d9ccb4] bg-white/50',
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <TextField
        label="시·군 (선택)"
        placeholder="예: 공주, 장수군"
        value={city}
        onChange={(e) => {
          setCity(e.target.value)
          compose(selectedProvince, e.target.value)
        }}
        hint="모르면 비워 두세요. 이름 정보만으로도 추정합니다."
      />

      <p className="flex items-start gap-2 rounded-xl bg-[#ede4d3] p-3 text-xs text-[#5a4a3a]">
        <Lock className="mt-0.5 size-3.5 shrink-0" />
        입력한 이름과 고향은 서버에 저장되지 않으며, 이 탭을 닫으면 브라우저에서도 사라집니다.
      </p>

      {error && <p className="text-sm text-red-700" role="alert">{error}</p>}

      <div className="flex gap-3">
        <GhostButton onClick={() => setStep(1)} disabled={loading}>이전</GhostButton>
        <PrimaryButton onClick={submit} disabled={loading}>
          {loading ? <Loader2 className="mx-auto size-5 animate-spin" /> : '가문 찾기'}
        </PrimaryButton>
      </div>
    </div>
  )
}
