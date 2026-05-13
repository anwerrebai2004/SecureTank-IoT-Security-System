"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { 
  Play, RotateCcw, CheckCircle, XCircle, Shield, AlertTriangle,
  Fuel, MapPin, Bell, MessageSquare, Lock, Unlock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SimulationStep = {
  id: number
  title: string
  description: string
  icon: React.ElementType
  status: "pending" | "active" | "success" | "error"
  duration: number
}

const normalSteps: SimulationStep[] = [
  { id: 1, title: "Driver Approaches", description: "Driver arrives at tanker with RFID card", icon: Shield, status: "pending", duration: 2000 },
  { id: 2, title: "RFID Authentication", description: "System validates driver credentials", icon: Shield, status: "pending", duration: 2500 },
  { id: 3, title: "Valve Unlocked", description: "Solenoid valve opens for authorized access", icon: Unlock, status: "pending", duration: 1500 },
  { id: 4, title: "Fuel Monitoring", description: "Real-time fuel level tracking active", icon: Fuel, status: "pending", duration: 3000 },
  { id: 5, title: "GPS Tracking", description: "Location data sent to cloud", icon: MapPin, status: "pending", duration: 2000 },
  { id: 6, title: "Delivery Complete", description: "Transaction logged successfully", icon: CheckCircle, status: "pending", duration: 1500 },
]

const fraudSteps: SimulationStep[] = [
  { id: 1, title: "Unauthorized Access", description: "Unknown person attempts valve access", icon: XCircle, status: "pending", duration: 2000 },
  { id: 2, title: "RFID Denied", description: "Authentication failed - no valid card", icon: Shield, status: "pending", duration: 2000 },
  { id: 3, title: "Tampering Detected", description: "Valve tampering sensors triggered", icon: AlertTriangle, status: "pending", duration: 1500 },
  { id: 4, title: "Alarm Activated", description: "Buzzer sounds at tanker location", icon: Bell, status: "pending", duration: 1500 },
  { id: 5, title: "Alert Sent", description: "WhatsApp notification to fleet manager", icon: MessageSquare, status: "pending", duration: 2000 },
  { id: 6, title: "GPS Logged", description: "Location recorded for investigation", icon: MapPin, status: "pending", duration: 1500 },
]

