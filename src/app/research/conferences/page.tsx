import { Metadata } from 'next'
import { CONFERENCES } from '@/lib/data/research'
import { ConferencesView } from '@/components/research/conferences-view'

export const metadata: Metadata = {
    title: 'Conferences - IROL',
    description: 'Conference presentations and proceedings',
}

export default function ConferencesPage() {
    // Group by year
    const conferencesByYear = new Map<number, typeof CONFERENCES>();

    CONFERENCES.forEach(conf => {
        const year = Number(conf.year);
        if (!conferencesByYear.has(year)) conferencesByYear.set(year, []);
        conferencesByYear.get(year)?.push(conf);
    });

    const years = Array.from(conferencesByYear.keys()).sort((a, b) => b - a);

    return <ConferencesView conferencesByYear={conferencesByYear} years={years} />
}

