import { Metadata } from 'next'
import { getActiveNotices } from '@/lib/indexes/notices'
import { NoticesView } from '@/components/notices/notices-view'

export const metadata: Metadata = {
  title: 'Notices',
  description: 'Lab announcements and news',
}

export default function NoticesPage() {
  const notices = getActiveNotices()

  return <NoticesView notices={notices} />
}

