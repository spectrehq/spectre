import { useCallback, useMemo } from 'react'
import { STCREDITS_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useWithdraw() {
  const { address, walletType } = useAccount()

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const network = useNetworkClientStore((store) => store.network)

  const programId = useMemo(() => STCREDITS_PROGRAM_IDS[network], [network])

  const withdraw = useCallback(
    (amount: bigint, fee?: number) => {
      mutate({
        programId,
        functionName: 'withdraw',
        inputs: [`${amount}u64`, String(false)],
        fee,
      })
    },
    [mutate, programId]
  )

  const withdrawAsync = useCallback(
    (amount: bigint, fee?: number) =>
      mutateAsync({
        programId,
        functionName: 'withdraw',
        inputs: [`${amount}u64`, String(false)],
        fee,
      }),
    [mutateAsync, programId]
  )

  return { ...rest, withdraw, withdrawAsync }
}
