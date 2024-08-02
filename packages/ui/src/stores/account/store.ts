import { createStore } from 'zustand/vanilla'

export type AccountState = {
  // address?: string | null
  isConnecting: boolean
  isConnected: boolean
  isDisconnecting: boolean
  isDisconnected: boolean
}

export type AccountActions = {
  setIsConnecting: (isConnecting: boolean) => void
  setIsConnected: (isConnected: boolean) => void
  setIsDisconnecting: (isDisconnecting: boolean) => void
  setIsDisconnected: (isDisconnected: boolean) => void
}

export type AccountStore = AccountState & AccountActions

export const defaultAccountState: AccountState = {
  // address: null,
  isConnecting: false,
  isConnected: false,
  isDisconnecting: false,
  isDisconnected: false,
}

export const createAccountStore = (
  initState: AccountState = defaultAccountState
) =>
  createStore<AccountStore>()((set) => ({
    ...initState,
    setIsConnecting: (isConnecting) => {
      if (isConnecting) {
        set({
          isConnecting: true,
          isConnected: false,
          isDisconnecting: false,
          isDisconnected: false,
        })
      } else {
        set({ isConnecting: false })
      }
    },
    setIsConnected: (isConnected) => {
      if (isConnected) {
        set({
          isConnecting: false,
          isConnected: true,
          isDisconnecting: false,
          isDisconnected: false,
        })
      } else {
        set({ isConnected: false, isDisconnected: true })
      }
    },
    setIsDisconnecting: (isDisconnecting) => {
      if (isDisconnecting) {
        set({
          isConnected: false,
          isConnecting: false,
          isDisconnecting: true,
          isDisconnected: false,
        })
      } else {
        set({ isDisconnecting: false })
      }
    },
    setIsDisconnected: (isDisconnected) => {
      if (isDisconnected) {
        set({
          isConnected: false,
          isConnecting: false,
          isDisconnecting: false,
          isDisconnected: true,
        })
      } else {
        set({ isConnected: true, isDisconnected: false })
      }
    },
  }))
