import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { Header } from '~/components/header/header'
import { ThemeProvider } from '~/components/theme-provider'
import { cn } from '~/lib/utils'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Spectre',
  description:
    'Spectre liquidity protocol on Aleo: Stake credits, earn rewards, and borrow assets.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
