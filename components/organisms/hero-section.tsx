"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/atoms/gradient-text";
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
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
            id="home"
        >
            {/* Background Orbs */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div ref={orb1Ref} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
                <div ref={orb2Ref} className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <motion.div
                style={{ y: y1, opacity }}
                className="container mx-auto px-6 z-10 text-center flex flex-col items-center gap-6"
            >
                <div className="mb-4 relative">
                    {/* Logo Placeholder or Hero Icon could go here */}
                </div>

                <h1 ref={titleRef} className="text-6xl md:text-8xl font-black tracking-tighter">
                    <GradientText from="from-blue-600 dark:from-blue-400" via="via-indigo-500 dark:via-indigo-300" to="to-purple-600 dark:to-purple-400">
                        {t("hero.titleBold")}
                    </GradientText>
                    <span className="font-light text-foreground">{t("hero.titleLight")}</span>
                </h1>

                <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl">
                    {t("hero.subtitle")}
                </p>

                <p className="hero-description text-base md:text-lg text-muted-foreground/80 max-w-xl leading-relaxed">
                    {t("hero.description")}
                </p>

                <motion.div
                    className="hero-cta mt-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button variant="premium" size="lg" className="rounded-full text-lg px-8 py-6 h-auto" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                        {t("hero.cta")}
                        <span className="ml-2">→</span>
                    </Button>
                </motion.div>
            </motion.div>

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
