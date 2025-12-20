'use client'

import { Suspense } from 'react'
import { NoticeEntry } from '@/lib/indexes/notices'
import { NoticesView } from '@/components/notices/notices-view'

interface NoticesPageWrapperProps {
    notices: NoticeEntry[]
}

export function NoticesPageWrapper({ notices }: NoticesPageWrapperProps) {
    return (
        <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-8 animate-pulse h-96 bg-muted/50 rounded-lg" />}>
            <NoticesView notices={notices} />
        </Suspense>
    )
}
