"use client";

import { Navbar } from "@/components/organisms/navbar";
import { HeroSection } from "@/components/organisms/hero-section";
import { AboutSection } from "@/components/organisms/about-section";
import { InterestsSection } from "@/components/organisms/interests-section";
import { ContactSection } from "@/components/organisms/contact-section";
import { Footer } from "@/components/organisms/footer";
import { SectionDivider } from "@/components/atoms/section-divider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden selection:bg-indigo-500/30">
      <Navbar />
      <HeroSection />

      {/* Wave divider: Hero -> About */}
      <div className="bg-background">
        <SectionDivider variant="wave" />
      </div>

      <AboutSection />

      {/* Wave divider: About -> Interests */}
      <div className="bg-secondary">
        <SectionDivider variant="curve" />
      </div>

      <InterestsSection />

      {/* Wave divider: Interests -> Contact */}
      <div className="bg-background">
        <SectionDivider variant="wave" />
      </div>

      <ContactSection />
      <Footer />
    </main>
  );
}
