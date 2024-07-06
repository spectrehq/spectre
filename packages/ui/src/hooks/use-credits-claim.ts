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
import { CREDITS_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { AleoAddress, WalletType } from '~/types'
import { useAccount } from './use-account'

export function useCreditsClaim() {
  const { address, walletType } = useAccount()

  const { requestTransaction } = useWallet()

  const network = useNetworkClientStore((store) => store.network)

  return useMutation({
    mutationFn: async ({
      staker,
      fee = 250_000,
    }: {
      staker: AleoAddress
      fee?: number
    }) => {
      if (!address) return

      const programId = CREDITS_PROGRAM_IDS[network]

      if (walletType === WalletType.LeoWallet) {
        const tx = Transaction.createTransaction(
          address!,
          WalletAdapterNetwork.TestnetBeta,
          programId,
          'claim_unbond_public',
          [staker],
          fee,
          false
        )

        const id = await requestTransaction?.(tx)
        if (id) {
          toast.success('Claim unbond successful', {
            description: 'Go to the wallet to check the transaction status',
          })
        } else {
          toast.error('Failed to claim unbond')
        }
      }

      if (walletType === WalletType.PuzzleWallet) {
        const puzzleFee = dn.toNumber(dn.from([BigInt(fee), 6]))

        const event: CreateEventRequestData = {
          address: address as string,
          type: EventType.Execute,
          programId,
          functionId: 'claim_unbond_public',
          fee: puzzleFee,
          inputs: [staker],
        }
        const { eventId, error } = await requestCreateEvent(event)

        if (eventId) {
          // TODO
          const event = await getEvent({
            id: eventId,
            address,
          })

          toast.success('Claim unbond successful', {
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
