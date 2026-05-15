"use client"

import { motion } from "framer-motion"
import { ArrowDown, Radio, Shield, MapPin, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

const TankerScene = dynamic(
  () => import("@/components/three/tanker-scene").then((mod) => mod.TankerScene),
  { ssr: false }
)

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

const stats = [
  { label: "Real-Time Monitoring", value: "24/7", icon: Activity },
  { label: "GPS Accuracy", value: "<5m", icon: MapPin },
  { label: "Fraud Detection", value: "99.9%", icon: Shield },
  { label: "IoT Sensors", value: "6+", icon: Radio },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <TankerScene />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm font-medium text-primary">Engineering Final Year Project</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.0] text-foreground text-glow-primary"
          >
            Intelligent IoT-Based Fuel Transport Security
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-8"
          >
            Real-time monitoring, fraud detection, and GPS tracking for modern fuel transport.
            Securing every drop from origin to destination.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          >
            <div className="glass-card rounded-3xl p-4 border-cyan-400/20">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">GPS Tracking</div>
              <div className="text-xl font-semibold text-foreground">Location Lock</div>
            </div>
            <div className="glass-card rounded-3xl p-4 border-cyan-400/20">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Fuel Monitoring</div>
              <div className="text-xl font-semibold text-foreground">Level & Leak</div>
            </div>
            <div className="glass-card rounded-3xl p-4 border-cyan-400/20">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Fraud Detection</div>
              <div className="text-xl font-semibold text-foreground">Secure Dispatch</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button size="lg" className="px-8 text-lg glow-primary cursor-pointer" onClick={() => scrollToSection("architecture")}>
              Explore System
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-lg border-accent text-accent hover:bg-accent hover:text-accent-foreground cursor-pointer" onClick={() => scrollToSection("dashboard")}>
              View Dashboard
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer" onClick={() => scrollToSection("simulation")}>
              View Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="glass-card rounded-xl p-4 md:p-6"
              >
                <stat.icon className="h-6 w-6 text-primary mb-2 mx-auto" />
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
