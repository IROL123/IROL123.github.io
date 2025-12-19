'use client'

import { useLanguage } from '@/lib/i18n'
import { NoticeEntry } from '@/lib/indexes/notices'
import { NoticeCard } from '@/components/entities/notice-card'

interface NoticesViewProps {
    notices: NoticeEntry[]
}

export function NoticesView({ notices }: NoticesViewProps) {
    const { t } = useLanguage()

    // Category translation map
    const categoryTranslations: Record<string, string> = {
        'News': t.notices.categories.news,
        'Seminar': t.notices.categories.seminar,
        'Recruiting': t.notices.categories.recruiting,
        'Event': t.notices.categories.event,
    }

    if (notices.length === 0) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">{t.notices.title}</h1>
                <p className="text-muted-foreground">{t.notices.empty}</p>
            </main>
        )
    }

    // Group by category
    const categories = ['News', 'Seminar', 'Recruiting', 'Event'] as const
    const groupedNotices = new Map<string, NoticeEntry[]>()

    for (const category of categories) {
        const categoryNotices = notices.filter((n) => n.category === category)
        if (categoryNotices.length > 0) {
            groupedNotices.set(category, categoryNotices)
        }
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{t.notices.title}</h1>

            <div className="space-y-8">
                {Array.from(groupedNotices.entries()).map(([category, categoryNotices]) => (
                    <section key={category}>
                        <h2 className="text-xl font-semibold mb-4 text-muted-foreground">
                            {categoryTranslations[category] || category}
                        </h2>
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
