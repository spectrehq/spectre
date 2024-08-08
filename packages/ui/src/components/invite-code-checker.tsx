'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export function InviteCodeChecker() {
  const searchParams = useSearchParams()

  const inviteCode = searchParams.get('invite_code')

  const [value, setValue, removeValue] = useLocalStorage(
    'aleostaking_invite_code',
    0
  )

  useEffect(() => {
    if (value) {
      if (inviteCode) {
        if (value !== Number(inviteCode)) {
          const url = new URL(window.location.href)
          url.searchParams.delete('invite_code')
          window.location.search = url.search
        }
      }
    } else if (inviteCode) {
      setValue(Number(inviteCode))
    }
  }, [inviteCode, setValue, value])

  // TODO: remove invite code

  return <></>
}
