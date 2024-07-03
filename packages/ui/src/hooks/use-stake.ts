import {
  Transaction,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import {
  type CreateEventRequestData,
  EventType,
  getEvent,
  requestCreateEvent,
} from '@puzzlehq/sdk'
import { useMutation } from '@tanstack/react-query'
import * as dn from 'dnum'
import { toast } from 'sonner'
import { WalletType } from '~/types'
import { useAccount } from './use-account'
import { STCREDITS_POINTS_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'

export interface UseStakeParams {
  amount: number
  fee: number
}

export function useStake() {
  const { address, walletType } = useAccount()

  const { requestTransaction } = useWallet()

  const network = useNetworkClientStore((store) => store.network)

  return useMutation({
    mutationFn: async ({
      amount,
      fee = 250_000,
    }: {
      amount: bigint
      fee?: number
    }) => {
      if (!address) return

      const programId = STCREDITS_POINTS_PROGRAM_IDS[network]

      if (walletType === WalletType.LeoWallet) {
        const tx = Transaction.createTransaction(
          address!,
          WalletAdapterNetwork.TestnetBeta,
          programId,
          'apply',
          [`${amount}u64`],
          fee,
          false
        )

        const id = await requestTransaction?.(tx)
        if (id) {
          toast.success('Staking successful', {
            description: 'Go to the wallet to check the transaction status',
          })
        } else {
          toast.error('Failed to stake')
        }
      }

      if (walletType === WalletType.PuzzleWallet) {
        const puzzleFee = dn.toNumber(dn.from([BigInt(fee), 6]))

        const event: CreateEventRequestData = {
          address: address as string,
          type: EventType.Execute,
          programId,
          functionId: 'apply',
          fee: puzzleFee,
          inputs: [`${amount}u64`, address],
        }
        const { eventId, error } = await requestCreateEvent(event)

        if (eventId) {
          // TODO
          const event = await getEvent({
            id: eventId,
            address,
          })

          toast.success('Staking successful', {
            description: 'Go to the wallet to check the transaction status',
          })
        }

        if (error) {
          toast.error(error)
        }
      }
    },
  })
}
