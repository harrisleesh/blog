interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <article className="prose dark:prose-dark max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
} 