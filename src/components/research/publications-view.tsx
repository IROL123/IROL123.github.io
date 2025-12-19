'use client'

import { useLanguage } from '@/lib/i18n'
import { PaperEntry } from '@/lib/indexes/papers'
import { PaperCard } from '@/components/entities/paper-card'
import { Badge } from '@/components/ui/badge'

interface PublicationsViewProps {
    years: number[]
    papersByYear: Map<number, PaperEntry[]>
    allTags: string[]
}

export function PublicationsView({ years, papersByYear, allTags }: PublicationsViewProps) {
    const { t } = useLanguage()

    if (years.length === 0) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">{t.publications.title}</h1>
                <p className="text-muted-foreground">{t.publications.empty}</p>
            </main>
        )
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{t.publications.title}</h1>

            {allTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                    {allTags.map((tag) => (
                        <Badge key={tag} variant="outline">
                            {tag}
                        </Badge>
                    ))}
                </div>
            )}

            <div className="space-y-8">
                {years.map((year) => {
                    const papers = papersByYear.get(year) || []
                    return (
                        <section key={year} id={`year-${year}`}>
                            <div className="flex items-center gap-4 mb-6">
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-muted-foreground/40">{year}</h2>
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-muted-foreground/10 to-transparent" />
                            </div>
                            <div className="grid gap-6">
                                {papers.map((paper) => (
                                    <PaperCard key={paper.slug} paper={paper} />
                                ))}
                            </div>
                        </section>
                    )
                })}
            </div>
        </main>
    )
}
