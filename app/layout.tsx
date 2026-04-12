import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Cosmico Signal",
  description: "Understand who you are becoming",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn("dark antialiased", inter.variable, fontMono.variable)}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground font-sans min-h-screen">
        {children}
      </body>
    </html>
  )
}
