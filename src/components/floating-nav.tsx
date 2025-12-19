'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    IconHome,
    IconUsers,
    IconArticle,
    IconFolder,
    IconBell,
    IconChevronRight,
    IconChevronLeft
} from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
    { href: '/', icon: IconHome, label: 'Home' },
    { href: '/people', icon: IconUsers, label: 'People' },
    { href: '/papers', icon: IconArticle, label: 'Papers' },
    { href: '/projects', icon: IconFolder, label: 'Projects' },
    { href: '/notices', icon: IconBell, label: 'Notices' },
]

export function FloatingNav() {
    const pathname = usePathname()
    const [isExpanded, setIsExpanded] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            // Show when scrolling up or at top
            setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2"
                >
                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="self-end p-2 rounded-full glass dark:glass-dark border border-muted-foreground/10 hover:border-primary/30 transition-all mb-2"
                    >
                        {isExpanded ? (
                            <IconChevronRight className="w-4 h-4 text-muted-foreground" />
                        ) : (
                            <IconChevronLeft className="w-4 h-4 text-muted-foreground" />
                        )}
                    </button>

                    {/* Nav Items */}
                    <div className="flex flex-col gap-1 p-2 rounded-2xl glass dark:glass-dark border border-muted-foreground/10">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== '/' && pathname.startsWith(item.href))

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group
                    ${isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5 shrink-0" />
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                className="text-sm font-medium whitespace-nowrap overflow-hidden"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    {/* Tooltip for collapsed state */}
                                    {!isExpanded && (
                                        <span className="absolute left-full ml-3 px-2 py-1 rounded-lg bg-popover text-popover-foreground text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    )
}
