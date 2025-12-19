'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Cpu, Microscope } from 'lucide-react'
import { FloatingOrbs, FloatingParticles } from './floating-particles'

export function Hero() {
    return (
        <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#0a192f] text-white -mt-20 pt-24">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.4),rgba(10,25,47,1))]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                {/* Floating animations */}
                <FloatingOrbs />
                <FloatingParticles count={25} />
                {/* Gradient overlay for header visibility */}
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
            </div>

            <div className="container relative z-10 px-6 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-900/30 backdrop-blur-sm">
                        <span className="text-sm font-semibold tracking-widest text-blue-200 uppercase">
                            Soongsil University
                        </span>
                    </div>

                    <h1 className="max-w-5xl mx-auto mb-6 text-6xl md:text-8xl font-black tracking-tighter leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200">
                            IROL
                        </span>
                    </h1>

                    <p className="max-w-3xl mx-auto mb-10 text-2xl md:text-3xl font-light text-blue-100/80 tracking-wide">
                        Intelligent Robotics Laboratory
                    </p>

                    <p className="max-w-2xl mx-auto mb-12 text-lg text-slate-400 leading-relaxed">
                        Pioneering the future of Human-Robot Interaction, Autonomous Systems, and Deep Learning applications in real-world environments.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href="/research"
                            className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-full font-medium transition-all hover:scale-105 shadow-[0_0_15px_rgba(37,99,235,0.25)]"
                        >
                            Explore Research
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href="/projects"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-white/20 hover:bg-white/10 text-white text-sm rounded-full font-medium transition-all hover:scale-105 backdrop-blur-sm"
                        >
                            Our Projects
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500"
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    )
}
