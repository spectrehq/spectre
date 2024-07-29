import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'

export function useStCreditsBuffered() {
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )
  return useQuery({
    queryKey: ['stCredits', 'buffered'],
    queryFn: () => stCreditsProgram.getTotalBuffered(),
  })
}
