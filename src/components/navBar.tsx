'use client'

import ModeToggle from "@/components/ui/darkmode"
import Navv from "@/components/navv"
import { Button } from "./ui/button"

export default function NavBar() {
  return (
    <>
      <div className="flex flex-row justify-between items-center py-5 px-4 md:sticky md:top-0 md:z-10">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-violet-600 to-pink-600 dark:from-amber-300 dark:to-teal-200 ml-1 dark:text-shadow-dark">
          WhatClass
        </h1>

        <div className="hidden md:flex grow max-w-[600px]">
          <Navv />
        </div>

        <div className="flex flex-row items-center">
          <ModeToggle />
          <Button className="ml-2 md:box-shadow dark:shadow-xl" variant="outline" size="icon">
            <a href="http://github.com/wjsoj/whatclass" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span className="sr-only">View On Github</span>
            </a>
          </Button>
        </div>
      </div>
      <div className="flex md:hidden sticky top-2 z-10">
        <Navv />
      </div>
    </>
  )
}