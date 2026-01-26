"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-provider";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/atoms/glass-card";

export function ContactSection() {
    const { t } = useLanguage();

    return (
        <section id="contatti" className="py-20 bg-secondary/5 dark:bg-background/80 relative">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
                >
                    {t("contact.title")}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <GlassCard className="p-6 flex items-center gap-4 hover:border-primary/50 transition-colors">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Image src="/assets/icon_contact_website.png" width={32} height={32} alt="Web" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{t("contact.webLabel")}</h3>
                                <a href="https://mdeangelis.me" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                    mdeangelis.me
                                </a>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6 flex items-center gap-4 hover:border-primary/50 transition-colors">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Image src="/assets/icon_contact_email.png" width={32} height={32} alt="Email" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{t("contact.emailLabel")}</h3>
                                <a href="mailto:info@mdeangelis.me" className="text-muted-foreground hover:text-primary transition-colors">
                                    info@mdeangelis.me
                                </a>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center gap-6"
                    >
                        <h3 className="text-2xl font-bold text-center md:text-left mb-4">Social Network</h3>
                        <div className="flex justify-center md:justify-start gap-4">
                            {[
                                { href: "https://github.com/mdeangelis", icon: "icon_social_github.png", label: "GitHub" },
                                { href: "https://linkedin.com/in/mdeangelis", icon: "icon_social_linkedin.png", label: "LinkedIn" },
                                { href: "https://twitter.com/mdeangelis", icon: "icon_social_twitter.png", label: "Twitter" },
                                { href: "https://instagram.com/mdeangelis", icon: "icon_social_instagram.png", label: "Instagram" }
                            ].map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-background border border-white/10 p-4 rounded-xl hover:scale-110 hover:border-primary hover:shadow-[0_0_20px_oklch(var(--primary)/0.3)] transition-all duration-300"
                                >
                                    <Image
                                        src={`/assets/${social.icon}`}
                                        width={32}
                                        height={32}
                                        alt={social.label}
                                        className="dark:invert-0" /* Icons seem to be colored already based on legacy assets */
                                    />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
