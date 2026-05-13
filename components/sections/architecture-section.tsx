"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { 
  Cpu, Radio, MapPin, Wifi, Database, Smartphone, 
  HardDrive, Volume2, Power, Shield, ArrowRight, Zap
} from "lucide-react"

const components = [
  {
    id: "esp32",
    name: "ESP32",
    icon: Cpu,
    color: "#ff6b35",
    position: { x: 50, y: 50 },
    description: "Main microcontroller handling all sensor data processing and communication.",
    specs: ["Dual-core 240MHz", "520KB SRAM", "Wi-Fi + Bluetooth", "Low power consumption"],
    connections: ["hcsr04", "rfid", "gps", "gsm", "sd", "valve", "buzzer"],
  },
  {
    id: "hcsr04",
    name: "HC-SR04",
    icon: Radio,
    color: "#00d4ff",
    position: { x: 20, y: 20 },
    description: "Ultrasonic sensor for precise fuel level measurement in the tank.",
    specs: ["Range: 2-400cm", "Accuracy: ±3mm", "Angle: 15°", "5V Operation"],
    connections: ["esp32"],
  },
  {
    id: "rfid",
    name: "RFID Reader",
    icon: Shield,
    color: "#00ff88",
    position: { x: 80, y: 20 },
    description: "MFRC522 module for secure driver authentication before valve access.",
    specs: ["13.56 MHz", "ISO 14443A", "SPI Interface", "Read/Write capable"],
    connections: ["esp32"],
  },
  {
    id: "gps",
    name: "GPS Module",
    icon: MapPin,
    color: "#ffcc00",
    position: { x: 20, y: 80 },
    description: "NEO-6M GPS for real-time location tracking and route monitoring.",
    specs: ["50 channels", "10Hz update", "<5m accuracy", "UART Interface"],
    connections: ["esp32"],
  },
  {
    id: "gsm",
    name: "GSM/GPRS",
    icon: Wifi,
    color: "#ff4d6d",
    position: { x: 80, y: 80 },
    description: "SIM800L module for remote communication and alert transmission.",
    specs: ["Quad-band GSM", "GPRS Class 12", "SMS capable", "HTTP/FTP"],
    connections: ["esp32", "firebase"],
  },
  {
    id: "firebase",
    name: "Firebase",
    icon: Database,
    color: "#ff9500",
    position: { x: 50, y: 100 },
    description: "Cloud database for real-time data storage and synchronization.",
    specs: ["Real-time DB", "Cloud Storage", "Authentication", "Global CDN"],
    connections: ["gsm", "app"],
  },
  {
    id: "app",
    name: "Android App",
    icon: Smartphone,
    color: "#a855f7",
    position: { x: 80, y: 100 },
    description: "Mobile application for monitoring and receiving instant alerts.",
    specs: ["Real-time updates", "Push notifications", "Map tracking", "Alert history"],
    connections: ["firebase"],
  },
  {
    id: "sd",
    name: "SD Card",
    icon: HardDrive,
    color: "#64748b",
    position: { x: 20, y: 50 },
    description: "Local backup storage for data logging when connectivity is unavailable.",
    specs: ["32GB support", "FAT32 format", "SPI Interface", "Data logging"],
    connections: ["esp32"],
  },
  {
    id: "valve",
    name: "Solenoid Valve",
    icon: Power,
    color: "#22c55e",
    position: { x: 80, y: 50 },
    description: "Electronically controlled valve for secure fuel access management.",
    specs: ["12V DC", "Normally closed", "Quick response", "High durability"],
    connections: ["esp32"],
  },
  {
    id: "buzzer",
    name: "Alarm Buzzer",
    icon: Volume2,
    color: "#ef4444",
    position: { x: 50, y: 0 },
    description: "Audio alert system for immediate on-site fraud notification.",
    specs: ["85dB output", "3-24V range", "Pulsating tone", "Waterproof"],
    connections: ["esp32"],
  },
]

