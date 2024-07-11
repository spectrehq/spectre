import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import type { AleoAddress } from '~/types'

export function usePendingWithdraw(address?: AleoAddress | null) {
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )
  return useQuery({
    queryKey: ['stCredits', 'pendingWithdraw', address],
    queryFn: async () => {
      const res = await stCreditsProgram.getWithdraw(address!)
      if (res?.pending) {
        return res
      }

      return null
    },
    enabled: Boolean(address),
  })
}
