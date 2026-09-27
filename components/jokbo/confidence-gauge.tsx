'use client'

import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

// 반원 게이지. 점수 구간 색: <40 낮음, <70 보통, 이상 높음
export function ConfidenceGauge({ value, sample = false }: { value: number; sample?: boolean }) {
  const progress = useMotionValue(0)
  const [display, setDisplay] = useState(0)
  const dash = useTransform(progress, (v) => `${(v / 100) * 251.3} 251.3`)

  useEffect(() => {
    const controls = animate(progress, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1] })
    const unsub = progress.on('change', (v) => setDisplay(Math.round(v)))
    return () => {
      controls.stop()
      unsub()
    }
  }, [value, progress])

  const color = value < 40 ? '#b3261e' : value < 70 ? '#c27a12' : '#2f6b3a'
  const label = value < 40 ? '낮음' : value < 70 ? '보통' : '높음'

  return (
    <div className="relative mx-auto w-56" role="img" aria-label={`신뢰도 ${value}점, ${label}`}>
      <svg viewBox="0 0 200 110" className="w-full">
        <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="#e3d8c4" strokeWidth="14" strokeLinecap="round" />
        <motion.path
          d="M20 100 A80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          style={{ strokeDasharray: dash }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <div className="text-4xl font-bold tabular-nums" style={{ color }}>{display}</div>
        <div className="text-xs text-[#8a7862]">신뢰도 · {label}{sample && ' (샘플 기준)'}</div>
      </div>
    </div>
  )
}
