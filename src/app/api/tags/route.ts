import { NextResponse } from 'next/server'
import { getSortedPostsData } from '@/lib/markdown'

export async function GET() {
  const posts = await getSortedPostsData()
  const tagCount: { [key: string]: number } = {}
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })

  return NextResponse.json(tagCount)
}
