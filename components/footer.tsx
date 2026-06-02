"use client"

import { motion } from "framer-motion"
import { Fuel, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { t } = useLanguage()

  const links = {
    sections: [
      { labelKey: "problem", href: "#problem" },
      { labelKey: "architecture", href: "#architecture" },
      { labelKey: "dashboard", href: "#dashboard" },
      { labelKey: "simulation", href: "#simulation" },
    ],
    resources: [
      { labelKey: "footerDocs", href: "#" },
      { labelKey: "footerPrivacy", href: "#" },
      { labelKey: "footerContact", href: "#" },
      { labelKey: "footerTeam", href: "#" },
    ],
  }

  return (
    <footer className="relative py-16 overflow-hidden border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <Fuel className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-bold text-lg">{t("footerBrand")}</div>
                <div className="text-xs text-muted-foreground">{t("footerTagline")}</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-md mb-6">
              {t("footerAbout")}
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footerQuickLinks")}</h4>
            <ul className="space-y-2">
              {links.sections.map(link => (
                <li key={link.labelKey}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">{t("footerLegal")}</h4>
            <ul className="space-y-2">
              {links.resources.map(link => (
                <li key={link.labelKey}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {t(link.labelKey)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            {t("footerCopyright")}
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>{t("footerLocation")}</span>
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>
    </footer>
  )
}
