import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { ModeToggle } from '~/components/mode-toggle'
import { MainNav } from './main-nav'

export function Header() {
  return (
    <header>
      <div className="container flex items-center gap-8 py-6">
        <div className="flex flex-none items-center gap-2">
          <Button className="lg:hidden" variant="ghost" size="icon">
            <MenuIcon />
          </Button>
          <Link href="/" className="font-bold text-2xl">
            <span>A</span>
            <span>leo</span>
            <span className="inline-block text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
              Staking
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <MainNav />
        </div>
        <div className="flex flex-none items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
