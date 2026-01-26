"use client";

import { Navbar } from "@/components/organisms/navbar";
import { HeroSection } from "@/components/organisms/hero-section";
import { Footer } from "@/components/organisms/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden selection:bg-indigo-500/30">
      <Navbar />
      <HeroSection />

      {/* Placeholder for other sections (About, Interests) - To be implemented fully in future iterations */}
      <section id="about" className="min-h-screen w-full flex items-center justify-center bg-secondary/30">
        <div className="container px-6 py-20">
          <h2 className="text-4xl font-bold mb-10 text-center">Work In Progress: About Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="h-64 bg-muted animate-pulse rounded-xl"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-full"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
