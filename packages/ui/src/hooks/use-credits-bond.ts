import { useCallback, useMemo } from 'react'
import { CREDITS_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useCreditsBond() {
  const { address, walletType } = useAccount()

  const network = useNetworkClientStore((store) => store.network)

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const programId = useMemo(() => CREDITS_PROGRAM_IDS[network], [network])

  const bond = useCallback(
    (validator: string, recipient: string, amount: bigint, fee?: number) => {
      mutate({
        programId,
        functionName: 'bond_public',
        inputs: [validator, recipient, `${amount}u64`],
        fee,
      })
    },
    [mutate, programId]
  )

  const bondAsync = useCallback(
    (validator: string, recipient: string, amount: bigint, fee?: number) => {
      mutate({
        programId,
        functionName: 'bond_public',
        inputs: [validator, recipient, `${amount}u64`],
        fee,
      })
    },
    [mutate, programId]
  )

  return { ...rest, bond, bondAsync }
}
