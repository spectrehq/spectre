'use client'

import { useCallback, useState } from 'react'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { BondWidget } from './bond-widget'

export interface BondDialogProps {
  open?: boolean
}

export function BondDialog({ open: openProps = false }: BondDialogProps) {
  const [open, setOpen] = useState(openProps)

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Stake</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Stake</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div>
          <BondWidget />
        </div>
      </DialogContent>
    </Dialog>
  )
}
