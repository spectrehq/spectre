import Link from 'next/link'
import Image from 'next/image'
import { Button } from '~/components/ui/button'
import FeaturesImage from '~/assets/features-banner.jpg'
import { Separator } from '~/components/ui/separator'

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
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-60">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:max-w-lg lg:max-w-full mx-auto">
            <div className="flex flex-row gap-14 lg:flex-col justify-start lg:justify-center">
              <div className="flex flex-col lg:flex-row items-center h-64 lg:h-auto">
                <div className="p-4 border rounded-full">
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1079.72 1080"
                    className="w-16 h-16 flex-none"
                  >
                    <title>Aleo Logo</title>
                    <polygon
                      className="fill-current"
                      points="612.33 247.34 547.82 247.34 477.26 247.34 360 589.53 431.41 589.53 526.38 310.37 560.76 310.37 655.72 589.53 524.82 589.53 431.41 589.53 409.31 652.56 546.1 652.56 677.01 652.56 738.4 832.66 812.08 832.66 612.33 247.34"
                    />
                    <polygon
                      className="fill-current"
                      points="276.69 832.66 347.91 832.66 409.31 652.56 338.4 652.56 276.69 832.66"
                    />
                    <polygon
                      className="fill-current"
                      points="289.24 589.53 267.64 652.56 338.4 652.56 360 589.53 289.24 589.53"
                    />
                  </svg>
                </div>
                <Separator
                  className="lg:hidden flex-1"
                  orientation="vertical"
                />
                <Separator className="hidden lg:block flex-1" />
              </div>
              <div>
                <div className="text-4xl">Stake</div>
                <div className="text-2xl">Credits</div>
              </div>
            </div>
            <div className="flex flex-row gap-14 lg:flex-col justify-start lg:justify-center">
              <div className="flex flex-col lg:flex-row items-center h-64 lg:h-auto">
                <div className="p-4 border rounded-full">
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1079.72 1080"
                    className="w-16 h-16 flex-none"
                    stroke="url(#grad1)"
                    fill="url(#grad1)"
                  >
                    <title>Aleo Logo</title>
                    <defs>
                      <linearGradient
                        id="grad1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: '#b794f4', stopOpacity: 1 }}
                        />
                        <stop
                          offset="50%"
                          style={{ stopColor: '#ed64a6', stopOpacity: 1 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: '#f56565', stopOpacity: 1 }}
                        />
                      </linearGradient>
                    </defs>
                    <polygon points="612.33 247.34 547.82 247.34 477.26 247.34 360 589.53 431.41 589.53 526.38 310.37 560.76 310.37 655.72 589.53 524.82 589.53 431.41 589.53 409.31 652.56 546.1 652.56 677.01 652.56 738.4 832.66 812.08 832.66 612.33 247.34" />
                    <polygon points="276.69 832.66 347.91 832.66 409.31 652.56 338.4 652.56 276.69 832.66" />
                    <polygon points="289.24 589.53 267.64 652.56 338.4 652.56 360 589.53 289.24 589.53" />
                  </svg>
                </div>
                <Separator
                  className="lg:hidden flex-1"
                  orientation="vertical"
                />
                <Separator className="hidden lg:block flex-1" />
              </div>
              <div>
                <div className="text-4xl">Receive</div>
                <div className="text-2xl">stCredits and get rewards</div>
              </div>
            </div>
            <div className="flex flex-row gap-14 lg:flex-col justify-start lg:justify-center">
              <div className="flex flex-col lg:flex-row items-center h-64 lg:h-auto">
                <div className="p-4 border rounded-full">
                  <span className="inline-flex justify-center items-center w-16 h-16">
                    Swap
                  </span>
                </div>
                <div className="p-4 border rounded-full translate-x-0 -translate-y-4 lg:translate-y-0 lg:-translate-x-4">
                  <span className="inline-flex justify-center items-center w-16 h-16">
                    Lending
                  </span>
                </div>
              </div>
              <div>
                <div className="text-4xl">Use</div>
                <div className="text-2xl">stCredits in DeFi</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-24 sm:mt-32 lg:mt-40 max-w-7xl px-6 lg:px-8">
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
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32 lg:mt-40">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="lg:flex lg:items-center lg:justify-end">
              <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
                <div className="w-[33.75rem] flex-none lg:w-[45rem]">
                  <div className="justify-center lg:justify-end relative flex aspect-[719/680] w-full ">
                    <svg viewBox="0 0 655 680" fill="none" className="h-full">
                      <title>Features</title>
                      <g clipPath="url(#:S1:-clip)" className="group">
                        <g className="origin-center scale-100 transition duration-500 motion-safe:group-hover:scale-105">
                          <foreignObject width="655" height="680">
                            <Image
                              src={FeaturesImage}
                              alt=""
                              width={2400}
                              height={3000}
                              className="w-full bg-neutral-100 object-cover scale-150"
                              sizes="(min-width: 1024px) 41rem, 31rem"
                            />
                          </foreignObject>
                        </g>
                        <use
                          href="#:S1:-shape"
                          strokeWidth="2"
                          className="stroke-primary/10"
                        />
                      </g>
                      <defs>
                        <clipPath id=":S1:-clip">
                          <path
                            id=":S1:-shape"
                            d="M537.827 9.245A11.5 11.5 0 0 1 549.104 0h63.366c7.257 0 12.7 6.64 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 586.87 151h-28.275a15.999 15.999 0 0 0-15.689 12.862l-59.4 297c-1.98 9.901 5.592 19.138 15.689 19.138h17.275l.127.001c.85.009 1.701.074 2.549.009 11.329-.874 21.411-7.529 24.88-25.981.002-.012.016-.016.023-.007.008.009.022.005.024-.006l24.754-123.771A11.5 11.5 0 0 1 580.104 321h63.366c7.257 0 12.7 6.639 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 617.87 472H559c-22.866 0-28.984 7.98-31.989 25.931-.004.026-.037.035-.052.014-.015-.02-.048-.013-.053.012l-24.759 123.798A11.5 11.5 0 0 1 490.87 631h-29.132a14.953 14.953 0 0 0-14.664 12.021c-4.3 21.502-23.18 36.979-45.107 36.979H83.502c-29.028 0-50.8-26.557-45.107-55.021l102.4-512C145.096 91.477 163.975 76 185.902 76h318.465c10.136 0 21.179-5.35 23.167-15.288l10.293-51.467Zm-512 160A11.5 11.5 0 0 1 37.104 160h63.366c7.257 0 12.7 6.639 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 74.87 311H11.504c-7.257 0-12.7-6.639-11.277-13.755l25.6-128Z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <ul className="text-base mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
                  <li className="group mt-10 first:mt-0">
                    <div>
                      <div className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden relative before:absolute after:absolute before:bg-primary after:bg-primary/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px">
                        <strong className="font-semibold">stCredits. </strong>
                        Aleo leading liquid staking token, with best-in-class
                        security, deepest liquidity and competitive rewards.
                      </div>
                    </div>
                  </li>
                  <li className="group mt-10 first:mt-0">
                    <div>
                      <div className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden relative before:absolute after:absolute before:bg-primary after:bg-primary/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px">
                        <strong className="font-semibold">
                          Higher returns.{' '}
                        </strong>
                        In addition to Aleo staking rewards, you can get
                        additional point rewards by staking on the platform.
                      </div>
                    </div>
                  </li>
                  <li className="group mt-10 first:mt-0">
                    <div>
                      <div className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden relative before:absolute after:absolute before:bg-primary after:bg-primary/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px">
                        <strong className="font-semibold text-primary">
                          Stable income.{' '}
                        </strong>
                        AleoStaking adopts a decentralized staking method,
                        staking Credits to multiple different nodes, and there
                        is no profit risk if a single node fails.
                      </div>
                    </div>
                  </li>
                  <li className="group mt-10 first:mt-0">
                    <div>
                      <div className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden relative before:absolute after:absolute before:bg-primary after:bg-primary/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px">
                        <strong className="font-semibold text-primary">
                          No threshold.{' '}
                        </strong>
                        There is no minimum pledge requirement of 1,000 credits
                        for AleoStaking pledge, and 1 credit can also
                        participate in the pledge.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
