import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import type { AleoAddress } from '~/types'

export function useBondState(address?: AleoAddress | null) {
  const creditsProgram = useNetworkClientStore((store) => store.creditsProgram)

  return useQuery({
    queryKey: ['credits', 'bondState', address],
    queryFn: () => creditsProgram.getBonded(address!),
    enabled: Boolean(address),
  })
}
