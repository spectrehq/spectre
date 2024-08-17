import { useCallback } from 'react'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useTransferPublic() {
  const { address, walletType } = useAccount()

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const transferPublic = useCallback(
    (token: string, amount: bigint, receiver: string, fee?: number) => {
      mutate({
        programId: token,
        functionName: 'transfer_public',
        inputs: [receiver, `${amount}u64`],
        fee,
      })
    },
    [mutate]
  )

  const transferPublicAsync = useCallback(
    (token: string, amount: bigint, receiver: string, fee?: number) => {
      mutateAsync({
        programId: token,
        functionName: 'transfer_public',
        inputs: [receiver, `${amount}u64`],
        fee,
      })
    },
    [mutateAsync]
  )

  return { ...rest, transferPublic, transferPublicAsync }
}
