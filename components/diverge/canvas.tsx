'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import PostIt from './post-it'

interface Note {
  id: string
  content: string
  color: string
  x: number
  y: number
  isOwn: boolean
}

interface Connection {
  id: string
  from: string
  to: string
}

interface CanvasProps {
  isRevealed: boolean
}

const COLORS = ['#C8DBB8', '#F5E9C8', '#E8C8C0', '#D4DCC8', '#D8E8D0']
const NOTE_W = 192
const NOTE_H = 130
const PADDING = 24

const DUMMY_NOTES: Note[] = [
  { id: 'dummy-1', content: 'FlowSync\nOn/Off 가능한 익명 기반 제안 기능', color: '#f9c946', x: 40, y: 40, isOwn: false },
  { id: 'dummy-2', content: 'Rhizo \n당시에 선택되지 못한 아이디어도 DB에 저장, 묻힌 아이디어', color: '#E8C8C0', x: 280, y: 40, isOwn: false },
  { id: 'dummy-3', content: 'SSOK \n시각적 맥락의 파편화 및 감정적 마찰과 아이디어 소외를 한 툴에', color: '#D4DCC8', x: 520, y: 40, isOwn: false },
  { id: 'dummy-4', content: 'Beto \n온라인에서도 함께 있는 것처럼, 아바타와 바디더블링 기능', color: '#C8DBB8', x: 760, y: 40, isOwn: false },
  { id: 'dummy-5', content: 'SilentStorm \n침묵의 시간동안 자신의 아이디어 다양한 형태로 발산, 익명공개', color: '#D8E8D0', x: 40, y: 220, isOwn: false },
]

// 겹치지 않는 위치 찾기
function findFreePosition(existing: Note[], canvasW: number, canvasH: number, preferX?: number, preferY?: number): { x: number; y: number } {
  const isOverlap = (x: number, y: number) =>
    existing.some(
      (n) =>
        Math.abs(n.x - x) < NOTE_W + PADDING &&
        Math.abs(n.y - y) < NOTE_H + PADDING
    )

  // 선호 위치 먼저 시도
  if (preferX !== undefined && preferY !== undefined && !isOverlap(preferX, preferY)) {
    return { x: preferX, y: preferY }
  }

  // 그리드 방식으로 빈 자리 찾기
  const cols = Math.floor((canvasW - 40) / (NOTE_W + PADDING))
  const rows = Math.floor((canvasH - 40) / (NOTE_H + PADDING))

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = 40 + col * (NOTE_W + PADDING)
      const y = 40 + row * (NOTE_H + PADDING)
      if (!isOverlap(x, y)) {
        return { x, y }
      }
    }
  }

  // 그래도 없으면 랜덤
  return {
    x: 40 + Math.random() * Math.max(100, canvasW - NOTE_W - 40),
    y: 40 + Math.random() * Math.max(100, canvasH - NOTE_H - 40),
  }
}

