import { Metadata } from 'next'
import { CONFERENCES } from '@/lib/data/research'

export const metadata: Metadata = {
    title: 'Conferences - IROL',
    description: 'Conference presentations and proceedings',
}

export default function ConferencesPage() {
    // Group by year
    const conferencesByYear = new Map<number, typeof CONFERENCES>();

    CONFERENCES.forEach(conf => {
        const year = Number(conf.year);
        if (!conferencesByYear.has(year)) conferencesByYear.set(year, []);
        conferencesByYear.get(year)?.push(conf);
    });

    const years = Array.from(conferencesByYear.keys()).sort((a, b) => b - a);

    return (
        <main className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: 'var(--primary)' }}>
                    Conferences
                </h1>
                <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                    Academic Presentations & Proceedings
                </p>
            </div>

            <div className="space-y-12 max-w-5xl mx-auto">
                {years.map(year => (
                    <section key={year} className="relative pl-8 md:pl-0">
                        <div className="md:absolute md:left-[-100px] md:top-0 md:text-right md:w-20">
                            <span className="text-2xl font-black text-muted-foreground/30">{year}</span>
                        </div>

                        <div className="space-y-6 border-l-2 border-muted pl-6 md:pl-8 py-2">
                            {conferencesByYear.get(year)?.map(conf => (
                                <div key={conf.id} className="relative">
                                    <div className="absolute -left-[31px] md:-left-[39px] top-2 w-3 h-3 rounded-full bg-muted border-2 border-background ring-4 ring-background" />
                                    <h3 className="font-bold text-lg mb-1">{conf.title}</h3>
                                    <div className="text-muted-foreground text-sm space-y-0.5">
                                        <p>{conf.authors}</p>
                                        <p className="italic text-primary/80">{conf.meta}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    )
}
