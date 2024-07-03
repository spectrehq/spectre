import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'

export function useIsInitialized() {
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )

  return useQuery({
    queryKey: ['stCredits', 'isInitialized'],
    queryFn: () => stCreditsProgram.isInitialized(),
  })
}
