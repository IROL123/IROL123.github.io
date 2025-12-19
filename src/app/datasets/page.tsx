import { Metadata } from 'next'
import { getDatasetsSortedByName, getAllDatasetTags } from '@/lib/indexes/datasets'
import { DatasetsView } from '@/components/datasets/datasets-view'

export const metadata: Metadata = {
  title: 'Datasets',
  description: 'Research datasets and resources',
}

export default function DatasetsPage() {
  const datasets = getDatasetsSortedByName()
  const allTags = getAllDatasetTags()

  return <DatasetsView datasets={datasets} allTags={allTags} />
}

