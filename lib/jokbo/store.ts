'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { MatchResult } from './types'

export interface PersonForm {
  hangul: string
  hanja: string
  unknownHanja: boolean
  nativeKorean: boolean
}

const emptyPerson = (): PersonForm => ({ hangul: '', hanja: '', unknownHanja: false, nativeKorean: false })

export type Step = 0 | 1 | 2 | 3 // 가문 → 3대 이름 → 고향 → 결과

interface JokboState {
  step: Step
  surname: string
  clanId: number | null // null = 본관 모름
  self: PersonForm
  father: PersonForm
  grandfather: PersonForm
  hometown: string
  result: MatchResult | null
  setStep: (s: Step) => void
  setClan: (surname: string, clanId: number | null) => void
  setPerson: (who: 'self' | 'father' | 'grandfather', patch: Partial<PersonForm>) => void
  setHometown: (v: string) => void
  setResult: (r: MatchResult | null) => void
  reset: () => void
}

const initial = {
  step: 0 as Step,
  surname: '',
  clanId: null,
  self: emptyPerson(),
  father: emptyPerson(),
  grandfather: emptyPerson(),
  hometown: '',
  result: null,
}

// sessionStorage: 탭을 닫으면 가족 이름이 사라지도록
export const useJokbo = create<JokboState>()(
  persist(
    (set) => ({
      ...initial,
      setStep: (step) => set({ step }),
      setClan: (surname, clanId) => set({ surname, clanId }),
      setPerson: (who, patch) => set((s) => ({ [who]: { ...s[who], ...patch } })),
      setHometown: (hometown) => set({ hometown }),
      setResult: (result) => set({ result }),
      reset: () => set({ ...initial, self: emptyPerson(), father: emptyPerson(), grandfather: emptyPerson() }),
    }),
    {
      name: 'jokbo-lab',
      storage: createJSONStorage(() => {
        try {
          return sessionStorage
        } catch {
          return { getItem: () => null, setItem: () => {}, removeItem: () => {} }
        }
      }),
    },
  ),
)
