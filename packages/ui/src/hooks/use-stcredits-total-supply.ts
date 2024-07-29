import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'

export function useStCreditsTotalSupply() {
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )

  return useQuery({
    queryKey: ['stCredits', 'totalSupply'],
    queryFn: () => stCreditsProgram.getTotalSupply(),
  })
}
