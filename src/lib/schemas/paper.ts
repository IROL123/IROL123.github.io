import { z } from 'zod'
import { UrlSchema, ImagePathSchema, ISO8601DateSchema, TagSchema } from './primitives'

export const PaperSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  authors: z.array(z.string()).min(1, 'At least one author is required'),
  venue: z.string().min(1, 'Venue is required'),
  year: z.number().int().min(1900).max(2100),
  date: ISO8601DateSchema,
  abstract: z.string().optional(),
  pdf_url: UrlSchema.optional(),
  code_url: UrlSchema.optional(),
  project_url: UrlSchema.optional(),
  bibtex: z.string().optional(),
  tags: z.array(TagSchema).optional(),
  thumbnail: ImagePathSchema.optional(),
  doi: z.string().optional(),
})

export type Paper = z.infer<typeof PaperSchema>
