import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'

export function useInviterByCode(code?: number | bigint) {
  const stCreditsPointsProgram = useNetworkClientStore(
    (store) => store.stCreditsPointsProgram
  )

  return useQuery({
    queryKey: ['stCreditsPoints', 'inviterByCode', code],
    queryFn: () => stCreditsPointsProgram.getInviterByCode(code!),
    enabled: Boolean(code),
  })
}
