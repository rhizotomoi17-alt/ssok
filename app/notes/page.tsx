'use client'

import React from 'react'
import Sidebar from '@/components/sidebar'
import { FileText, Download } from 'lucide-react'

const DUMMY_NOTES = [
  {
    id: '1',
    title: 'Q2 신규 기능 브레인스토밍',
    date: '2026.05.20',
    summary: 'AI 기반 회의록, 슬랙 연동, 모바일 앱 지원 등 12개 아이디어 도출. 투표 결과 상위 3개 아이디어 선정.',
    participants: 8,
  },
  {
    id: '2',
    title: 'UX 리서치 아이디어 수집',
    date: '2026.05.15',
    summary: '사용자 인터뷰 방법론, 설문 설계, 페르소나 정의 등 8개 아이디어 도출.',
    participants: 5,
  },
  {
    id: '3',
    title: '마케팅 캠페인 기획',
    date: '2026.05.10',
    summary: 'SNS 채널 전략, 콘텐츠 캘린더, 인플루언서 협업 등 15개 아이디어 도출.',
    participants: 6,
  },
]

export default function NotesPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#EDF4E6] to-[#DDE9D0]">
      <Sidebar />
      <main className="flex-1 ml-60 overflow-auto px-16 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-olive-deep mb-2">AI 회의록</h1>
          <p className="text-sage-gray">세션별 회의 내용과 결과를 AI가 정리했어요</p>
        </div>

        <div className="space-y-4">
          {DUMMY_NOTES.map((note) => (
            <div key={note.id} className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF4E8] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#7BA068]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-olive-deep">{note.title}</h3>
                    <p className="text-xs text-sage-gray">{note.date} · {note.participants}명 참여</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-sage-gray border border-border hover:bg-slate-50 transition-colors">
                  <Download className="w-3 h-3" /> 내보내기
                </button>
              </div>
              <p className="text-sm text-sage-gray leading-relaxed pl-13">{note.summary}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}