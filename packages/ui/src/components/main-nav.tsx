import { ExternalLinkIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
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
              className={cn(navigationMenuTriggerStyle(), 'text-base')}
            >
              {t('staking')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="relative">
          <Link href="/liquid-staking" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), 'text-base')}
            >
              {t('liquidStaking')}
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
