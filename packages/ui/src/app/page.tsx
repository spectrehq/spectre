import Link from 'next/link'
import { Button } from '~/components/ui/button'

export default function HomePage() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[1000px] w-full fill-secondary stroke-foreground/5 dark:stroke-foreground/10 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
      >
        <rect width="100%" height="100%" fill="url(#:rd:)" strokeWidth="0" />
        <svg x="50%" y="-96" strokeWidth="0" className="overflow-visible">
          <title>Hero Background</title>
          <path
            transform="translate(64 160)"
            d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
          />
          <path
            transform="translate(128 320)"
            d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
          />
          <path
            transform="translate(288 480)"
            d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
          />
          <path
            transform="translate(512 320)"
            d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
          />
          <path
            transform="translate(544 640)"
            d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
          />
          <path
            transform="translate(320 800)"
            d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
          />
        </svg>
        <defs>
          <pattern
            id=":rd:"
            width="96"
            height="480"
            x="50%"
            patternUnits="userSpaceOnUse"
            patternTransform="translate(0 -96)"
            fill="none"
          >
            <path d="M128 0 98.572 147.138A16 16 0 0 1 82.883 160H13.117a16 16 0 0 0-15.69 12.862l-26.855 134.276A16 16 0 0 1-45.117 320H-116M64-160 34.572-12.862A16 16 0 0 1 18.883 0h-69.766a16 16 0 0 0-15.69 12.862l-26.855 134.276A16 16 0 0 1-109.117 160H-180M192 160l-29.428 147.138A15.999 15.999 0 0 1 146.883 320H77.117a16 16 0 0 0-15.69 12.862L34.573 467.138A16 16 0 0 1 18.883 480H-52M-136 480h58.883a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1-18.883 320h69.766a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1 109.117 160H192M-72 640h58.883a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1 45.117 480h69.766a15.999 15.999 0 0 0 15.689-12.862l26.856-134.276A15.999 15.999 0 0 1 173.117 320H256M-200 320h58.883a15.999 15.999 0 0 0 15.689-12.862l26.856-134.276A16 16 0 0 1-82.883 160h69.766a16 16 0 0 0 15.69-12.862L29.427 12.862A16 16 0 0 1 45.117 0H128" />
          </pattern>
        </defs>
      </svg>
      <main className="flex-auto">
        <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 md:mt-56 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="max-w-3xl">
              <h1 className="font-display text-5xl font-medium tracking-tight [text-wrap:balance] sm:text-7xl">
                AleoStaking liquidity protocol: Stake credits and earn rewards.
              </h1>
              <p className="mt-6 text-xl" />
              <div className="pt-12">
                <Button
                  className="rounded-full px-10 py-4 h-auto text-2xl"
                  asChild
                >
                  <Link href="/stake">Stake credits</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-56 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="flex" style={{ opacity: 1, transform: 'none' }}>
                <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-secondary transition hover:bg-secondary sm:p-8">
                  <h3>
                    <div>
                      <span className="absolute inset-0 rounded-3xl" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shield-check stroke-green-600"
                      >
                        <title>Shield Check</title>
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                  </h3>
                  <p className="font-display mt-6 text-2xl font-semibold">
                    Best-in-class security
                  </p>
                  <p className="mt-4 text-base text-muted-foreground">
                    AleoStaking offers best-in-class security with its
                    open-source codebase, allowing anyone to review and verify
                    its integrity and robustness.
                  </p>
                </article>
              </div>
              <div className="flex" style={{ opacity: 1, transform: 'none' }}>
                <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-secondary transition hover:bg-secondary sm:p-8">
                  <h3>
                    <div>
                      <span className="absolute inset-0 rounded-3xl" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-medal stroke-amber-600"
                      >
                        <title>Medal</title>
                        <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
                        <path d="M11 12 5.12 2.2" />
                        <path d="m13 12 5.88-9.8" />
                        <path d="M8 7h8" />
                        <circle cx="12" cy="17" r="5" />
                        <path d="M12 18v-2h-.5" />
                      </svg>
                    </div>
                  </h3>
                  <p className="font-display mt-6 text-2xl font-semibold">
                    Competitive rewards
                  </p>
                  <p className="mt-4 text-base text-muted-foreground">
                    AleoStaking ensures competitive rewards by distributing
                    staked assets across multiple validators, providing users
                    with more stable and consistent returns.
                  </p>
                </article>
              </div>
              <div className="flex" style={{ opacity: 1, transform: 'none' }}>
                <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-secondary transition hover:bg-secondary sm:p-8">
                  <h3>
                    <div>
                      <span className="absolute inset-0 rounded-3xl" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-waves stroke-sky-600"
                      >
                        <title>Waves</title>
                        <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                        <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                        <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                      </svg>
                    </div>
                  </h3>
                  <p className="font-display mt-6 text-2xl font-semibold">
                    Deepest liquidity
                  </p>
                  <p className="mt-4 text-base text-muted-foreground">
                    With AleoStaking, you can stake your ALEO and receive
                    stALEO, maintaining liquidity and maximizing capital
                    efficiency by earning staking rewards while participating in
                    other DeFi activities.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
