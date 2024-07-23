import { ExternalLinkIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import LogoImage from '~/assets/logo.png'
import LogoDarkImage from '~/assets/logo-dark.png'
import AleoLogoLight from '~/assets/aleo-logo-light.svg'
import AleoLogoDark from '~/assets/aleo-logo-dark.svg'
import ArcaneLogoDark from '~/assets/arcane-logo-dark.svg'
import ArcaneLogoLight from '~/assets/arcane-logo-light.svg'
import PuzzleLogoLight from '~/assets/puzzle-logo-light.png'
import PuzzleLogoDark from '~/assets/puzzle-logo-dark.png'
import StCreditsImage from '~/assets/st-credits-image.png'
import ValidatorsImage from '~/assets/validators-image.png'
import GovernanceImage from '~/assets/governance-image.png'
import LeoWalletLogoLight from '~/assets/leo-wallet-logo.svg'
import LeoWalletLogoDark from '~/assets/leo-wallet-logo-dark.svg'
import AvailWalletLogo from '~/assets/avail-wallet-logo.svg'
import SoterWalletLogo from '~/assets/soter-wallet-logo.png'
import ImagePlaceholder from '~/assets/image-placeholder.svg'
import { AspectRatio } from '~/components/ui/aspect-ratio'
import { Button } from '~/components/ui/button'
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
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24 md:mt-40 lg:px-8 mb-40">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl font-medium tracking-tight [text-wrap:balance] sm:text-7xl mb-16">
                Zero-Knowledge Staking on Aleo
              </h1>
              <p className="mb-6 text-xl">
                Stake your Credits to validators and earn rewards.
              </p>
              <div className="mb-12">
                <Button
                  className="rounded-full px-10 py-3 h-auto text-2xl border-muted-foreground"
                  asChild
                  variant="outline"
                >
                  <Link href="/staking">Staking</Link>
                </Button>
              </div>

              <p className="mb-6 text-xl">
                Stake Credits and receive stCredits. Get daily staking rewards
                and put your stCredits to ZeFi to work across the Aleo
                ecosystem.
              </p>
              <div className="">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-px w-fit">
                  <Button
                    className="rounded-full px-10 py-3 h-auto text-2xl border-muted-foreground border-none"
                    variant="outline"
                    asChild
                  >
                    <Link href="/liquid-staking">
                      <span className="inline-block text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
                        Liquid
                      </span>
                      &nbsp;
                      <span className="inline-block text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
                        Staking
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 my-24 sm:my-32 lg:my-40">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 lg:grid-cols-11 items-center gap-0 lg:gap-12">
              <div className="col-span-1 lg:col-span-6">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                  <div className="max-w-2xl">
                    <h2>
                      <span className="sr-only"> - </span>
                      <span className="block font-display tracking-tight [text-wrap:balance] text-5xl font-medium sm:text-8xl">
                        Validators
                      </span>
                    </h2>
                    <div className="text-3xl font-light" />
                  </div>
                </div>
                {/* <Image
                  src={StCreditsImage}
                  alt=""
                  className="object-cover rounded-3xl"
                /> */}
              </div>
              <div className="col-span-1 lg:col-span-5">
                <ul className="text-base mt-4 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
                  <li className="group mt-6 first:mt-0">
                    <div>
                      <div className="pt-6 text-xl">
                        <p>Explore validators that help grow Aleo.</p>
                      </div>
                    </div>
                  </li>
                  <li className="group mt-6 first:mt-0">
                    <div>
                      <div className="">
                        <p className="sm:before:absolute sm:before:right-full text-left text-xl">
                          Validators run nodes, validate transactions, and
                          participate in consensus to add new blocks. They earn
                          fees and rewards.
                        </p>
                        <div className="mt-10">
                          <Button
                            asChild
                            className="rounded-full px-8 py-3 h-auto text-xl border-muted-foreground"
                            variant="outline"
                          >
                            <Link href="/staking">Explore</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden mx-auto max-w-7xl px-6 lg:px-8 mt-24 mb-8 sm:mb-12 lg:mb-28">
          <div className="max-w-2xl lg:max-w-full mx-auto grid grid-cols-1 mt-16 items-center lg:grid-cols-5 gap-10 lg:gap-20">
            <div className="col-span-1 lg:col-span-3">
              <div className="mx-auto max-w-2xl lg:max-w-none">
                <div className="max-w-2xl">
                  <h2>
                    <span className="sr-only"> - </span>
                    <span className="block font-display tracking-tight [text-wrap:balance] text-4xl font-medium sm:text-5xl">
                      Validators
                    </span>
                  </h2>
                  <div className="mt-6 text-xl text-muted-foreground">
                    <p>Explore validators that help grow Aleo</p>
                  </div>
                </div>
              </div>
              <div className="mx-auto max-w-2xl lg:max-w-none mt-10">
                <div style={{}}>
                  <figure className="mx-auto max-w-4xl">
                    <blockquote className="relative font-display text-2xl tracking-tight font-light text-muted-foreground sm:text-3xl">
                      <p className="sm:before:absolute sm:before:right-full">
                        Validators run nodes, validate transactions, and
                        participate in consensus to add new blocks. They earn
                        fees and rewards.
                      </p>
                    </blockquote>
                    <figcaption />
                  </figure>
                </div>
              </div>
              {/* <p className="mt-6 max-w-3xl text-xl text-secondary-foreground">
                Validators run nodes, validate transactions, and participate in
                consensus to add new blocks. They earn fees and rewards.
              </p> */}
              <div className="mt-8">
                <Button
                  asChild
                  className="rounded-full px-8 py-3 h-auto text-xl"
                  variant="outline"
                >
                  <Link href="/staking">Explore</Link>
                </Button>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <AspectRatio ratio={1}>
                <Image
                  src={ValidatorsImage}
                  alt=""
                  className="rounded-3xl object-cover"
                />
              </AspectRatio>
            </div>
          </div>
        </div>

        <Separator />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-4 my-12 sm:my-32 lg:my-40">
          {/* <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:max-w-lg lg:max-w-full mx-auto"> */}

          <div className="flex flex-col lg:flex-row justify-between relative">
            <Separator className="hidden lg:block absolute top-12 -z-10 bg-muted-foreground" />
            <Separator
              className="block lg:hidden absolute left-12 -z-10 bg-muted-foreground"
              orientation="vertical"
            />
            <div className="flex flex-row gap-14 lg:flex-col justify-start lg:justify-center">
              <div className="flex flex-col lg:flex-row lg:justify-center items-center h-64 lg:h-auto bg-background">
                <div className="flex-grow" />
                <div className="p-4 border rounded-full flex-none border-muted-foreground">
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
                <div className="flex-grow">
                  <Separator
                    className="block lg:hidden bg-muted-foreground -ml-px"
                    orientation="vertical"
                  />
                  <Separator className="hidden lg:block flex-1 -mt-px bg-muted-foreground" />
                </div>
              </div>
              <div className="flex flex-col justify-center text-start lg:text-center">
                <div className="text-4xl lg:text-7xl">Stake</div>
                <div className="text-2xl lg:text-3xl mt-4">Credits</div>
              </div>
            </div>
            <div className="flex flex-row gap-14 lg:flex-col justify-start lg:justify-center items-center">
              <div className="flex flex-col lg:flex-row justify-center items-center h-64 lg:h-auto">
                <div className="p-4 w-24 h-24 border border-muted-foreground rounded-full flex justify-center items-center bg-background">
                  <div className="w-11 h-11">
                    <AspectRatio ratio={1}>
                      <Image
                        src={LogoImage}
                        alt=""
                        className="block dark:hidden object-cover"
                      />
                      <Image
                        src={LogoDarkImage}
                        alt=""
                        className="hidden dark:block object-cover"
                      />
                    </AspectRatio>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center text-start lg:text-center">
                <div className="text-4xl lg:text-7xl">Receive</div>
                <div className="text-2xl lg:text-3xl mt-4">
                  stCredits and get rewards
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-14 lg:flex-col justify-start lg:justify-center">
              <div className="flex flex-col lg:flex-row items-center h-64 lg:h-auto bg-background">
                <div className="flex-grow">
                  <Separator
                    className="block lg:hidden bg-muted-foreground -ml-px"
                    orientation="vertical"
                  />
                  <Separator className="hidden lg:block flex-1 -mt-px bg-muted-foreground" />
                </div>
                <div className="p-4 border rounded-full border-muted-foreground">
                  <span className="inline-flex justify-center items-center w-16 h-16">
                    Swap
                  </span>
                </div>
                <div className="p-4 border rounded-full border-muted-foreground translate-x-0 -translate-y-4 lg:translate-y-0 lg:-translate-x-4">
                  <span className="inline-flex justify-center items-center w-16 h-16">
                    Lending
                  </span>
                </div>
                <div className="flex-grow" />
              </div>
              <div className="flex flex-col justify-center text-start lg:text-center">
                <div className="text-4xl lg:text-7xl">Use</div>
                <div className="text-2xl lg:text-3xl mt-4">
                  stCredits in ZeFi
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* <div className="mx-auto mt-24 sm:mt-32 lg:mt-40 max-w-7xl px-6 lg:px-8">
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
        </div> */}

        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-20 sm:mt-12 lg:mt-16 mb-24 sm:mb-32 lg:mb-40">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 lg:grid-cols-11 gap-2 items-center lg:gap-12">
              <div className="col-span-1 lg:col-span-6">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                  <div className="max-w-2xl">
                    <h2>
                      <span className="sr-only"> - </span>
                      <span className="block font-display tracking-tight [text-wrap:balance] text-5xl font-medium sm:text-8xl">
                        stCredits
                      </span>
                    </h2>
                    <div className="mt-6 text-3xl font-light">
                      <p>
                        Aleo&apos;s liquid staking token, with best-in-class
                        security, deepest liquidity and competitive rewards.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <Image
                  src={StCreditsImage}
                  alt=""
                  className="object-cover rounded-3xl"
                /> */}
              </div>
              <div className="col-span-1 lg:col-span-5">
                <ul className="text-base mt-10 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
                  <li className="group mt-6 first:mt-0">
                    <div>
                      <div className="pt-6 group-first:pt-0 group-first:before:hidden group-first:after:hidden relative before:absolute after:absolute before:bg-primary after:bg-primary/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                          Fully open-sourced
                        </h3>
                        <p>
                          {/* <strong className="font-semibold">
                          Fully open-sourced{' '}
                        </strong> */}
                          Including programs, operator service, UI, and
                          everything else. Allowing continuous peer reviews and
                          enhancements from developers across the Aleo
                          ecosystem.
                        </p>
                        <div className="mt-4">
                          <Button
                            asChild
                            className="rounded-full border-muted-foreground min-w-32"
                            variant="outline"
                          >
                            <Link
                              href="https://github.com/spectrehq/spectre/tree/main/packages/leo/spectre_v1/stcredits"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <svg
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 fill-current mr-2"
                              >
                                <title>GitHub</title>
                                <path
                                  fill="currentColor"
                                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                />
                              </svg>
                              <span>Github</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="group mt-6 first:mt-0">
                    <div>
                      {/* <div className="pt-6 group-first:pt-0 group-first:before:hidden group-first:after:hidden relative before:absolute after:absolute before:bg-primary after:bg-primary/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px"> */}
                      <div className="pt-6 border-t border-primary/10">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                          Role based access control
                        </h3>
                        <p>
                          {/* <strong className="font-semibold">
                            Role based access control{' '}
                          </strong> */}
                          Multiple roles with different permissions to set the
                          staking parameters, manage the treasury and tackling
                          emergencies.
                        </p>
                        <div className="mt-4">
                          <Button
                            asChild
                            className="rounded-full border-muted-foreground min-w-32"
                            variant="outline"
                          >
                            <Link
                              href="https://github.com/spectrehq/spectre/tree/main/packages/leo/spectre_v1/access_control"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <span>RBAC</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="group mt-6 first:mt-0">
                    <div>
                      {/* <div className="pt-6 group-first:pt-0 group-first:before:hidden group-first:after:hidden relative before:absolute after:absolute before:bg-primary after:bg-primary/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px"> */}
                      <div className="pt-6 border-t border-primary/10">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                          Points incentives
                        </h3>
                        <p>
                          {/* <strong className="font-semibold text-primary">
                          Points incentives{' '}
                        </strong> */}
                          Stakers earn points for locking up their stCredits.
                          And will earn more bonus points on top of any points
                          their invites earn.
                        </p>
                        <div className="mt-4">
                          <Button
                            asChild
                            className="rounded-full border-muted-foreground min-w-32"
                            variant="outline"
                          >
                            <Link
                              href="https://docs.spectre.guru/spectre/points"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <span>Points</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="lg:flex lg:items-center lg:justify-end overflow-hidden lg:overflow-visible">
              <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
                <div className="w-96 flex-none lg:w-[40rem]">
                  <div className="justify-center lg:justify-end relative flex aspect-[1024/926] w-full">
                    <svg viewBox="0 0 655 680" fill="none" className="h-full">
                      <title>Features</title>
                      <g clipPath="url(#:S1:-clip)" className="group">
                        <g className="origin-center scale-100 transition duration-500 motion-safe:group-hover:scale-105">
                          <foreignObject width="655" height="680">
                            <Image
                              src={StCreditsImage}
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
            </div> */}
          </div>
        </div>

        <Separator />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 my-24 sm:my-32 lg:my-40">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 lg:grid-cols-11 items-center gap-0 lg:gap-12">
              <div className="col-span-1 lg:col-span-6">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                  <div className="max-w-2xl">
                    <h2>
                      <span className="sr-only"> - </span>
                      <span className="block font-display tracking-tight [text-wrap:balance] text-5xl font-medium sm:text-8xl">
                        Governance
                      </span>
                    </h2>
                    <div className="text-3xl font-light" />
                  </div>
                </div>
                {/* <Image
                  src={StCreditsImage}
                  alt=""
                  className="object-cover rounded-3xl"
                /> */}
              </div>
              <div className="col-span-1 lg:col-span-5">
                <ul className="text-base mt-4 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
                  <li className="group mt-6 first:mt-0">
                    <div>
                      <div className="pt-6 text-xl">
                        <p>
                          Governed by the Spectre Governance, who is a
                          mission-driven decentralized organization.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="group mt-6 first:mt-0">
                    <div>
                      <div className="">
                        <p className="sm:before:absolute sm:before:right-full text-left text-xl">
                          Key decisions require public votes by SPT token
                          holders, ensuring accountability to both users and the
                          wider Aleo community.
                        </p>
                        <div className="mt-10">
                          <Button
                            asChild
                            className="rounded-full px-8 py-3 h-auto text-xl"
                            variant="outline"
                          >
                            <Link
                              href="https://docs.spectre.guru/spectre/governance"
                              target="_blank"
                              rel="noreferrer"
                              className="border-muted-foreground"
                            >
                              Governance
                              <ExternalLinkIcon className="w-5 h-5 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="lg:flex lg:items-center lg:justify-end overflow-hidden lg:overflow-visible">
              <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
                <div className="w-96 flex-none lg:w-[40rem]">
                  <div className="justify-center lg:justify-end relative flex aspect-[1024/926] w-full">
                    <svg viewBox="0 0 655 680" fill="none" className="h-full">
                      <title>Features</title>
                      <g clipPath="url(#:S1:-clip)" className="group">
                        <g className="origin-center scale-100 transition duration-500 motion-safe:group-hover:scale-105">
                          <foreignObject width="655" height="680">
                            <Image
                              src={StCreditsImage}
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
            </div> */}
          </div>
        </div>

        <Separator />

        <div className="hidden mx-auto max-w-5xl px-6 lg:px-8 my-24 sm:my-32 lg:my-40">
          <h2 className="text-center">
            <span className="sr-only"> - </span>
            <span className="block font-display tracking-tight [text-wrap:balance] text-4xl font-medium sm:text-7xl">
              Governance
            </span>
          </h2>
          <div className="grid grid-cols-1 mt-16 lg:grid-cols-2 gap-10 lg:gap-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="mx-auto max-w-2xl lg:max-w-none text-center">
                <div className="">
                  <div className="mt-6 text-2xl text-left">
                    <p>
                      Governed by the Spectre Governance, who is a
                      mission-driven decentralized organization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-1">
              <div className="mt-6" style={{}}>
                <figure className="mx-auto text-center">
                  <blockquote className="relative font-display text-2xl tracking-tight font-light sm:text-2xl">
                    <p className="sm:before:absolute sm:before:right-full text-left">
                      Key decisions require public votes by SPT token holders,
                      ensuring accountability to both users and the wider Aleo
                      community.
                    </p>
                  </blockquote>
                  <figcaption />
                </figure>
              </div>
              {/* <AspectRatio ratio={1} className="mt-8">
                <Image
                  src={GovernanceImage}
                  alt=""
                  className="rounded-3xl object-cover"
                />
              </AspectRatio> */}
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <Button
              asChild
              className="rounded-full px-8 py-3 h-auto text-xl"
              variant="outline"
            >
              <Link
                href="https://docs.spectre.guru/spectre/governance"
                target="_blank"
                rel="noreferrer"
              >
                Governance
                <ExternalLinkIcon className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        <Separator />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 my-12 sm:my-16 lg:my-20">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div
              className="-mx-6 rounded-3xl px-6 py-10 sm:mx-0 md:px-12"
              style={{ opacity: 1, transform: 'none' }}
            >
              <ul className="flex flex-wrap justify-between gap-x-8 gap-y-10 items-center">
                {/* <li className="overflow-hidden rounded-md">
                  <Image
                    src={AleoLogoLight}
                    alt=""
                    className="hidden dark:block object-cover mx-auto lg:mx-0"
                    width={96}
                  />
                  <Image
                    src={AleoLogoDark}
                    alt=""
                    className="block dark:hidden object-cover mx-auto lg:mx-0"
                    width={96}
                  />
                </li> */}

                <li className="">
                  <Link
                    href="https://www.leo.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={LeoWalletLogoLight}
                      alt=""
                      className="hidden dark:block object-cover mx-auto lg:mx-0"
                      width={140}
                    />
                    <Image
                      src={LeoWalletLogoDark}
                      alt=""
                      className="block dark:hidden object-cover mx-auto lg:mx-0"
                      width={140}
                    />
                  </Link>
                </li>

                <li className="">
                  <Link
                    href="https://puzzle.online/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={PuzzleLogoLight}
                      alt=""
                      className="hidden dark:block object-cover mx-auto lg:mx-0"
                      width={90}
                    />
                    <Image
                      src={PuzzleLogoDark}
                      alt=""
                      className="block dark:hidden object-cover mx-auto lg:mx-0"
                      width={90}
                    />
                  </Link>
                </li>

                <li className="">
                  <Link
                    href="https://avail.global/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={AvailWalletLogo}
                      alt=""
                      className="hidden dark:block object-cover mx-auto lg:mx-0"
                      width={90}
                    />
                    <Image
                      src={AvailWalletLogo}
                      alt=""
                      className="block dark:hidden object-cover mx-auto lg:mx-0"
                      width={90}
                    />
                  </Link>
                </li>

                <li className="">
                  <Link
                    href="https://sotertech.io/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={SoterWalletLogo}
                      alt=""
                      className="hidden dark:block object-cover mx-auto lg:mx-0"
                      width={150}
                    />
                    <Image
                      src={SoterWalletLogo}
                      alt=""
                      className="block dark:hidden object-cover mx-auto lg:mx-0"
                      width={150}
                    />
                  </Link>
                </li>

                <li className="mx-auto lg:mx-0">
                  <Link
                    href="https://www.arcane.finance/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={ArcaneLogoLight}
                      alt=""
                      className="hidden dark:block object-cover"
                      width={200}
                    />
                    <Image
                      src={ArcaneLogoDark}
                      alt=""
                      className="block dark:hidden object-cover"
                      width={200}
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator />
      </main>
    </>
  )
}
