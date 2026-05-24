'use client'

import React from 'react'

interface CountdownTimerProps {
  seconds: number
  totalSeconds: number
}

export default function CountdownTimer({ seconds, totalSeconds }: CountdownTimerProps) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  const radius = 22
  const circumference = 2 * Math.PI * radius
  const progress = seconds / totalSeconds
  const dashoffset = circumference * (1 - progress)

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="#E6F0DC"
            strokeWidth="3"
          />
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="#9DC183"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <span className="relative text-xs font-bold text-olive-deep tabular-nums leading-none">
          {mm}:{ss}
        </span>
      </div>
    </div>
  )
}