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
import type { PropsWithChildren } from 'react'

export function UnbondDialog({ children }: PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Unstake</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <UnbondWidget />
      </DialogContent>
    </Dialog>
  )
}
