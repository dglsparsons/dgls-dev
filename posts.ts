import fs from 'fs'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), '/posts')

export function getAllPostIDs(): string[] {
  const filenames = fs.readdirSync(postsDir)
  return filenames.map((n) => n.replace('\.md', ''))
}

export async function getPost(id: string): Promise<Post> {
  const postPath = path.join(postsDir, `${id}.md`)
  const fileContents = fs.readFileSync(postPath, 'utf8')
  const { data, content } = matter(fileContents)

  const parsedContent = await remark().use(html).process(content)

  return {
    id,
    title: data['title'],
    date: data['date'].toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    isoDate: data['date'].toISOString(),
    description: data['description'],
    content: parsedContent.toString()
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const ids = getAllPostIDs()

  const posts = await Promise.all(ids.map((s) => getPost(s)))

  return posts.sort((a, b) => b.isoDate > a.isoDate ? 1 : -1)
}


export interface Post {
  id: string
  date: string
  isoDate: string
  description: string
  title: string
  content: string
}
