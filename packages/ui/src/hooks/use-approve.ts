import { useCallback, useMemo } from 'react'
import { STCREDITS_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export const MAX_U64 = 18446744073709551615n

export function useApprove() {
  const { address, walletType } = useAccount()

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const network = useNetworkClientStore((store) => store.network)
  const programId = useMemo(() => STCREDITS_PROGRAM_IDS[network], [network])

  const approve = useCallback(
    (spender: string, amount = MAX_U64, fee?: number) => {
      mutate({
        programId,
        functionName: 'approve_public',
        inputs: [spender, `${amount}u64`],
        fee,
      })
    },
    [mutate, programId]
  )

  const approveAsync = useCallback(
    (spender: string, amount = MAX_U64, fee?: number) => {
      mutate({
        programId,
        functionName: 'approve_public',
        inputs: [spender, `${amount}u64`],
        fee,
      })
    },
    [mutate, programId]
  )

  return { approve, approveAsync, ...rest }
}
