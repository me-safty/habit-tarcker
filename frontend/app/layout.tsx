import "./globals.css"
import { Inter } from "next/font/google"
import Providers from "@/components/Provider"
import Header from "@/components/Header"
import AuthProvider from "@/components/AuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Habit Tracker",
  description: "Habit Tracker to track my daley routine",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
