'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useAccount } from '~/hooks/use-account'
import { useInviterByCode } from '~/hooks/use-inviter-by-code'
import { usePointsState } from '~/hooks/use-points-state'

export function InviteCodeChecker() {
  const searchParams = useSearchParams()

  const inviteCode = searchParams.get('invite_code')

  const [value, setValue, removeValue] = useLocalStorage(
    'aleostaking_invite_code',
    0
  )

  const { address } = useAccount()
  const { data: userPointsState } = usePointsState(address)

  const { data: inviter } = useInviterByCode(Number(inviteCode))

  useEffect(() => {
    if (userPointsState === undefined) return

    const isNewUser = (userPointsState?.height ?? 0n) === 0n

    if (!isNewUser) {
      removeValue()
      return
    }

    if (value) {
      if (inviteCode) {
        if (value !== Number(inviteCode)) {
          const url = new URL(window.location.href)
          url.searchParams.delete('invite_code')
          window.location.search = url.search
        }
      }
    } else if (inviteCode && inviter !== undefined) {
      if (inviter && inviter !== address) {
        setValue(Number(inviteCode))
      } else {
        const url = new URL(window.location.href)
        url.searchParams.delete('invite_code')
        window.location.search = url.search
      }
    }
  }, [
    address,
    inviteCode,
    inviter,
    removeValue,
    setValue,
    userPointsState,
    value,
  ])

  return <></>
}
