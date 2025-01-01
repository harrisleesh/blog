import { getPostData, getAllPostIds } from '@/lib/markdown'
import MarkdownContent from '@/components/MarkdownContent'
import TableOfContents from '@/components/TableOfContents'
import PostNavigation from '@/components/PostNavigation'
import SEO from '@/components/SEO'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPostIds()
  return posts
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostData(params.slug)

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        url={`/posts/${params.slug}`}
        type="article"
      />
      <div className="relative max-w-prose mx-auto">
        <article className="prose dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <time>
                {new Date(post.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/tags/${tag}`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </div>
          </header>

          <div>
            <MarkdownContent content={post.content} />
          </div>
        </article>

        <aside className="hidden lg:block fixed top-24 left-[calc(50%+24rem)] w-64">
          <div className="pl-8 border-l border-gray-200 dark:border-gray-700">
            <TableOfContents content={post.content} />
          </div>
        </aside>

        <PostNavigation currentSlug={params.slug} />
      </div>
    </>
  )
} 