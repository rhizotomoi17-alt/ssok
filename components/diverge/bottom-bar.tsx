'use client'

import React from 'react'

interface BottomBarProps {
  progress: number
  isRevealed: boolean
  onComplete: () => void
  onGoSilent: () => void
}

export default function BottomBar({ progress, isRevealed, onComplete, onGoSilent }: BottomBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-20 h-12 bg-white flex items-center px-6 gap-5"
      style={{ borderTop: '1px solid #E6EEE0' }}
    >
      <span className="text-xs text-sage-gray whitespace-nowrap">
        {isRevealed ? '아이디어가 공개됐어요' : '발산 단계 진행률'}
      </span>

      <div className="flex-1 h-1.5 bg-[#E6F0DC] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.round(progress * 100)}%`,
            background: 'linear-gradient(to right, #9DC183, #7BA068)',
          }}
        />
      </div>

      <span className="text-xs text-sage-gray whitespace-nowrap">
        {Math.round(progress * 100)}%
      </span>

      {!isRevealed ? (
        <button
          onClick={onComplete}
          className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #9DC183 0%, #7BA068 100%)' }}
        >
          발산 완료
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-xs text-sage-gray whitespace-nowrap">
            — 침묵 시간이 시작됩니다
          </span>
          <button
            onClick={onGoSilent}
            className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 animate-pulse"
            style={{ background: 'linear-gradient(135deg, #9DC183 0%, #7BA068 100%)' }}
          >
            침묵 메모하기 →
          </button>
        </div>
      )}
    </div>
  )
}