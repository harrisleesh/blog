import { writeFileSync } from 'fs'
import RSS from 'rss'
import { getSortedPostsData } from '../lib/markdown.js'
import { siteConfig } from '../config/seo.js'

async function generateRssFeed() {
  const feed = new RSS({
    title: siteConfig.title,
    description: siteConfig.description,
    site_url: siteConfig.url,
    feed_url: `${siteConfig.url}/rss.xml`,
    language: 'ko',
    pubDate: new Date(),
  })

  const posts = await getSortedPostsData()

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/posts/${post.id}`,
      date: post.date,
      author: siteConfig.author,
    })
  })

  writeFileSync('./public/rss.xml', feed.xml({ indent: true }))
}

generateRssFeed() 