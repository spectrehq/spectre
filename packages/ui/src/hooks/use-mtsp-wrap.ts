import { useCallback } from 'react'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useMtspWrap() {
  const { address, walletType } = useAccount()

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const wrap = useCallback(
    (token: string, amount: bigint, fee?: number) => {
      mutate({
        programId: token,
        functionName: 'wrap_mtsp',
        inputs: [`${amount}u64`],
        fee,
      })
    },
    [mutate]
  )

  const wrapAsync = useCallback(
    (token: string, amount: bigint, fee?: number) => {
      mutateAsync({
        programId: token,
        functionName: 'wrap_mtsp',
        inputs: [`${amount}u64`],
        fee,
      })
    },
    [mutateAsync]
  )

  return { ...rest, wrap, wrapAsync }
}
