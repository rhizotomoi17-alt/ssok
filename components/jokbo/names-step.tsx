'use client'

import { useJokbo, type PersonForm } from '@/lib/jokbo/store'
import { cn } from '@/lib/utils'
import { GhostButton, PrimaryButton, TextField, Toggle, serif } from './ui'

type Who = 'self' | 'father' | 'grandfather'

const LABEL: Record<Who, string> = { self: '본인', father: '아버지', grandfather: '할아버지' }

const onlyHangul = (v: string) => v.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, '').slice(0, 4)
const onlyHanja = (v: string) => v.replace(/[^㐀-䶿一-鿿豈-﫿]/g, '').slice(0, 4)

function PersonFields({ who }: { who: Who }) {
  const person = useJokbo((s) => s[who])
  const setPerson = useJokbo((s) => s.setPerson)
  const surname = useJokbo((s) => s.surname)
  const set = (patch: Partial<PersonForm>) => setPerson(who, patch)
  const optional = who !== 'self'
  const hanjaMismatch = person.hanja.length > 0 && person.hanja.length !== person.hangul.length

  return (
    <fieldset className="space-y-3 rounded-2xl border border-[#e3d8c4] bg-white/50 p-4">
      <legend className="px-1 text-sm font-semibold">
        {LABEL[who]} {optional && <span className="font-normal text-[#8a7862]">(선택)</span>}
      </legend>
      <TextField
        label={`이름 (성 '${surname}' 제외)`}
        placeholder={who === 'self' ? '예: 상희' : ''}
        value={person.hangul}
        onChange={(e) => set({ hangul: onlyHangul(e.target.value) })}
        inputMode="text"
        autoComplete="off"
      />
      {!person.nativeKorean && (
        <TextField
          label="한자 이름"
          placeholder={person.unknownHanja ? '한자 없이 한글로만 추정합니다' : '예: 相熙'}
          value={person.unknownHanja ? '' : person.hanja}
          disabled={person.unknownHanja}
          onChange={(e) => set({ hanja: onlyHanja(e.target.value) })}
          className={cn(serif)}
          hint={hanjaMismatch ? '한글 이름과 글자 수가 같아야 합니다.' : '한자가 있으면 동음이의 항렬을 구분할 수 있어 정확도가 크게 오릅니다.'}
        />
      )}
      <div className="flex flex-wrap gap-2">
        <Toggle
          label="한자를 몰라요"
          checked={person.unknownHanja}
          onChange={(v) => set({ unknownHanja: v, hanja: v ? '' : person.hanja })}
        />
        <Toggle
          label="순우리말 이름이에요"
          checked={person.nativeKorean}
          onChange={(v) => set({ nativeKorean: v })}
        />
      </div>
    </fieldset>
  )
}

export function NamesStep() {
  const { self, father, grandfather, setStep } = useJokbo()
  const valid = self.hangul.length > 0
    && [self, father, grandfather].every((p) => !p.hanja || p.unknownHanja || p.hanja.length === p.hangul.length)

  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm text-[#8a7862]">2 / 3</p>
        <h2 className={cn(serif, 'mt-1 text-2xl font-bold')}>3대의 이름을 알려주세요</h2>
        <p className="mt-1 text-sm text-[#6b5a47]">
          같은 세대는 이름에 같은 글자(항렬자·돌림자)를 씁니다. 아버지·할아버지 이름이 있으면 세대를 훨씬 정확히 맞힐 수 있어요.
        </p>
      </header>
      <PersonFields who="self" />
      <PersonFields who="father" />
      <PersonFields who="grandfather" />
      <div className="flex gap-3">
        <GhostButton onClick={() => setStep(0)}>이전</GhostButton>
        <PrimaryButton disabled={!valid} onClick={() => setStep(2)}>다음</PrimaryButton>
      </div>
    </div>
  )
}
