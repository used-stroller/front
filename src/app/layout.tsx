import type { Metadata } from 'next'
import './reset.css'
import './globals.css'

export const metadata: Metadata = {
  title: '중모차',
  description: '똑똑한 엄빠의 중모차'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  )
}
