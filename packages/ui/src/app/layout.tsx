import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Toaster } from 'sonner'
import { ThemeProvider } from '~/components/theme-provider'
import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { cn } from '~/lib/utils'
import './globals.css'
import { Providers } from './providers'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'AleoStaking',
  description:
    'AleoStaking liquidity protocol: Stake credits and earn rewards.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <Providers>
              <Header />
              {children}
              <Footer />
            </Providers>
            <Toaster richColors closeButton />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
