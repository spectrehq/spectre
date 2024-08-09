import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'

export function useUserInviteCode(address?: string | null) {
  const stCreditsPointsProgram = useNetworkClientStore(
    (store) => store.stCreditsPointsProgram
  )

  return useQuery({
    queryKey: ['stCreditsPoints', 'userInviteCode', address],
    queryFn: () => stCreditsPointsProgram.getInviteCode(address!),
    enabled: Boolean(address),
  })
}
