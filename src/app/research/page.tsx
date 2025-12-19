import { ResearchView } from '@/components/research/research-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Research Areas - IROL',
    description: 'Research interests and focus areas of Intelligent Robotics Lab',
}

export default function ResearchPage() {
    return <ResearchView />
}
