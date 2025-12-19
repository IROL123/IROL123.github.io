import { Metadata } from 'next'
import { getActiveNotices } from '@/lib/indexes/notices'
import { NoticeCard } from '@/components/entities/notice-card'

export const metadata: Metadata = {
  title: 'Notices',
  description: 'Lab announcements and news',
}

export default function NoticesPage() {
  const notices = getActiveNotices()

  if (notices.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Notices</h1>
        <p className="text-muted-foreground">No notices yet.</p>
      </main>
    )
  }

  // Group by category
  const categories = ['News', 'Seminar', 'Recruiting', 'Event'] as const
  const groupedNotices = new Map<string, typeof notices>()

  for (const category of categories) {
    const categoryNotices = notices.filter((n) => n.category === category)
    if (categoryNotices.length > 0) {
      groupedNotices.set(category, categoryNotices)
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Notices</h1>

      <div className="space-y-8">
        {Array.from(groupedNotices.entries()).map(([category, categoryNotices]) => (
          <section key={category}>
            <h2 className="text-xl font-semibold mb-4 text-muted-foreground">{category}</h2>
            <div className="grid gap-4">
              {categoryNotices.map((notice) => (
                <NoticeCard key={notice.slug} notice={notice} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
