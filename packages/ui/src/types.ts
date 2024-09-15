export type AleoAddress = `aleo${number}${string}`

export enum WalletType {
  LeoWallet = 'LeoWallet',
  PuzzleWallet = 'PuzzleWallet',
}

export enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export enum TransactionStatus {
  Creating = 'Creating',
  Pending = 'Pending',
  Settled = 'Settled',
  Failed = 'Failed',
}

export enum RecordStatus {
  Pending = 'Pending',
  Unspent = 'Unspent',
  Spent = 'Spent',
}

export enum TransferType {
  Public = 'Public',
  Private = 'Private',
  PublicToPrivate = 'PublicToPrivate',
  PrivateToPublic = 'PrivateToPublic',
}
