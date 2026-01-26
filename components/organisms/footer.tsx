"use client";

import React from "react";
import { useLanguage } from "@/context/language-provider";

export function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 border-t bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
                <p>
                    &copy; {currentYear} mdeangelis. Made with <span className="text-red-500">❤️</span> and passion for technology.
                </p>
            </div>
        </footer>
    );
}
