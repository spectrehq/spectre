'use client'

import { ExternalLinkIcon, MenuIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'

export function MobileNav() {
  const t = useTranslations('MainNav')

  const [open, setOpen] = useState(false)
  const handleSetOpen = (open: boolean) => setOpen(open)

  return (
    <Popover open={open} onOpenChange={handleSetOpen}>
      <PopoverTrigger asChild>
        <Button className="lg:hidden" variant="ghost" size="icon">
          <MenuIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-4 w-screen border-none bg-background"
        onClick={() => setOpen(false)}
      >
        <div className="border p-4 rounded-xl bg-background shadow-2xl shadow-muted">
          <ul>
            <li onClick={() => setOpen(false)}>
              <Link className="block w-full p-2" href="/validators">
                {t('validators')}
              </Link>
            </li>

            <li onClick={() => setOpen(false)}>
              <Link className="block w-full p-2" href="/stake">
                {t('stake')}
              </Link>
            </li>

            <li onClick={() => setOpen(false)}>
              <Link
                className="w-full p-2 flex items-center"
                href="https://docs.spectre.guru"
                target="_blank"
                rel="noreferrer"
              >
                <span>{t('documentation')}</span>
                <ExternalLinkIcon className="w-4 h-4 ml-1" />
              </Link>
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}
