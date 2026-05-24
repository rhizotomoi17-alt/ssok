'use client'

import React, { useState, useRef } from 'react'

interface PostItProps {
  id: string
  content: string
  color: string
  x: number
  y: number
  onUpdate: (id: string, updates: Partial<{ content: string; x: number; y: number }>) => void
  onDelete: (id: string) => void
  onStartConnection: (id: string) => void
  onEndConnection: (id: string) => void
  isConnecting: boolean
  isConnectionSource: boolean
}

export default function PostIt({
  id,
  content,
  color,
  x,
  y,
  onUpdate,
  onDelete,
  onStartConnection,
  onEndConnection,
  isConnecting,
  isConnectionSource,
}: PostItProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [editContent, setEditContent] = useState(content)
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) return
    
    // If connecting mode is active and this is not the source, end connection here
    if (isConnecting && !isConnectionSource) {
      onEndConnection(id)
      return
    }
    
    e.preventDefault()
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: x,
      origY: y,
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return
      const dx = e.clientX - dragRef.current.startX
      const dy = e.clientY - dragRef.current.startY
      onUpdate(id, {
        x: dragRef.current.origX + dx,
        y: dragRef.current.origY + dy,
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      dragRef.current = null
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleDoubleClick = () => {
    setIsEditing(true)
    setEditContent(content)
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (editContent.trim()) {
      onUpdate(id, { content: editContent.trim() })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleBlur()
    }
    if (e.key === 'Escape') {
      setIsEditing(false)
      setEditContent(content)
    }
  }

  return (
    <div
      className={`absolute w-48 select-none group ${isDragging ? 'cursor-grabbing z-50' : 'cursor-grab'} ${
        isConnecting && !isConnectionSource ? 'ring-2 ring-[#9DC183] ring-offset-2' : ''
      }`}
      style={{
        left: x,
        top: y,
        filter: isDragging
          ? 'drop-shadow(0 8px 24px rgba(157,193,131,0.35))'
          : 'drop-shadow(0 4px 12px rgba(157,193,131,0.18))',
        transition: isDragging ? 'none' : 'filter 0.2s',
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div
        className="rounded-2xl p-4 flex flex-col gap-2 relative"
        style={{ background: color, minHeight: '120px' }}
      >
        {/* Delete button - hide when in connecting mode */}
        {!isConnecting && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(id)
            }}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-[#E6EEE0] text-sage-gray hover:text-red-500 hover:border-red-300 transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center text-sm"
          >
            &times;
          </button>
        )}

        {/* Connection button - hide when in connecting mode (except for source) */}
        {(!isConnecting || isConnectionSource) && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onStartConnection(id)
            }}
            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border flex items-center justify-center text-xs transition-all ${
              isConnectionSource
                ? 'border-[#9DC183] bg-[#9DC183] text-white'
                : 'border-[#E6EEE0] text-sage-gray hover:border-[#9DC183] hover:text-[#9DC183] opacity-0 group-hover:opacity-100'
            }`}
            title="선 연결"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <circle cx="2" cy="6" r="1.5" />
              <circle cx="10" cy="6" r="1.5" />
              <rect x="3" y="5.5" width="5" height="1" />
            </svg>
          </button>
        )}

        {/* Content */}
        {isEditing ? (
          <textarea
            autoFocus
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full h-full min-h-[80px] resize-none bg-transparent text-sm text-[#2D3A2A] placeholder-[#a8b89a] outline-none leading-relaxed"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
        ) : (
          <p
            className="text-sm leading-relaxed text-[#2D3A2A] flex-1"
            style={{ fontFamily: "'Noto Sans KR', sans-serif", wordBreak: 'keep-all' }}
          >
            {content || '더블클릭하여 작성...'}
          </p>
        )}
      </div>
    </div>
  )
}
