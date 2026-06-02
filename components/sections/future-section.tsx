"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { 
  Brain, Cloud, Truck, Factory, Sparkles,
  LineChart, Shield, Globe, Cpu, Network
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const perspectives = [
  {
    icon: Brain,
    title: "AI-Powered Anomaly Detection",
    description: "Machine learning algorithms to predict fraud patterns and detect anomalies before they occur.",
    features: ["Behavioral analysis", "Pattern recognition", "Predictive alerts"],
    color: "#a855f7",
  },
  {
    icon: LineChart,
    title: "Predictive Maintenance",
    description: "Anticipate equipment failures and schedule maintenance before breakdowns occur.",
    features: ["Sensor degradation tracking", "Failure prediction", "Maintenance scheduling"],
    color: "#00d4ff",
  },
  {
    icon: Cloud,
    title: "Industrial Cloud Platform",
    description: "Scalable cloud infrastructure for fleet-wide monitoring and data analytics.",
    features: ["Real-time dashboards", "Historical analysis", "Multi-tenant support"],
    color: "#22c55e",
  },
  {
    icon: Truck,
    title: "Smart Fleet Management",
    description: "Comprehensive fleet tracking with route optimization and driver management.",
    features: ["Route optimization", "Driver scoring", "Fuel efficiency"],
    color: "#ff6b35",
  },
  {
    icon: Factory,
    title: "ATEX Industrial Deployment",
    description: "Full certification and deployment in explosive atmosphere environments.",
    features: ["Zone 0/1 certified", "Industrial enclosures", "Intrinsically safe"],
    color: "#ef4444",
  },
  {
    icon: Network,
    title: "IoT Ecosystem Integration",
    description: "Seamless integration with existing industrial IoT platforms and ERP systems.",
    features: ["API integration", "Data standardization", "Protocol support"],
    color: "#f59e0b",
  },
]

const roadmap = [
  { phase: "Q3 2024", milestone: "ATEX Certification Process", status: "current" },
  { phase: "Q4 2024", milestone: "Pilot Deployment (5 Tankers)", status: "upcoming" },
  { phase: "Q1 2025", milestone: "AI Module Integration", status: "planned" },
  { phase: "Q2 2025", milestone: "Fleet Management Platform", status: "planned" },
  { phase: "Q3 2025", milestone: "Commercial Launch", status: "planned" },
]

export function FutureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  return (
    <section id="future" className="relative py-24 md:py-32 overflow-hidden bg-secondary/10">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Future Vision</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            {t("futureTitle")}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            {t("futureSubtitle")}
          </p>
        </motion.div>

        {/* Perspectives Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {perspectives.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
            >
              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon className="h-7 w-7" style={{ color: item.color }} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{item.description}</p>

              {/* Features */}
              <div className="space-y-2">
                {item.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div 
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ 
                  boxShadow: `0 0 40px ${item.color}20`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-8 justify-center">
            <Globe className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">{t("futureTitle").split(" ")[0]} Roadmap</h3>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-secondary hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {roadmap.map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="relative text-center"
                >
                  {/* Node */}
                  <div className={`
                    w-8 h-8 rounded-full mx-auto mb-4 relative z-10 flex items-center justify-center
                    ${item.status === "current" 
                      ? "bg-primary glow-primary" 
                      : item.status === "upcoming"
                        ? "bg-accent"
                        : "bg-secondary border-2 border-muted-foreground"
                    }
                  `}>
                    {item.status === "current" && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <div className={`h-2 w-2 rounded-full ${
                      item.status === "current" || item.status === "upcoming" 
                        ? "bg-background" 
                        : "bg-muted-foreground"
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="glass-card rounded-lg p-3">
                    <div className={`text-sm font-mono mb-1 ${
                      item.status === "current" ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {item.phase}
                    </div>
                    <div className="text-sm font-medium">{item.milestone}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Neural Network Visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 relative h-48 hidden lg:block"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Neural network nodes */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${15 + (i % 5) * 20}%`,
                  top: `${20 + Math.floor(i / 5) * 30}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <div className="w-4 h-4 rounded-full bg-accent/50" />
              </motion.div>
            ))}
            
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {[...Array(20)].map((_, i) => {
                const x1 = 15 + ((i * 3) % 5) * 20
                const y1 = 20 + Math.floor((i * 3) / 5) % 3 * 30
                const x2 = 15 + (((i * 3) + 1) % 5) * 20
                const y2 = 20 + (Math.floor((i * 3) / 5) + 1) % 3 * 30
                return (
                  <motion.line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="rgba(0, 212, 255, 0.2)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: i * 0.1 }}
                  />
                )
              })}
            </svg>

            {/* AI Brain icon */}
            <motion.div
              className="relative z-10 w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Brain className="h-10 w-10 text-accent" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
