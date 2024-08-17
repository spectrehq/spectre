type ARC20Token = {
  id: string
  programId: string
  tokenType: 'ARC20'
}

type ARC21Token = {
  id: string
  tokenId: string
  tokenType: 'ARC21'
}

const tokens: (ARC20Token | ARC21Token)[] = [
  {
    id: 'stCredits',
    programId: 'staking_stcredits_v1_001.aleo',
    tokenType: 'ARC20',
  },
  {
    id: 'wstCredits',
    tokenId:
      '476751808449955005485749602256602822702928865828767689155319721929394953292field',
    tokenType: 'ARC21',
  },
]
