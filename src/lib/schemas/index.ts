// Re-export all schemas and types
export * from './primitives'
export * from './person'
export * from './paper'
export * from './project'
export * from './notice'
export * from './dataset'

import { PersonSchema } from './person'
import { PaperSchema } from './paper'
import { ProjectSchema } from './project'
import { NoticeSchema } from './notice'
import { DatasetSchema } from './dataset'

// Entity type mapping for validation
export const EntitySchemas = {
  person: PersonSchema,
  paper: PaperSchema,
  project: ProjectSchema,
  notice: NoticeSchema,
  dataset: DatasetSchema,
} as const

export type EntityType = keyof typeof EntitySchemas
