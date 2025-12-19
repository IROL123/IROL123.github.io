import type { Person, Paper, Project, Notice, Dataset } from '../schemas'

export interface ContentFile {
  filePath: string
  slug: string
  frontmatter: Record<string, unknown>
  content: string
}

export interface ValidatedPerson extends Person {
  slug: string
  filePath: string
}

export interface ValidatedPaper extends Paper {
  slug: string
  filePath: string
}

export interface ValidatedProject extends Project {
  filePath: string
}

export interface ValidatedNotice extends Notice {
  slug: string
  filePath: string
}

export interface ValidatedDataset extends Dataset {
  slug: string
  filePath: string
}

export type ValidatedEntity =
  | ValidatedPerson
  | ValidatedPaper
  | ValidatedProject
  | ValidatedNotice
  | ValidatedDataset
