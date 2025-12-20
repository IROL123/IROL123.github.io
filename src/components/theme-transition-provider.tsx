'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { IconLoader2 } from '@tabler/icons-react'

interface ThemeTransitionContextType {
    toggleTheme: () => void
    isTransitioning: boolean
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType | undefined>(undefined)

export function useThemeTransition() {
    const context = useContext(ThemeTransitionContext)
    if (!context) {
        throw new Error('useThemeTransition must be used within a ThemeTransitionProvider')
    }
    return context
}

export function ThemeTransitionProvider({ children }: { children: React.ReactNode }) {
    const { resolvedTheme, setTheme } = useTheme()
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [targetTheme, setTargetTheme] = useState<string | null>(null)

    const toggleTheme = () => {
        if (isTransitioning) return
        const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
        setTargetTheme(nextTheme)
        setIsTransitioning(true)
    }

    // Effect to handle the actual theme switch timing
    useEffect(() => {
        if (isTransitioning && targetTheme) {
            // Wait for entry animation to complete (approx 500ms)
            const timer = setTimeout(() => {
                setTheme(targetTheme)
                // Wait a bit more for the theme to apply before exiting overlay
                setTimeout(() => {
                    setIsTransitioning(false)
                    setTargetTheme(null)
                }, 100)
            }, 600)

            return () => clearTimeout(timer)
        }
    }, [isTransitioning, targetTheme, setTheme])

    return (
        <ThemeTransitionContext.Provider value={{ toggleTheme, isTransitioning }}>
            {children}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        key="theme-transition-overlay"
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none overflow-hidden"
                    >
                        {/* Background with slight tint based on target theme */}
                        <motion.div
                            className="absolute inset-0"
                            initial={{ backgroundColor: targetTheme === 'dark' ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)' }}
                            animate={{ backgroundColor: targetTheme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)' }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Large Dynamic Elements */}
                        <div className="relative flex items-center justify-center w-full h-full">
                            {/* Animated Rings */}
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    className={`absolute rounded-full border-2 ${targetTheme === 'dark' ? 'border-primary/20' : 'border-primary/20'
                                        }`}
                                    initial={{ width: 100, height: 100, opacity: 0, scale: 0.5 }}
                                    animate={{
                                        width: [100, 300, 500],
                                        height: [100, 300, 500],
                                        opacity: [0, 0.5, 0],
                                        scale: [1, 1.5, 2],
                                        rotate: i % 2 === 0 ? 90 : -90
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.4,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}

                            {/* Center Content */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
                                transition={{ duration: 0.4, ease: "backOut" }}
                                className="relative z-10 flex flex-col items-center gap-6"
                            >
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <div className={`absolute inset-0 rounded-full blur-2xl opacity-60 ${targetTheme === 'dark' ? 'bg-indigo-500/50' : 'bg-blue-400/50'
                                        }`} />
                                    <div className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center">
                                        <IconLoader2
                                            className={`w-12 h-12 animate-spin ${targetTheme === 'dark' ? 'text-white' : 'text-primary'
                                                }`}
                                        />
                                    </div>
                                </div>

                                <motion.span
                                    className={`text-2xl font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r ${targetTheme === 'dark'
                                            ? 'from-white via-blue-200 to-white'
                                            : 'from-blue-600 via-indigo-600 to-blue-600'
                                        }`}
                                    animate={{ backgroundPosition: ["0%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                    style={{ backgroundSize: "200%" }}
                                >
                                    Switching Theme
                                </motion.span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </ThemeTransitionContext.Provider>
    )
}
