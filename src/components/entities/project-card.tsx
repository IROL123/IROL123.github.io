import * as React from 'react'
import { Link } from 'next-view-transitions'
import { Badge } from '@/components/ui/badge'
import type { ProjectEntry } from '@/lib/indexes/projects'
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react'

interface ProjectCardProps {
  project: ProjectEntry
}

const statusColors: Record<string, 'default' | 'secondary' | 'outline'> = {
  Active: 'default',
  Completed: 'secondary',
  Archived: 'outline',
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="p-4 rounded-lg border bg-card">
      <div className="flex gap-4">
        {project.cover_image && (
          <div className="shrink-0 hidden sm:block">
            <img
              src={project.cover_image}
              alt={project.title}
              className="w-32 h-24 rounded object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/projects/${project.slug}`}
              className="font-semibold hover:underline"
            >
              {project.title}
            </Link>
            <Badge variant={statusColors[project.status] || 'outline'}>
              {project.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{project.summary}</p>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex gap-3 mt-3">
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <IconBrandGithub className="w-4 h-4" />
                Repository
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <IconExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
