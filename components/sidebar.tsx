'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, FileText, Lightbulb, Settings, UserCircle } from 'lucide-react'

const menuItems = [
  { label: '대시보드', icon: Home, href: '/' },
  { label: '내 세션', icon: Users, href: '/sessions' },
  { label: 'AI 회의록', icon: FileText, href: '/notes' },
  { label: '아이디어 DB', icon: Lightbulb, href: '/ideas' },
  { label: '팀', icon: Users, href: '/team' },
  { label: '개인 페이지', icon: UserCircle, href: '/profile' },
  { label: '설정', icon: Settings, href: '/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('ssok_username')
    if (saved) setUserName(saved)
  }, [])

  const initial = userName ? userName[0] : '?'

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white shadow-sm border-r border-border flex flex-col z-50">
      <div className="px-8 py-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <span className="text-lg font-semibold text-olive-deep">SSOK 쏙</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-colors ${
                active
                  ? 'bg-sage-light text-olive-deep'
                  : 'text-sage-gray hover:text-olive-deep hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-6 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center">
            <span className="text-sm font-semibold text-olive-deep">{initial}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-olive-deep truncate">{userName || '...'}</p>
            <p className="text-xs text-sage-gray truncate">user@ssok.co</p>
          </div>
        </div>
      </div>
    </aside>
  )
}