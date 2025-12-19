import { z } from 'zod'
import { SlugSchema, UrlSchema, ImagePathSchema, ISO8601DateSchema, TagSchema } from './primitives'

export const ProjectStatusEnum = z.enum(['Active', 'Completed', 'Archived'])

export const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: SlugSchema,
  summary: z.string().min(1, 'Summary is required'),
  content: z.string().min(1, 'Content is required'),
  status: ProjectStatusEnum,
  date_start: ISO8601DateSchema.optional(),
  date_end: ISO8601DateSchema.optional(),
  members: z.array(z.string()).optional(),
  tags: z.array(TagSchema).optional(),
  cover_image: ImagePathSchema.optional(),
  repo_url: UrlSchema.optional(),
  demo_url: UrlSchema.optional(),
})

export type Project = z.infer<typeof ProjectSchema>
export type ProjectStatus = z.infer<typeof ProjectStatusEnum>
