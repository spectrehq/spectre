'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

export function AssetsTabs() {
  const pathname = usePathname()
  const tabsValue = useMemo(() => {
    if (pathname === '/assets') return 'wrap-unwrap'
    if (pathname === '/assets/shield-unshield') return 'shield-unshield'
    if (pathname === '/assets/transfer') return 'transfer'
  }, [pathname])

  return (
    <Tabs defaultValue={tabsValue} value={tabsValue} className="mb-8">
      <TabsList className="mx-auto flex justify-between md:grid w-fit grid-cols-3 rounded-full">
        <TabsTrigger className="rounded-full" value="wrap-unwrap" asChild>
          <Link href="/assets">Wrap & Unwrap</Link>
        </TabsTrigger>
        <TabsTrigger className="rounded-full" value="shield-unshield" asChild>
          <Link href="/assets/shield-unshield">Shield & Unshield</Link>
        </TabsTrigger>
        <TabsTrigger className="rounded-full" value="transfer" asChild>
          <Link href="/assets/transfer">Transfer</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
