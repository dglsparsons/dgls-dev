import "../styles/globals.css";
import Link from "next/link";
import Head from "next/head";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen text-gray-600">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:site_name" content="Douglas Parsons' Blog" />
        <meta
          key="og:title"
          property="og:title"
          content="Douglas Parsons' Blog"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dglsparsons" />
        <meta name="theme-color" content="#4F46E5" />
      </Head>
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="flex justify-between py-4 px-6 font-medium text-gray-700 items-center">
          <Link href="/">
            <a className="text-lg hover:underline">dgls | blog</a>
          </Link>
          <div className="flex gap-8 items-center">
            <a
              className="bg-indigo-600 px-2 py-1 text-white border rounded border-white hover:bg-indigo-700"
              target="_blank"
              href="https://twitter.com/dglsparsons"
              rel="noreferrer"
            >
              Follow Me
            </a>
          </div>
        </nav>
      </header>
      <div className="flex-grow max-w-3xl px-6 py-16 self-center">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
