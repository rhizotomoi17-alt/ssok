'use client'

import { toBlob } from 'html-to-image'
import { Download, Loader2, Share2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Candidate, FigureWithRelation } from '@/lib/jokbo/types'
import { lineageLabel } from './lineage'
import { PrimaryButton } from './ui'

const W = 1080
const H = 1920
const SERIF = "'Noto Serif KR', 'Nanum Myeongjo', serif"

// 인스타그램 스토리 규격 카드. 실제 크기로 렌더하고 미리보기는 CSS로 축소한다.
function Card({ top, figures }: { top: Candidate; figures: FigureWithRelation[] }) {
  const { clan } = top
  // 공유 카드에는 긍정·중립 인물만 싣는다 (친일 인물은 결과 화면에서 맥락과 함께 확인)
  const featured = figures.filter((f) => f.category !== 'collaborator').slice(0, 2)
  return (
    <div
      style={{
        width: W, height: H, background: '#f6f0e4', color: '#241c15', fontFamily: SERIF,
        padding: 96, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', position: 'relative',
      }}
    >
      <div style={{ fontSize: 34, letterSpacing: 8, color: '#8a7862' }}>族譜 LAB</div>
      <div style={{ marginTop: 180, fontSize: 300, fontWeight: 900, lineHeight: 1 }}>
        {clan.bonGwanHanja}
      </div>
      <div style={{ marginTop: 24, fontSize: 72, fontWeight: 700 }}>
        {clan.bonGwanHangul} {clan.surnameHangul}씨
      </div>
      <div style={{ marginTop: 40, fontSize: 56, color: '#b3261e', fontWeight: 700 }}>
        {lineageLabel(top)}
      </div>
      {top.conclusive && <div
        style={{
          marginTop: 56, display: 'inline-flex', alignSelf: 'flex-start', gap: 20, alignItems: 'baseline',
          border: '4px solid #241c15', borderRadius: 24, padding: '24px 40px',
        }}
      >
        <span style={{ fontSize: 40 }}>신뢰도</span>
        <span style={{ fontSize: 96, fontWeight: 900 }}>{top.confidence}</span>
      </div>}

      {featured.length > 0 && (
        <div style={{ marginTop: 'auto' }}>
          <div style={{ fontSize: 36, color: '#8a7862', marginBottom: 24 }}>같은 본관의 인물</div>
          {featured.map((f) => (
            <div key={f.id} style={{ borderTop: '2px solid #d9ccb4', padding: '28px 0' }}>
              <div style={{ fontSize: 56, fontWeight: 700 }}>
                {f.name} <span style={{ fontSize: 40, color: '#8a7862' }}>{f.nameHanja}</span>
              </div>
              <div style={{ fontSize: 34, marginTop: 12, lineHeight: 1.45, color: '#3d3228' }}>
                {f.titleAchievement}
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: featured.length ? 40 : 'auto', fontSize: 28, color: '#8a7862',
          display: 'flex', justifyContent: 'space-between',
        }}
      >
        <span>
          {!top.conclusive ? '본관 소개 카드'
            : top.dataVerified ? '항렬 기반 추정' : '샘플 데이터 기반 추정 · 실제 족보와 다를 수 있음'}
        </span>
      </div>
      <div
        style={{
          position: 'absolute', top: 96, right: 96, width: 150, height: 150, border: '8px solid #b3261e',
          borderRadius: 12, color: '#b3261e', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 88, fontWeight: 900, transform: 'rotate(-6deg)',
        }}
      >
        {clan.surnameHanja}
      </div>
    </div>
  )
}

export function ShareCard({ top, figures }: { top: Candidate; figures: FigureWithRelation[] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.25)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // 한글 파일명은 일부 브라우저·OS에서 무시되어 ASCII로 둔다
  const filename = `jokbolab-${top.clan.id}.png`

  async function render(): Promise<Blob> {
    // 원격 웹폰트는 교차 출처 제약으로 임베드가 실패하므로 건너뛴다(시스템 명조로 대체)
    const blob = await toBlob(cardRef.current!, { width: W, height: H, pixelRatio: 1, skipFonts: true, cacheBust: true })
    if (!blob) throw new Error('empty image')
    return blob
  }

  function save(blob: Blob) {
    // data URL은 브라우저가 파일명을 무시하는 경우가 있어 blob URL 사용
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  async function download() {
    setBusy(true)
    setError(null)
    try {
      save(await render())
    } catch {
      setError('이미지 생성에 실패했습니다. 다시 시도해 주세요.')
    } finally {
      setBusy(false)
    }
  }

  async function share() {
    setBusy(true)
    setError(null)
    try {
      const blob = await render()
      const file = new File([blob], filename, { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: '족보Lab' })
      } else {
        save(blob)
      }
    } catch (e) {
      if ((e as DOMException)?.name !== 'AbortError') setError('공유에 실패했습니다.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-3">
      <div ref={boxRef} className="mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl shadow-lg" style={{ height: H * scale }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: W, height: H }}>
          <div ref={cardRef}>
            <Card top={top} figures={figures} />
          </div>
        </div>
      </div>
      {error && <p className="text-center text-sm text-red-700" role="alert">{error}</p>}
      <div className="mx-auto flex max-w-[280px] gap-2">
        <PrimaryButton onClick={share} disabled={busy} className="flex items-center justify-center gap-2">
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Share2 className="size-4" />} 공유
        </PrimaryButton>
        <button
          type="button"
          onClick={download}
          disabled={busy}
          aria-label="PNG 저장"
          className="flex h-12 w-14 shrink-0 items-center justify-center rounded-xl border border-[#d9ccb4]"
        >
          <Download className="size-5" />
        </button>
      </div>
    </div>
  )
}
