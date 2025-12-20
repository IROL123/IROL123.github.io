import { Suspense } from 'react'
import { Metadata } from 'next'
import { getPeopleSortedByRole } from '@/lib/indexes/people'
import { PeoplePageWrapper } from '@/components/people/people-page-wrapper'

export const metadata: Metadata = {
  title: 'People',
  description: 'Lab members and team',
}

function PeopleContent() {
  const people = getPeopleSortedByRole()
  return <PeoplePageWrapper people={people} />
}

export default function PeoplePage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-8">Loading...</div>}>
      <PeopleContent />
    </Suspense>
  )
}
