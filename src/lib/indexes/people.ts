import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PersonSchema, type Person, type PersonRole } from '../schemas'

const CONTENT_DIR = path.join(process.cwd(), 'content/people')

export interface PersonEntry extends Person {
  slug: string
  rawContent?: string  // MDX body content for detailed display
}

function getSlug(filePath: string): string {
  return path.basename(filePath, path.extname(filePath))
}

export function getAllPeople(): PersonEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))
  const people: PersonEntry[] = []

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(fileContent)

    const dataToValidate = {
      ...frontmatter,
      bio: frontmatter.bio || content.trim() || undefined,
    }

    const result = PersonSchema.safeParse(dataToValidate)
    if (result.success) {
      people.push({
        ...result.data,
        slug: getSlug(filePath),
        rawContent: content.trim() || undefined,
      })
    }
  }

  return people
}

export function getActivePeople(): PersonEntry[] {
  return getAllPeople().filter((p) => p.active !== false)
}

export function getPeopleByRole(role: PersonRole): PersonEntry[] {
  return getActivePeople().filter((p) => p.role === role)
}

// Role order for sorting
const ROLE_ORDER: PersonRole[] = [
  'Principal Investigator',
  'PhD Student',
  'Masters Student',
  'Undergrad',
  'Staff',
  'Alumni',
]

export function getPeopleSortedByRole(): PersonEntry[] {
  return getActivePeople().sort((a, b) => {
    const aIndex = ROLE_ORDER.indexOf(a.role)
    const bIndex = ROLE_ORDER.indexOf(b.role)
    if (aIndex !== bIndex) return aIndex - bIndex
    return a.name.localeCompare(b.name)
  })
}
