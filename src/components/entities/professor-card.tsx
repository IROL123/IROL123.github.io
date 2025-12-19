'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import type { PersonEntry } from '@/lib/indexes/people'
import {
    IconMail,
    IconBrandGithub,
    IconBrandLinkedin,
    IconWorld,
    IconSchool,
    IconPhone,
    IconMapPin,
} from '@tabler/icons-react'
import ReactMarkdown from 'react-markdown'

interface ProfessorCardProps {
    professor: PersonEntry
}

export function ProfessorCard({ professor }: ProfessorCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
        >
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row gap-8 p-8 rounded-xl glass dark:glass-dark border border-primary/20">
                {/* Avatar */}
                {professor.avatar && (
                    <div className="shrink-0 mx-auto lg:mx-0">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-xl opacity-50" />
                            <img
                                src={professor.avatar}
                                alt={professor.name}
                                className="relative w-48 h-48 rounded-full object-cover border-4 border-primary/30 shadow-xl"
                            />
                        </div>
                    </div>
                )}

                {/* Info */}
                <div className="flex-1 text-center lg:text-left">
                    <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary border-primary/20">
                        {professor.role}
                    </Badge>

                    <h1 className="text-4xl font-black tracking-tight mb-2 text-glow">
                        {professor.name}
                    </h1>

                    <p className="text-lg text-muted-foreground font-medium mb-4">
                        {professor.affiliation}
                    </p>

                    {/* Bio Summary */}
                    {professor.bio && (
                        <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
                            {professor.bio.split('\n')[0]}
                        </p>
                    )}

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                        {professor.email && (
                            <a
                                href={`mailto:${professor.email}`}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                            >
                                <IconMail className="w-4 h-4" />
                                {professor.email}
                            </a>
                        )}
                        {professor.scholar && (
                            <a
                                href={professor.scholar}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
                            >
                                <IconSchool className="w-4 h-4" />
                                Google Scholar
                            </a>
                        )}
                        {professor.website && (
                            <a
                                href={professor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
                            >
                                <IconWorld className="w-4 h-4" />
                                Website
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Full Content Section */}
            {professor.rawContent && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-8 p-8 rounded-xl border bg-card/50"
                >
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h2:border-muted-foreground/10 prose-ul:list-disc prose-li:marker:text-primary prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:italic prose-blockquote:text-muted-foreground">
                        <ReactMarkdown>{professor.rawContent}</ReactMarkdown>
                    </div>
                </motion.div>
            )}
        </motion.article>
    )
}
