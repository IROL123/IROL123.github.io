'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface Particle {
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
}

export function FloatingParticles({ count = 20 }: { count?: number }) {
    const particles = useMemo<Particle[]>(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 5,
        }))
    }, [count])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-blue-400/20"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 10, -10, 0],
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}

export function FloatingOrbs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large orb 1 */}
            <motion.div
                className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl"
                style={{ left: '10%', top: '20%' }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Large orb 2 */}
            <motion.div
                className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl"
                style={{ right: '10%', bottom: '20%' }}
                animate={{
                    x: [0, -40, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Medium orb */}
            <motion.div
                className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500/10 to-pink-500/5 blur-2xl"
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    )
}
