import { useBalance as usePuzzleBalance } from '@puzzlehq/sdk'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { useMemo } from 'react'
import { useAccount } from './use-account'
import { type AleoAddress, WalletType } from '~/types'
import { useQuery } from '@tanstack/react-query'
import { u64 } from 'spectre'

export function usePrivateBalance() {
  const { walletType } = useAccount()
  const { balances } = usePuzzleBalance()

  const { requestRecords } = useWallet()

  const { data: leoWalletBalance } = useQuery({
    queryKey: ['leoWallet', 'credits', 'privateBalance'],
    queryFn: async () => {
      const res: {
        id: string
        owner: AleoAddress
        program_id: string
        spent: boolean
        recordName: string
        data: {
          microcredits: string
        }
      }[] = (await requestRecords?.('credits.aleo')) ?? []

      return res
        .filter((record) => !record.spent)
        .reduce((acc, record) => {
          return acc + u64(record.data.microcredits.split('.')?.[0] ?? '0u64')
        }, 0n)
    },
    enabled: Boolean(requestRecords) && walletType === WalletType.LeoWallet,
  })

  const data = useMemo(() => {
    if (walletType === WalletType.LeoWallet) {
      return leoWalletBalance
    }

    if (walletType === WalletType.PuzzleWallet) {
      return BigInt(
        balances?.filter((balance) => balance.programId === 'credits.aleo')?.[0]
          ?.values.private ?? 0
      )
    }
  }, [balances, walletType, leoWalletBalance])

  return { data }
}
