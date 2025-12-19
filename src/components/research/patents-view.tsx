'use client'

import { useLanguage } from '@/lib/i18n'
import { IconCertificate } from '@tabler/icons-react'

interface Patent {
    id: string
    title: string
    year: number | string
    meta?: string
    description?: string
}

interface PatentsViewProps {
    patents: Patent[]
}

export function PatentsView({ patents }: PatentsViewProps) {
    const { t } = useLanguage()

    return (
        <main className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: 'var(--primary)' }}>
                    {t.patents.title}
                </h1>
                <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                    {t.patents.subtitle}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {patents.map((patent) => (
                    <div
                        key={patent.id}
                        className="relative p-6 rounded-2xl border border-border/50 bg-card hover:shadow-lg transition-all group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <IconCertificate size={64} stroke={1} />
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="font-mono bg-muted px-2 py-0.5 rounded text-xs text-foreground font-bold">
                                    {patent.year}
                                </span>
                                <span>{patent.meta}</span>
                            </div>

                            <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                                {patent.title}
                            </h3>

                            {patent.description && (
                                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                    {patent.description}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
