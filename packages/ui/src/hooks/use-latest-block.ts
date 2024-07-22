import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'

export interface QueryLatestBlockResponse {
  // TODO
  header: {
    metadata: {
      network: number
      round: number
      height: number
      cumulative_weight: number
      cumulative_proof_target: number
      coinbase_target: number
      proof_target: number
      last_coinbase_target: number
      last_coinbase_timestamp: number
      timestamp: number
    }
  }
}

export function useLatestBlock() {
  const host = useNetworkClientStore((store) => store.host)
  const network = useNetworkClientStore((store) => store.network)

  // TODO
  return useQuery({
    queryKey: ['networkClient', 'latest', 'block'],
    queryFn: (): Promise<QueryLatestBlockResponse> =>
      fetch(`${host}/${network}/latest/block`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()),
  })
}
