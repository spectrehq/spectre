'use client'

import { ExternalLinkIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu'
import { cn } from '~/lib/utils'

export function MainNav() {
  const t = useTranslations('MainNav')
  const pathname = usePathname()

  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        {/* <NavigationMenuItem className="relative">
          <Link href="/withdrawals" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t('withdrawals')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        <NavigationMenuItem className="relative">
          <Link href="/staking" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                'text-base',
                pathname.startsWith('/staking') &&
                  'bg-accent text-accent-foreground outline-none'
              )}
            >
              {t('staking')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="relative">
          <Link href="/liquid-staking" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                'text-base',
                pathname.startsWith('/liquid-staking') &&
                  'bg-accent text-accent-foreground outline-none'
              )}
            >
              {t('liquidStaking')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="relative">
          <Link href="/points" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                'text-base',
                pathname.startsWith('/points') &&
                  'bg-accent text-accent-foreground outline-none'
              )}
            >
              {t('points')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="relative">
          <Link href="https://docs.spectre.guru" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), 'text-base')}
              target="_blank"
              rel="noreferrer"
            >
              <span>{t('documentation')}</span>
              <ExternalLinkIcon className="w-4 h-4 ml-1" />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
