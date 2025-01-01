import { getSortedPostsData } from '@/lib/markdown'
import Link from 'next/link'

interface PostNavigationProps {
  currentSlug: string
}

export default async function PostNavigation({ currentSlug }: PostNavigationProps) {
  const posts = await getSortedPostsData()
  const currentIndex = posts.findIndex((post: { id: string }) => post.id === currentSlug)
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null

  if (!prevPost && !nextPost) return null

  return (
    <nav className="flex justify-between items-center mt-8 py-8 border-t dark:border-gray-700">
      {prevPost ? (
        <Link
          href={`/posts/${prevPost.id}`}
          className="group inline-block"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">이전 글</span>
          <span className="block text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white border-b border-transparent group-hover:border-gray-900 dark:group-hover:border-white transition-all duration-200">
            {prevPost.title}
          </span>
        </Link>
      ) : (
        <div key="prev-empty" aria-hidden="true" />
      )}

      {nextPost ? (
        <Link
          href={`/posts/${nextPost.id}`}
          className="group flex flex-col items-end"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">다음 글</span>
          <span className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {nextPost.title}
          </span>
        </Link>
      ) : (
        <div key="next-empty" aria-hidden="true" />
      )}
    </nav>
  )
} 