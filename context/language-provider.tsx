"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en, it, Dictionary } from "@/utils/dictionaries";

type Language = "en" | "it";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    dictionary: Dictionary;
    t: (key: string) => string; // Simple dot-notation accessor
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("it"); // Default to Italian
    const [dictionary, setDictionary] = useState<Dictionary>(it);

    useEffect(() => {
        // Check local storage or browser preference here if needed
        const savedLang = localStorage.getItem("language") as Language;
        if (savedLang && (savedLang === "en" || savedLang === "it")) {
            setLanguage(savedLang);
        }
    }, []);

    useEffect(() => {
        setDictionary(language === "en" ? en : it);
        localStorage.setItem("language", language);
        document.documentElement.lang = language;
    }, [language]);

    // Simple nested property accessor
    // Usage: t('hero.title')
    const t = (path: string): string => {
        return path.split(".").reduce((obj, key) => {
            // @ts-ignore
            return obj && obj[key] !== "undefined" ? obj[key] : path;
        }, dictionary as any) as string;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, dictionary, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
