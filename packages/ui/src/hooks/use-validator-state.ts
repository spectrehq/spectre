import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import type { AleoAddress } from '~/types'

export function useValidatorState(address?: AleoAddress | null) {
  const creditsProgram = useNetworkClientStore((store) => store.creditsProgram)

  return useQuery({
    queryKey: ['credits', 'validatorState', address],
    queryFn: () => creditsProgram.getCommitteeState(address!),
    enabled: Boolean(address),
  })
}
