import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Inter as FontSans } from 'next/font/google'
import { Toaster } from 'sonner'
import { ConnectingWalletDialog } from '~/components/connecting-wallet-dialog'
import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { InviteCodeChecker } from '~/components/invite-code-checker'
import { ThemeProvider } from '~/components/theme-provider'
import { cn } from '~/lib/utils'
import { AccountStoreProvider } from '~/stores/account'
import { NetworkClientStoreProvider } from '~/stores/network-client'
import { Providers } from './providers'

import './globals.css'

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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <NetworkClientStoreProvider>
              <Providers>
                <AccountStoreProvider>
                  <Header />
                  {children}
                  <Footer />
                  <InviteCodeChecker />
                  <ConnectingWalletDialog />
                </AccountStoreProvider>
              </Providers>
            </NetworkClientStoreProvider>
            <Toaster richColors closeButton />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
