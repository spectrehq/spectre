import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import type { AleoAddress } from '~/types'

export function useCreditsWithdrawAddress(address?: AleoAddress | null) {
  const creditsProgram = useNetworkClientStore((store) => store.creditsProgram)

  return useQuery({
    queryKey: ['credits', 'unbonding', address],
    queryFn: () =>
      creditsProgram.getWithdrawAddress(
        address!
      ) as Promise<AleoAddress | null>,
    enabled: Boolean(address),
  })
}
