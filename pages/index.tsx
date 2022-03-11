import { Link } from "../components/Link";
import Image from "next/image";
import { PageSEO } from "../components/SEO";
import { siteMetadata } from "../data/siteMetadata";
import { getAllPosts, Post } from "../lib/posts";
import formatDate from "../lib/utils/formatDate";

import { NewsletterForm } from "../components/NewsletterForm";
import { GetStaticProps } from "next";

const TOP_POST_COUNT = 8;

interface HomeProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = await getAllPosts();
  return { props: { posts } };
};

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <section className="pt-6 pb-8 flex justify-between space-x-2">
          <div className="space-y-2 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-relaxed tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10">
              Doug Parsons
              <span className="relative sm:ml-4 w-max block sm:inline-block before:absolute before:-inset-1 before:block before:-skew-y-2 before:bg-primary-400">
                <span className="relative text-gray-100 skew-y-2">
                  (@dglsparsons)
                </span>
              </span>
            </h1>
            <p className="prose text-gray-500 dark:text-gray-400">
              Software engineer at Vercel. I like to build simple, reliable
              software that makes people&apos;s lives easier. I try to{" "}
              <Link href="https://twitter.com/search?q=%23buildinpublic">
                Build in Public
              </Link>{" "}
              and{" "}
              <Link href="https://twitter.com/search?q=%23learninpublic">
                Learn in Public
              </Link>
              .
            </p>
          </div>
          <div className="hidden sm:flex flex-shrink-0 flex-grow-0 rounded-full shadow shadow-primary-500/50 w-[176px] h-[176px]">
            <Image
              src={siteMetadata.image}
              width="176px"
              height="176px"
              alt="avatar"
              className="rounded-full"
            />
          </div>
        </section>
        <section className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
            Latest Posts
          </h2>
          <ul className="space-y-3">
            {!posts.length && "No posts found."}
            {posts.slice(0, TOP_POST_COUNT).map(({ slug, date, title }) => {
              return (
                <li key={slug}>
                  <Link
                    className="text-md font-semibold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
                    href={`/posts/${slug}`}
                  >
                    {title}{" "}
                  </Link>
                  <time
                    className="text-sm font-normal text-gray-500 dark:text-gray-400"
                    dateTime={date}
                  >
                    {formatDate(date)}
                  </time>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
      {posts.length > TOP_POST_COUNT && (
        <div className="text-base font-medium leading-6">
          <Link
            href="/posts"
            className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="See all posts"
          >
            See all posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== "" && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  );
}
