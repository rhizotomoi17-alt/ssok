import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: '족보Lab — 내 이름에 담긴 가문의 이야기',
  description: '이름·항렬자·부모님 고향으로 본관과 파, 세대를 추정하고 같은 가문의 인물 이야기를 만나보세요.',
}

export const viewport: Viewport = { themeColor: '#f6f0e4' }

export default function JokboLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500;700;900&display=swap');`}</style>
      <div className="jokbo min-h-dvh bg-[#f6f0e4] text-[#241c15]">{children}</div>
    </>
  )
}
