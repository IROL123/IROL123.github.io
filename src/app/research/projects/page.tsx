import { Metadata } from 'next'
import { PROJECTS } from '@/lib/data/research'

export const metadata: Metadata = {
    title: 'Research Projects - IROL',
    description: 'Funded research projects and grants',
}

export default function ProjectsPage() {
    return (
        <main className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: 'var(--primary)' }}>
                    Projects
                </h1>
                <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                    Funded Research Grants & Tasks
                </p>
            </div>

            <div className="grid gap-6">
                {PROJECTS.map((project) => (
                    <div
                        key={project.id}
                        className="p-6 rounded-2xl border border-border/50 bg-card hover:bg-muted/30 transition-colors"
                    >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                            <div className="space-y-1">
                                <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                                    {project.funding}
                                </span>
                                <h3 className="text-xl font-bold leading-tight">
                                    {project.title}
                                </h3>
                            </div>
                            <div className="shrink-0 text-right md:text-right text-sm">
                                <div className="font-medium text-foreground">{project.year}</div>
                                <div className="text-muted-foreground">{project.role}</div>
                            </div>
                        </div>

                        {project.description && (
                            <p className="text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>
                        )}

                        {/* Tag-like decoration */}
                        <div className="mt-4 flex items-center gap-2">
                            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-primary/50 to-transparent"></div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
