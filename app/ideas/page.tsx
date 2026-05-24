'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/sidebar'
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react'

const DUMMY_IDEAS = [
  { id: '1', content: 'AI 기반 자동 회의록 생성 기능', session: 'Q2 신규 기능', color: '#F5E9C8', votes: 6, status: '채택' },
  { id: '2', content: '슬랙 연동으로 알림 받기', session: 'Q2 신규 기능', color: '#E8C8C0', votes: 4, status: '채택' },
  { id: '3', content: '모바일 앱 지원', session: 'Q2 신규 기능', color: '#D4DCC8', votes: 7, status: '채택' },
  { id: '4', content: '투표 결과 시각화 대시보드', session: 'Q2 신규 기능', color: '#C8DBB8', votes: 5, status: '보류' },
  { id: '5', content: '사용자 인터뷰 자동 분석', session: 'UX 리서치', color: '#D8E8D0', votes: 3, status: '보류' },
  { id: '6', content: 'SNS 채널 통합 관리', session: '마케팅 캠페인', color: '#F5E9C8', votes: 8, status: '채택' },
  { id: '7', content: '포스트잇 색상 커스텀', session: 'Q2 신규 기능', color: '#D8E8D0', votes: 2, status: '미채택' },
  { id: '8', content: '인플루언서 협업 플랫폼', session: '마케팅 캠페인', color: '#E8C8C0', votes: 5, status: '보류' },
  { id: '9', content: '실시간 번역 기능', session: 'UX 리서치', color: '#C8DBB8', votes: 4, status: '미채택' },
  { id: '10', content: '음성 메모 자동 텍스트 변환', session: 'Q2 신규 기능', color: '#D4DCC8', votes: 6, status: '채택' },
  { id: '11', content: '다크모드 지원', session: 'UX 리서치', color: '#F5E9C8', votes: 5, status: '채택' },
  { id: '12', content: '팀 캘린더 연동', session: 'Q2 신규 기능', color: '#D8E8D0', votes: 3, status: '보류' },
  { id: '13', content: '회의 참여자 역할 분리', session: '조직 문화 개선', color: '#E8C8C0', votes: 6, status: '채택' },
  { id: '14', content: '아이디어 태그 시스템', session: 'Q2 신규 기능', color: '#C8DBB8', votes: 4, status: '보류' },
  { id: '15', content: '주간 회의 자동 요약 리포트', session: '조직 문화 개선', color: '#F5E9C8', votes: 7, status: '채택' },
  { id: '16', content: '스마트워치 알림 연동', session: 'UX 리서치', color: '#D4DCC8', votes: 2, status: '미채택' },
  { id: '17', content: '온보딩 튜토리얼 자동화', session: '조직 문화 개선', color: '#D8E8D0', votes: 5, status: '채택' },
  { id: '18', content: '익명 피드백 채널', session: '조직 문화 개선', color: '#E8C8C0', votes: 8, status: '채택' },
  { id: '19', content: '회의 집중도 측정 기능', session: 'UX 리서치', color: '#C8DBB8', votes: 3, status: '보류' },
  { id: '20', content: '프로젝트별 아이디어 분류', session: 'Q2 신규 기능', color: '#F5E9C8', votes: 6, status: '채택' },
  { id: '21', content: '감정 이모지 반응 기능', session: '마케팅 캠페인', color: '#D8E8D0', votes: 4, status: '미채택' },
  { id: '22', content: 'PDF 회의록 자동 생성', session: '조직 문화 개선', color: '#D4DCC8', votes: 7, status: '채택' },
  { id: '23', content: '아이디어 버전 히스토리', session: 'Q2 신규 기능', color: '#E8C8C0', votes: 3, status: '보류' },
  { id: '24', content: '외부 게스트 초대 기능', session: '마케팅 캠페인', color: '#C8DBB8', votes: 5, status: '채택' },
  { id: '25', content: '회의 전 사전 질문 수집', session: '조직 문화 개선', color: '#F5E9C8', votes: 6, status: '채택' },
  { id: '26', content: '아이디어 공감 투표 누적', session: 'UX 리서치', color: '#D8E8D0', votes: 4, status: '보류' },
  { id: '27', content: '팀원 기여도 시각화', session: '조직 문화 개선', color: '#E8C8C0', votes: 7, status: '채택' },
  { id: '28', content: '회의 중 실시간 Q&A 기능', session: 'Q2 신규 기능', color: '#C8DBB8', votes: 5, status: '채택' },
  { id: '29', content: '비공개 아이디어 보관함', session: 'UX 리서치', color: '#D4DCC8', votes: 2, status: '미채택' },
  { id: '30', content: '회의 종료 후 액션 아이템 자동 추출', session: '조직 문화 개선', color: '#F5E9C8', votes: 9, status: '채택' },
]

