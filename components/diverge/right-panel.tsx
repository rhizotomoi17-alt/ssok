'use client'

import React, { useState } from 'react'
import { ChevronRight, Sparkles } from 'lucide-react'

const AI_PROMPTS = [
  '현재 주제에서 아직 다루지 않은 관점은?',
  '반대 입장에서 생각한다면?',
  '사용자 입장에서 가장 중요한 것은?',
]

export default function RightPanel() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={`fixed right-0 top-16 bottom-12 z-20 bg-white flex flex-col transition-all duration-300 ${
        collapsed ? 'w-10' : 'w-72'
      }`}
      style={{ borderLeft: '1px solid #E6EEE0', boxShadow: '-2px 0 12px rgba(157,193,131,0.08)' }}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-white border border-[#C8DBB8] flex items-center justify-center text-sage-gray hover:bg-[#F3F8EF] transition-colors z-10"
        aria-label={collapsed ? '패널 열기' : '패널 닫기'}
      >
        <ChevronRight
          className={`w-3 h-3 transition-transform ${collapsed ? '' : 'rotate-180'}`}
        />
      </button>

      {!collapsed && (
        <div className="flex flex-col gap-0 overflow-y-auto flex-1 px-5 py-5">
          {/* Tips section */}
          <section className="mb-5">
            <p className="text-xs font-semibold text-sage-gray uppercase tracking-widest mb-3">
              사용 방법
            </p>
            <div className="space-y-2 text-xs text-sage-gray leading-relaxed">
              <p>• 캔버스를 클릭하여 새 포스트잇 추가</p>
              <p>• 포스트잇을 드래그하여 이동</p>
              <p>• 더블클릭하여 내용 수정</p>
              <p>• 하단 연결 버튼으로 선 연결</p>
            </div>
          </section>

          {/* Divider */}
          <div className="my-3 border-t border-[#E6EEE0]" />

          {/* AI Helper */}
          <section>
            <div
              className="rounded-2xl p-4 flex flex-col gap-3"
              style={{ background: 'linear-gradient(135deg, #EDF6E6 0%, #E4F0DA 100%)' }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #9DC183, #7BA068)' }}
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <p className="text-sm font-semibold text-olive-deep">아이디어가 막히셨나요?</p>
              </div>
              <p className="text-xs text-sage-gray leading-relaxed">
                이런 관점에서 생각해보세요.
              </p>
              <div className="flex flex-col gap-2">
                {AI_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    className="text-left text-xs text-[#3A5C2E] bg-white rounded-xl px-3 py-2.5 leading-relaxed border border-[#C8DBB8] hover:bg-[#F3F8EF] transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Keyboard shortcuts */}
          <section className="mt-5">
            <p className="text-xs font-semibold text-sage-gray uppercase tracking-widest mb-3">
              단축키
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-sage-gray">저장</span>
                <kbd className="px-2 py-0.5 bg-[#F3F8EF] rounded text-[#3A5C2E] font-mono">Enter</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-sage-gray">취소</span>
                <kbd className="px-2 py-0.5 bg-[#F3F8EF] rounded text-[#3A5C2E] font-mono">Esc</kbd>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
