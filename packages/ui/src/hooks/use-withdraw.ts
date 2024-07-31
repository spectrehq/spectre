import {
  Transaction,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import {
  type CreateEventRequestData,
  EventStatus,
  EventType,
  getEvent,
  requestCreateEvent,
} from '@puzzlehq/sdk'
import { useMutation } from '@tanstack/react-query'
import * as dn from 'dnum'
import { toast } from 'sonner'
import { WalletType } from '~/types'
import { STCREDITS_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { useAccount } from './use-account'

export function useWithdraw() {
  const { address, walletType } = useAccount()

  const { requestTransaction, transactionStatus } = useWallet()

  const network = useNetworkClientStore((store) => store.network)

  return useMutation({
    mutationFn: async ({ amount, fee }: { amount: bigint; fee: number }) => {
      if (!address) return

      const programId = STCREDITS_PROGRAM_IDS[network]

      if (walletType === WalletType.LeoWallet) {
        const tx = Transaction.createTransaction(
          address!,
          WalletAdapterNetwork.TestnetBeta,
          programId,
          'withdraw',
          [`${amount}u64`],
          fee,
          false
        )

        const id = await requestTransaction?.(tx)

        if (id) {
          const getTransactionStatus = async (id: string) => {
            const status = await transactionStatus?.(id)

            if (status === 'Finalized') {
              return
            }

            await new Promise((resolve) => setTimeout(resolve, 500))

            return getTransactionStatus(id)
          }

          toast.promise(getTransactionStatus(id), {
            loading: 'Waiting for transaction confirmation',
            success: 'Unstaking succeeded',
            error:
              'Getting transaction status failed! You can check the transaction details in your wallet.',
            classNames: {
              closeButton: 'bg-[#F8F8F8]',
            },
          })
        } else {
          toast.error('Failed to request withdrawal')
        }
      }

      if (walletType === WalletType.PuzzleWallet) {
        const puzzleFee = dn.toNumber(dn.from([BigInt(fee), 6]))

        const event: CreateEventRequestData = {
          address: address as string,
          type: EventType.Execute,
          programId,
          functionId: 'withdraw',
          fee: puzzleFee,
          inputs: [`${amount}u64`],
        }
        const { eventId, error } = await requestCreateEvent(event)

        if (eventId) {
          const getEventInner = async ({
            id,
            address,
          }: {
            id: string
            address: string
          }) => {
            const { event, error } = await getEvent({ id, address })

            if (error) {
              // TODO
              console.log(error)
              if (!error.includes('Internal server error')) {
                throw error
              }
            }

            if (event && event.status === EventStatus.Settled) {
              return event
            }

            await new Promise((resolve) => setTimeout(resolve, 500))

            return getEventInner({ id, address })
          }

          toast.promise(getEventInner({ id: eventId, address }), {
            loading: 'Waiting for transaction confirmation',
            success: 'Unstaking succeeded',
            error:
              'Getting transaction status failed! You can check the transaction details in your wallet.',
            classNames: {
              closeButton: 'bg-[#F8F8F8]',
            },
          })
        }

        if (error) {
          toast.error(error)
        }
      }
    },
  })
}
