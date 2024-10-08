import { useCallback, useMemo } from 'react'
import { STCREDITS_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useClaim() {
  const { address, walletType } = useAccount()

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const network = useNetworkClientStore((store) => store.network)

  const programId = useMemo(() => STCREDITS_PROGRAM_IDS[network], [network])

  const claim = useCallback(
    (amount: bigint, fee?: number) => {
      mutate({
        programId,
        functionName: 'claim',
        inputs: [`${amount}u64`],
        fee,
      })
    },
    [mutate, programId]
  )

  const claimAsync = useCallback(
    (amount: bigint, fee?: number) =>
      mutateAsync({
        programId,
        functionName: 'claim',
        inputs: [`${amount}u64`],
        fee,
      }),
    [mutateAsync, programId]
  )

  return { ...rest, claim, claimAsync }
}
