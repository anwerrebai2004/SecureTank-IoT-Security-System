"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AlertTriangle, TrendingDown, Eye, MapPinOff, Droplets, Lock } from "lucide-react"

const problems = [
  {
    icon: Droplets,
    title: "Fuel Siphoning",
    description: "Unauthorized extraction of fuel during transport through tampering with tank valves.",
    stat: "15-20%",
    statLabel: "Fuel Loss Rate",
    color: "destructive",
  },
  {
    icon: Lock,
    title: "Valve Tampering",
    description: "Unauthorized opening of tanker valves leading to fuel theft and contamination risks.",
    stat: "40%",
    statLabel: "of Theft Cases",
    color: "warning",
  },
  {
    icon: MapPinOff,
    title: "Route Deviation",
    description: "Drivers deviating from planned routes to sell fuel at unauthorized locations.",
    stat: "25%",
    statLabel: "Untracked Trips",
    color: "primary",
  },
  {
    icon: Eye,
    title: "Lack of Monitoring",
    description: "No real-time visibility into fuel levels, location, or security status during transport.",
    stat: "0",
    statLabel: "Real-Time Data",
    color: "accent",
  },
]

const impactStats = [
  { value: "$133B", label: "Annual Global Fuel Theft" },
  { value: "30%", label: "Revenue Loss in Africa" },
  { value: "72h", label: "Avg. Detection Delay" },
  { value: "60%", label: "Unresolved Cases" },
]

export function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="problem" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-destructive/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-warning/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive mb-6">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">The Industrial Challenge</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            The <span className="text-destructive">Critical Problem</span> in Fuel Transport
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            The fuel transport industry faces massive losses due to theft, lack of monitoring, 
            and inadequate security systems. Traditional methods fail to provide real-time protection.
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="glass-card rounded-2xl p-6 h-full hover:border-primary/50 transition-all duration-300">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-${problem.color}/10 mb-4`}>
                  <problem.icon className={`h-6 w-6 text-${problem.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{problem.description}</p>

                {/* Stat */}
                <div className="pt-4 border-t border-border">
                  <div className={`text-2xl font-bold text-${problem.color}`}>{problem.stat}</div>
                  <div className="text-xs text-muted-foreground">{problem.statLabel}</div>
                </div>

                {/* Animated indicator */}
                <motion.div
                  className={`absolute top-4 right-4 h-2 w-2 rounded-full bg-${problem.color}`}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingDown className="h-5 w-5 text-destructive" />
            <h3 className="text-lg font-semibold">Global Impact</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual Alert Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="absolute -right-4 top-1/2 -translate-y-1/2 hidden xl:block"
        >
          <div className="relative">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 rounded-full border-2 border-destructive/30"
                animate={{
                  scale: [1, 2, 3],
                  opacity: [0.5, 0.2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                }}
              />
            ))}
            <div className="relative w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
