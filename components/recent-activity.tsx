import React from 'react'
import Image from 'next/image'
import { Users } from 'lucide-react'

export default function RecentActivity() {
  const recentSessions = [
    {
      id: 1,
      title: '팀 미팅 - Q2 계획',
      date: '오늘 10:30',
      participants: 5,
      thumbnail: 'bg-gradient-to-br from-sage-light to-sage-dark'
    },
    {
      id: 2,
      title: '브레인스토밍 - 새 기능',
      date: '어제 14:00',
      participants: 3,
      thumbnail: 'bg-gradient-to-br from-sage-dark to-sage-deep'
    },
    {
      id: 3,
      title: '마케팅 전략 논의',
      date: '3일 전',
      participants: 4,
      thumbnail: 'bg-gradient-to-br from-sage-deep to-sage-dark'
    },
    {
      id: 4,
      title: '제품 로드맵 검토',
      date: '1주일 전',
      participants: 6,
      thumbnail: 'bg-gradient-to-br from-sage-light to-sage-deep'
    },
  ]

  return (
    <div className="mt-12">
      <h2 className="text-lg font-semibold text-olive-deep mb-6">최근 활동</h2>
      <div className="grid grid-cols-4 gap-4">
        {recentSessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all cursor-pointer group"
          >
            <div className={`h-28 ${session.thumbnail} flex items-center justify-center text-white text-2xl`}>
              📝
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-olive-deep mb-1 line-clamp-2 group-hover:text-sage-dark">{session.title}</h3>
              <p className="text-xs text-sage-gray mb-3">{session.date}</p>
              <div className="flex items-center gap-2 text-xs text-sage-gray">
                <Users className="w-3 h-3" />
                <span>{session.participants}명</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
