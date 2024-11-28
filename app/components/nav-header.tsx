"use client"

import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"

export function NavHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <Home className="h-5 w-5" />
          </Button>
        </Link>
        <ThemeToggle />
      </div>
    </div>
  )
}