'use client'

import { ChevronRightIcon, MenuIcon, XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRef, useState } from 'react'
import Image from 'next/image'
import LogoImage from '~/assets/logo.png'
import LogoDarkImage from '~/assets/logo-dark.png'
import { Button } from '~/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { cn } from '~/lib/utils'

export function MobileNav() {
  const t = useTranslations('MainNav')

  const [open, setOpen] = useState(false)
  const handleSetOpen = (open: boolean) => setOpen(open)
  const divRef = useRef<HTMLDivElement>(null)

  return (
    <Popover open={open} onOpenChange={handleSetOpen} modal>
      <PopoverTrigger asChild>
        <Button className="lg:hidden" variant="ghost" size="icon">
          <MenuIcon className={cn('w-8 h-8', open ? 'hidden' : 'block')} />
          <XIcon className={cn('w-8 h-8', open ? 'block' : 'hidden')} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="py-0 px-0 w-screen border-none bg-background h-svh overflow-hidden !animate-none"
        sideOffset={0}
        ref={divRef}
      >
        <header className="hidden">
          <div className="container flex justify-between items-center py-6">
            <div className="flex flex-none items-center gap-2">
              <Link
                href="/"
                className="font-bold text-lg relative flex items-center"
                onClick={() => setOpen(false)}
              >
                <Image
                  src={LogoImage}
                  alt=""
                  width={40}
                  height={40}
                  className="mr-2 block dark:hidden"
                />
                <Image
                  src={LogoDarkImage}
                  alt=""
                  width={40}
                  height={40}
                  className="mr-2 hidden dark:block"
                />
                <span>Aleo</span>
                <span className="text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
                  Staking
                </span>
              </Link>
            </div>
            <div>
              <Button
                className="lg:hidden"
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <XIcon className={cn(open ? 'block' : 'hidden')} />
              </Button>
            </div>
          </div>
        </header>
        <div className="container py-10">
          <ul className="text-xl">
            <li className="border-b py-2">
              <Link
                className="flex w-full p-2 justify-between items-center"
                href="/staking"
                onClick={() => setOpen(false)}
              >
                {t('staking')}
                <ChevronRightIcon />
              </Link>
            </li>

            <li className="border-b py-2">
              <Link
                className="w-full p-2 flex justify-between items-center"
                href="/liquid-staking"
                onClick={() => setOpen(false)}
              >
                {t('liquidStaking')}
                <ChevronRightIcon />
              </Link>
            </li>

            <li className="py-2">
              <Link
                className="w-full p-2 flex justify-between items-center"
                href="https://docs.spectre.guru"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                <span>{t('documentation')}</span>
                <ChevronRightIcon />
              </Link>
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}