export default function Canvas({ isRevealed }: CanvasProps) {
  const [myNotes, setMyNotes] = useState<Note[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const allNotes = isRevealed ? [...myNotes, ...DUMMY_NOTES] : myNotes

  // localStorage 저장
  useEffect(() => {
    const myValidNotes = myNotes
      .filter((n) => n.content.trim() !== '')
      .map((n) => ({ id: n.id, content: n.content, color: n.color, isOwn: true }))

    const dummyNotes = DUMMY_NOTES.map((n) => ({
      id: n.id,
      content: n.content,
      color: n.color,
      isOwn: false,
    }))

    try {
      localStorage.setItem('rhizo_notes', JSON.stringify([...myValidNotes, ...dummyNotes]))
    } catch (e) {
      console.error('저장 실패', e)
    }
  }, [myNotes])

  const getCanvasSize = () => {
    if (!canvasRef.current) return { w: 900, h: 500 }
    return {
      w: canvasRef.current.clientWidth,
      h: canvasRef.current.clientHeight,
    }
  }

  const addNote = useCallback((preferX?: number, preferY?: number) => {
    setMyNotes((prev) => {
      const allExisting = [...prev, ...DUMMY_NOTES]
      const { w, h } = canvasRef.current
        ? { w: canvasRef.current.clientWidth, h: canvasRef.current.clientHeight }
        : { w: 900, h: 500 }

      const { x, y } = findFreePosition(allExisting, w, h, preferX, preferY)

      const newNote: Note = {
        id: `note-${Date.now()}`,
        content: '',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        x,
        y,
        isOwn: true,
      }
      return [...prev, newNote]
    })
  }, [])

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setMyNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...updates } : note))
    )
  }, [])

  const deleteNote = useCallback((id: string) => {
    setMyNotes((prev) => prev.filter((note) => note.id !== id))
    setConnections((prev) =>
      prev.filter((conn) => conn.from !== id && conn.to !== id)
    )
  }, [])

  const startConnection = useCallback(
    (id: string) => {
      setConnectingFrom((prev) => (prev === id ? null : id))
    },
    []
  )

  const endConnection = useCallback(
    (toId: string) => {
      if (connectingFrom && connectingFrom !== toId) {
        const exists = connections.some(
          (conn) =>
            (conn.from === connectingFrom && conn.to === toId) ||
            (conn.from === toId && conn.to === connectingFrom)
        )
        if (!exists) {
          setConnections((prev) => [
            ...prev,
            { id: `conn-${Date.now()}`, from: connectingFrom, to: toId },
          ])
        }
      }
      setConnectingFrom(null)
    },
    [connectingFrom, connections]
  )

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isRevealed) return
    if (connectingFrom) {
      setConnectingFrom(null)
      return
    }
    if (e.target === e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect()
      const preferX = e.clientX - rect.left - NOTE_W / 2
      const preferY = e.clientY - rect.top - NOTE_H / 2
      addNote(Math.max(0, preferX), Math.max(0, preferY))
    }
  }

  const handleCanvasDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isRevealed) return
    if (e.target === e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect()
      const preferX = e.clientX - rect.left - NOTE_W / 2
      const preferY = e.clientY - rect.top - NOTE_H / 2
      addNote(Math.max(0, preferX), Math.max(0, preferY))
    }
  }

  const getNoteCenter = (noteId: string) => {
    const note = allNotes.find((n) => n.id === noteId)
    if (!note) return { x: 0, y: 0 }
    return { x: note.x + NOTE_W / 2, y: note.y + NOTE_H / 2 }
  }

  return (
    <div
      ref={canvasRef}
      className="relative flex-1 overflow-hidden transition-all duration-700"
      style={{
        backgroundImage: `radial-gradient(circle, ${isRevealed ? '#9DC183' : '#B8CCA8'} 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
        backgroundColor: isRevealed ? '#EAF3E2' : '#F5F0E8',
        transition: 'background-color 0.7s ease',
      }}
      onClick={handleCanvasClick}
      onDoubleClick={handleCanvasDoubleClick}
    >
      {/* 개인 발산 중 상단 배너 */}
      {!isRevealed && (
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium"
          style={{
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid #D4C8A8',
            color: '#7A6A4A',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#C8A878' }} />
          나만의 발산 공간이에요 — 시간이 끝나면 모두에게 공개돼요
        </div>
      )}

      {/* 공개 후 배너 */}
      {isRevealed && (
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #9DC183 0%, #7BA068 100%)' }}
        >
          <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
          모든 아이디어가 공개됐어요 — 침묵 시간이 시작됩니다
        </div>
      )}

      {/* 좌측 워터마크 */}
      {!isRevealed && (
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none select-none"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            color: 'rgba(180, 160, 120, 0.25)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.15em',
          }}
        >
          개인 발산 공간
        </div>
      )}

      {/* 연결선 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {connections.map((conn) => {
          const from = getNoteCenter(conn.from)
          const to = getNoteCenter(conn.to)
          return (
            <g key={conn.id}>
              <line
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke="#9DC183" strokeWidth="2" strokeDasharray="6 4"
              />
              <circle
                cx={(from.x + to.x) / 2} cy={(from.y + to.y) / 2}
                r="8" fill="white" stroke="#E6EEE0" strokeWidth="1"
                className="cursor-pointer pointer-events-auto hover:stroke-red-300"
                onClick={() => setConnections((prev) => prev.filter((c) => c.id !== conn.id))}
              />
              <text
                x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 + 4}
                textAnchor="middle" fontSize="10" fill="#999"
                className="pointer-events-none"
              >
                &times;
              </text>
            </g>
          )
        })}
      </svg>

      {/* 포스트잇 */}
      {allNotes.map((note) => (
        <PostIt
          key={note.id}
          id={note.id}
          content={note.content}
          color={note.color}
          x={note.x}
          y={note.y}
          onUpdate={note.isOwn && !isRevealed ? updateNote : () => {}}
          onDelete={note.isOwn && !isRevealed ? deleteNote : () => {}}
          onStartConnection={startConnection}
          onEndConnection={endConnection}
          isConnecting={connectingFrom !== null}
          isConnectionSource={connectingFrom === note.id}
        />
      ))}

      {/* 빈 상태 */}
      {allNotes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: '#D8E8D0' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7BA068" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <p className="text-lg font-medium text-olive-deep mb-1">캔버스를 클릭하여 아이디어를 추가하세요</p>
            <p className="text-sm text-sage-gray">자유롭게 작성하세요. 시간이 끝나기 전까지 아무도 볼 수 없어요</p>
          </div>
        </div>
      )}

      {connectingFrom && (
        <div
          className="fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm text-white z-50"
          style={{ background: '#9DC183' }}
        >
          연결할 포스트잇을 클릭하세요
        </div>
      )}

      {/* 포스트잇 추가 버튼 (발산 중에만) */}
      {!isRevealed && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            addNote()
          }}
          className="absolute bottom-8 right-80 w-14 h-14 rounded-full text-white text-2xl font-light flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-30"
          style={{
            background: 'linear-gradient(135deg, #9DC183 0%, #7BA068 100%)',
            boxShadow: '0 4px 20px rgba(157,193,131,0.45)',
          }}
          aria-label="포스트잇 추가"
        >
          +
        </button>
      )}
    </div>
  )
}