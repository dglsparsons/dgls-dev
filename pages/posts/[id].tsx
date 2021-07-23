import { Post, getPost, getAllPostIDs } from '../../posts'
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Article({ post }: { post: Post }) {
  return <h1>Hi there - {post.id}</h1>
}

export const getStaticProps: GetStaticProps<{ post: Post }, { id: string }> = async ({ params = {} }) => {
  const { id = '' } = params
  return {
    props: { post: getPost(id) }
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
