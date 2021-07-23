import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), '/posts')

export function getAllPostIDs(): string[] {
  const filenames = fs.readdirSync(postsDir)
  return filenames.map((n) => n.replace('\.md', ''))
}

export function getPost(id: string): Post {
  const postPath = path.join(postsDir, `${id}.md`)
  const fileContents = fs.readFileSync(postPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    id,
    title: data['title'],
    date: data['date'].toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    description: data['description'],
    content
  }
}

export function getAllPosts(): Post[] {
  const ids = getAllPostIDs()

  return ids.map((s) => getPost(s))
}


export interface Post {
  id: string
  date: string
  description: string
  title: string
  content: string
}
