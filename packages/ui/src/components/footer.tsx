import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-7xl px-6 sm:mt-32 lg:mt-40 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <div className="flex lg:justify-end" />
          <nav>
            <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <li>
                <div className="font-display text-sm font-semibold tracking-wider">
                  Spectre
                </div>
                <ul className="mt-4 text-sm text-muted-foreground">
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="/stake"
                    >
                      Stake credits
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="/withdrawals"
                    >
                      Withdraw
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="/withdrawals/claim"
                    >
                      Claim
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <div className="font-display text-sm font-semibold tracking-wider">
                  Developers
                </div>
                <ul className="mt-4 text-sm text-muted-foreground">
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="https://docs.spectre.guru"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="https://github.com/spectrehq"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Github
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <div className="font-display text-sm font-semibold tracking-wider">
                  Community
                </div>
                <ul className="mt-4 text-sm text-muted-foreground">
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="https://discord.gg/TTjeZkdqzW"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Discord
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="https://t.me/+1E2ggQVJgUo5NzBl"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Telegram
                    </Link>
                  </li>
                  {/* <li className="mt-4">
                    <Link
                      className="transition hover:text-neutral-950"
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Twitter
                    </Link>
                  </li> */}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-24 flex flex-wrap items-end justify-center md:justify-between gap-x-6 gap-y-4 border-t border-secondary py-12">
          <Link className="hidden md:block" aria-label="Home" href="/">
            Spectre
          </Link>
          <p className="text-sm text-muted-foreground">
            Powered by the Spectre team
          </p>
        </div>
      </div>
    </footer>
  )
}
