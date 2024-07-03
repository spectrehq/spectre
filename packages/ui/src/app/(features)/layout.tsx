import type { PropsWithChildren } from 'react'
import { Providers } from './providers'

export default function FeaturesLayout({ children }: PropsWithChildren) {
  return <Providers>{children}</Providers>
}
