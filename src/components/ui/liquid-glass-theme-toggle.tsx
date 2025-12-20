'use client'

import { useThemeTransition } from '@/components/theme-transition-provider'
import { useTheme } from 'next-themes'
import { useState, useEffect, useCallback, useRef } from 'react'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { motion, AnimatePresence } from 'framer-motion'

interface LiquidGlassThemeToggleProps {
    isTransparent?: boolean
    size?: 'sm' | 'md' | 'lg'
}

export function LiquidGlassThemeToggle({ isTransparent = false, size = 'md' }: LiquidGlassThemeToggleProps) {
    const { resolvedTheme } = useTheme()
    const { toggleTheme } = useThemeTransition()
    const [mounted, setMounted] = useState(false)
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const containerRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        setMouseOffset({
            x: ((e.clientX - centerX) / rect.width) * 100,
            y: ((e.clientY - centerY) / rect.height) * 100,
        })
    }, [])

    const handleMouseLeave = useCallback(() => {
        setMouseOffset({ x: 0, y: 0 })
        setIsHovered(false)
    }, [])

    const sizeClasses = {
        sm: 'w-9 h-9',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    }

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    }

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <button
                className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-300`}
                disabled
            />
        )
    }

    const isDark = resolvedTheme === 'dark'
    const elasticTranslateX = mouseOffset.x * 0.03
    const elasticTranslateY = mouseOffset.y * 0.03

    return (
        <button
            ref={containerRef}
            onClick={toggleTheme}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={`
                relative ${sizeClasses[size]} rounded-full flex items-center justify-center
                cursor-pointer transition-all duration-300
                ${isTransparent
                    ? 'text-white/90 hover:text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }
            `}
            style={{
                transform: `translate(${elasticTranslateX}px, ${elasticTranslateY}px)`,
                transition: 'transform 0.15s ease-out',
            }}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
            {/* Liquid Glass Background */}
            <span
                className="absolute inset-0 rounded-full overflow-hidden"
                style={{
                    background: isTransparent
                        ? 'rgba(255, 255, 255, 0.1)'
                        : isDark
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(0, 0, 0, 0.05)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: isTransparent
                        ? '1px solid rgba(255, 255, 255, 0.2)'
                        : isDark
                            ? '1px solid rgba(255, 255, 255, 0.15)'
                            : '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: isHovered
                        ? isDark
                            ? '0 4px 16px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 200, 100, 0.15), inset 0 0 12px rgba(255, 255, 255, 0.1)'
                            : '0 4px 16px rgba(0, 0, 0, 0.1), 0 0 20px rgba(100, 150, 255, 0.15), inset 0 0 12px rgba(0, 0, 0, 0.05)'
                        : isDark
                            ? '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(255, 255, 255, 0.05)'
                            : '0 2px 8px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(0, 0, 0, 0.02)',
                }}
            />

            {/* Dynamic Gradient Border (Liquid Glass Effect) */}
            <span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                    mixBlendMode: 'overlay',
                    opacity: isHovered ? 0.8 : 0.4,
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    background: `linear-gradient(
                        ${135 + mouseOffset.x * 1.5}deg,
                        rgba(255, 255, 255, 0.0) 0%,
                        rgba(255, 255, 255, ${0.4 + Math.abs(mouseOffset.x) * 0.01}) 33%,
                        rgba(255, 255, 255, ${0.7 + Math.abs(mouseOffset.x) * 0.01}) 66%,
                        rgba(255, 255, 255, 0.0) 100%
                    )`,
                    transition: 'opacity 0.2s ease-out, background 0.15s ease-out',
                }}
            />

            {/* Icon with Animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
                    className="relative z-10"
                >
                    {isDark ? (
                        <IconMoon className={`${iconSizes[size]} text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.5)]`} />
                    ) : (
                        <IconSun className={`${iconSizes[size]} text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]`} />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Glow Effect on Hover */}
            <span
                className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: isDark
                        ? 'radial-gradient(circle, rgba(253, 224, 71, 0.15) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
                }}
            />
        </button>
    )
}
