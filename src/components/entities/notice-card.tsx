import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import type { NoticeEntry } from '@/lib/indexes/notices'
import { IconPin } from '@tabler/icons-react'

interface NoticeCardProps {
  notice: NoticeEntry
}

const categoryColors: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  News: 'default',
  Seminar: 'secondary',
  Recruiting: 'destructive',
  Event: 'outline',
}

export function NoticeCard({ notice }: NoticeCardProps) {
  return (
    <div className="p-4 rounded-lg border bg-card">
      <div className="flex items-start gap-2">
        {notice.pinned && (
          <IconPin className="w-4 h-4 text-primary shrink-0 mt-1" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold">{notice.title}</h3>
            <Badge variant={categoryColors[notice.category] || 'outline'}>
              {notice.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date(notice.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div className="text-sm mt-2 prose prose-sm dark:prose-invert max-w-none">
            {notice.content.substring(0, 200)}
            {notice.content.length > 200 && '...'}
          </div>
        </div>
      </div>
    </div>
  )
}
