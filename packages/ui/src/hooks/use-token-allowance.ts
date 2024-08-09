import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'

export function useStCreditsAllowance(
  approver?: string | null,
  spender?: string | null
) {
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )

  return useQuery({
    queryKey: ['stCredits', 'allowance', approver, spender],
    queryFn: () => stCreditsProgram.getApproval(approver!, spender!),
    enabled: Boolean(approver) && Boolean(spender),
  })
}
