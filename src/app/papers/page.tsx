import { redirect } from 'next/navigation'

// Redirect /papers to /research/publications
export default function PapersPage() {
    redirect('/research/publications')
}
