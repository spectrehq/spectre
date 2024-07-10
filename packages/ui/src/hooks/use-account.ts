import { useWallet as useLeoWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { useConnect, useAccount as usePuzzleAccount } from '@puzzlehq/sdk'
import { useMemo } from 'react'
import { type AleoAddress, WalletType } from '~/types'

export function useAccount() {
  const { publicKey, connected: isLeoConnected } = useLeoWallet()
  const { isConnected: isPuzzleConnected } = useConnect()
  const { account } = usePuzzleAccount()

  const address = useMemo(() => {
    if (isLeoConnected && publicKey) {
      return publicKey as AleoAddress
    }

    if (isPuzzleConnected && account?.address) {
      return account.address as AleoAddress
    }

    return null
  }, [account, publicKey, isLeoConnected, isPuzzleConnected])

  const isConnected = useMemo(
    () => isLeoConnected || isPuzzleConnected,
    [isLeoConnected, isPuzzleConnected]
  )

  const walletType = useMemo(() => {
    if (isLeoConnected) {
      return WalletType.LeoWallet
    }

    if (isPuzzleConnected) {
      return WalletType.PuzzleWallet
    }

    return null
  }, [isLeoConnected, isPuzzleConnected])

  return { address, isConnected, walletType }
}
