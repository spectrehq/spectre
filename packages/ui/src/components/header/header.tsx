import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { MainNav } from './main-nav'

export function Header() {
  return (
    <header>
      <div className="container flex items-center gap-8 py-6">
        <div className="flex flex-none items-center gap-2">
          <Button className="lg:hidden" variant="ghost" size="icon">
            <MenuIcon />
          </Button>
          <Link href="/" className="font-bold text-xl">
            Spectre
          </Link>
        </div>
        <div className="flex-1">
          <MainNav />
        </div>
      </div>
    </header>
  )
}
