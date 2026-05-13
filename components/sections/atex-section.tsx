"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { 
  AlertTriangle, Shield, Flame, Wind, Zap, 
  CheckCircle, XCircle, Info, ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const zones = [
  {
    name: "Zone 0",
    color: "#ef4444",
    description: "Explosive atmosphere present continuously or for long periods",
    requirements: "Category 1 equipment only (highest protection)",
    location: "Inside tank, valve connections",
    risk: "Extreme",
  },
  {
    name: "Zone 1",
    color: "#f59e0b",
    description: "Explosive atmosphere likely during normal operation",
    requirements: "Category 1 or 2 equipment",
    location: "Immediate tank vicinity, loading points",
    risk: "High",
  },
  {
    name: "Zone 2",
    color: "#22c55e",
    description: "Explosive atmosphere not likely, only brief occurrence",
    requirements: "Category 1, 2, or 3 equipment",
    location: "Extended perimeter, ventilated areas",
    risk: "Moderate",
  },
]

const certifications = [
  { name: "ATEX 2014/34/EU", status: "required", description: "EU Directive for explosive atmospheres" },
  { name: "IECEx", status: "required", description: "International certification scheme" },
  { name: "IP68", status: "achieved", description: "Ingress protection rating" },
  { name: "CE Marking", status: "achieved", description: "European conformity" },
]

const prototypeStatus = [
  { item: "Core Functionality", status: "complete" },
  { item: "Sensor Integration", status: "complete" },
  { item: "Communication Layer", status: "complete" },
  { item: "ATEX Certification", status: "pending" },
  { item: "Industrial Enclosure", status: "pending" },
  { item: "Field Deployment", status: "pending" },
]

export function AtexSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedZone, setSelectedZone] = useState(0)

  return (
    <section id="atex" className="relative py-24 md:py-32 overflow-hidden bg-secondary/10">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-destructive/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive mb-6">
            <Flame className="h-4 w-4" />
            <span className="text-sm font-medium">Safety Standards</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            ATEX <span className="text-destructive">Compliance</span> & Safety
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Understanding explosive atmosphere requirements and the pathway from 
            prototype to industrial-grade deployment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Zone Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Wind className="h-5 w-5 text-destructive" />
              <h3 className="text-lg font-semibold">Hazardous Zones</h3>
            </div>

            {/* Visual representation */}
            <div className="relative h-64 mb-6">
              {/* Tanker silhouette */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Zone 2 - Outer */}
                <motion.div
                  className={cn(
                    "absolute -inset-16 rounded-full border-2 border-dashed transition-colors",
                    selectedZone === 2 ? "border-green-500 bg-green-500/10" : "border-green-500/30"
                  )}
                  animate={selectedZone === 2 ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  onClick={() => setSelectedZone(2)}
                />
                
                {/* Zone 1 - Middle */}
                <motion.div
                  className={cn(
                    "absolute -inset-8 rounded-full border-2 border-dashed transition-colors cursor-pointer",
                    selectedZone === 1 ? "border-yellow-500 bg-yellow-500/10" : "border-yellow-500/30"
                  )}
                  animate={selectedZone === 1 ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  onClick={() => setSelectedZone(1)}
                />
                
                {/* Zone 0 - Inner */}
                <motion.div
                  className={cn(
                    "relative w-32 h-16 rounded-full border-2 transition-colors cursor-pointer",
                    selectedZone === 0 ? "border-red-500 bg-red-500/20" : "border-red-500/50 bg-red-500/10"
                  )}
                  animate={selectedZone === 0 ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  onClick={() => setSelectedZone(0)}
                >
                  <Flame className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-red-500" />
                </motion.div>
              </div>

              {/* Zone labels */}
              <div className="absolute top-4 left-4 text-xs font-mono text-green-500">ZONE 2</div>
              <div className="absolute top-1/3 left-1/4 text-xs font-mono text-yellow-500">ZONE 1</div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-12 text-xs font-mono text-red-500">ZONE 0</div>
            </div>

            {/* Zone selector */}
            <div className="flex gap-2 mb-4">
              {zones.map((zone, i) => (
                <button
                  key={zone.name}
                  onClick={() => setSelectedZone(i)}
                  className={cn(
                    "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                    selectedZone === i 
                      ? "text-white" 
                      : "bg-secondary/50 hover:bg-secondary"
                  )}
                  style={selectedZone === i ? { backgroundColor: zone.color } : {}}
                >
                  {zone.name}
                </button>
              ))}
            </div>

            {/* Zone details */}
            <motion.div
              key={selectedZone}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="h-3 w-3 rounded-full" 
                  style={{ backgroundColor: zones[selectedZone].color }}
                />
                <span className="font-semibold">{zones[selectedZone].name}</span>
                <span 
                  className="ml-auto text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${zones[selectedZone].color}20`, color: zones[selectedZone].color }}
                >
                  {zones[selectedZone].risk} Risk
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{zones[selectedZone].description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{zones[selectedZone].requirements}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{zones[selectedZone].location}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Certifications & Status */}
          <div className="space-y-6">
            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Certifications</h3>
              </div>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                  >
                    {cert.status === "achieved" ? (
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-xs text-muted-foreground">{cert.description}</div>
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      cert.status === "achieved" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                    )}>
                      {cert.status === "achieved" ? "Achieved" : "Required"}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Prototype Status */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Prototype Status</h3>
              </div>
              <div className="space-y-3">
                {prototypeStatus.map((item, i) => (
                  <div key={item.item} className="flex items-center gap-3">
                    {item.status === "complete" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                    )}
                    <span className={cn(
                      "text-sm",
                      item.status === "pending" && "text-muted-foreground"
                    )}>
                      {item.item}
                    </span>
                    {item.status === "pending" && (
                      <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-medium">50%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "50%" } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Migration Path */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <h3 className="text-lg font-semibold mb-6 text-center">Path to Industrial Deployment</h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {[
              { label: "Prototype", icon: Zap, status: "current" },
              { label: "ATEX Testing", icon: Flame, status: "next" },
              { label: "Certification", icon: Shield, status: "pending" },
              { label: "Production", icon: CheckCircle, status: "pending" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-4">
                <motion.div
                  className={cn(
                    "flex flex-col items-center",
                    step.status === "current" && "text-primary",
                    step.status === "pending" && "text-muted-foreground"
                  )}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                >
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-2",
                    step.status === "current" ? "bg-primary text-primary-foreground glow-primary" : "bg-secondary"
                  )}>
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="text-sm font-medium">{step.label}</span>
                </motion.div>
                {i < 3 && (
                  <ChevronRight className="h-6 w-6 text-muted-foreground hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
