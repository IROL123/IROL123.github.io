import { Metadata } from 'next'
import { PROJECTS } from '@/lib/data/research'
import { ProjectsView } from '@/components/research/projects-view'

export const metadata: Metadata = {
    title: 'Research Projects - IROL',
    description: 'Funded research projects and grants',
}

export default function ProjectsPage() {
    return <ProjectsView projects={PROJECTS} />
}

