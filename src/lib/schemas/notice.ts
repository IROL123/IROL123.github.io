import { z } from 'zod'
import { ISO8601DateSchema } from './primitives'

export const NoticeCategoryEnum = z.enum(['News', 'Seminar', 'Recruiting', 'Event'])

export const NoticeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: ISO8601DateSchema,
  category: NoticeCategoryEnum,
  pinned: z.boolean().default(false),
  content: z.string().min(1, 'Content is required'),
  expiry_date: ISO8601DateSchema.optional(),
})

export type Notice = z.infer<typeof NoticeSchema>
export type NoticeCategory = z.infer<typeof NoticeCategoryEnum>
