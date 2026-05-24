'use client'

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import TopBar from '@/components/diverge/top-bar'
import Canvas from '@/components/diverge/canvas'
import RightPanel from '@/components/diverge/right-panel'
import BottomBar from '@/components/diverge/bottom-bar'

function DivergeScreenInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const sessionName = decodeURIComponent(searchParams.get('sessionName') ?? '새 세션')
  const divergeTime = Number(searchParams.get('divergeTime') ?? 1) * 60
  const silentTime = Number(searchParams.get('voteTime') ?? 1) * 60
  const discussTime = searchParams.get('discussTime') ?? '30'
  const convergeTime = searchParams.get('convergeTime') ?? '15'

  const [seconds, setSeconds] = useState(divergeTime)
  const [isRevealed, setIsRevealed] = useState(false)
  const phaseRef = useRef<'diverge' | 'done'>('diverge')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const secondsRef = useRef(divergeTime)

  const progress = isRevealed ? 1 : 1 - seconds / divergeTime

  const goSilent = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    phaseRef.current = 'done'
    setIsRevealed(true)
  }, [])

  const handleReveal = useCallback(() => {
    if (phaseRef.current === 'diverge') {
      goSilent()
    }
  }, [goSilent])

  const handleGoSilent = useCallback(() => {
    const encodedName = encodeURIComponent(sessionName)
    router.push(
      `/silent?sessionName=${encodedName}&silentTime=${silentTime / 60}&discussTime=${discussTime}&convergeTime=${convergeTime}`
    )
  }, [sessionName, silentTime, discussTime, convergeTime, router])

  useEffect(() => {
    secondsRef.current = divergeTime
    setSeconds(divergeTime)

    timerRef.current = setInterval(() => {
      secondsRef.current -= 1
      setSeconds(secondsRef.current)
      if (secondsRef.current <= 0) {
        if (phaseRef.current === 'diverge') {
          goSilent()
        }
      }
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#EAF3E2]">
      <TopBar
        seconds={seconds}
        totalSeconds={divergeTime}
        isRevealed={isRevealed}
        activeIndex={0}
        onComplete={handleReveal}
        sessionName={sessionName}
      />
      <div className="flex flex-1 overflow-hidden pt-16 pb-12">
        <Canvas isRevealed={isRevealed} />
        <RightPanel />
      </div>
      <BottomBar
        progress={progress}
        isRevealed={isRevealed}
        onComplete={handleReveal}
        onGoSilent={handleGoSilent}
      />
    </div>
  )
}

export default function DivergeScreen() {
  return (
    <Suspense>
      <DivergeScreenInner />
    </Suspense>
  )
}