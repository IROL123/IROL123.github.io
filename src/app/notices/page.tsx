import { Suspense } from 'react'
import { Metadata } from 'next'
import { getActiveNotices } from '@/lib/indexes/notices'
import { NoticesView } from '@/components/notices/notices-view'

export const metadata: Metadata = {
  title: 'Notices',
  description: 'Lab announcements and news',
}

function NoticesContent() {
  const notices = getActiveNotices()
  return <NoticesView notices={notices} />
}

export default function NoticesPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-8">Loading...</div>}>
      <NoticesContent />
    </Suspense>
  )
}
