"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/atoms/gradient-text";
import { Typewriter } from "@/components/atoms/typewriter";
import { useLanguage } from "@/context/language-provider";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";

// Floating shape component
const FloatingShape = ({
    type,
    size,
    delay,
    duration,
    className
}: {
    type: "triangle" | "circle" | "square" | "ring";
    size: number;
    delay: number;
    duration: number;
    className?: string;
}) => {
    const shapes = {
        triangle: (
            <svg width={size} height={size} viewBox="0 0 100 100" className="fill-current">
                <polygon points="50,10 90,90 10,90" />
            </svg>
        ),
        circle: (
            <div
                className="rounded-full bg-current"
                style={{ width: size, height: size }}
            />
        ),
        square: (
            <div
                className="bg-current rotate-45"
                style={{ width: size, height: size }}
            />
        ),
        ring: (
            <div
                className="rounded-full border-2 border-current"
                style={{ width: size, height: size }}
            />
        ),
    };

    return (
        <motion.div
            className={`absolute ${className}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0.1, 0.4, 0.1],
                scale: [0.8, 1, 0.8],
                y: [0, -30, 0],
                rotate: [0, 180, 360]
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {shapes[type]}
        </motion.div>
    );
};

export function HeroSection() {
    const { t } = useLanguage();
    const mousePos = useMousePosition();
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const orb1Ref = useRef<HTMLDivElement>(null);
    const orb2Ref = useRef<HTMLDivElement>(null);
    const orb3Ref = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        // Initial GSAP Animation Sequence
        const tl = gsap.timeline();

        if (titleRef.current) {
            tl.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            )
                .fromTo(".hero-subtitle",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, delay: -0.5 }
                )
                .fromTo(".hero-description",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, delay: -0.6 }
                )
                .fromTo(".hero-cta",
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
                    "-=0.4"
                );
        }

        // Animate floating shapes entrance
        gsap.fromTo(".floating-shape",
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 1.5, stagger: 0.15, ease: "elastic.out(1, 0.5)", delay: 0.5 }
        );
    }, []);

    // Parallax Effect for Orbs based on mouse position
    useEffect(() => {
        if (orb1Ref.current && orb2Ref.current && orb3Ref.current) {
            const x = (mousePos.x / window.innerWidth - 0.5) * 40;
            const y = (mousePos.y / window.innerHeight - 0.5) * 40;

            gsap.to(orb1Ref.current, {
                x: x,
                y: y,
                duration: 1,
                ease: "power2.out",
            });

            gsap.to(orb2Ref.current, {
                x: -x * 1.5,
                y: -y * 1.5,
                duration: 1.2,
                ease: "power2.out",
            });

            gsap.to(orb3Ref.current, {
                x: x * 0.8,
                y: -y * 0.8,
                duration: 1.4,
                ease: "power2.out",
            });
        }
    }, [mousePos]);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-10"
            id="home"
        >
            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 -z-20">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-background to-zinc-100 dark:from-background dark:via-background dark:to-background" />
                <div
                    className="absolute inset-0 opacity-30 animate-mesh-gradient"
                    style={{
                        background: `
                            radial-gradient(at 40% 20%, hsl(var(--primary) / 0.3) 0px, transparent 50%),
                            radial-gradient(at 80% 0%, hsl(var(--accent) / 0.2) 0px, transparent 50%),
                            radial-gradient(at 0% 50%, hsl(var(--primary) / 0.2) 0px, transparent 50%),
                            radial-gradient(at 80% 50%, hsl(var(--accent) / 0.15) 0px, transparent 50%),
                            radial-gradient(at 0% 100%, hsl(var(--primary) / 0.1) 0px, transparent 50%),
                            radial-gradient(at 80% 100%, hsl(var(--accent) / 0.2) 0px, transparent 50%),
                            radial-gradient(at 0% 0%, hsl(var(--chart-3) / 0.1) 0px, transparent 50%)
                        `,
                        backgroundSize: '200% 200%',
                    }}
                />
            </div>

            {/* Floating Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div ref={orb1Ref} className="absolute top-1/4 left-3/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[150px] opacity-50 mix-blend-screen" />
                <div ref={orb2Ref} className="absolute bottom-1/4 right-3/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[150px] opacity-40 mix-blend-screen" />
                <div ref={orb3Ref} className="absolute top-3/4 left-1/2 w-[400px] h-[400px] bg-chart-3/10 rounded-full blur-[120px] opacity-35 mix-blend-screen" />
            </div>

            {/* Floating Geometric Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
                {/* Left side shapes */}
                <FloatingShape type="triangle" size={24} delay={0} duration={8} className="floating-shape top-[15%] left-[5%] text-primary/20" />
                <FloatingShape type="circle" size={16} delay={0.5} duration={10} className="floating-shape top-[30%] left-[12%] text-accent/25" />
                <FloatingShape type="ring" size={32} delay={1} duration={12} className="floating-shape top-[55%] left-[8%] text-primary/15" />
                <FloatingShape type="square" size={12} delay={1.5} duration={9} className="floating-shape top-[75%] left-[15%] text-chart-3/20" />

                {/* Right side shapes */}
                <FloatingShape type="circle" size={20} delay={0.3} duration={11} className="floating-shape top-[20%] right-[8%] text-accent/20" />
                <FloatingShape type="triangle" size={18} delay={0.8} duration={9} className="floating-shape top-[45%] right-[5%] text-primary/25" />
                <FloatingShape type="ring" size={28} delay={1.3} duration={10} className="floating-shape top-[70%] right-[12%] text-chart-3/15" />
                <FloatingShape type="square" size={14} delay={2} duration={8} className="floating-shape top-[85%] right-[18%] text-accent/20" />

                {/* Center scattered shapes */}
                <FloatingShape type="circle" size={10} delay={0.7} duration={7} className="floating-shape top-[10%] left-[40%] text-primary/15" />
                <FloatingShape type="ring" size={20} delay={1.2} duration={11} className="floating-shape top-[85%] left-[35%] text-accent/15" />
                <FloatingShape type="triangle" size={14} delay={1.8} duration={9} className="floating-shape top-[5%] right-[30%] text-chart-3/20" />
            </div>

            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 -z-5 opacity-[0.015] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Content */}
                    <motion.div
                        style={{ y: y1, opacity }}
                        className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-2 lg:order-1"
                    >
                        <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter inline-flex items-baseline justify-center lg:justify-start leading-tight whitespace-nowrap">
                            <span className="font-sans inline-flex animate-text-shine">
                                MDE
                            </span>
                            <span className="font-display font-normal animate-text-shine" data-text="ANGELIS">ANGELIS</span>
                        </h1>

                        <div className="space-y-4 max-w-2xl">
                            <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground font-medium h-8">
                                <Typewriter text={t("hero.subtitle") as string} speed={60} delay={1500} />
                            </p>

                            <p className="hero-description text-base md:text-lg text-muted-foreground/80 leading-relaxed">
                                {t("hero.description")}
                            </p>
                        </div>


                    </motion.div>

                    {/* Right Column: Visuals */}
                    <motion.div
                        style={{ y: y2 }}
                        className="flex justify-center items-center relative order-1 lg:order-2"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px] animate-float group">

                            {/* Outer Glow Ring */}
                            <div className="absolute inset-[-20px] rounded-full border-2 border-primary/20 animate-glow-ring" />
                            <div className="absolute inset-[-40px] rounded-full border border-accent/10 animate-glow-ring" style={{ animationDelay: '1s' }} />

                            {/* Pulsing Halo Background */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-accent/30 rounded-full blur-3xl animate-pulse-slow mix-blend-screen" />

                            {/* Secondary Diffuse Glow */}
                            <div className="absolute inset-[-10%] bg-gradient-radial from-primary/20 to-transparent rounded-full blur-[100px] opacity-60" />

                            {/* Relief/Shadow Effect under the logo */}
                            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-black/60 blur-2xl rounded-[100%] z-0" />

                            {/* Logo Image with enhanced shadows */}
                            <img
                                src="/assets/logo_symbol_transparent.png"
                                alt="mdeangelis Logo"
                                className="w-full h-full object-contain relative z-10 drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_30px_60px_rgba(255,159,28,0.3)] transition-all duration-500 group-hover:scale-105"
                            />

                            {/* Shimmer Overlay on Hover */}
                            <div className="absolute inset-0 z-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            {/* Scroll Down Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", opacity: { duration: 1, delay: 2 } }}
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <span className="text-[10px] tracking-[0.2em] font-medium text-muted-foreground/70 uppercase">Scroll</span>
                <ChevronDown className="w-6 h-6 text-primary/80" />
            </motion.div>
        </section>
    );
}
