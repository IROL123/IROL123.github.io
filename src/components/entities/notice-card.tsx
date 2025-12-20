import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import type { NoticeEntry } from '@/lib/indexes/notices'
import { IconPin, IconExternalLink } from '@tabler/icons-react'

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
  const CardWrapper = notice.url ? 'a' : 'div'
  const wrapperProps = notice.url
    ? { href: notice.url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <CardWrapper
      {...wrapperProps}
      className={`block p-4 rounded-lg border bg-card transition-all ${notice.url
          ? 'hover:bg-muted/50 hover:border-primary/30 cursor-pointer group'
          : ''
        }`}
    >
      <div className="flex items-start gap-2">
        {notice.pinned && (
          <IconPin className="w-4 h-4 text-primary shrink-0 mt-1" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold group-hover:text-primary transition-colors">
              {notice.title}
            </h3>
            <Badge variant={categoryColors[notice.category] || 'outline'}>
              {notice.category}
            </Badge>
            {notice.url && (
              <IconExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <span>
              {new Date(notice.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {notice.source && (
              <>
                <span>·</span>
                <span>{notice.source}</span>
              </>
            )}
          </div>
          <div className="text-sm mt-2 prose prose-sm dark:prose-invert max-w-none line-clamp-2">
            {notice.content.substring(0, 200)}
            {notice.content.length > 200 && '...'}
          </div>
        </div>
      </div>
    </CardWrapper>
  )
}
