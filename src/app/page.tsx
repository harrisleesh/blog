'use client'

import { useEffect, useState } from 'react'
import { PostData } from '@/lib/types'
import Link from 'next/link'
import SEO from '@/components/SEO'

export default function Home() {
  const [tags, setTags] = useState<{ [key: string]: number }>({})
  const [posts, setPosts] = useState<PostData[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTags() {
      const response = await fetch('/api/tags')
      const data = await response.json()
      setTags(data)
    }
    fetchTags()
  }, [])

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data.posts)
    }
    fetchPosts()
  }, [])

  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts

  return (
    <>
      <SEO 
        title="홈"
        description="웹 개발과 프로그래밍에 대한 이야기를 공유하는 블로그입니다."
        url="/"
      />
    <div className="prose dark:prose-invert max-w-none">
      <div className="max-w-prose mx-auto">
        <section className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(tags).map(([tag, count]) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tag} ({count})
              </button>
            ))}
          </div>
        </section>

        <section className="mt-2">
          <div className="space-y-4">
            {filteredPosts.map((post, index) => (
              <Link
                key={`${post.id}-${index}`}
                href={`/posts/${post.id}`}
                className="block group hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 p-4"
              >
                <article>
                  <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200 my-1">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={`${post.id}-${tag}`}
                          className="text-sm text-gray-500 dark:text-gray-400"
                          onClick={(e) => {
                            e.preventDefault()
                            setSelectedTag(tag)
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))} 
          </div>
        </section>
      </div>
    </div>
    </>
  )
}
