'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { IconArticle, IconCertificate, IconUsers, IconBulb } from '@tabler/icons-react'
import { useLanguage } from '@/lib/i18n'

interface StatItemProps {
    icon: React.ReactNode
    value: number
    suffix?: string
    label: string
    delay?: number
}

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    useEffect(() => {
        if (!isInView) return

        const duration = 2000
        const steps = 60
        const increment = value / steps
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= value) {
                setCount(value)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [isInView, value])

    return (
        <span ref={ref} className="tabular-nums">
            {count}{suffix}
        </span>
    )
}

function StatItem({ icon, value, suffix = '', label, delay = 0 }: StatItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay }}
            className="relative group"
        >
            <div className="flex flex-col items-center p-8 rounded-xl border border-primary/10 bg-gradient-to-b from-primary/5 to-transparent hover:border-primary/30 transition-all duration-500">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                {/* Icon */}
                <div className="relative mb-4 p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>

                {/* Number */}
                <div className="relative text-5xl font-black tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    <AnimatedCounter value={value} suffix={suffix} />
                </div>

                {/* Label */}
                <div className="relative text-muted-foreground font-medium text-center">
                    {label}
                </div>
            </div>
        </motion.div>
    )
}

export function StatsSection() {
    const { t } = useLanguage()

    const stats = [
        { icon: <IconArticle className="w-6 h-6" />, value: 50, suffix: '+', label: t.stats.publications },
        { icon: <IconCertificate className="w-6 h-6" />, value: 10, suffix: '+', label: t.stats.patents },
        { icon: <IconUsers className="w-6 h-6" />, value: 15, suffix: '+', label: t.stats.labMembers },
        { icon: <IconBulb className="w-6 h-6" />, value: 20, suffix: '+', label: t.stats.researchProjects },
    ]

    return (
        <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-black tracking-tight mb-4">
                        {t.stats.title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t.stats.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={stat.label}
                            icon={stat.icon}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
