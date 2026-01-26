"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { LanguageSwitch } from "@/components/molecules/language-switch";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useLanguage } from "@/context/language-provider";

export function Navbar() {
    const scrollDirection = useScrollDirection();
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    const navItems = [
        { label: t("nav.home"), href: "#home" },
        { label: t("nav.about"), href: "#about" },
        { label: t("nav.interests"), href: "#interests" },
        { label: t("nav.contact"), href: "#contact" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 backdrop-blur-md bg-white/50 dark:bg-black/50 support-backdrop-blur:bg-white/50",
                scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
            )}
        >
            <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tighter">
                    MDE<span className="font-light">ANGELIS</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <ul className="flex gap-6">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="text-sm font-medium hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-2 border-l pl-4 border-gray-200 dark:border-gray-800">
                        <ThemeToggle />
                        <LanguageSwitch />
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <ThemeToggle />
                        <LanguageSwitch />
                    </div>
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <nav className="flex flex-col gap-4 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium hover:text-primary transition-colors block py-2"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}
