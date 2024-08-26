import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'

export function useBlockHeight() {
  const host = useNetworkClientStore((store) => store.host)
  const network = useNetworkClientStore((store) => store.network)

  // TODO
  return useQuery({
    queryKey: ['networkClient', 'blockHeight', 'latest'],
    queryFn: (): Promise<number> =>
      fetch(`${host}/${network}/latest/height`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()),
    refetchInterval: 10 * 1000,
  })
}