function SimulationVisual({ mode, currentStep, fuelLevel }: { 
  mode: "normal" | "fraud"
  currentStep: number
  fuelLevel: number 
}) {
  const isAlert = mode === "fraud" && currentStep >= 3

  return (
    <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-secondary/30">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Alert overlay */}
      <AnimatePresence>
        {isAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 bg-red-500/20"
          />
        )}
      </AnimatePresence>

      {/* Tanker visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Tank body */}
          <motion.div
            className={cn(
              "w-48 h-24 rounded-full border-4 relative overflow-hidden",
              isAlert ? "border-red-500" : "border-primary"
            )}
            animate={isAlert ? { x: [-2, 2, -2] } : {}}
            transition={{ duration: 0.1, repeat: isAlert ? Infinity : 0 }}
          >
            {/* Fuel level */}
            <motion.div
              className={cn(
                "absolute bottom-0 left-0 right-0",
                isAlert ? "bg-red-500/50" : "bg-primary/50"
              )}
              animate={{ height: `${fuelLevel}%` }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Fuel level text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{fuelLevel.toFixed(0)}%</span>
            </div>
          </motion.div>

          {/* Valve indicator */}
          <motion.div
            className={cn(
              "absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center",
              mode === "normal" && currentStep >= 3 ? "bg-green-500" :
              mode === "fraud" && currentStep >= 3 ? "bg-red-500" : "bg-secondary"
            )}
            animate={currentStep >= 3 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: currentStep >= 3 ? Infinity : 0 }}
          >
            {mode === "normal" && currentStep >= 3 ? (
              <Unlock className="h-4 w-4 text-white" />
            ) : (
              <Lock className="h-4 w-4 text-white" />
            )}
          </motion.div>

          {/* Signal waves */}
          {currentStep >= 2 && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "absolute w-4 h-4 rounded-full border-2",
                    isAlert ? "border-red-500" : "border-primary"
                  )}
                  style={{ left: "-8px", top: "-8px" }}
                  animate={{
                    scale: [1, 3, 5],
                    opacity: [0.8, 0.4, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status badge */}
      <div className="absolute top-4 left-4">
        <div className={cn(
          "px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2",
          mode === "normal" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
        )}>
          {mode === "normal" ? (
            <>
              <CheckCircle className="h-4 w-4" />
              Normal Operation
            </>
          ) : (
            <>
              <AlertTriangle className="h-4 w-4" />
              Fraud Scenario
            </>
          )}
        </div>
      </div>

      {/* Alert message */}
      <AnimatePresence>
        {isAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 bg-red-500/90 text-white px-4 py-3 rounded-lg flex items-center gap-3"
          >
            <Bell className="h-5 w-5 animate-pulse" />
            <div>
              <div className="font-semibold">SECURITY ALERT</div>
              <div className="text-sm opacity-90">Unauthorized access attempt detected!</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SimulationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [mode, setMode] = useState<"normal" | "fraud">("normal")
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState(normalSteps)
  const [fuelLevel, setFuelLevel] = useState(85)

  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentStep(0)
    setFuelLevel(85)
    setSteps(mode === "normal" ? normalSteps : fraudSteps)
  }

  const startSimulation = () => {
    resetSimulation()
    setIsRunning(true)
  }

  useEffect(() => {
    if (mode === "normal") {
      setSteps(normalSteps)
    } else {
      setSteps(fraudSteps)
    }
    resetSimulation()
  }, [mode])

  useEffect(() => {
    if (!isRunning || currentStep >= steps.length) {
      if (currentStep >= steps.length) {
        setIsRunning(false)
      }
      return
    }

    const step = steps[currentStep]
    
    // Update current step status to active
    setSteps(prev => prev.map((s, i) => ({
      ...s,
      status: i < currentStep ? "success" : i === currentStep ? "active" : "pending"
    })))

    // Simulate fuel change
    if (mode === "normal" && currentStep === 3) {
      const fuelInterval = setInterval(() => {
        setFuelLevel(prev => Math.max(prev - 2, 20))
      }, 200)
      setTimeout(() => clearInterval(fuelInterval), step.duration)
    }

    if (mode === "fraud" && currentStep >= 2) {
      setSteps(prev => prev.map((s, i) => ({
        ...s,
        status: i < currentStep ? "error" : i === currentStep ? "active" : "pending"
      })))
    }

    const timer = setTimeout(() => {
      setSteps(prev => prev.map((s, i) => ({
        ...s,
        status: i <= currentStep ? (mode === "fraud" && i >= 2 ? "error" : "success") : "pending"
      })))
      setCurrentStep(prev => prev + 1)
    }, step.duration)

    return () => clearTimeout(timer)
  }, [isRunning, currentStep, steps.length, mode])

  return (
    <section id="simulation" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

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
            <Play className="h-4 w-4" />
            <span className="text-sm font-medium">Interactive Simulation</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            System <span className="text-accent text-glow-accent">Operation</span> Simulation
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Experience the system in action. Switch between normal operation and fraud detection 
            scenarios to see how our IoT solution responds in real-time.
          </p>
        </motion.div>

        {/* Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-4 mb-8"
        >
          <Button
            variant={mode === "normal" ? "default" : "outline"}
            onClick={() => setMode("normal")}
            disabled={isRunning}
            className={cn(mode === "normal" && "glow-primary")}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Normal Operation
          </Button>
          <Button
            variant={mode === "fraud" ? "destructive" : "outline"}
            onClick={() => setMode("fraud")}
            disabled={isRunning}
            className={cn(mode === "fraud" && "glow-destructive")}
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Fraud Scenario
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <SimulationVisual 
              mode={mode} 
              currentStep={currentStep} 
              fuelLevel={fuelLevel} 
            />

            <div className="flex justify-center gap-4 mt-6">
              <Button
                onClick={startSimulation}
                disabled={isRunning}
                className={cn(mode === "normal" ? "glow-primary" : "glow-destructive")}
              >
                <Play className="mr-2 h-4 w-4" />
                {isRunning ? "Running..." : "Start Simulation"}
              </Button>
              <Button
                variant="outline"
                onClick={resetSimulation}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Process Steps</h3>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-xl transition-all duration-300",
                    step.status === "active" && "glass-card",
                    step.status === "success" && "bg-green-500/10",
                    step.status === "error" && "bg-red-500/10"
                  )}
                  initial={{ opacity: 0.5 }}
                  animate={{
                    opacity: step.status !== "pending" ? 1 : 0.5,
                    scale: step.status === "active" ? 1.02 : 1,
                  }}
                >
                  {/* Status indicator */}
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                    step.status === "pending" && "bg-secondary",
                    step.status === "active" && "bg-primary animate-pulse",
                    step.status === "success" && "bg-green-500",
                    step.status === "error" && "bg-red-500"
                  )}>
                    {step.status === "success" ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : step.status === "error" ? (
                      <XCircle className="h-5 w-5 text-white" />
                    ) : (
                      <step.icon className={cn(
                        "h-5 w-5",
                        step.status === "active" ? "text-primary-foreground" : "text-muted-foreground"
                      )} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h4 className="font-medium">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  </div>

                  {/* Status badge */}
                  {step.status !== "pending" && (
                    <div className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      step.status === "active" && "bg-primary/20 text-primary",
                      step.status === "success" && "bg-green-500/20 text-green-500",
                      step.status === "error" && "bg-red-500/20 text-red-500"
                    )}>
                      {step.status === "active" ? "Processing" : step.status === "success" ? "Complete" : "Failed"}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
