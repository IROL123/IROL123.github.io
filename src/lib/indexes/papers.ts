import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PaperSchema, type Paper } from '../schemas'

const CONTENT_DIR = path.join(process.cwd(), 'content/papers')

export interface PaperEntry extends Paper {
  slug: string
}

function getSlug(filePath: string): string {
  return path.basename(filePath, path.extname(filePath))
}

export function getAllPapers(): PaperEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))
  const papers: PaperEntry[] = []

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(fileContent)

    const dataToValidate = {
      ...frontmatter,
      abstract: frontmatter.abstract || content.trim() || undefined,
    }

    const result = PaperSchema.safeParse(dataToValidate)
    if (result.success) {
      papers.push({
        ...result.data,
        slug: getSlug(filePath),
      })
    }
  }

  return papers
}

export function getPapersSortedByDate(): PaperEntry[] {
  return getAllPapers().sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getPapersByYear(): Map<number, PaperEntry[]> {
  const papers = getPapersSortedByDate()
  const byYear = new Map<number, PaperEntry[]>()

  for (const paper of papers) {
    const year = paper.year
    if (!byYear.has(year)) {
      byYear.set(year, [])
    }
    byYear.get(year)!.push(paper)
  }

  return byYear
}

export function getPapersByTag(tag: string): PaperEntry[] {
  return getPapersSortedByDate().filter((p) => p.tags?.includes(tag))
}

export function getAllPaperTags(): string[] {
  const tags = new Set<string>()
  for (const paper of getAllPapers()) {
    if (paper.tags) {
      paper.tags.forEach((tag) => tags.add(tag))
    }
  }
  return Array.from(tags).sort()
}

export function getYears(): number[] {
  const years = new Set<number>()
  for (const paper of getAllPapers()) {
    years.add(paper.year)
  }
  return Array.from(years).sort((a, b) => b - a)
}
