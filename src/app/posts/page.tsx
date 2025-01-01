'use client'

import { useState } from 'react'
import { getSortedPostsData } from '@/lib/markdown'
import Link from 'next/link'
import Pagination from '@/components/Pagination'

const POSTS_PER_PAGE = 10

export default async function PostsPage() {
  const allPosts = await getSortedPostsData()
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = allPosts.slice(startIndex, endIndex)

  return (
    <div className="max-w-prose mx-auto">
      <div className="space-y-8">
        {currentPosts.map((post) => (
          <article key={post.id} className="py-2">
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
            </Link>
            <div className="mt-2">
              <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
} 