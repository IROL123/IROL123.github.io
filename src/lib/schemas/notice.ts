import { z } from 'zod'
import { ISO8601DateSchema } from './primitives'

export const NoticeCategoryEnum = z.enum(['News', 'Seminar', 'Recruiting', 'Event'])
export const NoticeTypeEnum = z.enum(['news', 'announcement'])

export const NoticeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: ISO8601DateSchema,
  type: NoticeTypeEnum.default('news'),
  category: NoticeCategoryEnum,
  pinned: z.boolean().default(false),
  content: z.string().min(1, 'Content is required'),
  expiry_date: ISO8601DateSchema.optional(),
  url: z.string().url().optional(),
  source: z.string().optional(),
})

export type Notice = z.infer<typeof NoticeSchema>
export type NoticeCategory = z.infer<typeof NoticeCategoryEnum>
export type NoticeType = z.infer<typeof NoticeTypeEnum>


