'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

export function WithdrawalsTabs() {
  const pathname = usePathname()
  const defaultValue = useMemo(() => {
    if (pathname === '/withdrawals') return 'withdraw'
    if (pathname === '/withdrawals/claim') return 'claim'
  }, [pathname])

  return (
    <Tabs defaultValue={defaultValue} className="mb-8">
      <TabsList className="mx-auto grid w-fit grid-cols-2 rounded-full">
        <TabsTrigger className="rounded-full" value="withdraw" asChild>
          <Link href="/withdrawals">Request</Link>
        </TabsTrigger>
        <TabsTrigger className="rounded-full" value="claim" asChild>
          <Link href="/withdrawals/claim">Claim</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
