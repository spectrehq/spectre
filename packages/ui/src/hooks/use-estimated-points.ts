import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import { useBlockHeight } from './use-block-height'

export function useEstimatedPoints(address?: string | null) {
  const stCreditsPointsProgram = useNetworkClientStore(
    (store) => store.stCreditsPointsProgram
  )

  const { data } = useBlockHeight()

  return useQuery({
    queryKey: ['stCreditsPoints', 'estimatedPoints', address, data],
    queryFn: () =>
      stCreditsPointsProgram.getEstimatedPoints(address!, BigInt(data!)),
    enabled: Boolean(address && data),
  })
}
