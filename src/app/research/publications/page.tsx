import { Metadata } from 'next'
import { getPapersByYear, getYears, getAllPaperTags } from '@/lib/indexes/papers'
import { PublicationsView } from '@/components/research/publications-view'

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Research papers and publications',
}

export default function PapersPage() {
  const years = getYears()
  const papersByYear = getPapersByYear()
  const allTags = getAllPaperTags()

  return (
    <PublicationsView
      years={years}
      papersByYear={papersByYear}
      allTags={allTags}
    />
  )
}

