import { redirect } from 'next/navigation'

// Redirect /projects to /research/projects
export default function ProjectsPage() {
    redirect('/research/projects')
}
