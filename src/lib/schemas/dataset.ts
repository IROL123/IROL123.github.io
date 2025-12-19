import { z } from 'zod'
import { UrlSchema, ImagePathSchema, TagSchema } from './primitives'

export const DatasetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  version: z.string().min(1, 'Version is required'),
  license: z.string().min(1, 'License is required'),
  download_links: z.array(UrlSchema).min(1, 'At least one download link is required'),
  citation: z.string().optional(),
  tags: z.array(TagSchema).optional(),
  thumbnail: ImagePathSchema.optional(),
})

export type Dataset = z.infer<typeof DatasetSchema>
