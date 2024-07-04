import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import { AleoAddress } from '~/types'

export function useUserWithdraw(address?: AleoAddress | null) {
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )

  return useQuery({
    queryKey: ['stCredits', 'userWithdraw', address],
    queryFn: () => stCreditsProgram.getWithdraw(address!),
    enabled: Boolean(address),
  })
}
