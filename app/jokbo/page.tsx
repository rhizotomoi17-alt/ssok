'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ClanStep } from '@/components/jokbo/clan-step'
import { HometownStep } from '@/components/jokbo/hometown-step'
import { NamesStep } from '@/components/jokbo/names-step'
import { ResultView } from '@/components/jokbo/result-view'
import { serif } from '@/components/jokbo/ui'
import { useJokbo } from '@/lib/jokbo/store'
import { cn } from '@/lib/utils'

const STEPS = [ClanStep, NamesStep, HometownStep, ResultView]

export default function JokboPage() {
  const step = useJokbo((s) => s.step)
  const reset = useJokbo((s) => s.reset)
  // sessionStorage 복원 전 서버 HTML과 불일치하지 않도록 마운트 후 렌더
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const Current = STEPS[step]

  return (
    <main className="mx-auto w-full max-w-md px-4 pb-16 pt-6">
      <nav className="mb-6 flex items-center justify-between">
        <button type="button" onClick={reset} className={cn(serif, 'text-lg font-black tracking-tight')}>
          族譜<span className="text-[#b3261e]">Lab</span>
        </button>
        {mounted && step < 3 && (
          <div className="flex gap-1.5" aria-label={`${step + 1}단계 / 3단계`}>
            {[0, 1, 2].map((i) => (
              <span key={i} className={cn('h-1.5 w-6 rounded-full', i <= step ? 'bg-[#241c15]' : 'bg-[#d9ccb4]')} />
            ))}
          </div>
        )}
      </nav>

      {mounted && step === 0 && (
        <section className="mb-8">
          <h1 className={cn(serif, 'text-[28px] font-black leading-snug')}>
            내 이름 한 글자에<br />가문의 이야기가 있다
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#6b5a47]">
            이름의 돌림자(항렬자)와 본가 지역으로 나의 본관·파·세대를 추정하고,
            같은 가문의 역사 인물과 독립운동가, 그리고 불편하지만 알아야 할 이름까지 보여드립니다.
          </p>
        </section>
      )}

      {mounted && (
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <Current />
          </motion.div>
        </AnimatePresence>
      )}
    </main>
  )
}
