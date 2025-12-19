import { z } from 'zod'

// Primitives from spec/11_interfaces.ir.yml

export const SlugSchema = z
  .string()
  .regex(/^[a-z0-9-]+$/, 'Slug must be kebab-case (lowercase letters, numbers, hyphens)')

export const UrlSchema = z
  .string()
  .regex(/^https?:\/\/.+/, 'Must be a valid http/https URL')

export const ImagePathSchema = z
  .string()
  .regex(/^\/.*\.(png|jpg|jpeg|webp|svg)$/i, 'Must be a path to an image file (e.g., /images/photo.jpg)')

export const ISO8601DateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD format')

export const TagSchema = z.string().min(1)

// Type exports
export type Slug = z.infer<typeof SlugSchema>
export type Url = z.infer<typeof UrlSchema>
export type ImagePath = z.infer<typeof ImagePathSchema>
export type ISO8601Date = z.infer<typeof ISO8601DateSchema>
export type Tag = z.infer<typeof TagSchema>
