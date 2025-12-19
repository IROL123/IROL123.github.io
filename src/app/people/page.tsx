import { Metadata } from 'next'
import { getPeopleSortedByRole } from '@/lib/indexes/people'
import { PeopleView } from '@/components/people/people-view'

export const metadata: Metadata = {
  title: 'People',
  description: 'Lab members and team',
}

export default function PeoplePage() {
  const people = getPeopleSortedByRole()

  if (people.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">People</h1>
        <p className="text-muted-foreground">No team members yet.</p>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">People</h1>
      <PeopleView people={people} />
    </main>
  )
}
