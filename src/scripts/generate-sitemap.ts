import { writeFileSync } from 'fs'
import { globby } from 'globby'
import prettier from 'prettier'
import { siteConfig } from '../config/seo'

async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc')
  const pages = await globby([
    'src/app/**/*.tsx',
    'content/posts/*.md',
    '!src/app/**/_*.tsx',
    '!src/app/**/layout.tsx',
  ])

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page
            .replace('src/app', '')
            .replace('.tsx', '')
            .replace('content/posts', '/posts')
            .replace('.md', '')
          const route = path === '/index' ? '' : path
          return `
            <url>
              <loc>${`${siteConfig.url}${route}`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.7</priority>
            </url>
          `
        })
        .join('')}
    </urlset>
  `

  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  })

  writeFileSync('public/sitemap.xml', formatted)
}

generate() 