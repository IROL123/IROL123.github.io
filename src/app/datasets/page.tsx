import { Metadata } from 'next'
import { getDatasetsSortedByName, getAllDatasetTags } from '@/lib/indexes/datasets'
import { DatasetCard } from '@/components/entities/dataset-card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Datasets',
  description: 'Research datasets and resources',
}

export default function DatasetsPage() {
  const datasets = getDatasetsSortedByName()
  const allTags = getAllDatasetTags()

  if (datasets.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Datasets</h1>
        <p className="text-muted-foreground">No datasets available yet.</p>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Datasets</h1>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid gap-4">
        {datasets.map((dataset) => (
          <DatasetCard key={dataset.slug} dataset={dataset} />
        ))}
      </div>
    </main>
  )
}
