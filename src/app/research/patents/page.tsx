import { Metadata } from 'next'
import { PATENTS } from '@/lib/data/research'
import { PatentsView } from '@/components/research/patents-view'

export const metadata: Metadata = {
    title: 'Patents - IROL',
    description: 'Registered and pending patents',
}

export default function PatentsPage() {
    return <PatentsView patents={PATENTS} />
}

