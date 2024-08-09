import {
  Transaction,
  WalletAdapterNetwork,
  type WalletTransactionError,
} from '@demox-labs/aleo-wallet-adapter-base'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import {
  EventStatus,
  EventType,
  getEvent,
  requestCreateEvent,
  type CreateEventRequestData,
} from '@puzzlehq/sdk'
import { useMutation } from '@tanstack/react-query'
import * as dn from 'dnum'
import { useState } from 'react'
import { TransactionStatus, WalletType } from '~/types'

export interface SendTransactionMutationParams {
  programId: string
  functionName: string
  inputs: string[]
  fee?: number
}

export interface UseSendTransactionOptions {
  address?: string | null
  walletType?: WalletType | null
}

export function useSendTransaction({
  address,
  walletType,
}: UseSendTransactionOptions) {
  const { requestTransaction, transactionStatus: getTransactionStatus } =
    useWallet()

  const [transactionStatus, setTransactionStatus] =
    useState<TransactionStatus>()

  const mutation = useMutation({
    mutationFn: async ({
      programId,
      functionName,
      inputs,
      fee = 250_000,
    }: SendTransactionMutationParams) => {
      if (!address || !walletType) return

      if (walletType === WalletType.LeoWallet) {
        const tx = Transaction.createTransaction(
          address,
          WalletAdapterNetwork.TestnetBeta, // TODO: replace mainnet
          programId,
          functionName,
          inputs,
          fee,
          false
        )

        setTransactionStatus(TransactionStatus.Creating)
        let transactionId: string | undefined

        try {
          transactionId = await requestTransaction?.(tx)
        } catch (e) {
          setTransactionStatus(TransactionStatus.Failed)

          if ((e as WalletTransactionError).name === 'WalletTransactionError') {
            const error = e as WalletTransactionError
            // TODO
            throw error
          }
        }

        if (!transactionId) {
          setTransactionStatus(TransactionStatus.Failed)
          // TODO
          throw new Error('Unknown error')
        }

        setTransactionStatus(TransactionStatus.Pending)

        while (true) {
          const transactionStatus = await getTransactionStatus?.(transactionId)

          if (transactionStatus === 'Finalized') {
            setTransactionStatus(TransactionStatus.Settled)
            break
          }

          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      }

      if (walletType === WalletType.PuzzleWallet) {
        const puzzleFee = dn.toNumber([BigInt(fee), 6])

        const event: CreateEventRequestData = {
          address,
          type: EventType.Execute,
          programId,
          functionId: functionName,
          fee: puzzleFee,
          inputs,
        }

        setTransactionStatus(TransactionStatus.Creating)

        const { eventId, error } = await requestCreateEvent(event)

        if (error) {
          console.log(error)
          setTransactionStatus(TransactionStatus.Failed)
          // TODO
          throw new Error(error)
        }

        if (eventId) {
          setTransactionStatus(TransactionStatus.Pending)

          while (true) {
            const { event, error } = await getEvent({ id: eventId, address })

            if (error) {
              console.log(error)

              if (error.includes('Internal server error')) {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                continue
              }

              // TODO
              throw new Error(error)
            }

            if (!event) {
              throw new Error('Unknown error')
            }

            if (event.status === EventStatus.Creating) {
              setTransactionStatus(TransactionStatus.Pending)
            } else {
              setTransactionStatus(event.status as unknown as TransactionStatus)
            }

            if (
              event.status === EventStatus.Settled ||
              event.status === EventStatus.Failed
            ) {
              break
            }

            await new Promise((resolve) => setTimeout(resolve, 500))
          }
        }
      }
    },
  })

  const reset = () => {
    mutation.reset()
    setTransactionStatus(undefined)
  }

  return { ...mutation, reset, transactionStatus }
}
