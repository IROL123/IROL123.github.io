import { Metadata } from 'next'
import { getPeopleSortedByRole } from '@/lib/indexes/people'
import { PeoplePageWrapper } from '@/components/people/people-page-wrapper'

export const metadata: Metadata = {
  title: 'People',
  description: 'Lab members and team',
}

export default function PeoplePage() {
  const people = getPeopleSortedByRole()

  return <PeoplePageWrapper people={people} />
}

