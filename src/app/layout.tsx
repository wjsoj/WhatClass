import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/navBar'
import { ThemeProvider } from "@/components/themeProvider"
import { Toaster } from "@/components/ui/toaster"
import BackTop from "@/components/BackTop"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'What Class',
  description: 'What Class',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + 'flex flex-col min-h-screen bg-gradient-to-bl dark:bg-gradient-to-b from-slate-100 dark:from-indigo-950 to-sky-100 dark:to-slate-900'}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute z-[-5] top-0 right-0 w-[300px] lg:w-[500px] lg:h-[400px] h-[360px] bg-gradient-to-bl from-pink-200 to-slate-100 dark:from-violet-800 dark:to-slate-900 blur-3xl rounded-bl-full"></div>

          <NavBar />
          <main className='grow flex flex-col'>
            {children}
          </main>
          
          <Toaster />
          <BackTop />
        </ThemeProvider>
      </body>
      <Script defer src="https://monitor.wjsphy.top/script.js" data-website-id="3a357e01-4fa0-4c60-ac78-1dbcb0acf6e7" data-do-not-track="true"></Script>
    </html>
  )
}
