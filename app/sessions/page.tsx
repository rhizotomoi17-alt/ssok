'use client'

import React from 'react'
import Sidebar from '@/components/sidebar'
import { ArrowRight, Clock, Users } from 'lucide-react'
import Link from 'next/link'

const DUMMY_SESSIONS = [
  {
    id: '1',
    title: 'Q2 신규 기능 브레인스토밍',
    date: '2026.05.20',
    participants: 8,
    status: '투표 완료',
    statusColor: '#9DC183',
    ideas: 12,
  },
  {
    id: '2',
    title: 'UX 리서치 아이디어 수집',
    date: '2026.05.15',
    participants: 5,
    status: '발산 완료',
    statusColor: '#C8DBB8',
    ideas: 8,
  },
  {
    id: '3',
    title: '마케팅 캠페인 기획',
    date: '2026.05.10',
    participants: 6,
    status: '투표 완료',
    statusColor: '#9DC183',
    ideas: 15,
  },
  {
    id: '4',
    title: '신규 온보딩 플로우 개선',
    date: '2026.04.28',
    participants: 4,
    status: '투표 완료',
    statusColor: '#9DC183',
    ideas: 9,
  },
]

export default function SessionsPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#EDF4E6] to-[#DDE9D0]">
      <Sidebar />
      <main className="flex-1 ml-60 overflow-auto px-16 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-olive-deep mb-2">세션 토의로 이어가기</h1>
          <p className="text-sage-gray">브레인스토밍이 완료된 세션을 선택해 회의를 시작하세요</p>
        </div>

        <div className="space-y-4">
          {DUMMY_SESSIONS.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-2xl p-6 flex items-center gap-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-olive-deep">{session.title}</h3>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: session.statusColor }}
                  >
                    {session.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-sage-gray">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {session.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> {session.participants}명 참여
                  </span>
                  <span>💡 아이디어 {session.ideas}개</span>
                </div>
              </div>

              <Link
                href="/discuss"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #9DC183 0%, #7BA068 100%)' }}
              >
                회의 시작 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}