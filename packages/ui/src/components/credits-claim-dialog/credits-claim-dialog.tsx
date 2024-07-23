'use client'

import type { PropsWithChildren } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { CreditsClaimWidget } from '~/components/credits-claim-widget'

export function CreditsClaimDialog({ children }: PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>Claim</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <CreditsClaimWidget />
      </DialogContent>
    </Dialog>
  )
}
