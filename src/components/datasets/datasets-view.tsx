'use client'

import { useLanguage } from '@/lib/i18n'
import { DatasetEntry } from '@/lib/indexes/datasets'
import { DatasetCard } from '@/components/entities/dataset-card'
import { Badge } from '@/components/ui/badge'

interface DatasetsViewProps {
    datasets: DatasetEntry[]
    allTags: string[]
}

export function DatasetsView({ datasets, allTags }: DatasetsViewProps) {
    const { t } = useLanguage()

    if (datasets.length === 0) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">{t.datasets.title}</h1>
                <p className="text-muted-foreground">{t.datasets.empty}</p>
            </main>
        )
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{t.datasets.title}</h1>

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
