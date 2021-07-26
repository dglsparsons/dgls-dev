import { Post, getPost, getAllPostIDs } from '../../posts'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import remark from 'remark'
import html from 'remark-html'

export default function Article({ post }: { post: Post }) {
  return <>
    <Head>
      <title>{post.title}</title>
    </Head>
    <h1 className="text-lg font-semibold mb-16">{post.title}</h1>
    <div className="prose prose-indigo" dangerouslySetInnerHTML={{ __html: post.content }}>
    </div>
  </>

}

export const getStaticProps: GetStaticProps<{ post: Post }, { id: string }> = async ({ params = {} }) => {
  const { id = '' } = params
  const rawPost = getPost(id)
  const content = await remark().use(html).process(rawPost.content)
  return {
    props: { post: { ...rawPost, content: content.toString() } }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPostIDs()
  const paths = posts.map((id) => ({ params: { id } }))

  return {
    paths,
    fallback: false
  }
}
