'use client'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { CreditsClaimWidget } from '../credits-claim-widget'

export function CreditsClaimDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Claim</Button>
      </DialogTrigger>
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
