import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import { AleoAddress } from '~/types'

export function usePendingWithdraw(address?: AleoAddress | null) {
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )
  return useQuery({
    queryKey: ['stCredits', 'pendingWithdraw'],
    queryFn: () => stCreditsProgram.getPendingWithdraw(address!),
    enabled: Boolean(address),
  })
}
