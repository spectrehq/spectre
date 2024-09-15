'use client'

import { usePathname } from 'next/navigation'

export function ComingSoon() {
  const pathname = usePathname()

  if (pathname === '/' || pathname.startsWith('/staking')) {
    return null
  }

  return (
    <div className="bg-amber-600">
      <div className="container py-3 text-white sm:text-center">
        <p className="font-medium">Coming soon!</p>
      </div>
    </div>
  )
}
