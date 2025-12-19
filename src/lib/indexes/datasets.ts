import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { DatasetSchema, type Dataset } from '../schemas'

const CONTENT_DIR = path.join(process.cwd(), 'content/datasets')

export interface DatasetEntry extends Dataset {
  slug: string
}

function getSlug(filePath: string): string {
  return path.basename(filePath, path.extname(filePath))
}

export function getAllDatasets(): DatasetEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))
  const datasets: DatasetEntry[] = []

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(fileContent)

    const dataToValidate = {
      ...frontmatter,
      description: frontmatter.description || content.trim(),
    }

    const result = DatasetSchema.safeParse(dataToValidate)
    if (result.success) {
      datasets.push({
        ...result.data,
        slug: getSlug(filePath),
      })
    }
  }

  return datasets
}

export function getDatasetsSortedByName(): DatasetEntry[] {
  return getAllDatasets().sort((a, b) => a.name.localeCompare(b.name))
}

export function getDatasetBySlug(slug: string): DatasetEntry | undefined {
  return getAllDatasets().find((d) => d.slug === slug)
}

export function getDatasetsByTag(tag: string): DatasetEntry[] {
  return getAllDatasets().filter((d) => d.tags?.includes(tag))
}

export function getAllDatasetTags(): string[] {
  const tags = new Set<string>()
  for (const dataset of getAllDatasets()) {
    if (dataset.tags) {
      dataset.tags.forEach((tag) => tags.add(tag))
    }
  }
  return Array.from(tags).sort()
}
