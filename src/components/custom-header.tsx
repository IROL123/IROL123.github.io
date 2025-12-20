'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    IconChevronDown,
    IconHome,
    IconUsers,
    IconBell,
    IconMenu2,
    IconX,
    IconMicroscope,
    IconLanguage
} from '@tabler/icons-react'
import Logo from '@/components/logo'
import { useLanguage } from '@/lib/i18n'
import { LiquidGlassThemeToggle } from '@/components/ui/liquid-glass-theme-toggle'
import { useThemeTransition } from '@/components/theme-transition-provider'
import { useTheme } from 'next-themes'

interface NavItem {
    href: string
    label: string
    icon?: React.ElementType
    children?: { href: string; label: string; description?: string }[]
}

function useNavItems(): NavItem[] {
    const { t } = useLanguage()

    return [
        { href: '/', label: t.nav.home, icon: IconHome },
        {
            href: '/research',
            label: t.nav.research,
            icon: IconMicroscope,
            children: [
                { href: '/research', label: t.nav.researchOverview, description: t.nav.researchOverviewDesc },
                { href: '/research/publications', label: t.nav.publications, description: t.nav.publicationsDesc },
                { href: '/research/conferences', label: t.nav.conferences, description: t.nav.conferencesDesc },
                { href: '/research/patents', label: t.nav.patents, description: t.nav.patentsDesc },
                { href: '/research/projects', label: t.nav.projects, description: t.nav.projectsDesc },
            ]
        },
        {
            href: '/people',
            label: t.nav.people,
            icon: IconUsers,
            children: [
                { href: '/people?tab=professor', label: t.nav.professor, description: t.nav.professorDesc },
                { href: '/people?tab=members', label: t.nav.members, description: t.nav.membersDesc },
                { href: '/people?tab=alumni', label: t.nav.alumni, description: t.nav.alumniDesc },
            ]
        },
        {
            href: '/notices',
            label: t.nav.notices,
            icon: IconBell,
            children: [
                { href: '/notices?tab=news', label: t.notices.tabs.news, description: t.notices.tabs.newsDesc },
                { href: '/notices?tab=announcement', label: t.notices.tabs.announcement, description: t.notices.tabs.announcementDesc },
            ]
        },
    ]
}

function LanguageToggle({ isTransparent }: { isTransparent: boolean }) {
    const { language } = useLanguage()
    const { toggleLanguage } = useThemeTransition()

    return (
        <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${isTransparent
                ? 'text-white/90 hover:text-white border-white/20 hover:bg-white/10'
                : 'text-muted-foreground hover:text-foreground border-border/50 hover:bg-secondary'
                }`}
            title={language === 'en' ? 'Switch to Korean' : 'Switch to English'}
        >
            <IconLanguage className="w-4 h-4" />
            <span className="uppercase font-bold">{language}</span>
        </button>
    )
}

function NavDropdown({ item, isActive, className, alignRight = false }: { item: NavItem; isActive: boolean; className?: string; alignRight?: boolean }) {
    const [isOpen, setIsOpen] = useState(false)

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
                        className="absolute inset-0 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full -z-10 border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
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
                        className={`absolute top-full mt-2 p-2 min-w-[260px] rounded-2xl glass dark:bg-zinc-900/90 border border-border/50 shadow-2xl backdrop-blur-xl z-50 overflow-hidden ${alignRight ? 'right-0' : 'left-0'}`}
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
    const navItems = useNavItems()
    const { t } = useLanguage()
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

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
    const isDark = mounted && resolvedTheme === 'dark'

    // Text colors based on state - dark text in dark mode when on Hero
    const heroTextColor = isDark ? 'text-slate-800' : 'text-white'
    const heroTextColorMuted = isDark ? 'text-slate-600 hover:text-slate-800' : 'text-white/80 hover:text-white'
    const heroTextColorActive = isDark ? 'text-slate-900' : 'text-white'

    const logoColor = isTransparent ? heroTextColor : 'text-foreground'
    const subLogoColor = isTransparent ? (isDark ? 'text-slate-600 group-hover:text-slate-800' : 'text-white/80 group-hover:text-white') : 'text-muted-foreground group-hover:text-foreground'
    const navColor = isTransparent ? heroTextColorMuted : 'text-muted-foreground hover:text-foreground'
    const navActiveColor = isTransparent ? heroTextColorActive : 'text-foreground'

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
                                <Logo hasLink={false} forceWhite={isTransparent && !isDark} />
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

                    {/* Desktop Navigation - Glass Style */}
                    <div className="hidden lg:flex items-center gap-3">
                        <nav className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href ||
                                    (item.href !== '/' && pathname.startsWith(item.href))

                                // People 메뉴는 오른쪽 끝에 있어서 드롭다운을 왼쪽 정렬
                                const isRightAligned = item.href === '/people'
                                return (
                                    <NavDropdown
                                        key={item.href}
                                        item={item}
                                        isActive={isActive}
                                        className={isActive ? navActiveColor : navColor}
                                        alignRight={isRightAligned}
                                    />
                                )
                            })}
                        </nav>
                        <LiquidGlassThemeToggle isTransparent={isTransparent} size="sm" />
                        <LanguageToggle isTransparent={isTransparent} />
                    </div>

                    {/* Mobile Controls */}
                    <div className="lg:hidden flex items-center gap-2">
                        <LiquidGlassThemeToggle isTransparent={isTransparent} size="sm" />
                        <LanguageToggle isTransparent={isTransparent} />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-xl hover:bg-secondary transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <IconX className="w-6 h-6" />
                            ) : (
                                <IconMenu2 className="w-6 h-6" />
                            )}
                        </button>
                    </div>
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
                            {navItems.map((item) => {
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