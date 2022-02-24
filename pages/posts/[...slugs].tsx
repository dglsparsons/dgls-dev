import fs from "fs";
import { PageTitle } from "../../components/PageTitle";
import generateRss from "../../lib/generate-rss";
import { MDXLayoutRenderer } from "../../components/MDXComponents";
import { getAllPosts, getPostBySlug, Post, PostContent } from "../../lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import { siteMetadata } from "data/siteMetadata";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { slugs: post.slug.split("/") },
  }));
  return {
    paths,
    fallback: false,
  };
};

interface BlogProps {
  post: PostContent;
  previousPost: Post | null;
  nextPost: Post | null;
}

export const getStaticProps: GetStaticProps<
  BlogProps,
  { slugs: any }
> = async ({ params }) => {
  const slug = params?.slugs?.join("/") ?? "";
  const allPosts = await getAllPosts();
  const postIndex = allPosts.findIndex((post) => post.slug === slug);
  const previousPost = allPosts[postIndex + 1] ?? null;
  const nextPost = allPosts[postIndex - 1] ?? null;
  const post = await getPostBySlug(slug);

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts);
    fs.writeFileSync("./public/feed.xml", rss);
  }

  return { props: { post, previousPost, nextPost } };
};

export default function Blog({ post, previousPost, nextPost }: BlogProps) {
  const { mdxSource, metadata } = post;

  return (
    <>
      {metadata.draft !== true ? (
        <MDXLayoutRenderer
          layout={metadata.layout}
          mdxSource={mdxSource}
          metadata={metadata}
          authorDetails={[
            {
              name: siteMetadata.author,
              avatar: siteMetadata.image,
              twitter: siteMetadata.twitter,
              linkedin: siteMetadata.linkedin,
              github: siteMetadata.github,
            },
          ]}
          previousPost={previousPost}
          nextPost={nextPost}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{" "}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  );
}
