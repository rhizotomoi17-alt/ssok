'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import StageIndicator from '@/components/diverge/stage-indicator'

interface Note {
  id: string
  content: string
  color: string
  isOwn: boolean
}

export default function VotePage() {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [voted, setVoted] = useState<Set<string>>(new Set())
  const [sessionName, setSessionName] = useState('새 세션')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rhizo_notes')
      if (saved) {
        const parsed: Note[] = JSON.parse(saved)
        setNotes(parsed.filter((n) => n.content.trim() !== ''))
      }
      const name = localStorage.getItem('ssok_session_name')
      if (name) setSessionName(name)
    } catch (e) {
      console.error('불러오기 실패', e)
    }
  }, [])

  const toggleVote = (id: string) => {
    setVoted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleComplete = () => {
    try {
      const votedNotes = notes.filter((n) => voted.has(n.id))
      localStorage.setItem('rhizo_voted_notes', JSON.stringify(votedNotes))
    } catch (e) {
      console.error('투표 저장 실패', e)
    }
    router.push('/')
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #F4F8EE 0%, #FBF8F0 100%)' }}
    >
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
          <StageIndicator activeIndex={2} />
        </div>

        <div className="flex items-center gap-3 w-72 justify-end flex-shrink-0">
          <span className="text-sm text-sage-gray">{voted.size}개 선택됨</span>
          <button
            onClick={handleComplete}
            className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #9DC183 0%, #7BA068 100%)' }}
          >
            투표 완료
          </button>
        </div>
      </header>

      <main className="pt-24 pb-20 px-12 flex-1">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-olive-deep mb-2">
            어떤 아이디어를 더 깊이 논의하고 싶나요?
          </h1>
          <p className="text-sm text-sage-gray">
            투표는 익명이며, 결과는 투표 완료 후 공개됩니다. 제한 없이 투표할 수 있어요.
          </p>
        </div>

        {notes.length === 0 ? (
          <div className="text-center text-sage-gray mt-20">
            <p className="text-lg font-medium mb-2">아직 아이디어가 없어요</p>
            <p className="text-sm">발산 단계에서 포스트잇을 작성해주세요</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-5">
            {notes.map((note) => {
              const isVoted = voted.has(note.id)
              return (
                <div
                  key={note.id}
                  onClick={() => toggleVote(note.id)}
                  className="relative rounded-2xl p-5 cursor-pointer transition-all duration-200 select-none"
                  style={{
                    background: note.color,
                    minHeight: '140px',
                    boxShadow: isVoted
                      ? '0 0 0 3px #7BA068, 0 8px 24px rgba(125,160,104,0.2)'
                      : '0 4px 16px rgba(0,0,0,0.06)',
                    transform: isVoted ? 'scale(1.03)' : 'scale(1)',
                  }}
                >
                  <p className="text-sm font-medium text-olive-deep leading-relaxed">
                    {note.content}
                  </p>
                  {isVoted && (
                    <div
                      className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: '#7BA068' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6L5 9L10 3"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>

      <div
        className="fixed bottom-0 left-0 right-0 h-12 bg-white flex items-center px-8 justify-between"
        style={{ borderTop: '1px solid #E6EEE0' }}
      >
        <span className="text-xs text-sage-gray">
          투표 결과는 모든 참여자가 완료 후 공개됩니다
        </span>
        <span className="text-xs font-semibold text-sage-dark">
          {voted.size}개 선택
        </span>
      </div>
    </div>
  )
}