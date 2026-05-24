'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, X, Clock, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ActionCards() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [step, setStep] = useState(1)
  const [sessionName, setSessionName] = useState('')
  const [nickname, setNickname] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [divergeTime, setDivergeTime] = useState(10)
  const [voteTime, setVoteTime] = useState(5)
  const [hasBreak, setHasBreak] = useState(false)
  const [breakTime, setBreakTime] = useState(5)

  const sessionNameRef = useRef<HTMLInputElement>(null)
  const nicknameRef = useRef<HTMLInputElement>(null)

  const handleStart = () => {
    const finalName = sessionNameRef.current?.value || sessionName || '새 세션'
    localStorage.setItem('ssok_session_name', finalName)
    const encodedName = encodeURIComponent(finalName)
    router.push(
      `/diverge?sessionName=${encodedName}&divergeTime=${divergeTime}&voteTime=${voteTime}`
    )
  }

  const closeModal = () => {
    setShowModal(false)
    setStep(1)
    setSessionName('')
    setNickname('')
  }

  const handleNextStep = () => {
    const name = sessionNameRef.current?.value || ''
    const nick = nicknameRef.current?.value || ''
    setSessionName(name)
    setNickname(nick)
    setStep(2)
  }

  const step1Valid = (sessionNameRef.current?.value || sessionName).trim() &&
    (nicknameRef.current?.value || nickname).trim()

  return (
    <>
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div
          onClick={() => setShowModal(true)}
          className="bg-white rounded-3xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow group cursor-pointer relative"
        >
          <div className="mb-6 h-24 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-sage-light to-sage-dark rounded-2xl flex items-center justify-center text-4xl">
              🌱
            </div>
          </div>
          <h3 className="text-lg font-semibold text-olive-deep mb-2">새 세션 시작</h3>
          <p className="text-sm text-sage-gray mb-6">처음부터 새로운 협업 세션을 만드세요</p>
          <div className="absolute top-8 right-8 text-sage-dark group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow group cursor-pointer relative">
          <div className="mb-6 h-24 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-sage-light to-sage-dark rounded-2xl flex items-center justify-center text-4xl">
              🔑
            </div>
          </div>
          <h3 className="text-lg font-semibold text-olive-deep mb-4">코드로 참여</h3>
          <input
            type="text"
            placeholder="000000"
            className="w-full px-4 py-3 border border-border rounded-lg text-center text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-dark focus:border-transparent mb-4"
            maxLength={6}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="text-sm text-sage-gray">초대받은 세션에 참여하세요</p>
          <div className="absolute top-8 right-8 text-sage-dark group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        <Link
          href="/sessions"
          className="bg-white rounded-3xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow group cursor-pointer relative block"
        >
          <div className="mb-6 h-24 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-sage-light to-sage-dark rounded-2xl flex items-center justify-center text-4xl">
              📖
            </div>
          </div>
          <h3 className="text-lg font-semibold text-olive-deep mb-2">세션 토의로 이어가기</h3>
          <p className="text-sm text-sage-gray mb-6">진행 중인 세션을 계속하세요</p>
          <div className="absolute top-8 right-8 text-sage-dark group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </div>
        </Link>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-[520px] shadow-xl relative">

            <div className="px-8 pt-6 pb-3 border-b border-border">
              <button onClick={closeModal} className="absolute top-5 right-5 text-sage-gray hover:text-olive-deep">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                  step >= 1 ? 'bg-gradient-to-br from-sage-light to-sage-dark text-white' : 'bg-gray-100 text-gray-400'
                }`}>1</div>
                <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-sage-dark' : 'bg-gray-100'}`} />
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                  step >= 2 ? 'bg-gradient-to-br from-sage-light to-sage-dark text-white' : 'bg-gray-100 text-gray-400'
                }`}>2</div>
              </div>
              <div className="flex justify-between text-xs">
                <span className={step === 1 ? 'text-sage-dark font-semibold' : 'text-sage-gray'}>세션 설정</span>
                <span className={step === 2 ? 'text-sage-dark font-semibold' : 'text-sage-gray'}>시간 설정</span>
              </div>
            </div>

            <div className="px-8 py-5">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-olive-deep mb-1.5">세션 이름</label>
                    <input
                      ref={sessionNameRef}
                      type="text"
                      defaultValue={sessionName}
                      placeholder="예: Q2 신규 기능 브레인스토밍"
                      className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sage-dark focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-olive-deep mb-1.5">닉네임</label>
                    <input
                      ref={nicknameRef}
                      type="text"
                      defaultValue={nickname}
                      placeholder="사용할 이름을 입력하세요"
                      className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sage-dark focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-olive-deep mb-1.5">공개 방식</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setIsAnonymous(false)}
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                          !isAnonymous ? 'border-sage-dark bg-[#EEF4E8]' : 'border-border bg-white'
                        }`}
                      >
                        <Eye className="w-4 h-4 text-sage-dark flex-shrink-0" />
                        <div className="text-left">
                          <div className="text-xs font-semibold text-olive-deep">실명 모드</div>
                          <div className="text-xs text-sage-gray">이름이 공개돼요</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setIsAnonymous(true)}
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                          isAnonymous ? 'border-sage-dark bg-[#EEF4E8]' : 'border-border bg-white'
                        }`}
                      >
                        <EyeOff className="w-4 h-4 text-sage-dark flex-shrink-0" />
                        <div className="text-left">
                          <div className="text-xs font-semibold text-olive-deep">익명 모드</div>
                          <div className="text-xs text-sage-gray">이름이 숨겨져요</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-olive-deep">개인 발산 시간</label>
                      <span className="text-xs font-bold text-sage-dark">{divergeTime}분</span>
                    </div>
                    <input type="range" min={3} max={60} step={1} value={divergeTime}
                      onChange={(e) => setDivergeTime(Number(e.target.value))}
                      className="w-full accent-[#7BA068]" />
                    <div className="flex justify-between text-xs text-sage-gray mt-0.5">
                      <span>3분</span><span>60분</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-olive-deep">침묵 시간</label>
                      <span className="text-xs font-bold text-sage-dark">{voteTime}분</span>
                    </div>
                    <input type="range" min={2} max={20} step={1} value={voteTime}
                      onChange={(e) => setVoteTime(Number(e.target.value))}
                      className="w-full accent-[#7BA068]" />
                    <div className="flex justify-between text-xs text-sage-gray mt-0.5">
                      <span>2분</span><span>20분</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border p-3">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => setHasBreak(!hasBreak)}
                        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
                        style={{
                          background: hasBreak ? '#7BA068' : 'white',
                          border: hasBreak ? '2px solid #7BA068' : '2px solid #C8DBB8',
                        }}
                      >
                        {hasBreak && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                      <div>
                        <p className="text-xs font-semibold text-olive-deep">단계 사이 쉬는 시간 추가</p>
                        <p className="text-xs text-sage-gray">발산 → 침묵 사이에 잠깐 쉬어가요</p>
                      </div>
                    </div>
                    {hasBreak && (
                      <div className="flex gap-2 mt-2.5">
                        {[5, 10, 15].map((min) => (
                          <button
                            key={min}
                            onClick={() => setBreakTime(min)}
                            className="flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all"
                            style={{
                              background: breakTime === min ? '#7BA068' : '#EEF4E8',
                              color: breakTime === min ? 'white' : '#6B7868',
                              border: '1px solid',
                              borderColor: breakTime === min ? '#7BA068' : '#C8DBB8',
                            }}
                          >
                            {min}분
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-[#EEF4E8] rounded-xl p-3 flex justify-between items-center">
                    <span className="text-xs font-semibold text-olive-deep flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" /> 총 예상 시간
                    </span>
                    <span className="text-sm font-bold text-sage-dark">
                      {divergeTime + voteTime + (hasBreak ? breakTime : 0)}분
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="px-8 pb-6 pt-2">
              {step === 1 && (
                <button
                  onClick={handleNextStep}
                  className="w-full py-3 bg-gradient-to-r from-sage-light to-sage-dark text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  시간 설정하기 →
                </button>
              )}
              {step === 2 && (
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border border-border text-sage-gray rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
                  >
                    ← 이전
                  </button>
                  <button
                    onClick={handleStart}
                    className="flex-1 py-3 bg-[#7BA068] text-white rounded-xl font-semibold text-sm hover:bg-[#6a8f59] transition-colors"
                  >
                    세션 시작
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  )
}