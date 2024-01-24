import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/navBar'
import { ThemeProvider } from "@/components/themeProvider"
import { Toaster } from "@/components/ui/toaster"
import { AntdRegistry } from '@ant-design/nextjs-registry';
import BackTop from 'antd/lib/float-button/BackTop'

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
      <body className={inter.className + ' flex flex-col min-h-screen'}>
        <AntdRegistry>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <div className="z-[-10] absolute top-0 left-0 w-full h-full bg-gradient-to-bl dark:bg-gradient-to-b from-slate-100 dark:from-indigo-950 to-sky-100 dark:to-slate-900 blur-xl" />
          <div className="absolute z-[-5] top-0 right-0 w-[300px] md:w-[500px] md:h-[400px] h-[360px] bg-gradient-to-bl from-pink-200 to-slate-100 dark:from-violet-800 dark:to-slate-900 blur-3xl rounded-bl-full"></div>
          <main className='grow flex flex-col'>
            {children}
          </main>
          <Toaster />
          <BackTop rootClassName='bg-slate-800' />
        </ThemeProvider>
        </AntdRegistry>
      </body>
      <Script defer src="https://monitor.wjsphy.top/script.js" data-website-id="507d6f6c-ee34-4168-909a-e878b60438e4" data-do-not-track="true"></Script>
    </html>
  )
}
