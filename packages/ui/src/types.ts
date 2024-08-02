export type AleoAddress = `aleo${number}${string}`

export enum WalletType {
  LeoWallet = 'LeoWallet',
  PuzzleWallet = 'PuzzleWallet',
}

export enum Network {
  // Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export enum TransactionStatus {
  Creating = 'Creating',
  Pending = 'Pending',
  Settled = 'Settled',
  Failed = 'Failed',
}
