'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import { NoticeEntry } from '@/lib/indexes/notices'
import { NoticeCard } from '@/components/entities/notice-card'

interface NoticesViewProps {
    notices: NoticeEntry[]
}

type Tab = 'news' | 'announcement'

export function NoticesView({ notices }: NoticesViewProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { t } = useLanguage()

    // Start with default tab, sync with URL after mount
    const [activeTab, setActiveTab] = useState<Tab>('news')
    const [mounted, setMounted] = useState(false)

    // Only read URL params after component mounts (client-side)
    useEffect(() => {
        setMounted(true)
        const urlTab = searchParams?.get('tab') as Tab | null
        if (urlTab && ['news', 'announcement'].includes(urlTab)) {
            setActiveTab(urlTab)
        }
    }, [])

    // Sync state with URL changes (e.g., browser back/forward)
    useEffect(() => {
        if (!mounted) return
        const urlTab = searchParams?.get('tab') as Tab | null
        if (urlTab && ['news', 'announcement'].includes(urlTab) && urlTab !== activeTab) {
            setActiveTab(urlTab)
        }
    }, [searchParams, mounted])

    // Handle tab change: update URL
    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab)
        router.push(`/notices?tab=${tab}`, { scroll: false })
    }

    const TABS: { key: Tab; label: string }[] = [
        { key: 'news', label: t.notices.tabs.news },
        { key: 'announcement', label: t.notices.tabs.announcement },
    ]

    // Category translation map
    const categoryTranslations: Record<string, string> = {
        'News': t.notices.categories.news,
        'Seminar': t.notices.categories.seminar,
        'Recruiting': t.notices.categories.recruiting,
        'Event': t.notices.categories.event,
    }

    // Filter notices by active tab type
    const filteredNotices = notices.filter(n => n.type === activeTab)

    // Group by category
    const categories = ['News', 'Seminar', 'Recruiting', 'Event'] as const
    const groupedNotices = new Map<string, NoticeEntry[]>()

    for (const category of categories) {
        const categoryNotices = filteredNotices.filter((n) => n.category === category)
        if (categoryNotices.length > 0) {
            groupedNotices.set(category, categoryNotices)
        }
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{t.notices.title}</h1>

            {/* Pills Navigation */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-muted/50 w-fit mx-auto sm:mx-0 border border-muted-foreground/10 mb-8">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => handleTabChange(tab.key)}
                        className={`relative px-8 py-2.5 text-sm font-bold transition-all rounded-xl cursor-pointer
                            ${activeTab === tab.key
                                ? 'text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {activeTab === tab.key && (
                            <motion.div
                                layoutId="notice-active-pill"
                                className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl -z-10 shadow-lg shadow-primary/10 border border-primary/20"
                                transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                            />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                        transition={{ duration: 0.3 }}
                    >
                        {filteredNotices.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-muted/20 border border-dashed rounded-lg opacity-60">
                                <p className="text-muted-foreground font-medium">{t.notices.empty}</p>
                            </div>
                        ) : (
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
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    )
}
