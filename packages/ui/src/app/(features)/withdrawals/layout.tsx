import { useTranslations } from 'next-intl'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

export default function WithdrawalsLayout({ children }: PropsWithChildren) {
  const t = useTranslations('WithdrawalsPage')

  return (
    <>
      <section>
        <div className="container py-16">
          <div className="text-center mb-8">
            <h3 className="scroll-m-20 font-semibold text-2xl tracking-tight">
              {t('title')}
            </h3>
            <p className="text-muted-foreground text-sm">{t('description')}</p>
          </div>
          <Tabs defaultValue="withdraw" className="mb-8">
            <TabsList className="mx-auto grid w-fit grid-cols-2 rounded-full">
              <TabsTrigger className="rounded-full" value="withdraw" asChild>
                <Link href="/withdrawals">Request</Link>
              </TabsTrigger>
              <TabsTrigger className="rounded-full" value="claim" asChild>
                <Link href="/withdrawals/claim">Claim</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {children}
        </div>
      </section>
    </>
  )
}
