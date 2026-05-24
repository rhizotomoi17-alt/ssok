'use client'

import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/sidebar'

export default function SettingsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('user@ssok.co')
  const [anonymous, setAnonymous] = useState(true)
  const [notify, setNotify] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('ssok_username')
    if (saved) setName(saved)
  }, [])

  const handleSave = () => {
    if (name.trim()) {
      localStorage.setItem('ssok_username', name.trim())
    }
    alert('저장됐어요!')
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#EDF4E6] to-[#DDE9D0]">
      <Sidebar />
      <main className="flex-1 ml-60 overflow-auto px-16 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-olive-deep mb-2">설정</h1>
          <p className="text-sage-gray">계정과 환경을 설정하세요</p>
        </div>

        <div className="max-w-xl space-y-6">

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold text-olive-deep mb-4">프로필</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-olive-deep mb-1">이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[#9DC183]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-olive-deep mb-1">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[#9DC183]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold text-olive-deep mb-4">기본 설정</h2>
            <div className="space-y-4">
              {[
                { label: '기본 익명 모드', desc: '세션 참여 시 기본으로 익명으로 설정', value: anonymous, set: setAnonymous },
                { label: '세션 알림', desc: '세션 초대 및 단계 전환 시 알림 받기', value: notify, set: setNotify },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-olive-deep">{item.label}</p>
                    <p className="text-xs text-sage-gray">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => item.set(!item.value)}
                    className="w-12 h-6 rounded-full transition-colors relative"
                    style={{ background: item.value ? '#9DC183' : '#E6EEE0' }}
                  >
                    <span
                      className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                      style={{ left: item.value ? '26px' : '4px' }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 rounded-2xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #9DC183 0%, #7BA068 100%)' }}
          >
            저장하기
          </button>

        </div>
      </main>
    </div>
  )
}