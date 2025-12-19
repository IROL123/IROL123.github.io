'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import type { PaperEntry } from '@/lib/indexes/papers'
import { IconFileTypePdf, IconBrandGithub, IconExternalLink } from '@tabler/icons-react'

interface PaperCardProps {
  paper: PaperEntry
}

export function PaperCard({ paper }: PaperCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.005, x: 5 }}
      className="p-5 rounded-2xl border glass dark:glass-dark group transition-all duration-300 hover:border-primary/40"
    >
      <div className="flex gap-5">
        {paper.thumbnail && (
          <div className="shrink-0 hidden sm:block">
            <img
              src={paper.thumbnail}
              alt={paper.title}
              className="w-32 h-20 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 shadow-sm border border-muted-foreground/10"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {paper.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 font-medium opacity-80">
            {paper.authors.join(', ')}
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1 uppercase tracking-wider font-bold">
            {paper.venue} &bull; {paper.year}
          </p>
          {paper.tags && paper.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {paper.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] font-bold border-muted-foreground/10">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex gap-4 mt-4">
            {[
              { id: 'pdf', icon: IconFileTypePdf, href: paper.pdf_url, label: 'PDF' },
              { id: 'code', icon: IconBrandGithub, href: paper.code_url, label: 'Code' },
              { id: 'project', icon: IconExternalLink, href: paper.project_url, label: 'Project' },
            ].map((item) => item.href && (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-all"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
