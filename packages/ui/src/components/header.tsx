import Link from 'next/link'
import Image from 'next/image'
import LogoImage from '~/assets/logo.png'
import LogoDarkImage from '~/assets/logo-dark.png'
import { ModeToggle } from '~/components/mode-toggle'
import { MainNav } from './main-nav'
import { Account } from './account'
import { MobileNav } from './mobile-nav'

export function Header() {
  return (
    <header>
      <div className="container flex items-center gap-16 py-6">
        <div className="flex flex-none items-center gap-2">
          <MobileNav />
          <Link
            href="/"
            className="font-bold text-lg relative flex items-center"
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
            <span className="inline-block text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
              Staking
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <MainNav />
        </div>
        <div className="flex flex-none items-center gap-4">
          {/* <ModeToggle /> */}
          <Account />
        </div>
      </div>
    </header>
  )
}
