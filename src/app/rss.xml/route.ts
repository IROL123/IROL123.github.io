import { getActiveNotices } from "@/lib/indexes/notices";

export const dynamic = "force-static";

const CONFIG = {
    title: 'IROL - Intelligent Robotics Lab',
    siteUrl: 'https://irol123.github.io',
    description: 'Latest news and announcements from IROL',
    lang: 'en-us'
}

export async function GET() {
    const allNotices = getActiveNotices()
    const items = allNotices
        .filter(notice => notice.type === 'news')
        .slice(0, 20)
        .map(
            notice => `    <item>
        <title>${notice.title}</title>
        <description>${notice.content.substring(0, 200)}...</description>
        <link>${CONFIG.siteUrl}/notices?tab=news</link>
        <pubDate>${new Date(notice.date).toUTCString()}</pubDate>
    </item>`
        )
        .join('\n')
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${CONFIG.title}</title>
    <link>${CONFIG.siteUrl}</link>
    <description>${CONFIG.description}</description>
    <language>${CONFIG.lang}</language>
${items}
  </channel>
</rss>`

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml'
        }
    })
}