const AI_INSIGHTS = [
  {
    id: 'cluster',
    icon: '🔗',
    title: 'SSOK AI가 유사한 아이디어를 묶었어요',
    summary: '30개 아이디어 중 3개 그룹이 발견됐어요',
    color: '#EEF4E8',
    borderColor: '#9DC183',
    detail: [
      { group: 'AI 자동화 그룹', ideas: ['AI 기반 자동 회의록 생성 기능', '음성 메모 자동 텍스트 변환', '사용자 인터뷰 자동 분석', '회의 종료 후 액션 아이템 자동 추출'], color: '#C8DBB8' },
      { group: '외부 연동 그룹', ideas: ['슬랙 연동으로 알림 받기', 'SNS 채널 통합 관리', '팀 캘린더 연동', '스마트워치 알림 연동'], color: '#F5E9C8' },
      { group: 'UX/UI 개선 그룹', ideas: ['투표 결과 시각화 대시보드', '포스트잇 색상 커스텀', '모바일 앱 지원', '다크모드 지원'], color: '#E8C8C0' },
    ],
  },
  {
    id: 'pattern',
    icon: '📊',
    title: 'SSOK AI가 팀의 관심사 패턴을 발견했어요',
    summary: '팀이 가장 중요하게 생각하는 건 자동화와 조직 문화예요',
    color: '#FBF8EE',
    borderColor: '#C8A878',
    detail: [
      { label: '자동화/AI', percent: 38, color: '#9DC183' },
      { label: '조직 문화 개선', percent: 29, color: '#C8DBB8' },
      { label: '외부 연동', percent: 21, color: '#F5E9C8' },
      { label: 'UX 개선', percent: 12, color: '#E8C8C0' },
    ],
  },
  {
    id: 'review',
    icon: '🔍',
    title: 'SSOK AI가 보류 아이디어를 재검토해요',
    summary: '보류된 아이디어 중 채택 아이디어와 높은 연관성을 가진 것들을 발견했어요',
    color: '#F8F0F8',
    borderColor: '#C8A8C8',
    detail: [
      { idea: '투표 결과 시각화 대시보드', reason: '"AI 기반 회의록"과 함께 구현 시 시너지 효과가 높아요', score: 87 },
      { idea: '인플루언서 협업 플랫폼', reason: '"SNS 채널 통합 관리"의 확장 기능으로 적합해요', score: 74 },
      { idea: '아이디어 공감 투표 누적', reason: '"투표 결과 시각화"와 연계 시 데이터 가치가 높아져요', score: 68 },
    ],
  },
]

