'use client'

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { useStore } from 'zustand'
import { type AccountStore, createAccountStore } from './store'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'

export type AccountStoreApi = ReturnType<typeof createAccountStore>

export const AccountStoreContext = createContext<AccountStoreApi | undefined>(
  undefined
)

export interface AccountStoreProviderProps {
  children: ReactNode
}

export function AccountStoreProvider({ children }: AccountStoreProviderProps) {
  const storeRef = useRef<AccountStoreApi>()

  if (!storeRef.current) {
    storeRef.current = createAccountStore()
  }

  const { connecting, connected, disconnecting } = useWallet()
  //   useEffect(() => {
  //     storeRef.current?.getState().setIsConnecting(connecting)
  //   }, [connecting])
  useEffect(() => {
    storeRef.current?.getState().setIsConnected(connected)
  }, [connected])
  //   useEffect(() => {
  //     storeRef.current?.getState().setIsDisconnecting(disconnecting)
  //   }, [disconnecting])

  return (
    <AccountStoreContext.Provider value={storeRef.current}>
      {children}
    </AccountStoreContext.Provider>
  )
}

export function useAccountStore<T>(selector: (store: AccountStore) => T): T {
  const accountStoreContext = useContext(AccountStoreContext)

  if (!accountStoreContext) {
    throw new Error('useAccountStore must be used within AccountStoreProvider')
  }

  return useStore(accountStoreContext, selector)
}
