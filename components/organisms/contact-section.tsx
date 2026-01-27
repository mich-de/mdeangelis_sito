"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-provider";
import { motion } from "framer-motion";

const socialLinks = [
    { href: "https://github.com/mdeangelis", icon: "icon_social_github.png", label: "GitHub" },
    { href: "https://linkedin.com/in/mdeangelis", icon: "icon_social_linkedin.png", label: "LinkedIn" },
    { href: "https://twitter.com/mdeangelis", icon: "icon_social_twitter.png", label: "Twitter" },
    { href: "https://instagram.com/mdeangelis", icon: "icon_social_instagram.png", label: "Instagram" },
    { href: "https://youtube.com/@mdeangelis", icon: "icon_social_youtube.png", label: "YouTube" },
    { href: "https://tiktok.com/@mdeangelis", icon: "icon_social_tiktok.png", label: "TikTok" }
];

export function ContactSection() {
    const { language } = useLanguage();

    return (
        <section id="contatti" className="px-6">
            <div className="section-container container mx-auto max-w-3xl text-center">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <h2 className="heading-2 mb-4">
                        {language === "it" ? "Restiamo in Contatto" : "Let's Connect"}
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        {language === "it"
                            ? "Seguimi sui social per restare aggiornato sui miei progetti e interessi."
                            : "Follow me on social media to stay updated on my projects and interests."}
                    </p>
                </motion.div>

                {/* Social Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    {socialLinks.map((social, index) => (
                        <Link
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-secondary/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                        >
                            <Image
                                src={`/assets/${social.icon}`}
                                width={24}
                                height={24}
                                alt={social.label}
                                className="transition-transform group-hover:scale-110"
                            />
                            <span className="font-medium text-sm text-foreground">{social.label}</span>
                        </Link>
                    ))}
                </motion.div>

                {/* Website Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 pt-8 border-t border-border"
                >
                    <a
                        href="https://mdeangelis.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                        <Image src="/assets/icon_contact_website.png" width={20} height={20} alt="" />
                        <span className="font-mono text-sm">mdeangelis.me</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
