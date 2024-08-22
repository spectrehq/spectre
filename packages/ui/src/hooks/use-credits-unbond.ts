import { useCallback, useMemo } from 'react'
import { CREDITS_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useCreditsUnbond() {
  const { address, walletType } = useAccount()

  const network = useNetworkClientStore((store) => store.network)

  const programId = useMemo(() => CREDITS_PROGRAM_IDS[network], [network])

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const unbond = useCallback(
    (amount: bigint, fee?: number) => {
      if (!address) return

      mutate({
        programId,
        functionName: 'unbond_public',
        inputs: [address, `${amount}u64`],
        fee,
      })
    },
    [address, mutate, programId]
  )

  const unbondAsync = useCallback(
    (amount: bigint, fee?: number) => {
      if (!address) return

      mutateAsync({
        programId,
        functionName: 'unbond_public',
        inputs: [address, `${amount}u64`],
        fee,
      })
    },
    [address, mutateAsync, programId]
  )

  return { ...rest, unbond, unbondAsync }
}
