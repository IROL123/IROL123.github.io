'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { TypewriterEffect } from "../ui/typewriter-effect";
import { FloatingOrbs, FloatingParticles } from './floating-particles'

export function Hero() {
    const words = [
        {
            text: "Intelligent",
            className: "text-blue-100/90 font-light",
        },
        {
            text: "Robotics",
            className: "text-blue-100/90 font-light",
        },
        {
            text: "Laboratory",
            className: "text-blue-100/90 font-light",
        },
    ];

    return (
        <section className="relative w-screen left-1/2 -ml-[50vw] min-h-[100svh] sm:min-h-screen lg:min-h-[90vh] 2xl:min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0a192f] text-white -mt-20 pt-20 sm:pt-24">
            {/* Background Effects - full coverage */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.4),rgba(10,25,47,1))]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] md:bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                {/* Floating animations - fewer on mobile for performance */}
                <div className="hidden sm:block">
                    <FloatingOrbs />
                </div>
                <FloatingParticles count={15} />
                {/* Gradient overlay for header visibility */}
                <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
            </div>

            <div className="w-full max-w-7xl 2xl:max-w-[1600px] relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-4 sm:space-y-6 md:space-y-8"
                >
                    <div className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-blue-400/30 bg-blue-900/30 backdrop-blur-sm">
                        <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest text-blue-200 uppercase">
                            Soongsil University
                        </span>
                    </div>

                    <h1 className="mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tighter leading-none">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200">
                            IROL
                        </span>
                    </h1>

                    <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl mx-auto">
                        <TypewriterEffect
                            words={words}
                            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light text-blue-100/90 tracking-wide"
                            cursorClassName="bg-blue-200 h-4 sm:h-6 md:h-8 lg:h-10 xl:h-12"
                        />
                    </div>

                    <p className="max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl 2xl:max-w-3xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl text-slate-400 leading-relaxed px-2">
                        Pioneering the future of Human-Robot Interaction, Autonomous Systems, and Deep Learning.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4">
                        <a
                            href="/research"
                            className="group relative inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm md:text-base rounded-full font-medium transition-all active:scale-95 sm:hover:scale-105 shadow-[0_0_15px_rgba(37,99,235,0.25)]"
                        >
                            Explore Research
                            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href="/projects"
                            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3.5 bg-transparent border border-white/20 hover:bg-white/10 text-white text-xs sm:text-sm md:text-base rounded-full font-medium transition-all active:scale-95 sm:hover:scale-105 backdrop-blur-sm"
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
                className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500"
            >
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </motion.div>
        </section>
    )
}
