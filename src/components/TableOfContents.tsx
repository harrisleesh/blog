'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // HTML 문자열에서 헤더 추출
    const doc = new DOMParser().parseFromString(content, 'text/html')
    const headers = Array.from(doc.querySelectorAll('h2, h3'))
    
    const items = headers.map((header, index) => ({
      id: header.id || `header-${index}`,
      text: header.textContent || `Section ${index + 1}`,
      level: parseInt(header.tagName.charAt(1))
    }))

    setToc(items)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -35% 0px' }
    )

    const headers = document.querySelectorAll('h2, h3')
    headers.forEach((header) => {
      if (header.id) {
        observer.observe(header)
      }
    })

    return () => observer.disconnect()
  }, [])

  if (toc.length === 0) return null

  return (
    <nav className="space-y-2">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">목차</h4>
      {toc.map((item, index) => (
        <a
          key={`toc-${item.id || index}`}
          href={`#${item.id}`}
          className={`
            block text-sm transition-all duration-200 border-b border-transparent
            ${item.level === 3 ? 'pl-4' : ''}
            ${
              activeId === item.id
                ? 'text-gray-900 dark:text-white font-medium border-gray-900 dark:border-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-700 dark:hover:border-gray-200'
            }
          `}
        >
          {item.text}
        </a>
      ))}
    </nav>
  )
} 