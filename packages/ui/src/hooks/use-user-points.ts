import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'

export function useUserPoints(address?: string | null) {
  const stCreditsPointsProgram = useNetworkClientStore(
    (store) => store.stCreditsPointsProgram
  )

  // TODO
  return useQuery({
    queryKey: ['stCreditsPoints', 'userPoints', address],
    queryFn: () => null,
  })
}
