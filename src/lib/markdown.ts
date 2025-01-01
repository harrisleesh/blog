import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostData {
  id: string
  title: string
  date: string
  tags: string[]
  content: string
  excerpt: string
}

export function getSortedPostsData(): Omit<PostData, 'content'>[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, excerpt } = matter(fileContents, { excerpt: true })

    return {
      id,
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      excerpt: excerpt || ''
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content, excerpt } = matter(fileContents, { excerpt: true })

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content)

  return {
    id,
    title: data.title,
    date: data.date,
    tags: data.tags || [],
    content: processedContent.toString(),
    excerpt: excerpt || ''
  }
}

export async function getPostsByTag(tag: string): Promise<Omit<PostData, 'content'>[]> {
  const response = await fetch(`/api/posts?tag=${tag}`)
  const data = await response.json()
  return data.posts
}

export async function getAllPostIds() {
  const posts = await getSortedPostsData()
  return posts.map(post => ({
    params: {
      slug: post.id
    }
  }))
}

export function getAllTags() {
  const posts = getSortedPostsData()
  const tagCount: { [key: string]: number } = {}
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })
  
  return tagCount
} 