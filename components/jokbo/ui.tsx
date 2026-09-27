'use client'

// 족보Lab 공용 UI 조각. 한지 톤 팔레트는 여기서만 정의한다.

import { cn } from '@/lib/utils'

export const serif = "font-['Noto_Serif_KR',serif]"

export function Seal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        serif,
        'inline-flex items-center justify-center rounded-sm border-2 border-[#b3261e] px-1.5 text-[#b3261e]',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function PrimaryButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        'h-12 w-full rounded-xl bg-[#241c15] px-5 font-semibold text-[#f6f0e4] transition',
        'active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40',
        className,
      )}
    />
  )
}

export function GhostButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        'h-12 rounded-xl border border-[#d9ccb4] px-5 font-medium text-[#5a4a3a] transition active:scale-[0.98]',
        className,
      )}
    />
  )
}

export function TextField({
  label, hint, className, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#5a4a3a]">{label}</span>
      <input
        {...props}
        className={cn(
          'h-12 w-full rounded-xl border border-[#d9ccb4] bg-white/70 px-4 text-base outline-none',
          'placeholder:text-[#b3a38c] focus:border-[#241c15] disabled:bg-[#ede4d3] disabled:text-[#a3937c]',
          className,
        )}
      />
      {hint && <span className="mt-1 block text-xs text-[#8a7862]">{hint}</span>}
    </label>
  )
}

export function Toggle({
  checked, onChange, label,
}: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'rounded-full border px-3 py-1.5 text-xs font-medium transition',
        checked ? 'border-[#241c15] bg-[#241c15] text-[#f6f0e4]' : 'border-[#d9ccb4] text-[#6b5a47]',
      )}
    >
      {label}
    </button>
  )
}

export function Badge({ tone = 'neutral', children }: {
  tone?: 'neutral' | 'warn' | 'good' | 'bad'
  children: React.ReactNode
}) {
  const tones = {
    neutral: 'bg-[#ede4d3] text-[#5a4a3a]',
    warn: 'bg-amber-100 text-amber-900',
    good: 'bg-emerald-100 text-emerald-900',
    bad: 'bg-red-100 text-red-900',
  }
  return <span className={cn('inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold', tones[tone])}>{children}</span>
}
