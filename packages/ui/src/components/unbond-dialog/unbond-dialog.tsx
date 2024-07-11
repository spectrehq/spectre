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
import { UnbondWidget } from '../unbond-widget'

export function UnbondDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Withdraw</Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>Withdraw</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <UnbondWidget />
      </DialogContent>
    </Dialog>
  )
}
