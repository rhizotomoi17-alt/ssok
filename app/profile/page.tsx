'use client'

import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/sidebar'

interface Memos {
  memos: Record<string, string>
  freeMemo: string
}

export default function ProfilePage() {
  const [silentMemos, setSilentMemos] = useState<Memos | null>(null)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rhizo_silent_memos')
      if (saved) setSilentMemos(JSON.parse(saved))
    } catch (e) {
      console.error(e)
    }
    const name = localStorage.getItem('ssok_username')
    if (name) setUserName(name)
  }, [])

  const initial = userName ? userName[0] : '?'

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#EDF4E6] to-[#DDE9D0]">
      <Sidebar />
      <main className="flex-1 ml-60 overflow-auto px-16 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-full bg-[#C8DBB8] flex items-center justify-center text-3xl font-bold text-olive-deep">
              {initial}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-olive-deep">{userName || '...'}</h1>
              <p className="text-sage-gray">user@ssok.co</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: '참여 세션', value: '8개' },
              { label: '작성한 아이디어', value: '34개' },
              { label: '받은 투표', value: '21개' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-border text-center">
                <p className="text-2xl font-bold text-olive-deep mb-1">{stat.value}</p>
                <p className="text-sm text-sage-gray">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-olive-deep mb-4">침묵 단계 메모</h2>
          {silentMemos ? (
            <div className="space-y-4">
              {silentMemos.freeMemo && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-border">
                  <p className="text-xs text-sage-gray mb-2">자유 메모</p>
                  <p className="text-sm text-olive-deep leading-relaxed whitespace-pre-wrap">
                    {silentMemos.freeMemo}
                  </p>
                </div>
              )}
              {Object.entries(silentMemos.memos).map(([noteId, memo]) => (
                memo && (
                  <div key={noteId} className="bg-white rounded-2xl p-5 shadow-sm border border-border">
                    <p className="text-xs text-sage-gray mb-2">아이디어 연결 메모</p>
                    <p className="text-sm text-olive-deep leading-relaxed whitespace-pre-wrap">{memo}</p>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-border">
              <p className="text-sage-gray text-sm">아직 저장된 메모가 없어요</p>
              <p className="text-xs text-sage-gray mt-1">침묵 단계에서 작성한 메모가 여기에 저장돼요</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}