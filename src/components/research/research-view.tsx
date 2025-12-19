'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { TiltCard } from "@/components/ui/tilt-card";
import { useLanguage } from '@/lib/i18n'

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export function ResearchView() {
    const { t } = useLanguage()

    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16 space-y-4"
            >
                <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {t.research.title}
                </h1>
                <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                    {t.research.subtitle}
                </p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show" // Or whileInView="show"
                className="space-y-16"
            >
                {/* Section 1 */}
                <motion.section variants={item} className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">{t.research.robotics.title}</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {t.research.robotics.description}
                        </p>
                        <ul className="space-y-2">
                            {t.research.robotics.items.map((itemText, index) => (
                                <li key={index} className="flex items-center gap-3 text-muted-foreground">
                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                    {itemText}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <TiltCard className="order-1 md:order-2 relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/research/autonomous.jpg"
                            alt={t.research.robotics.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </TiltCard>
                </motion.section>

                {/* Section 2 */}
                <motion.section variants={item} className="grid md:grid-cols-2 gap-8 items-center">
                    <TiltCard className="order-1 relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/research/hri.jpg"
                            alt={t.research.hri.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </TiltCard>
                    <div className="order-2 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">{t.research.hri.title}</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {t.research.hri.description}
                        </p>
                        <ul className="space-y-2">
                            {t.research.hri.items.map((itemText, index) => (
                                <li key={index} className="flex items-center gap-3 text-muted-foreground">
                                    <span className="w-2 h-2 rounded-full bg-accent" />
                                    {itemText}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.section>

                {/* Section 3 */}
                <motion.section variants={item} className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">{t.research.wearable.title}</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {t.research.wearable.description}
                        </p>
                        <ul className="space-y-2">
                            {t.research.wearable.items.map((itemText, index) => (
                                <li key={index} className="flex items-center gap-3 text-muted-foreground">
                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                    {itemText}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <TiltCard className="order-1 md:order-2 relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/research/sensors.jpg"
                            alt={t.research.wearable.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </TiltCard>
                </motion.section>
            </motion.div>
        </main>
    )
}

