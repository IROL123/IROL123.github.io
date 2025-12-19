import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NoticeSchema, type Notice, type NoticeCategory } from '../schemas'

const CONTENT_DIR = path.join(process.cwd(), 'content/notices')

export interface NoticeEntry extends Notice {
  slug: string
}

function getSlug(filePath: string): string {
  return path.basename(filePath, path.extname(filePath))
}

export function getAllNotices(): NoticeEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))
  const notices: NoticeEntry[] = []

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(fileContent)

    const dataToValidate = {
      ...frontmatter,
      content: frontmatter.content || content.trim(),
    }

    const result = NoticeSchema.safeParse(dataToValidate)
    if (result.success) {
      notices.push({
        ...result.data,
        slug: getSlug(filePath),
      })
    }
  }

  return notices
}

export function getNoticesSortedByDate(): NoticeEntry[] {
  return getAllNotices().sort((a, b) => {
    // Pinned items first
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    // Then by date
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getActiveNotices(): NoticeEntry[] {
  const today = new Date().toISOString().split('T')[0]
  return getNoticesSortedByDate().filter((n) => {
    if (!n.expiry_date) return true
    return n.expiry_date >= today
  })
}

export function getNoticesByCategory(category: NoticeCategory): NoticeEntry[] {
  return getActiveNotices().filter((n) => n.category === category)
}

export function getPinnedNotices(): NoticeEntry[] {
  return getActiveNotices().filter((n) => n.pinned)
}

export function getRecentNotices(count: number): NoticeEntry[] {
  return getActiveNotices().slice(0, count)
}
