'use client'

import React from 'react'

const stages = [
  { label: '발산', key: 'diverge' },
  { label: '침묵', key: 'silent' },
  { label: '투표', key: 'vote' },
]

interface StageIndicatorProps {
  activeIndex: number
}

export default function StageIndicator({ activeIndex }: StageIndicatorProps) {
  return (
    <div className="flex items-center gap-0">
      {stages.map((stage, i) => {
        const isActive = i === activeIndex
        const isPast = i < activeIndex
        return (
          <React.Fragment key={stage.key}>
            <div
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all select-none ${
                isActive
                  ? 'text-white shadow-md'
                  : isPast
                  ? 'text-sage-gray border border-border bg-white'
                  : 'text-sage-gray border border-[#C8DBB8] bg-white'
              }`}
              style={
                isActive
                  ? { background: 'linear-gradient(135deg, #9DC183 0%, #7BA068 100%)' }
                  : undefined
              }
            >
              <span>{stage.label}</span>
              {isActive && (
                <span className="ml-2 inline-flex items-center gap-1 text-xs font-normal opacity-90">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
                  진행 중
                </span>
              )}
            </div>
            {i < stages.length - 1 && (
              <div className="flex items-center px-1">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path
                    d="M0 5H13M13 5L9 1M13 5L9 9"
                    stroke={i < activeIndex ? '#9DC183' : '#C8DBB8'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}