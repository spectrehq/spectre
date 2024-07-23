import Link from 'next/link'
import Image from 'next/image'
import LogoImage from '~/assets/logo.png'
import LogoDarkImage from '~/assets/logo-dark.png'

export function Footer() {
  return (
    <footer className="mx-auto mt-12 w-full max-w-7xl px-6 sm:mt-16 lg:mt-28 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 pb-20 lg:grid-cols-9">
          <div className="flex flex-col justify-between items-start col-span-1 lg:col-span-4">
            <div className="flex-none lg:max-w-96 flex flex-col justify-center items-end">
              <Link
                href="/"
                className="font-bold text-2xl relative flex items-center"
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
              <p className="text-sm text-muted-foreground mt-2">
                Liquid Staking for Aleo
              </p>
            </div>
            <div className="mt-10">
              <div className="flex gap-x-6 items-center">
                <Link
                  href="https://x.com/AleoStaking"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Follow us on X</span>
                  <svg
                    className="h-10 w-10 fill-slate-500 group-hover:fill-slate-700"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z" />
                  </svg>
                </Link>
                <Link
                  className=""
                  href="https://discord.gg/UqFNZuEj"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Join our Discord server</span>
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="h-10 w-10 fill-slate-500"
                  >
                    <path d="M16.238 4.515a14.842 14.842 0 0 0-3.664-1.136.055.055 0 0 0-.059.027 10.35 10.35 0 0 0-.456.938 13.702 13.702 0 0 0-4.115 0 9.479 9.479 0 0 0-.464-.938.058.058 0 0 0-.058-.027c-1.266.218-2.497.6-3.664 1.136a.052.052 0 0 0-.024.02C1.4 8.023.76 11.424 1.074 14.782a.062.062 0 0 0 .024.042 14.923 14.923 0 0 0 4.494 2.272.058.058 0 0 0 .064-.02c.346-.473.654-.972.92-1.496a.057.057 0 0 0-.032-.08 9.83 9.83 0 0 1-1.404-.669.058.058 0 0 1-.029-.046.058.058 0 0 1 .023-.05c.094-.07.189-.144.279-.218a.056.056 0 0 1 .058-.008c2.946 1.345 6.135 1.345 9.046 0a.056.056 0 0 1 .059.007c.09.074.184.149.28.22a.058.058 0 0 1 .023.049.059.059 0 0 1-.028.046 9.224 9.224 0 0 1-1.405.669.058.058 0 0 0-.033.033.056.056 0 0 0 .002.047c.27.523.58 1.022.92 1.495a.056.056 0 0 0 .062.021 14.878 14.878 0 0 0 4.502-2.272.055.055 0 0 0 .016-.018.056.056 0 0 0 .008-.023c.375-3.883-.63-7.256-2.662-10.246a.046.046 0 0 0-.023-.021Zm-9.223 8.221c-.887 0-1.618-.814-1.618-1.814s.717-1.814 1.618-1.814c.908 0 1.632.821 1.618 1.814 0 1-.717 1.814-1.618 1.814Zm5.981 0c-.887 0-1.618-.814-1.618-1.814s.717-1.814 1.618-1.814c.908 0 1.632.821 1.618 1.814 0 1-.71 1.814-1.618 1.814Z" />
                  </svg>
                </Link>
                <Link
                  href="https://t.me/+1E2ggQVJgUo5NzBl"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Join our Telegram group</span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9 fill-slate-500"
                  >
                    <title>Telegram</title>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                  </svg>
                </Link>
                <Link
                  href="https://github.com/spectrehq"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Follow us on GitHub</span>
                  <svg
                    className="h-10 w-10 fill-slate-500 group-hover:fill-slate-700"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <nav className="col-span-1 lg:col-span-5">
            <ul className="grid grid-cols-2 gap-16 sm:grid-cols-3">
              <li>
                <div className="font-display font-semibold tracking-wider">
                  Staking
                </div>
                <ul className="mt-4 text-sm text-muted-foreground">
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="https://aleo.org/aleo-credits"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Aleo Credits
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="https://aleo.org/faq"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Aleo Staking
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="/staking"
                    >
                      Explore Validators
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <div className="font-display font-semibold tracking-wider">
                  Liquid Staking
                </div>
                <ul className="mt-4 text-sm text-muted-foreground">
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="/liquid-staking"
                    >
                      Stake
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="https://docs.spectre.guru/aleostaking/programs"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Programs
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="https://docs.spectre.guru/spectre/points"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Points
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="https://docs.spectre.guru/aleostaking/faq"
                      target="_blank"
                      rel="noreferrer"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <div className="font-display font-semibold tracking-wider">
                  Spectre
                </div>
                <ul className="mt-4 text-sm text-muted-foreground">
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="https://docs.spectre.guru/spectre/about-spectre"
                      target="_blank"
                      rel="noreferrer"
                    >
                      About us
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-foreground"
                      href="https://docs.spectre.guru/spectre/tokenomics"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Tokenomics
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="transition hover:text-neutral-950"
                      href="https://docs.spectre.guru/spectre/governance"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Governance
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        {/* <div className="flex lg:hidden flex-col flex-wrap items-center justify-center md:flex-row md:justify-between gap-x-6 gap-y-4 border-t border-secondary py-12">
          <div className="flex gap-x-6 items-center">
            <Link
              href="https://x.com/AleoStaking"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">Follow us on X</span>
              <svg
                className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z" />
              </svg>
            </Link>
            <Link
              className=""
              href="https://discord.gg/TTjeZkdqzW"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">Join our Discord server</span>
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="h-6 w-6 fill-slate-500"
              >
                <path d="M16.238 4.515a14.842 14.842 0 0 0-3.664-1.136.055.055 0 0 0-.059.027 10.35 10.35 0 0 0-.456.938 13.702 13.702 0 0 0-4.115 0 9.479 9.479 0 0 0-.464-.938.058.058 0 0 0-.058-.027c-1.266.218-2.497.6-3.664 1.136a.052.052 0 0 0-.024.02C1.4 8.023.76 11.424 1.074 14.782a.062.062 0 0 0 .024.042 14.923 14.923 0 0 0 4.494 2.272.058.058 0 0 0 .064-.02c.346-.473.654-.972.92-1.496a.057.057 0 0 0-.032-.08 9.83 9.83 0 0 1-1.404-.669.058.058 0 0 1-.029-.046.058.058 0 0 1 .023-.05c.094-.07.189-.144.279-.218a.056.056 0 0 1 .058-.008c2.946 1.345 6.135 1.345 9.046 0a.056.056 0 0 1 .059.007c.09.074.184.149.28.22a.058.058 0 0 1 .023.049.059.059 0 0 1-.028.046 9.224 9.224 0 0 1-1.405.669.058.058 0 0 0-.033.033.056.056 0 0 0 .002.047c.27.523.58 1.022.92 1.495a.056.056 0 0 0 .062.021 14.878 14.878 0 0 0 4.502-2.272.055.055 0 0 0 .016-.018.056.056 0 0 0 .008-.023c.375-3.883-.63-7.256-2.662-10.246a.046.046 0 0 0-.023-.021Zm-9.223 8.221c-.887 0-1.618-.814-1.618-1.814s.717-1.814 1.618-1.814c.908 0 1.632.821 1.618 1.814 0 1-.717 1.814-1.618 1.814Zm5.981 0c-.887 0-1.618-.814-1.618-1.814s.717-1.814 1.618-1.814c.908 0 1.632.821 1.618 1.814 0 1-.71 1.814-1.618 1.814Z" />
              </svg>
            </Link>
            <Link
              href="https://t.me/+1E2ggQVJgUo5NzBl"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">Join our Telegram group</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-slate-500"
              >
                <title>Telegram</title>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
              </svg>
            </Link>
            <Link
              href="https://github.com/spectrehq"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">Follow us on GitHub</span>
              <svg
                className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Powered by the Spectre team
          </p>
        </div> */}
      </div>
    </footer>
  )
}
