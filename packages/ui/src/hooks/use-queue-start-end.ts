import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'

export function useQueueStartEnd() {
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )

  return useQuery({
    queryKey: ['stCredits', 'queueStartEnd'],
    queryFn: () => stCreditsProgram.getPendingQueueStartEnd(),
  })
}
