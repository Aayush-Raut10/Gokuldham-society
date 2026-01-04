import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Gokuldham Society - Premium Residential Community in Mumbai",
  description: "Welcome to Gokuldham Society - A premium residential community in Mumbai offering modern amenities, peaceful living, and a vibrant neighborhood. Discover your perfect home.",
  keywords: ["Gokuldham Society", "apartments Mumbai", "residential society", "premium living", "Mumbai apartments", "community living"],
  authors: [{ name: "Suresh Dahal CoderSuresh" }],
  openGraph: {
    title: "Gokuldham Society - Premium Residential Community",
    description: "A premium residential community offering modern amenities and peaceful living in Mumbai",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
