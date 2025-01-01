export interface TagCount {
  name: string
  count: number
}

export async function getAllTags(): Promise<TagCount[]> {
  const response = await fetch('/api/tags')
  const tags = await response.json()
  return tags
}

export async function getPostsByTag(tag: string) {
  const response = await fetch(`/api/posts?tag=${tag}`)
  const data = await response.json()
  return data.posts
} 