'use client'

import { usePathname } from 'next/navigation'
import { type ForwardedRef, forwardRef, type ReactNode } from 'react'
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu'

export interface NavLinkProps {
  href: string
  children: ReactNode
}

export const NavLink = forwardRef(function NavLink(
  { children, href }: NavLinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  const pathname = usePathname()

  return (
    <NavigationMenuLink className={navigationMenuTriggerStyle()} ref={ref}>
      {children}
    </NavigationMenuLink>
  )
})
