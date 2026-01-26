"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/language-provider";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/atoms/glass-card";

// Mappa statica delle icone per associarle ai titoli (che arrivano tradotti)
// Usiamo l'ordine dell'array in dictionaries.ts come riferimento o string matching parziale se necessario.
// Per semplicità, qui mappiamo le immagini basandoci sull'indice, dato che l'ordine nel dizionario è fisso.
const ICONS = [
    "icon_tech.png",          // 0: Informatica
    "icon_rocket.png",        // 1: Tecnologia
    "icon_programming.png",   // 2: Programmazione
    "icon_ai.png",            // 3: AI
    "icon_travel.png",        // 4: Viaggi
    "icon_walks.png",         // 5: Passeggiate
    "icon_reading.png",       // 6: Lettura
    "icon_music.png",         // 7: Musica
    "icon_culture.png",       // 8: Cultura
    "icon_friends.png",       // 9: Amici
    "icon_food.png",          // 10: Cibo
    "icon_wine.png",          // 11: Vino
    "icon_conversation.png",  // 12: Conversazioni
    "icon_languages.png",     // 13: Lingue
];

export function InterestsSection() {
    const { t } = useLanguage();
    const interests = t("interests.items") as { title: string; desc: string }[];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemAnim = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="interests" className="py-20 bg-background relative">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary">
                    {t("interests.title")}
                </h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {interests.map((item, index) => (
                        <motion.div key={index} variants={itemAnim}>
                            <GlassCard className="h-full p-6 flex flex-col items-center text-center hover:border-primary/50 transition-colors group">
                                <div className="w-16 h-16 mb-4 relative transition-transform duration-300 group-hover:scale-110">
                                    <Image
                                        src={`/assets/${ICONS[index] || "icon_tech.png"}`}
                                        alt={item.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {item.desc}
                                </p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
