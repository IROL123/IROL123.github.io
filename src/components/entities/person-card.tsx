'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import type { PersonEntry } from '@/lib/indexes/people'
import {
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconWorld,
  IconSchool,
} from '@tabler/icons-react'

interface PersonCardProps {
  person: PersonEntry
}

export function PersonCard({ person }: PersonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="flex gap-5 p-5 rounded-lg border glass dark:glass-dark transition-all duration-300 hover:border-primary/40 hover:shadow-lg dark:hover:shadow-primary/5 group"
    >
      {person.avatar && (
        <div className="shrink-0 relative">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
          <img
            src={person.avatar}
            alt={person.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-transparent group-hover:border-primary/50 transition-all relative z-10"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="font-bold text-xl leading-none text-glow">{person.name}</h3>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            {person.role}
          </Badge>
        </div>
        {person.affiliation && (
          <p className="text-sm text-muted-foreground mt-1 font-medium italic opacity-80">{person.affiliation}</p>
        )}
        {person.interests && person.interests.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {person.interests.map((interest) => (
              <Badge key={interest} variant="outline" className="text-[10px] uppercase tracking-wider font-semibold border-muted-foreground/20">
                {interest}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-3 mt-4">
          {[
            { id: 'email', icon: IconMail, href: person.email ? `mailto:${person.email}` : null },
            { id: 'website', icon: IconWorld, href: person.website },
            { id: 'github', icon: IconBrandGithub, href: person.github },
            { id: 'linkedin', icon: IconBrandLinkedin, href: person.linkedin },
            { id: 'twitter', icon: IconBrandX, href: person.twitter },
            { id: 'scholar', icon: IconSchool, href: person.scholar },
          ].map((item) => item.href && (
            <a
              key={item.id}
              href={item.href}
              target={item.id === 'email' ? undefined : "_blank"}
              rel={item.id === 'email' ? undefined : "noopener noreferrer"}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
              title={item.id}
            >
              <item.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
