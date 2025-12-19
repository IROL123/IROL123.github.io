'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    IconChevronDown,
    IconHome,
    IconUsers,
    IconArticle,
    IconFolder,
    IconBell,
    IconMenu2,
    IconX,
    IconBulb,
    IconMicroscope
} from '@tabler/icons-react'
import Logo from '@/components/logo'

interface NavItem {
    href: string
    label: string
    icon?: React.ElementType
    children?: { href: string; label: string; description?: string }[]
}

const NAV_ITEMS: NavItem[] = [
    { href: '/', label: 'Home', icon: IconHome },
    {
        href: '/research',
        label: 'Research',
        icon: IconMicroscope,
        children: [
            { href: '/research', label: 'Overview', description: 'Our key research areas' },
            { href: '/research/publications', label: 'Publications', description: 'Papers and journals' },
            { href: '/research/conferences', label: 'Conferences', description: 'Academic presentations' },
            { href: '/research/patents', label: 'Patents', description: 'Intellectual property' },
            { href: '/research/projects', label: 'Projects', description: 'Research grants & tasks' },
        ]
    },
    {
        href: '/people',
        label: 'People',
        icon: IconUsers,
        children: [
            { href: '/people?tab=professor', label: 'Professor', description: 'Principal Investigator' },
            { href: '/people?tab=members', label: 'Members', description: 'Current students & researchers' },
            { href: '/people?tab=alumni', label: 'Alumni', description: 'Graduated members' },
        ]
    },
    { href: '/notices', label: 'Notices', icon: IconBell },
]

function NavDropdown({ item, isActive, className }: { item: NavItem; isActive: boolean; className?: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    if (!item.children) {
        return (
            <Link
                href={item.href}
                className={`relative px-5 py-2.5 text-[15px] font-medium transition-all duration-300 group
          ${isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    } ${className || ''}`}
            >
                {item.label}
                {isActive && (
                    <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-secondary/80 rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
            </Link>
        )
    }

    return (
        <div
            className="relative group/dropdown"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={`flex items-center gap-1.5 px-5 py-2.5 text-[15px] font-medium transition-all duration-300 rounded-full
          ${isActive || isOpen
                        ? 'text-foreground bg-secondary/50'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                    } ${!isActive && !isOpen ? (className || '') : ''}`}
            >
                {item.label}
                <IconChevronDown
                    className={`w-4 h-4 transition-transform duration-300 text-muted-foreground/70 group-hover/dropdown:text-foreground ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 p-2 min-w-[260px] rounded-2xl glass dark:bg-zinc-900/90 border border-border/50 shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
                    >
                        <div className="flex flex-col gap-1">
                            {item.children.map((child) => (
                                <Link
                                    key={child.href}
                                    href={child.href}
                                    className="group flex flex-col px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors"
                                >
                                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {child.label}
                                    </span>
                                    {child.description && (
                                        <span className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                                            {child.description}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function CustomHeader() {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    const isHome = pathname === '/'
    const isTransparent = isHome && !scrolled

    // Text colors based on state
    const logoColor = isTransparent ? 'text-white' : 'text-foreground'
    const subLogoColor = isTransparent ? 'text-white/80 group-hover:text-white' : 'text-muted-foreground group-hover:text-foreground'
    const navColor = isTransparent ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'
    const navActiveColor = isTransparent ? 'text-white' : 'text-foreground'

    return (
        <header
            className={`left-0 right-0 top-0 z-[100] w-full transition-all duration-500 border-b
        ${isHome ? 'fixed' : 'sticky'}
        ${!isTransparent
                    ? 'bg-background/80 backdrop-blur-md border-border/50 py-2 shadow-sm'
                    : 'bg-transparent border-transparent py-4'
                }`}
        >
            <div className="w-full max-w-[1920px] mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2 group select-none">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative -translate-y-1">
                                <Logo hasLink={false} forceWhite={isTransparent} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-black text-xl tracking-tight leading-none transition-colors duration-300 ${logoColor}`}>
                                IROL
                            </span>
                            <span className={`text-[11px] font-medium tracking-wide uppercase transition-colors duration-300 -mt-0.5 ${subLogoColor}`}>
                                Intelligent Robotics Lab
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-2">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== '/' && pathname.startsWith(item.href))

                            return (
                                <NavDropdown key={item.href} item={item} isActive={isActive}
                                    className={isActive ? navActiveColor : navColor}
                                />
                            )
                        })}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-xl hover:bg-secondary transition-colors"
                    >
                        {mobileMenuOpen ? (
                            <IconX className="w-6 h-6" />
                        ) : (
                            <IconMenu2 className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-background border-b border-border/50 overflow-hidden"
                    >
                        <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-2">
                            {NAV_ITEMS.map((item) => {
                                const isActive = pathname === item.href ||
                                    (item.href !== '/' && pathname.startsWith(item.href))

                                return (
                                    <div key={item.href} className="space-y-1">
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-lg
                        ${isActive
                                                    ? 'bg-secondary text-primary'
                                                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                                                }`}
                                        >
                                            {item.icon && <item.icon className="w-5 h-5" />}
                                            {item.label}
                                        </Link>

                                        {item.children && (
                                            <div className="pl-12 grid gap-1 py-1">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary/30 rounded-lg transition-colors"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default CustomHeader