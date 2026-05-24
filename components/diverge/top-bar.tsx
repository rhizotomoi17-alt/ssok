'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import StageIndicator from './stage-indicator'
import CountdownTimer from './countdown-timer'

interface TopBarProps {
  seconds: number
  totalSeconds: number
  isRevealed: boolean
  activeIndex: number
  onComplete: () => void
  sessionName: string
}

export default function TopBar({
  seconds,
  totalSeconds,
  isRevealed,
  activeIndex,
  onComplete,
  sessionName,
}: TopBarProps) {
  const [anonymous, setAnonymous] = useState(true)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 h-16 bg-white flex items-center px-6 gap-4"
      style={{ boxShadow: '0 2px 12px rgba(157,193,131,0.15)' }}
    >
      <div className="flex items-center gap-3 min-w-0 w-72 flex-shrink-0">
        <Link href="/" className="flex items-center gap-3 min-w-0 group">
          <div className="w-7 h-7 rounded-full bg-[#9DC183] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 group-hover:bg-[#7BA068] transition-colors">
            R
          </div>
          <div className="min-w-0">
            <p className="text-xs text-sage-gray leading-none mb-0.5 group-hover:text-[#7BA068] transition-colors">
              대시보드로 돌아가기
            </p>
            <p className="text-sm font-semibold text-olive-deep truncate leading-none">
              {sessionName}
            </p>
          </div>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center gap-6">
        <StageIndicator activeIndex={activeIndex} />
        <CountdownTimer seconds={seconds} totalSeconds={totalSeconds} />
      </div>

      <div className="flex items-center gap-3 w-72 justify-end flex-shrink-0">
        <button
          onClick={() => setAnonymous(!anonymous)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            anonymous
              ? 'bg-[#C8DBB8] border-[#9DC183] text-[#3A5C2E]'
              : 'bg-white border-border text-sage-gray'
          }`}
        >
          <span className={`w-2 h-2 rounded-full transition-colors ${anonymous ? 'bg-[#7BA068]' : 'bg-[#C8DBB8]'}`} />
          익명 모드
        </button>

        <button className="px-3 py-1.5 rounded-full text-xs font-medium border border-[#C8DBB8] text-sage-gray hover:bg-[#F3F8EF] transition-colors">
          시간 연장
        </button>

        <div className="flex items-center -space-x-1.5">
          {['#C8DBB8', '#B8D0A8', '#A8C498', '#D4E0C4', '#9DC183'].map((color, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center"
              style={{ background: color }}
            >
              <span className="text-[9px] font-bold text-white select-none">●</span>
            </div>
          ))}
          <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center bg-[#E6F0DC]">
            <span className="text-[9px] font-medium text-sage-gray">+3</span>
          </div>
        </div>
      </div>
    </header>
  )
}