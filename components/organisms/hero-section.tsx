"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/atoms/gradient-text";
import { Typewriter } from "@/components/atoms/typewriter";
import { useLanguage } from "@/context/language-provider";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

export function HeroSection() {
    const { t } = useLanguage();
    const mousePos = useMousePosition();
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const orb1Ref = useRef<HTMLDivElement>(null);
    const orb2Ref = useRef<HTMLDivElement>(null);

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
    }, []);

    // Parallax Effect for Orbs based on mouse position
    useEffect(() => {
        if (orb1Ref.current && orb2Ref.current) {
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
        }
    }, [mousePos]);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-10"
            id="home"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
                <div ref={orb1Ref} className="absolute top-1/2 left-3/4 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px] opacity-40 mix-blend-screen" />
                <div ref={orb2Ref} className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[200px] opacity-30 mix-blend-screen" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Content */}
                    <motion.div
                        style={{ y: y1, opacity }}
                        className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-2 lg:order-1"
                    >
                        <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter flex flex-wrap items-center justify-center lg:justify-start gap-1 leading-tight whitespace-nowrap">
                            <GradientText from="from-accent" to="to-chart-3" className="via-accent/80">
                                M
                            </GradientText>
                            <GradientText from="from-secondary" via="via-muted-foreground" to="to-gray-300" className="opacity-90">
                                DE
                            </GradientText>
                            <span className="font-light text-foreground ml-1 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                ANGELIS
                            </span>
                        </h1>

                        <div className="space-y-4 max-w-2xl">
                            <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground font-medium h-8">
                                <Typewriter text={t("hero.subtitle") as string} speed={60} delay={1500} />
                            </p>

                            <p className="hero-description text-base md:text-lg text-muted-foreground/80 leading-relaxed">
                                {t("hero.description")}
                            </p>
                        </div>

                        <motion.div
                            className="hero-cta pt-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button variant="premium" size="lg" className="rounded-full text-lg px-8 py-6 h-auto" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                                {t("hero.cta")}
                                <span className="ml-2">→</span>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Visuals */}
                    <motion.div
                        style={{ y: y2 }}
                        className="flex justify-center items-center relative order-1 lg:order-2"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px] animate-float perspective-1000">
                            {/* Blob effect behind logo */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse-slow mix-blend-screen" />

                            {/* Relief/Shadow Effect under the logo */}
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-black/50 blur-xl rounded-[100%] z-0" />

                            <img
                                src="/assets/logo_symbol_transparent.png"
                                alt="mdeangelis Logo"
                                className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
