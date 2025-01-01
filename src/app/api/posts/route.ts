import { getSortedPostsData, getPostData } from '@/lib/markdown'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tag = searchParams.get('tag')
  const slug = searchParams.get('slug')

  if (slug) {
    const post = await getPostData(slug)
    return NextResponse.json(post)
  }

  let posts = await getSortedPostsData()
  
  if (tag) {
    posts = posts.filter((post: { tags: string[] }) => post.tags.includes(tag))
  }

  return NextResponse.json({ posts })
} 