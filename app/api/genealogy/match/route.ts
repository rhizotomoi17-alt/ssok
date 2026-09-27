import { NextResponse } from 'next/server'
import { z } from 'zod'
import * as dataset from '@/lib/jokbo/data'
import { matchGenealogy } from '@/lib/jokbo/match'

// 입력은 저장하지 않는다 (가족 이름은 개인정보).
export const dynamic = 'force-dynamic'

const hangulName = z.string().trim().max(10).regex(/^[가-힣]*$/, '이름은 한글로 입력하세요')
const hanjaName = z.string().trim().max(10)
  .regex(/^[㐀-䶿一-鿿豈-﫿]*$/, '한자만 입력하세요')

const person = z.object({
  hangul: hangulName,
  hanja: hanjaName.optional(),
  nativeKorean: z.boolean().optional(),
})

const schema = z.object({
  surname: z.string().trim().min(1).max(2).regex(/^[가-힣]+$/),
  clanId: z.number().int().positive().optional(),
  self: person.extend({ hangul: hangulName.min(1, '본인 이름을 입력하세요') }),
  father: person.optional(),
  grandfather: person.optional(),
  hometown: z.string().trim().max(50).optional(),
})

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON 본문이 필요합니다.' }, { status: 400 })
  }
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? '입력값이 올바르지 않습니다.' },
      { status: 400 },
    )
  }
  const result = matchGenealogy(dataset, parsed.data)
  return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } })
}
