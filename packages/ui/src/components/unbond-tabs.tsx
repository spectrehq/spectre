'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

export function UnbondTabs() {
  const pathname = usePathname()
  const defaultValue = useMemo(() => {
    if (pathname === '/unbond') return 'unbond'
    if (pathname === '/unbond/claim') return 'claim'
  }, [pathname])

  return (
    <Tabs defaultValue={defaultValue} className="mb-8">
      <TabsList className="mx-auto grid w-fit grid-cols-2 rounded-full">
        <TabsTrigger className="rounded-full" value="unbond" asChild>
          <Link href="/unbond">Request</Link>
        </TabsTrigger>
        <TabsTrigger className="rounded-full" value="claim" asChild>
          <Link href="/unbond/claim">Claim</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
