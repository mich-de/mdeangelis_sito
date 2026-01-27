import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { LanguageProvider } from "@/context/language-provider";
import { cn } from "@/lib/utils";

const kamerik = localFont({
  src: "./fonts/kamerik.woff2",
  variable: "--font-kamerik",
  weight: "400",
  display: "swap",
});

const unitext = localFont({
  src: "./fonts/unitext.woff2",
  variable: "--font-unitext",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "mdeangelis | IT Professional & Visionary",
  description: "IT Professional, Technology Enthusiast & Music Producer. Exploring the digital world and real life with curiosity and passion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          kamerik.variable,
          unitext.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
