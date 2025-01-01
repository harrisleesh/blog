import { getPostData, getAllPostIds } from '@/lib/markdown'
import MarkdownContent from '@/components/MarkdownContent'
import TableOfContents from '@/components/TableOfContents'
import PostNavigation from '@/components/PostNavigation'
import SEO from '@/components/SEO'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getAllPostIds()
  return posts
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostData(slug)

  return (
    <>
      <SEO  
        title={post.title}
        description={post.excerpt}
        url={`/posts/${slug}`}
        type="article"
      />
      <div className="relative max-w-prose mx-auto">
        <article className="prose max-w-none">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <time>
                {new Date(post.date).toLocaleDateString('ko-KR')}
              </time>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/?tag=${tag}`}
                    className="text-gray-500 hover:text-gray-700 no-underline"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </header>

          <div>
            <MarkdownContent content={post.content} />
          </div>
        </article>

        <aside className="hidden lg:block fixed top-24 left-[calc(50%+24rem)] w-64">
          <div className="pl-8 border-l border-gray-200">
            <TableOfContents content={post.content} />
          </div>
        </aside>

        <PostNavigation currentSlug={slug} />
      </div>
    </>
  )
} 