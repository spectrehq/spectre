import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import type { AleoAddress } from '~/types'

export function useCreditsUnbonding(address?: AleoAddress | null) {
  const creditsProgram = useNetworkClientStore((store) => store.creditsProgram)

  return useQuery({
    queryKey: ['credits', 'unbonding', address],
    queryFn: () => creditsProgram.getUnbonding(address!),
    enabled: Boolean(address),
  })
}