function ConnectionLine({ from, to, isActive }: { from: { x: number; y: number }; to: { x: number; y: number }; isActive: boolean }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <motion.line
        x1={`${from.x}%`}
        y1={`${from.y}%`}
        x2={`${to.x}%`}
        y2={`${to.y}%`}
        stroke={isActive ? "#ff6b35" : "#333"}
        strokeWidth={isActive ? 2 : 1}
        strokeDasharray={isActive ? "0" : "5,5"}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      {isActive && (
        <motion.circle
          r="4"
          fill="#ff6b35"
          animate={{
            cx: [`${from.x}%`, `${to.x}%`],
            cy: [`${from.y}%`, `${to.y}%`],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </svg>
  )
}

export function ArchitectureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)

  const selected = components.find(c => c.id === selectedComponent)

  return (
    <section id="architecture" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

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
            <Cpu className="h-4 w-4" />
            <span className="text-sm font-medium">System Architecture</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Interactive <span className="text-accent text-glow-accent">System Design</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Explore the complete IoT architecture. Click on any component to see detailed 
            specifications and understand the data flow between sensors and the cloud.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 glass rounded-2xl p-6 md:p-8 relative min-h-[500px]"
          >
            {/* Connection Lines */}
            <div className="absolute inset-8">
              {components.map(comp => 
                comp.connections.map(connId => {
                  const target = components.find(c => c.id === connId)
                  if (!target) return null
                  const isActive = hoveredComponent === comp.id || hoveredComponent === connId || 
                                  selectedComponent === comp.id || selectedComponent === connId
                  return (
                    <ConnectionLine
                      key={`${comp.id}-${connId}`}
                      from={comp.position}
                      to={target.position}
                      isActive={isActive}
                    />
                  )
                })
              )}
            </div>

            {/* Components */}
            {components.map((comp, index) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className="absolute cursor-pointer"
                style={{
                  left: `${comp.position.x}%`,
                  top: `${comp.position.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: selectedComponent === comp.id || hoveredComponent === comp.id ? 20 : 10,
                }}
                onMouseEnter={() => setHoveredComponent(comp.id)}
                onMouseLeave={() => setHoveredComponent(null)}
                onClick={() => setSelectedComponent(selectedComponent === comp.id ? null : comp.id)}
              >
                <motion.div
                  className={`relative p-4 rounded-xl transition-all duration-300 ${
                    selectedComponent === comp.id 
                      ? "glass-card scale-110" 
                      : hoveredComponent === comp.id 
                        ? "glass scale-105" 
                        : "bg-secondary/50"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    boxShadow: selectedComponent === comp.id || hoveredComponent === comp.id 
                      ? `0 0 20px ${comp.color}40, 0 0 40px ${comp.color}20` 
                      : "none"
                  }}
                >
                  <comp.icon 
                    className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-1" 
                    style={{ color: comp.color }}
                  />
                  <div className="text-xs text-center font-medium whitespace-nowrap">{comp.name}</div>
                  
                  {/* Pulse animation */}
                  {(selectedComponent === comp.id || hoveredComponent === comp.id) && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{ border: `2px solid ${comp.color}` }}
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </motion.div>
            ))}

            {/* Central glow effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-32 h-32 rounded-full bg-primary/10"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Component Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Component Details</h3>
            </div>

            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="p-4 rounded-xl mb-4"
                    style={{ backgroundColor: `${selected.color}15` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <selected.icon className="h-8 w-8" style={{ color: selected.color }} />
                      <div>
                        <h4 className="font-semibold text-lg">{selected.name}</h4>
                        <div className="text-xs text-muted-foreground">Click to deselect</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{selected.description}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-muted-foreground">Specifications</h5>
                      <div className="space-y-2">
                        {selected.specs.map((spec, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: selected.color }} />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-2 text-muted-foreground">Connections</h5>
                      <div className="flex flex-wrap gap-2">
                        {selected.connections.map(connId => {
                          const conn = components.find(c => c.id === connId)
                          return conn ? (
                            <button
                              key={connId}
                              onClick={() => setSelectedComponent(connId)}
                              className="px-3 py-1 text-xs rounded-full bg-secondary hover:bg-secondary/80 transition-colors flex items-center gap-1"
                            >
                              <conn.icon className="h-3 w-3" style={{ color: conn.color }} />
                              {conn.name}
                            </button>
                          ) : null
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Click on any component in the diagram to view its specifications and connections.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
