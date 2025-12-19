#!/usr/bin/env tsx
/**
 * Content Validation Script
 * Validates all MDX content files against their respective schemas.
 * Exits with code 1 if any validation errors are found.
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { z } from 'zod'
import {
  PersonSchema,
  PaperSchema,
  ProjectSchema,
  NoticeSchema,
  DatasetSchema,
} from '../src/lib/schemas'

const CONTENT_DIR = path.join(process.cwd(), 'content')

interface ValidationError {
  file: string
  field: string
  message: string
}

interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  filesChecked: number
}

// Map entity types to their schemas
const ENTITY_SCHEMAS: Record<string, z.ZodSchema> = {
  people: PersonSchema,
  papers: PaperSchema,
  projects: ProjectSchema,
  notices: NoticeSchema,
  datasets: DatasetSchema,
}

// Fields that should be populated from MDX body content
const BODY_CONTENT_FIELDS: Record<string, string> = {
  projects: 'content',
  notices: 'content',
  datasets: 'description',
}

function getSlugFromPath(filePath: string): string {
  return path.basename(filePath, path.extname(filePath))
}

function validateEntityFile(
  filePath: string,
  entityType: string,
  schema: z.ZodSchema
): ValidationError[] {
  const errors: ValidationError[] = []

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(fileContent)

    // Prepare the data object for validation
    const dataToValidate: Record<string, unknown> = { ...frontmatter }

    // Add slug for entities that need it
    if (entityType === 'projects') {
      dataToValidate.slug = dataToValidate.slug || getSlugFromPath(filePath)
    }

    // Map MDX body to content field if applicable
    const bodyField = BODY_CONTENT_FIELDS[entityType]
    if (bodyField && !dataToValidate[bodyField] && content.trim()) {
      dataToValidate[bodyField] = content.trim()
    }

    // Validate against schema
    const result = schema.safeParse(dataToValidate)

    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push({
          file: filePath,
          field: issue.path.join('.') || 'root',
          message: issue.message,
        })
      }
    }
  } catch (err) {
    errors.push({
      file: filePath,
      field: 'file',
      message: err instanceof Error ? err.message : 'Unknown error reading file',
    })
  }

  return errors
}

function validateContentDirectory(
  entityType: string,
  schema: z.ZodSchema
): ValidationError[] {
  const dirPath = path.join(CONTENT_DIR, entityType)
  const errors: ValidationError[] = []

  if (!fs.existsSync(dirPath)) {
    // Directory doesn't exist, that's okay
    return errors
  }

  const files = fs.readdirSync(dirPath)
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

  for (const file of mdxFiles) {
    const filePath = path.join(dirPath, file)
    const fileErrors = validateEntityFile(filePath, entityType, schema)
    errors.push(...fileErrors)
  }

  return errors
}

function validateAllContent(): ValidationResult {
  const errors: ValidationError[] = []
  let filesChecked = 0

  for (const [entityType, schema] of Object.entries(ENTITY_SCHEMAS)) {
    const dirPath = path.join(CONTENT_DIR, entityType)

    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.mdx'))
      filesChecked += files.length

      const entityErrors = validateContentDirectory(entityType, schema)
      errors.push(...entityErrors)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    filesChecked,
  }
}

// Main execution
console.log('Validating content files...\n')

const result = validateAllContent()

if (result.filesChecked === 0) {
  console.log('No content files found to validate.')
  process.exit(0)
}

console.log(`Checked ${result.filesChecked} file(s)\n`)

if (result.valid) {
  console.log('All content files are valid!')
  process.exit(0)
} else {
  console.error('Validation errors found:\n')
  for (const error of result.errors) {
    console.error(`  File: ${error.file}`)
    console.error(`  Field: ${error.field}`)
    console.error(`  Error: ${error.message}`)
    console.error('')
  }
  console.error(`Total: ${result.errors.length} error(s)`)
  process.exit(1)
}
