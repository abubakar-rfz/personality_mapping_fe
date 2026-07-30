import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { PageLayout } from "@/components/organisms/PageLayout";
import { Sidebar } from "@/components/organisms/Sidebar";
import { TopNavbar } from "@/components/organisms/TopNavbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PERSONALITY MAPPING",
  description: "AI Workforce Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-[#F8FAFC] dark:bg-[#0a0a0a] antialiased`}
    >
      <body className="min-h-full bg-[#F8FAFC] dark:bg-[#0a0a0a] font-sans text-[#111827] dark:text-zinc-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0a0a0a]">
            <Sidebar />

            <div
              id="app-scroll"
              className="flex min-h-screen min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto bg-[#F8FAFC] dark:bg-[#0a0a0a]"
            >
              <TopNavbar />

              <main className="flex-1 px-4 pb-8 md:px-6 lg:px-8">
                <PageLayout>{children}</PageLayout>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
