'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { PersonEntry } from '@/lib/indexes/people'
import { PersonCard } from '@/components/entities/person-card'
import { ProfessorCard } from '@/components/entities/professor-card'
import { useLanguage } from '@/lib/i18n'

interface PeopleViewProps {
    people: PersonEntry[]
}

type Tab = 'professor' | 'members' | 'alumni'

export function PeopleView({ people }: PeopleViewProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { t } = useLanguage()

    // Start with default tab, sync with URL after mount
    const [activeTab, setActiveTab] = useState<Tab>('professor')
    const [mounted, setMounted] = useState(false)

    // Only read URL params after component mounts (client-side)
    useEffect(() => {
        setMounted(true)
        const urlTab = searchParams?.get('tab') as Tab | null
        if (urlTab && ['professor', 'members', 'alumni'].includes(urlTab)) {
            setActiveTab(urlTab)
        }
    }, [])

    // Sync state with URL changes (e.g., browser back/forward)
    useEffect(() => {
        if (!mounted) return
        const urlTab = searchParams?.get('tab') as Tab | null
        if (urlTab && ['professor', 'members', 'alumni'].includes(urlTab) && urlTab !== activeTab) {
            setActiveTab(urlTab)
        }
    }, [searchParams, mounted])

    // Handle tab change: update URL
    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab)
        router.push(`/people?tab=${tab}`, { scroll: false })
    }

    const TABS: { key: Tab; label: string }[] = [
        { key: 'professor', label: t.people.tabs.professor },
        { key: 'members', label: t.people.tabs.members },
        { key: 'alumni', label: t.people.tabs.alumni },
    ]

    // Role translation map
    const roleTranslations: Record<string, string> = {
        'Principal Investigator': t.people.roles.principalInvestigator,
        'PhD Student': t.people.roles.phdStudent,
        'Masters Student': t.people.roles.mastersStudent,
        'Undergrad': t.people.roles.undergrad,
        'Staff': t.people.roles.staff,
        'Alumni': t.people.roles.alumni,
    }

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
                        key={tab.key}
                        onClick={() => handleTabChange(tab.key)}
                        className={`relative px-8 py-2.5 text-sm font-bold transition-all rounded-xl cursor-pointer
              ${activeTab === tab.key
                                ? 'text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {activeTab === tab.key && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl -z-10 shadow-lg shadow-primary/10 border border-primary/20"
                                transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                            />
                        )}
                        <span className="relative z-10">{tab.label}</span>
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
                        {activeTab === 'professor' && (
                            <div className="space-y-8">
                                {professors.length > 0 ? (
                                    professors.map(person => (
                                        <ProfessorCard key={person.slug} professor={person} />
                                    ))
                                ) : (
                                    <EmptyState message={t.people.empty.professor} />
                                )}
                            </div>
                        )}

                        {activeTab === 'members' && (
                            <div className="space-y-12">
                                {members.length > 0 ? (
                                    <MembersList people={members} roleTranslations={roleTranslations} />
                                ) : (
                                    <EmptyState message={t.people.empty.members} />
                                )}
                            </div>
                        )}

                        {activeTab === 'alumni' && (
                            <div className="space-y-12">
                                {alumni.length > 0 ? (
                                    <MembersList people={alumni} roleTranslations={roleTranslations} />
                                ) : (
                                    <EmptyState message={t.people.empty.alumni} />
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

function MembersList({ people, roleTranslations }: { people: PersonEntry[]; roleTranslations: Record<string, string> }) {
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
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-muted-foreground/40">
                            {roleTranslations[role] || role}
                        </h3>
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
