'use client'

import { type ReactNode, createContext, useContext, useRef } from 'react'
import { useStore } from 'zustand'
import { type NetworkClientStore, createNetworkClientStore } from './store'

export type NetworkClientStoreApi = ReturnType<typeof createNetworkClientStore>

export const NetworkClientStoreContext = createContext<
  NetworkClientStoreApi | undefined
>(undefined)

export interface NetworkClientStoreProviderProps {
  children: ReactNode
}

export function NetworkClientStoreProvider({
  children,
}: NetworkClientStoreProviderProps) {
  const storeRef = useRef<NetworkClientStoreApi>()

  if (!storeRef.current) {
    storeRef.current = createNetworkClientStore()
  }

  return (
    <NetworkClientStoreContext.Provider value={storeRef.current}>
      {children}
    </NetworkClientStoreContext.Provider>
  )
}

export function useNetworkClientStore<T>(
  selector: (store: NetworkClientStore) => T,
): T {
  const networkClientStoreContext = useContext(NetworkClientStoreContext)

  if (!networkClientStoreContext) {
    throw new Error(
      'useNetworkClientStore must be used within NetworkClientStoreProvider',
    )
  }

  return useStore(networkClientStoreContext, selector)
}
