import { useCallback } from 'react'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useMtspUnwrap() {
  const { address, walletType } = useAccount()

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const unwrap = useCallback(
    (token: string, amount: bigint, fee?: number) => {
      mutate({
        programId: token,
        functionName: 'unwrap_mtsp',
        inputs: [`${amount}u64`],
        fee,
      })
    },
    [mutate]
  )

  const unwrapAsync = useCallback(
    (token: string, amount: bigint, fee?: number) => {
      mutateAsync({
        programId: token,
        functionName: 'unwrap_mtsp',
        inputs: [`${amount}u64`],
        fee,
      })
    },
    [mutateAsync]
  )

  return { ...rest, unwrap, unwrapAsync }
}
