declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENDPOINT: string
      NETWORK: string
      PRIVATE_KEY: string
      ADMIN_PRIVATE_KEY?: string
      STAKING_ADMIN_PRIVATE_KEY?: string
      STAKING_OPERATOR_PRIVATE_KEY?: string
    }
  }
}

export {}
