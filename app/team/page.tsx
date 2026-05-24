'use client'

import React from 'react'
import Sidebar from '@/components/sidebar'

const DUMMY_MEMBERS = [
  { id: '1', name: '김한터', role: '팀장', sessions: 8, color: '#C8DBB8' },
  { id: '2', name: '이태민', role: '부팀장', sessions: 6, color: '#F5E9C8' },
  { id: '3', name: '김서원', role: '팀원', sessions: 7, color: '#E8C8C0' },
  { id: '4', name: '고화현', role: '팀원', sessions: 5, color: '#D4DCC8' },
  { id: '5', name: '김가은', role: '팀원', sessions: 6, color: '#a298ce' },
  { id: '6', name: '김세준', role: '팀원', sessions: 5, color: '#847a7a' },
  { id: '5', name: '김소민', role: '팀원', sessions: 6, color: '#d4c8d0' },
]

export default function TeamPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#EDF4E6] to-[#DDE9D0]">
      <Sidebar />
      <main className="flex-1 ml-60 overflow-auto px-16 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-olive-deep mb-2">팀</h1>
          <p className="text-sage-gray">함께하는 팀원들을 확인하세요</p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {DUMMY_MEMBERS.map((member) => (
            <div key={member.id} className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-olive-deep"
                  style={{ background: member.color }}
                >
                  {member.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-olive-deep">{member.name}</p>
                  <p className="text-xs text-sage-gray">{member.role}</p>
                </div>
              </div>
              <div className="text-sm text-sage-gray">
                참여 세션 <span className="font-semibold text-olive-deep">{member.sessions}개</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}