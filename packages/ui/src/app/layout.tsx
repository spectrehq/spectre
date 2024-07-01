import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spectre',
  description: 'Spectre liquidity protocol on Aleo: Stake credits, earn rewards, and borrow assets.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
