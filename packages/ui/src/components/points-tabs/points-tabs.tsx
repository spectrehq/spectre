'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

export function PointsTabs() {
  const pathname = usePathname()
  const tabsValue = useMemo(() => {
    if (pathname === '/points') return 'lock'
    if (pathname === '/points/unlock') return 'unlock'
    if (pathname === '/points/invite') return 'invite'
  }, [pathname])

  return (
    <Tabs defaultValue={tabsValue} value={tabsValue} className="mb-8">
      <TabsList className="mx-auto grid w-fit grid-cols-3 rounded-full">
        <TabsTrigger className="rounded-full" value="lock" asChild>
          <Link href="/points">Lock</Link>
        </TabsTrigger>
        <TabsTrigger className="rounded-full" value="unlock" asChild>
          <Link href="/points/unlock">Unlock</Link>
        </TabsTrigger>
        <TabsTrigger className="rounded-full" value="invite" asChild>
          <Link href="/points/invite">Invite</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
