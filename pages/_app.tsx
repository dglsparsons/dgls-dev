import '../styles/globals.css'
import Image from 'next/image'
import Link from 'next/link'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <div className="flex flex-col min-h-screen text-gray-600">
    <header className="bg-white shadow-sm">
      <nav className="flex justify-between py-4 px-6 font-medium text-gray-700 items-center">
        <Link href="/"><a className="text-xl hover:underline">dgls | blog</a></Link>
        <div className="flex gap-8 items-center">
          <a className="bg-indigo-600 px-2 py-1 text-white border rounded border-white hover:bg-indigo-700" target="_blank" href="https://twitter.com/dglsparsons" rel="noreferrer">
            Follow Me
          </a>
        </div>
      </nav>
    </header>
    <div className="flex-grow max-w-3xl px-6 py-16 self-center">
      <Component {...pageProps} />
    </div>
    <footer className="min-h-[80px] bg-gray-100 flex items-center justify-center">
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span >
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  </div>
}
