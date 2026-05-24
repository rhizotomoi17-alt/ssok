'use client'

import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/sidebar'
import ActionCards from '@/components/action-cards'
import RecentActivity from '@/components/recent-activity'

export default function Dashboard() {
  const [userName, setUserName] = useState('')
  const [showNameModal, setShowNameModal] = useState(false)
  const [inputName, setInputName] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('ssok_username')
    if (saved) {
      setUserName(saved)
    } else {
      setShowNameModal(true)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault()
        localStorage.removeItem('ssok_username')
        setUserName('')
        setInputName('')
        setShowNameModal(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSaveName = () => {
    if (!inputName.trim()) return
    localStorage.setItem('ssok_username', inputName.trim())
    setUserName(inputName.trim())
    setShowNameModal(false)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#EDF4E6] via-[#E6F0DC] to-[#DDE9D0]">
      <Sidebar />

      <main className="flex-1 ml-60 overflow-auto">
        <div className="min-h-screen px-16 py-12">

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-5xl font-bold text-olive-deep">
                안녕하세요, <span>{userName || '...'}</span>님
              </h1>
              <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.55 }}>
                <circle cx="50" cy="50" r="5" fill="#2d6a4f"/>
                <path d="M50 45 Q48 36 44 27 Q42 21 37 15" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M44 27 Q38 23 33 19" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M44 27 Q48 22 50 16" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M54 46 Q62 38 70 31 Q76 25 82 19" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M70 31 Q77 29 83 27" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M70 31 Q73 24 74 17" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M55 50 Q64 49 74 48 Q83 47 91 45" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M74 48 Q81 43 87 38" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M74 48 Q82 53 88 56" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M54 54 Q62 62 68 70 Q73 77 77 85" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M68 70 Q74 73 80 75" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M68 70 Q70 78 70 85" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M50 55 Q52 64 54 73 Q56 81 56 89" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M54 73 Q59 79 63 83" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M54 73 Q50 81 47 87" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M46 54 Q38 62 32 68 Q26 74 20 81" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M32 68 Q26 71 20 73" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M32 68 Q30 76 28 83" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M45 50 Q36 50 26 50 Q18 50 9 52" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M26 50 Q20 45 14 40" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M26 50 Q18 55 12 59" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M46 46 Q38 38 30 32 Q24 26 18 20" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M30 32 Q24 30 18 28" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M30 32 Q28 24 26 18" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div className="text-xl text-sage-gray">
              오늘은 어떤{' '}
              <span
                className="font-semibold"
                style={{
                  backgroundImage: 'linear-gradient(to right, #9DC183, #7BA068)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                집단지성
              </span>
              을 깨워볼까요?
            </div>
          </div>

          <ActionCards />
          <RecentActivity />
        </div>
      </main>

      {showNameModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-[440px] shadow-xl p-10">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🌱</div>
              <h2 className="text-2xl font-bold text-olive-deep mb-2">쏙에 오신 걸 환영해요</h2>
              <p className="text-sm text-sage-gray">시작하기 전에 이름을 알려주세요</p>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-olive-deep mb-2">이름</label>
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                placeholder="예: 임윤서"
                autoFocus
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sage-dark focus:border-transparent"
              />
            </div>

            <button
              onClick={handleSaveName}
              disabled={!inputName.trim()}
              className="w-full py-3 bg-gradient-to-r from-sage-light to-sage-dark text-white rounded-xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              시작하기 →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}