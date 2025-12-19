'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PersonEntry } from '@/lib/indexes/people'
import { PersonCard } from '@/components/entities/person-card'
import { ProfessorCard } from '@/components/entities/professor-card'

interface PeopleViewProps {
    people: PersonEntry[]
}

const TABS = ['Professor', 'Members', 'Alumni'] as const
type Tab = (typeof TABS)[number]

export function PeopleView({ people }: PeopleViewProps) {
    const [activeTab, setActiveTab] = useState<Tab>('Professor')

    // Filter people
    const professors = people.filter(p => p.role === 'Principal Investigator')
    const alumni = people.filter(p => p.role === 'Alumni')
    const members = people.filter(p => p.role !== 'Principal Investigator' && p.role !== 'Alumni')

    return (
        <div className="space-y-12">
            {/* Pills Navigation */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-muted/50 w-fit mx-auto sm:mx-0 border border-muted-foreground/10">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative px-8 py-2.5 text-sm font-bold transition-all rounded-xl cursor-pointer
              ${activeTab === tab
                                ? 'text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {activeTab === tab && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-primary border-glow rounded-xl -z-10 shadow-lg shadow-primary/20"
                                transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                            />
                        )}
                        <span className="relative z-10">{tab}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'Professor' && (
                            <div className="space-y-8">
                                {professors.length > 0 ? (
                                    professors.map(person => (
                                        <ProfessorCard key={person.slug} professor={person} />
                                    ))
                                ) : (
                                    <EmptyState message="No professor profile found." />
                                )}
                            </div>
                        )}

                        {activeTab === 'Members' && (
                            <div className="space-y-12">
                                {members.length > 0 ? (
                                    <MembersList people={members} />
                                ) : (
                                    <EmptyState message="No active members currently listed." />
                                )}
                            </div>
                        )}

                        {activeTab === 'Alumni' && (
                            <div className="space-y-12">
                                {alumni.length > 0 ? (
                                    <MembersList people={alumni} />
                                ) : (
                                    <EmptyState message="No alumni listed yet." />
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-muted/20 border border-dashed rounded-lg opacity-60">
            <p className="text-muted-foreground font-medium">{message}</p>
        </div>
    )
}

function MembersList({ people }: { people: PersonEntry[] }) {
    const roleGroups = new Map<string, PersonEntry[]>()
    for (const person of people) {
        const role = person.role
        if (!roleGroups.has(role)) {
            roleGroups.set(role, [])
        }
        roleGroups.get(role)!.push(person)
    }

    // Define sort order within members
    const MEMBER_ROLE_ORDER = [
        'PhD Student',
        'Masters Student',
        'Undergrad',
        'Staff',
        'Alumni'
    ]

    const sortedGroups = Array.from(roleGroups.entries()).sort((a, b) => {
        return MEMBER_ROLE_ORDER.indexOf(a[0]) - MEMBER_ROLE_ORDER.indexOf(b[0])
    })

    return (
        <div className="space-y-16">
            {sortedGroups.map(([role, members]) => (
                <section key={role}>
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-muted-foreground/40">{role}</h3>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-muted-foreground/10 to-transparent" />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                        {members.map((person) => (
                            <PersonCard key={person.slug} person={person} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}
