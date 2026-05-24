'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import StageIndicator from '@/components/diverge/stage-indicator'
import CountdownTimer from '@/components/diverge/countdown-timer'

interface Note {
  id: string
  content: string
  color: string
  isOwn: boolean
}

function SilentPageInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const sessionName = decodeURIComponent(searchParams.get('sessionName') ?? '새 세션')
  const silentMinutes = Number(searchParams.get('silentTime') ?? 2)
  const silentTime = silentMinutes * 60

  const [seconds, setSeconds] = useState(silentTime)
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [memos, setMemos] = useState<Record<string, string>>({})
  const [freeMemo, setFreeMemo] = useState('')
  const secondsRef = useRef(silentTime)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const progress = 1 - seconds / silentTime
  const dashoffset = circumference * (1 - progress)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rhizo_notes')
      if (saved) {
        const parsed: Note[] = JSON.parse(saved)
        setNotes(parsed.filter((n) => n.content.trim() !== ''))
      }
    } catch (e) {
      console.error('불러오기 실패', e)
    }
  }, [])

  useEffect(() => {
    secondsRef.current = silentTime
    timerRef.current = setInterval(() => {
      secondsRef.current -= 1
      setSeconds(secondsRef.current)
      if (secondsRef.current <= 0) {
        if (timerRef.current) clearInterval(timerRef.current)
        saveMemos()
        const encodedName = encodeURIComponent(sessionName)
        router.push(`/vote?sessionName=${encodedName}`)
      }
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const saveMemos = () => {
    try {
      localStorage.setItem('rhizo_silent_memos', JSON.stringify({ memos, freeMemo }))
    } catch (e) {
      console.error('메모 저장 실패', e)
    }
  }

  const handleGoVote = () => {
    saveMemos()
    const encodedName = encodeURIComponent(sessionName)
    router.push(`/vote?sessionName=${encodedName}`)
  }

  const selectedNote = notes.find((n) => n.id === selectedNoteId)

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#F5F0E8' }}>

      {/* 상단 바 — 발산과 동일한 구조 */}
      <header
        className="flex-shrink-0 h-16 bg-white flex items-center px-6 gap-4"
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
          <StageIndicator activeIndex={1} />
          <CountdownTimer seconds={seconds} totalSeconds={silentTime} />
        </div>

        <div className="flex items-center gap-3 w-72 justify-end flex-shrink-0">
          <button
            onClick={handleGoVote}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #9DC183 0%, #7BA068 100%)' }}
          >
            투표로 넘어가기 →
          </button>
        </div>
      </header>

      {/* 가운데 타이머 */}
      <div className="flex-shrink-0 flex flex-col items-center py-5" style={{ borderBottom: '1px solid #E6EEE0' }}>
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r={radius} fill="none" stroke="#E6F0DC" strokeWidth="5" />
            <circle
              cx="48" cy="48" r={radius} fill="none" stroke="#9DC183" strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="text-center">
            <div className="text-xl font-bold text-olive-deep tabular-nums">{mm}:{ss}</div>
            <div className="text-xs text-sage-gray">침묵</div>
          </div>
        </div>
        <p className="text-xs text-sage-gray mt-2">조용히 아이디어를 읽고 생각을 정리해보세요</p>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[420px] flex-shrink-0 overflow-y-auto p-6" style={{ borderRight: '1px solid #E6EEE0' }}>
          <div className="text-xs font-semibold text-sage-gray mb-4 uppercase tracking-wider">
            모든 아이디어 ({notes.length})
          </div>
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNoteId(selectedNoteId === note.id ? null : note.id)}
                className="rounded-2xl p-4 cursor-pointer transition-all duration-150 select-none"
                style={{
                  background: note.color,
                  boxShadow: selectedNoteId === note.id
                    ? '0 0 0 2.5px #7BA068, 0 4px 12px rgba(125,160,104,0.15)'
                    : '0 2px 8px rgba(0,0,0,0.04)',
                  transform: selectedNoteId === note.id ? 'scale(1.01)' : 'scale(1)',
                }}
              >
                <p className="text-sm font-medium text-olive-deep leading-relaxed">{note.content}</p>
                {memos[note.id] && (
                  <div className="mt-2 pt-2 border-t border-black/10">
                    <p className="text-xs text-olive-deep opacity-70 line-clamp-2">💬 {memos[note.id]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          {selectedNote ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: selectedNote.color }} />
                <span className="text-sm font-semibold text-olive-deep">이 아이디어에 대한 생각</span>
                <button onClick={() => setSelectedNoteId(null)} className="ml-auto text-xs text-sage-gray hover:text-olive-deep">
                  전체 메모로 ↩
                </button>
              </div>
              <div className="rounded-2xl p-3 flex-shrink-0 mb-4 text-sm text-olive-deep" style={{ background: selectedNote.color }}>
                {selectedNote.content}
              </div>
              <textarea
                value={memos[selectedNote.id] ?? ''}
                onChange={(e) => setMemos((prev) => ({ ...prev, [selectedNote.id]: e.target.value }))}
                placeholder="이 아이디어에 대한 생각을 자유롭게 적어보세요..."
                className="flex-1 w-full resize-none rounded-2xl p-4 text-sm text-olive-deep focus:outline-none focus:ring-2 focus:ring-[#9DC183]"
                style={{ background: 'white', border: '1px solid #E6EEE0', lineHeight: '1.7' }}
              />
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-semibold text-olive-deep">자유 메모</span>
                <span className="text-xs text-sage-gray">— 왼쪽 아이디어 클릭 시 연결 메모로 전환</span>
              </div>
              <textarea
                value={freeMemo}
                onChange={(e) => setFreeMemo(e.target.value)}
                placeholder="자유롭게 생각을 적어보세요. 왼쪽 아이디어를 클릭하면 해당 아이디어에 연결된 메모를 남길 수 있어요."
                className="flex-1 w-full resize-none rounded-2xl p-4 text-sm text-olive-deep focus:outline-none focus:ring-2 focus:ring-[#9DC183]"
                style={{ background: 'white', border: '1px solid #E6EEE0', lineHeight: '1.7' }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SilentPage() {
  return (
    <Suspense>
      <SilentPageInner />
    </Suspense>
  )
}