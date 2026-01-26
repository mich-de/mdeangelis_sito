"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/language-provider";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/atoms/glass-card";

export function AboutSection() {
    const { t } = useLanguage();
    // We need to cast "about.bio" to an object since t() returns string | object
    const bio = t("about.bio") as { p1: string; p2: string; p3: string };
    const tags = t("about.tags") as string[];

    return (
        <section id="about" className="py-20 bg-secondary/10 dark:bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
                >
                    {t("about.title")}
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Image & Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                            <Image
                                src="/assets/logo.jpg"
                                alt="mdeangelis profile"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
                                <Image src="/assets/icon_badge_visionary.png" width={24} height={24} alt="badge" />
                                <span className="text-white font-medium text-sm">{t("about.badge")}</span>
                            </div>
                        </div>

                        <div className="flex justify-center gap-6 mt-8">
                            <div className="text-center">
                                <span className="block text-3xl font-bold text-primary">10+</span>
                                <span className="text-sm text-muted-foreground">{t("about.stats.years")}</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-3xl font-bold text-primary">50+</span>
                                <span className="text-sm text-muted-foreground">{t("about.stats.projects")}</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-3xl font-bold text-primary">∞</span>
                                <span className="text-sm text-muted-foreground">{t("about.stats.curiosity")}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <GlassCard className="p-8 border-l-4 border-l-primary bg-background/40">
                            <p className="text-xl font-medium italic text-foreground/90">"{t("about.quote")}"</p>
                        </GlassCard>

                        <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                            <p>{bio.p1}</p>
                            <p>{bio.p2}</p>
                            <p>{bio.p3}</p>
                        </div>

                        <div className="pt-6">
                            <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                {t("about.interestsTitle")}
                                <Image src="/assets/icon_section_passions.png" width={24} height={24} alt="flame" />
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag: string, index: number) => (
                                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
