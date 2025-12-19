import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import type { DatasetEntry } from '@/lib/indexes/datasets'
import { IconDownload, IconLicense } from '@tabler/icons-react'

interface DatasetCardProps {
  dataset: DatasetEntry
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  return (
    <div className="p-4 rounded-lg border bg-card">
      <div className="flex gap-4">
        {dataset.thumbnail && (
          <div className="shrink-0 hidden sm:block">
            <img
              src={dataset.thumbnail}
              alt={dataset.name}
              className="w-24 h-24 rounded object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold">{dataset.name}</h3>
            <Badge variant="secondary">v{dataset.version}</Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <IconLicense className="w-4 h-4" />
            {dataset.license}
          </div>
          <p className="text-sm mt-2">{dataset.description.substring(0, 150)}...</p>
          {dataset.tags && dataset.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {dataset.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            {dataset.download_links.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <IconDownload className="w-4 h-4" />
                Download {dataset.download_links.length > 1 ? `(${index + 1})` : ''}
              </a>
            ))}
          </div>
          {dataset.citation && (
            <details className="mt-3">
              <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                Citation
              </summary>
              <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                {dataset.citation}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  )
}
