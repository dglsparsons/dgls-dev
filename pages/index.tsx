import Head from 'next/head'
import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post, getAllPosts } from '../posts'

export default function Home({ posts }: { posts: Post[] }) {
  return <>
    <Head>
      <title>Douglas Parsons&apos; Blog</title>
      <meta name="description" content="I'm a software engineer at Vercel. This is a place for my thoughts on programming and the world in general." />
      <meta property="og:description" content="I'm a software engineer at Vercel. This is a place for my thoughts on programming and the world in general." />
    </Head>
    <main className="flex-grow">
      <div className="grid sm:grid-cols-fr-auto gap-6">
        <div>
          <h2 className="text-xl font-medium">Hi, I&apos;m Douglas 👋</h2>
          <p className="italic mt-6">
            I&apos;m a software engineer currently at <a className="hover:underline text-indigo-600" href="https://shamaazi.com" target="_blank" rel="noreferrer">Shamaazi</a>.
          </p>
          <p className="italic mt-3">
            Soon joining ▲<a href="https://vercel.com" className="hover:underline text-indigo-600" target="_blank" rel="noreferrer">Vercel</a>.
          </p>
          <p className="italic mt-3">
            This is a place for my thoughts on programming and the world in general.
          </p>
        </div>
        <div className="rounded-full overflow-hidden w-32 h-32 border border-gray-200">
          <Image src="/me-nyx.jpg" alt="Me & my cat" width={128} height={128} objectFit="cover" />
        </div>
      </div>
      <div className="grid grid-cols-auto-fr gap-x-6 gap-y-8 mt-16">
        {posts.map((p) => {
          return <Fragment key={p.id}>
            <aside className="flex text-gray-500 items-center justify-end">{p.date}</aside>
            <Link href={`/posts/${p.id}`}><a className="hover:underline text-lg cursor-pointer font-medium">{p.title}</a></Link>
          </Fragment>
        })}
      </div>
    </main>
  </>
}

export async function getStaticProps() {
  return {
    props: { posts: getAllPosts() }
  }
}
