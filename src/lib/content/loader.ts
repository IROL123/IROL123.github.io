import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ContentFile } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

/**
 * Get the slug from a file path (filename without extension)
 */
export function getSlugFromPath(filePath: string): string {
  return path.basename(filePath, path.extname(filePath))
}

/**
 * Read and parse a single MDX file
 */
export function readMdxFile(filePath: string): ContentFile {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(fileContent)
  const slug = getSlugFromPath(filePath)

  return {
    filePath,
    slug,
    frontmatter,
    content: content.trim(),
  }
}

/**
 * Get all MDX files from a content directory
 */
export function getContentFiles(entityType: string): ContentFile[] {
  const dirPath = path.join(CONTENT_DIR, entityType)

  if (!fs.existsSync(dirPath)) {
    return []
  }

  const files = fs.readdirSync(dirPath)
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

  return mdxFiles.map((file) => {
    const filePath = path.join(dirPath, file)
    return readMdxFile(filePath)
  })
}

/**
 * Get all content directories
 */
export function getContentDirectories(): string[] {
  const entityTypes = ['people', 'papers', 'projects', 'notices', 'datasets']
  return entityTypes.filter((type) => {
    const dirPath = path.join(CONTENT_DIR, type)
    return fs.existsSync(dirPath)
  })
}
