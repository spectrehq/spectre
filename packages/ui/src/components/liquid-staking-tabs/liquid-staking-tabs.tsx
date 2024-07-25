'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

export function LiquidStakingTabs() {
  const pathname = usePathname()
  const tabsValue = useMemo(() => {
    if (pathname === '/liquid-staking') return 'stake'
    if (pathname === '/liquid-staking/unstake') return 'unstake'
    if (pathname === '/liquid-staking/claim') return 'claim'
  }, [pathname])

  return (
    <Tabs defaultValue={tabsValue} value={tabsValue} className="mb-8">
      <TabsList className="mx-auto grid w-fit grid-cols-3 rounded-full">
        <TabsTrigger className="rounded-full" value="stake" asChild>
          <Link href="/liquid-staking">Stake</Link>
        </TabsTrigger>
        <TabsTrigger className="rounded-full" value="unstake" asChild>
          <Link href="/liquid-staking/unstake">Unstake</Link>
        </TabsTrigger>
        <TabsTrigger className="rounded-full" value="claim" asChild>
          <Link href="/liquid-staking/claim">Claim</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
