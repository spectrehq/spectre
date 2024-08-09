'use client'

import * as dn from 'dnum'
import { useMemo } from 'react'
import { UnlockForm } from './unlock-form'

export function UnlockWidget() {
  const receivedFormatted = useMemo(
    () => dn.format([2536362656n, 6], { digits: 6 }),
    []
  )

  return (
    <div className="max-w-lg mx-auto">
      <div className="rounded-xl bg-primary-foreground p-6">
        <UnlockForm />
        <ul className="grid gap-3 text-sm mt-6">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">You will receive</span>
            <span>{receivedFormatted} stCredits</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Network fee</span>
            <span>~ 0.25 Credits</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
