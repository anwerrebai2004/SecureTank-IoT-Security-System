"use client"

import { motion } from "framer-motion"
import { Fuel, Github, Linkedin, Mail, ExternalLink } from "lucide-react"

const links = {
  sections: [
    { label: "Problem", href: "#problem" },
    { label: "Architecture", href: "#architecture" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Simulation", href: "#simulation" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Technical Report", href: "#" },
    { label: "Research Paper", href: "#" },
    { label: "GitHub", href: "#" },
  ],
}

export function Footer() {
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
                <div className="font-bold text-lg">SecureTank IoT</div>
                <div className="text-xs text-muted-foreground">Intelligent Security System</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-md mb-6">
              An innovative IoT-based fuel transport and tanker security system developed 
              as a final year engineering project. Real-time monitoring, fraud detection, 
              and GPS tracking for the modern logistics industry.
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
            <h4 className="font-semibold mb-4">Sections</h4>
            <ul className="space-y-2">
              {links.sections.map(link => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map(link => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
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
            <span>Engineering Final Year Project (PFE) 2024</span>
            <span className="mx-2">|</span>
            <span>COMET Group Partnership</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Built with Next.js, Three.js & Framer Motion</span>
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
