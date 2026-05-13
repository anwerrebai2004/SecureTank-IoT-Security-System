"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Building2, Globe, Award, Users, Truck, Factory, CheckCircle } from "lucide-react"

const timeline = [
  { year: "1985", event: "Company Founded", description: "COMET Group established in Algeria" },
  { year: "1995", event: "Regional Expansion", description: "Expanded operations across North Africa" },
  { year: "2005", event: "ISO Certification", description: "Achieved ISO 9001 quality certification" },
  { year: "2015", event: "Digital Transformation", description: "Began integrating IoT technologies" },
  { year: "2024", event: "Smart Security System", description: "Launching intelligent tanker security" },
]

const stats = [
  { icon: Truck, value: "500+", label: "Tankers Produced" },
  { icon: Globe, value: "12", label: "African Countries" },
  { icon: Users, value: "350+", label: "Employees" },
  { icon: Award, value: "15+", label: "Certifications" },
]

const capabilities = [
  "Fuel tanker manufacturing",
  "Industrial equipment design",
  "Quality assurance systems",
  "Custom engineering solutions",
  "Logistics optimization",
  "Safety compliance",
]

export function CompanySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="company" className="relative py-24 md:py-32 overflow-hidden bg-secondary/20">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">Partner Company</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
              COMET Group
              <span className="block text-primary mt-2">Industrial Excellence</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              A leading manufacturer of fuel tankers and industrial transport solutions in Africa. 
              With decades of experience, COMET Group delivers premium quality equipment 
              trusted by major oil companies across the continent.
            </p>

            {/* Capabilities */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {capabilities.map((cap, index) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{cap}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <Factory className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Company Timeline</h3>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

                {/* Timeline items */}
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.15 }}
                      className="relative pl-12"
                    >
                      {/* Dot */}
                      <motion.div
                        className="absolute left-2 top-1 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </motion.div>

                      {/* Content */}
                      <div className="glass-card rounded-lg p-4 hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-mono text-primary">{item.year}</span>
                          <span className="text-sm font-semibold text-foreground">{item.event}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-primary/10 -z-10"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
