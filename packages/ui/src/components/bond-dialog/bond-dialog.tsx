'use client'

import { type ReactNode, useCallback, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { BondWidget } from './bond-widget'
import type { AleoAddress } from '~/types'

export interface BondDialogProps {
  open?: boolean
  step?: number
  validator?: AleoAddress | null
  children?: ReactNode
}

export function BondDialog({
  open: openProps = false,
  step = 0,
  validator,
  children,
}: BondDialogProps) {
  const [open, setOpen] = useState(() => openProps)

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-w-full md:max-w-fit max-h-[90%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Stake</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div>
          <BondWidget step={step} validator={validator} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
