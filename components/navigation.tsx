"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Fuel, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export function Navigation() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { label: t("problem"), href: "#problem" },
    { label: t("company"), href: "#company" },
    { label: t("architecture"), href: "#architecture" },
    { label: t("dashboard"), href: "#dashboard" },
    { label: t("simulation"), href: "#simulation" },
    { label: t("atexSafety"), href: "#atex" },
    { label: t("results"), href: "#results" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass py-3" : "py-5"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center group-hover:glow-primary transition-all duration-300">
                  <Fuel className="h-5 w-5 text-primary-foreground" />
                </div>
                <motion.div
                  className="absolute -inset-1 rounded-lg bg-primary/20"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg text-foreground">SecureTank</div>
                <div className="text-xs text-muted-foreground">IoT Security System</div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA & Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-4">
              <LanguageSwitcher />
              <Button className="hidden sm:inline-flex glow-primary" size="sm">
                {t("viewDemo")}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-lg" />
            <nav className="relative pt-24 px-6 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-lg font-medium text-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 space-y-3"
              >
                <LanguageSwitcher />
                <Button className="w-full glow-primary" size="lg">
                  {t("viewDemo")}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
