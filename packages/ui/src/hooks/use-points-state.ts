import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'

export function usePointsState(address?: string | null) {
  const stCreditsPointsProgram = useNetworkClientStore(
    (store) => store.stCreditsPointsProgram
  )

  return useQuery({
    queryKey: ['stCreditsPoints', 'state', address],
    queryFn: () => stCreditsPointsProgram.getState(address!),
    enabled: Boolean(address),
  })
}
