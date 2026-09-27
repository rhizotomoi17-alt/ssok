import type { Candidate } from '@/lib/jokbo/types'

// "양후공파 26세손" 표기. generationSe는 세(世) 기준이므로 세손 = 세 − 1.
export function lineageLabel(c: Candidate): string {
  // 근거가 약하면 파 이름도 붙이지 않는다 (임의 파가 결론처럼 보이는 것 방지)
  if (!c.conclusive || c.generationSe === null) return '파·세대 미상'
  return `${c.branch?.branchName ?? ''} ${c.generationSe}세`.trim()
}

// 후보 목록용: 결론이 아니어도 어떤 파·세대에서 점수가 났는지 보여준다
export function candidateLabel(c: Candidate): string {
  if (c.generationSe === null) return c.branch?.branchName ?? '파·세대 미상'
  return `${c.branch?.branchName ?? ''} ${c.generationSe}세`.trim()
}

export function sesonLabel(c: Candidate): string | null {
  return !c.conclusive || c.generationSe === null ? null : `${c.generationSe - 1}세손`
}