export default function IdeasPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'전체' | '채택' | '보류' | '미채택'>('전체')
  const [expandedInsight, setExpandedInsight] = useState<string | null>('cluster')

  const filtered = DUMMY_IDEAS.filter((i) => {
    const matchSearch =
      i.content.toLowerCase().includes(search.toLowerCase()) ||
      i.session.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === '전체' || i.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#EDF4E6] to-[#DDE9D0]">
      <Sidebar />
      <main className="flex-1 ml-60 overflow-auto px-16 py-12">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-olive-deep mb-2">아이디어 DB</h1>
          <p className="text-sage-gray">모든 세션에서 나온 아이디어를 검색하고 관리하세요</p>

          <div
            className="mt-5 rounded-2xl px-6 py-4 flex items-center gap-4"
            style={{ background: 'linear-gradient(135deg, #EEF4E8 0%, #FBF8F0 100%)', border: '1px solid #C8DBB8' }}
          >
            <span className="text-2xl">🌱</span>
            <div>
              <p className="text-sm font-semibold text-olive-deep">
                팀원들의 아이디어 <span style={{ color: '#7BA068' }}>{DUMMY_IDEAS.length}개</span>가 꽃피우길 기다리고 있어요.
              </p>
              <p className="text-xs text-sage-gray mt-0.5">쏙쏙 기억합니다 — 아이디어는 사라지지 않아요.</p>
            </div>
          </div>
        </div>

        {/* AI 인사이트 섹션 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#7BA068]" />
            <span className="text-sm font-semibold text-olive-deep">SSOK AI 인사이트</span>
            <span className="text-xs text-sage-gray">— AI가 아이디어를 분석했어요</span>
          </div>

          <div className="space-y-3">
            {AI_INSIGHTS.map((insight) => (
              <div
                key={insight.id}
                className="rounded-2xl overflow-hidden"
                style={{ border: `1.5px solid ${insight.borderColor}`, background: insight.color }}
              >
                <button
                  onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
                  className="w-full flex items-center justify-between px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{insight.icon}</span>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-olive-deep">{insight.title}</p>
                      <p className="text-xs text-sage-gray">{insight.summary}</p>
                    </div>
                  </div>
                  {expandedInsight === insight.id
                    ? <ChevronUp className="w-4 h-4 text-sage-gray" />
                    : <ChevronDown className="w-4 h-4 text-sage-gray" />
                  }
                </button>

                {expandedInsight === insight.id && (
                  <div className="px-5 pb-5">
                    <div className="h-px bg-black/10 mb-4" />

                    {insight.id === 'cluster' && (
                      <div className="space-y-3">
                        {(insight.detail as any[]).map((group) => (
                          <div key={group.group} className="rounded-xl p-3" style={{ background: group.color }}>
                            <p className="text-xs font-semibold text-olive-deep mb-2">{group.group}</p>
                            <div className="space-y-1">
                              {group.ideas.map((idea: string) => (
                                <p key={idea} className="text-xs text-olive-deep opacity-80">• {idea}</p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {insight.id === 'pattern' && (
                      <div className="space-y-3">
                        {(insight.detail as any[]).map((item) => (
                          <div key={item.label}>
                            <div className="flex justify-between text-xs text-olive-deep mb-1">
                              <span className="font-medium">{item.label}</span>
                              <span className="font-bold">{item.percent}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-black/10 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${item.percent}%`, background: item.color }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {insight.id === 'review' && (
                      <div className="space-y-3">
                        {(insight.detail as any[]).map((item) => (
                          <div key={item.idea} className="bg-white rounded-xl p-4">
                            <div className="flex items-start justify-between mb-2">
                              <p className="text-sm font-semibold text-olive-deep">{item.idea}</p>
                              <span
                                className="ml-3 flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-bold text-white"
                                style={{ background: '#7BA068' }}
                              >
                                연관도 {item.score}%
                              </span>
                            </div>
                            <p className="text-xs text-sage-gray leading-relaxed">{item.reason}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 필터 + 검색 */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="아이디어 또는 세션 검색..."
            className="flex-1 px-5 py-3 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9DC183]"
          />
          <div className="flex gap-2">
            {(['전체', '채택', '보류', '미채택'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: filter === f ? '#7BA068' : 'white',
                  color: filter === f ? 'white' : '#6B7868',
                  border: '1px solid',
                  borderColor: filter === f ? '#7BA068' : '#E6EEE0',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* 아이디어 그리드 */}
        <div className="grid grid-cols-3 gap-4 pb-12">
          {filtered.map((idea) => (
            <div
              key={idea.id}
              className="rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              style={{ background: idea.color }}
            >
              <p className="text-sm font-medium text-olive-deep leading-relaxed mb-3">
                {idea.content}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-olive-deep opacity-60">{idea.session}</span>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                    style={{
                      background: idea.status === '채택' ? '#9DC183' : idea.status === '보류' ? '#C8A878' : '#C8C8C8',
                    }}
                  >
                    {idea.status}
                  </span>
                  <span className="text-xs font-semibold text-[#7BA068]">👍 {idea.votes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}