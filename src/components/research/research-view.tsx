'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { TiltCard } from "@/components/ui/tilt-card";

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
    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16 space-y-4"
            >
                <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Research Areas
                </h1>
                <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                    We focus on creating intelligent robot systems that can think and work alongside humans.
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
                        <h2 className="text-3xl font-bold tracking-tight">Robotics & Autonomous Systems</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            We develop autonomous navigation algorithms and mobile robot platforms capable of operating in diverse environments. Our work covers SLAM, path planning, and obstacle avoidance for robust mobility.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                Mobile Robots & Navigation
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                Rough Terrain Locomotion
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                Multi-Robot Coordination
                            </li>
                        </ul>
                    </div>
                    <TiltCard className="order-1 md:order-2 relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/research/autonomous.jpg"
                            alt="Robotics & Autonomous Systems"
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
                            alt="Human-Robot Interaction"
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </TiltCard>
                    <div className="order-2 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Human-Robot Interaction (HRI)</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            We aim to bridge the gap between human intuition and machine precision. Our research includes gesture recognition, intention estimation, and telemanipulation interfaces using VR/AR.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-accent" />
                                Gesture Recognition & Control
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-accent" />
                                VR/AR Telemanipulation
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-accent" />
                                Operator Intent Estimation
                            </li>
                        </ul>
                    </div>
                </motion.section>

                {/* Section 3 */}
                <motion.section variants={item} className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Wearable Sensors & AI</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            Utilizing wearable inertial sensors and deep learning, we analyze human motion and gait patterns for healthcare, rehabilitation, and intuitive robot control applications.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                Gait Analysis & Rehabilitation
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                Deep Learning for Time-Series Data
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                Motion Recognition
                            </li>
                        </ul>
                    </div>
                    <TiltCard className="order-1 md:order-2 relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/research/sensors.jpg"
                            alt="Wearable Sensors & AI"
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </TiltCard>
                </motion.section>
            </motion.div>
        </main>
    )
}
