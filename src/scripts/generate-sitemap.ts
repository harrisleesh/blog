import { writeFileSync } from 'fs'
import { globby } from 'globby'
import prettier from 'prettier'
import { siteConfig } from '../config/seo.js'

async function generateSitemap() {
  const pages = await globby([
    'src/app/**/*.tsx',
    '!src/app/**/_*.tsx',
    '!src/app/**/layout.tsx',
    '!src/app/**/error.tsx',
    '!src/app/**/loading.tsx',
  ])

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page
            .replace('src/app', '')
            .replace('/page.tsx', '')
            .replace('.tsx', '')
          const route = path === '/index' ? '' : path
          return `
            <url>
              <loc>${siteConfig.url}${route}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
            </url>
          `
        })
        .join('')}
    </urlset>
  `

  const formatted = await prettier.format(sitemap, {
    parser: 'html',
  })

  writeFileSync('public/sitemap.xml', formatted)
}

generateSitemap() 