'use client'

import { Check, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { clans } from '@/lib/jokbo/data'
import { normalizeSurname } from '@/lib/jokbo/match'
import { useJokbo } from '@/lib/jokbo/store'
import { cn } from '@/lib/utils'
import { PrimaryButton, serif } from './ui'

export function ClanStep() {
  const { surname, clanId, setClan, setStep } = useJokbo()
  const selected = clans.find((c) => c.id === clanId)
  const [query, setQuery] = useState(
    selected ? `${selected.bonGwanHangul} ${selected.surnameHangul}` : surname,
  )

  const q = query.trim()
  const tokens = q.split(/\s+/).filter(Boolean).map((t) => normalizeSurname(t.replace(/씨$/, '')))
  const results = useMemo(() => {
    if (tokens.length === 0) return clans
    return clans.filter((c) => tokens.every((t) =>
      c.surnameHangul === t || c.bonGwanHangul.startsWith(t) || c.surnameHanja === t || c.bonGwanHanja.startsWith(t)))
  }, [tokens.join(' ')]) // eslint-disable-line react-hooks/exhaustive-deps

  // "김" 한 글자처럼 성만 입력했으면 "본관 모름" 선택지 제공
  const surnameOnly = tokens.length === 1 && /^[가-힣]{1,2}$/.test(tokens[0]) ? tokens[0] : null
  const unknownSelected = clanId === null && surname !== '' && surname === surnameOnly

  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm text-[#8a7862]">1 / 3</p>
        <h2 className={cn(serif, 'mt-1 text-2xl font-bold')}>어느 가문이신가요?</h2>
        <p className="mt-1 text-sm text-[#6b5a47]">성이나 본관으로 검색하세요. 예: 이, 장수 이, 평양 조</p>
      </header>

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#a3937c]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="성 또는 본관"
          aria-label="성 또는 본관 검색"
          className="h-12 w-full rounded-xl border border-[#d9ccb4] bg-white/70 pl-11 pr-4 text-base outline-none focus:border-[#241c15]"
        />
      </div>

      <ul className="max-h-[46vh] space-y-2 overflow-y-auto pb-1" role="listbox">
        {results.map((c) => {
          const active = c.id === clanId
          return (
            <li key={c.id}>
              <button
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => setClan(c.surnameHangul, c.id)}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition',
                  active ? 'border-[#241c15] bg-white' : 'border-[#e3d8c4] bg-white/50',
                )}
              >
                <span>
                  <span className="font-semibold">{c.bonGwanHangul} {c.surnameHangul}씨</span>
                  <span className={cn(serif, 'ml-2 text-sm text-[#8a7862]')}>{c.bonGwanHanja}{c.surnameHanja}</span>
                  <span className="block text-xs text-[#8a7862]">{c.originRegion}</span>
                </span>
                {active && <Check className="size-5" />}
              </button>
            </li>
          )
        })}
        {surnameOnly && (
          <li>
            <button
              type="button"
              onClick={() => setClan(surnameOnly, null)}
              className={cn(
                'w-full rounded-xl border border-dashed px-4 py-3 text-left text-sm transition',
                unknownSelected ? 'border-[#241c15] bg-white' : 'border-[#cbbda3]',
              )}
            >
              본관을 몰라요 — <b>{surnameOnly}씨</b> 전체에서 찾기
            </button>
          </li>
        )}
        {results.length === 0 && !surnameOnly && (
          <li className="py-6 text-center text-sm text-[#8a7862]">검색 결과가 없습니다.</li>
        )}
      </ul>

      <PrimaryButton disabled={!surname} onClick={() => setStep(1)}>다음</PrimaryButton>
    </div>
  )
}
