import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import type { AleoAddress } from '~/types'

export function useStCreditsBalance(address?: AleoAddress | null) {
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )

  return useQuery({
    queryKey: ['stCredits', 'balance', address],
    queryFn: () => stCreditsProgram.getPublicBalance(address!),
    enabled: Boolean(address),
  })
}
