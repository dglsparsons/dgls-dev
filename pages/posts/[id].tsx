import { Post, getPost, getAllPostIDs } from "../../posts";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Image from "next/image";

export default function Article({ post }: { post: Post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description}></meta>
        <meta property="og:description" content={post.description}></meta>
        <meta key="og:title" property="og:title" content={post.title} />
      </Head>
      <h1 className="text-xl font-medium mb-4">{post.title}</h1>
      <div className="flex justify-between mb-12">
        <div className="flex gap-x-2 items-center">
          <div className="rounded-full overflow-hidden w-8 h-8 border border-gray-200">
            <Image
              src="/me-nyx.jpg"
              alt="Me & my cat"
              width={32}
              height={32}
              objectFit="cover"
            />
          </div>
          dgls |
          <aside className="flex text-gray-500 items-center justify-end">
            {post.date}
          </aside>
        </div>
      </div>
      <div
        className="prose prose-indigo max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </>
  );
}

export const getStaticProps: GetStaticProps<{ post: Post }, { id: string }> =
  async ({ params = {} }) => {
    const { id = "" } = params;
    const post = await getPost(id);
    return {
      props: { post },
    };
  };

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPostIDs();
  const paths = posts.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
};
