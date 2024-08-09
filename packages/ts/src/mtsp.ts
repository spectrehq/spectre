import { fieldStr, parsePlaintext, ProgramBase, u128 } from './types'
import { bhp256HashToField } from './wasm'

export interface TokenMetadata {
  token_id: string
  name: bigint
  symbol: bigint
  decimals: bigint
  supply: bigint
  max_supply: bigint
  admin: string
  external_authorization_required: boolean
  external_authorization_party: string
}

export interface Balance {
  token_id: bigint
  account: string
  balance: bigint
  authorized_until: bigint
}

export class MtspProgram extends ProgramBase {
  async getRegisteredTokens(tokenId: bigint) {
    const meta = await this.getMappingValueOrNull('registered_tokens', fieldStr(tokenId))
    return meta === null ? null : (parsePlaintext(meta) as unknown as TokenMetadata)
  }

  async getBalance(tokenId: bigint, address: string) {
    const hash = await bhp256HashToField(`{
      account: ${address},
      token_id: ${fieldStr(tokenId)}
    }`)

    const balance = await this.getMappingValueOrNull('balances', hash)
    return balance === null
      ? ({
          token_id: tokenId,
          account: address,
          balance: 0n,
          authorized_until: 0n,
        } as Balance)
      : (parsePlaintext(balance) as unknown as Balance)
  }

  async getAuthorizedBalances(tokenId: bigint, address: string) {
    const hash = await bhp256HashToField(`{
      account: ${address},
      token_id: ${fieldStr(tokenId)}
    }`)

    const balance = await this.getMappingValueOrNull('authorized_balances', hash)
    return balance === null
      ? ({
          token_id: tokenId,
          account: address,
          balance: 0n,
          authorized_until: 0n,
        } as Balance)
      : (parsePlaintext(balance) as unknown as Balance)
  }

  async getAllowance(tokenId: bigint, address: string, spender: string) {
    const hash = await bhp256HashToField(`{
      account: ${address},
      spender: ${spender},
      token_id: ${fieldStr(tokenId)}
    }`)

    const allowance = await this.getMappingValueOrNull('allowances', hash)
    return allowance === null ? 0n : u128(allowance)
  }
}
