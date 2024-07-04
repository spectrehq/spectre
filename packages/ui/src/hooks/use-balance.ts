import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import type { AleoAddress } from '~/types'

export function useBalance(address?: AleoAddress | null) {
  const creditsProgram = useNetworkClientStore((store) => store.creditsProgram)

  return useQuery({
    queryKey: ['balance', address],
    queryFn: () => creditsProgram.getPublicBalance(address!),
    enabled: Boolean(address),
  })
}
