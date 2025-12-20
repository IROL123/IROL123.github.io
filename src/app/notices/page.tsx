import { Metadata } from 'next'
import { getActiveNotices } from '@/lib/indexes/notices'
import { NoticesPageWrapper } from '@/components/notices/notices-page-wrapper'

export const metadata: Metadata = {
  title: 'Notices',
  description: 'Lab announcements and news',
}

export default function NoticesPage() {
  const notices = getActiveNotices()
  return <NoticesPageWrapper notices={notices} />
}
