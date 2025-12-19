import { z } from 'zod'
import { UrlSchema, ImagePathSchema } from './primitives'

export const PersonRoleEnum = z.enum([
  'Principal Investigator',
  'PhD Student',
  'Masters Student',
  'Undergrad',
  'Alumni',
  'Staff',
])

export const PersonSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: PersonRoleEnum,
  email: z.union([z.string(), z.null()]).transform(val => (typeof val === 'string' && val.trim()) ? val.trim() : undefined).pipe(z.string().email().optional()),
  affiliation: z.string().default('Lab Member'),
  bio: z.string().optional(),
  avatar: ImagePathSchema.optional(),
  website: UrlSchema.optional(),
  twitter: UrlSchema.optional(),
  github: UrlSchema.optional(),
  linkedin: UrlSchema.optional(),
  scholar: UrlSchema.optional(),
  interests: z.array(z.string()).optional(),
  active: z.boolean().default(true),
})

export type Person = z.infer<typeof PersonSchema>
export type PersonRole = z.infer<typeof PersonRoleEnum>
