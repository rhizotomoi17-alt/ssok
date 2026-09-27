// 한자 범위: CJK 통합 한자, 확장 A, 호환 한자
const NON_HANJA = /[^㐀-䶿一-鿿豈-﫿]/g

export const onlyHanja = (v: string): string => v.replace(NON_HANJA, '')

// 한자 칸에 한글 등 한자가 아닌 글자가 남아 있는지 (한자 키 변환 전 상태)
export const hasUnconverted = (v: string): boolean => onlyHanja(v) !== v.replace(/\s/g, '')
