'use client'

import { Suspense } from 'react'
import { PersonEntry } from '@/lib/indexes/people'
import { PeopleView } from '@/components/people/people-view'
import { useLanguage } from '@/lib/i18n'

interface PeoplePageWrapperProps {
    people: PersonEntry[]
}

export function PeoplePageWrapper({ people }: PeoplePageWrapperProps) {
    const { t } = useLanguage()

    if (people.length === 0) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">{t.people.title}</h1>
                <p className="text-muted-foreground">{t.people.empty.default}</p>
            </main>
        )
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{t.people.title}</h1>
            <Suspense fallback={<div className="animate-pulse h-96 bg-muted/50 rounded-lg" />}>
                <PeopleView people={people} />
            </Suspense>
        </main>
    )
}
