import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ProjectSchema, type Project, type ProjectStatus } from '../schemas'

const CONTENT_DIR = path.join(process.cwd(), 'content/projects')

export interface ProjectEntry extends Project {
  filePath: string
}

function getSlug(filePath: string): string {
  return path.basename(filePath, path.extname(filePath))
}

export function getAllProjects(): ProjectEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))
  const projects: ProjectEntry[] = []

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(fileContent)

    const dataToValidate = {
      ...frontmatter,
      slug: frontmatter.slug || getSlug(filePath),
      content: frontmatter.content || content.trim(),
    }

    const result = ProjectSchema.safeParse(dataToValidate)
    if (result.success) {
      projects.push({
        ...result.data,
        filePath,
      })
    }
  }

  return projects
}

export function getProjectsByStatus(status: ProjectStatus): ProjectEntry[] {
  return getAllProjects().filter((p) => p.status === status)
}

export function getActiveProjects(): ProjectEntry[] {
  return getProjectsByStatus('Active')
}

export function getProjectsSortedByDate(): ProjectEntry[] {
  return getAllProjects().sort((a, b) => {
    const dateA = a.date_start ? new Date(a.date_start).getTime() : 0
    const dateB = b.date_start ? new Date(b.date_start).getTime() : 0
    return dateB - dateA
  })
}

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return getAllProjects().find((p) => p.slug === slug)
}

export function getAllProjectTags(): string[] {
  const tags = new Set<string>()
  for (const project of getAllProjects()) {
    if (project.tags) {
      project.tags.forEach((tag) => tags.add(tag))
    }
  }
  return Array.from(tags).sort()
}
