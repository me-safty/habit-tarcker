"use client"
import "./globals.css"
import { Inter } from "next/font/google"
import Providers from "@/components/Provider"

const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
//   title: "Habit Tracker",
//   description: "Habit Tracker to track my daley routine",
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
