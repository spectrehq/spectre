import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'

export function usePointsStats() {
  const stCreditsPointsProgram = useNetworkClientStore(
    (store) => store.stCreditsPointsProgram
  )

  return useQuery({
    queryKey: ['stCreditsPoints', 'stats'],
    queryFn: () => stCreditsPointsProgram.getStats(),
  })
}
