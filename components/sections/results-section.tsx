"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { 
  CheckCircle, Clock, Target, Zap, 
  TrendingUp, Award, BarChart3, Gauge
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const metrics = [
  {
    label: "Sensor Response Time",
    value: "<50ms",
    target: "100ms",
    achieved: true,
    icon: Clock,
    description: "Ultrasonic sensor reading latency",
  },
  {
    label: "GPS Accuracy",
    value: "±3.5m",
    target: "±5m",
    achieved: true,
    icon: Target,
    description: "Real-world positioning precision",
  },
  {
    label: "Alert Delivery",
    value: "<2s",
    target: "5s",
    achieved: true,
    icon: Zap,
    description: "Time from detection to notification",
  },
  {
    label: "Fuel Level Precision",
    value: "±2%",
    target: "±5%",
    achieved: true,
    icon: Gauge,
    description: "Volume measurement accuracy",
  },
]

const testResults = [
  { test: "RFID Authentication", attempts: 100, success: 100, rate: "100%" },
  { test: "Fraud Detection", attempts: 50, success: 49, rate: "98%" },
  { test: "GPS Tracking", attempts: 200, success: 198, rate: "99%" },
  { test: "Data Transmission", attempts: 500, success: 497, rate: "99.4%" },
  { test: "Alarm Response", attempts: 30, success: 30, rate: "100%" },
]

const chartData = [
  { label: "Week 1", value: 45 },
  { label: "Week 2", value: 68 },
  { label: "Week 3", value: 82 },
  { label: "Week 4", value: 91 },
  { label: "Week 5", value: 95 },
  { label: "Week 6", value: 98 },
]

export function ResultsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  return (
    <section id="results" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">Experimental Validation</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            {t("resultsTitle")}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            {t("resultsSubtitle")}
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group"
            >
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <metric.icon className="h-5 w-5 text-primary" />
                  </div>
                  {metric.achieved && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>

                <div className="text-3xl font-bold mb-1">{metric.value}</div>
                <div className="text-sm text-muted-foreground mb-3">{metric.label}</div>
                
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="font-mono">{metric.target}</span>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Test Results Table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{t("testsPassed")}</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Test Type</th>
                    <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Attempts</th>
                    <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Success</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {testResults.map((result, i) => (
                    <motion.tr
                      key={result.test}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="border-b border-border/50"
                    >
                      <td className="py-3 px-2 text-sm font-medium">{result.test}</td>
                      <td className="py-3 px-2 text-sm text-center text-muted-foreground">{result.attempts}</td>
                      <td className="py-3 px-2 text-sm text-center text-muted-foreground">{result.success}</td>
                      <td className="py-3 px-2 text-sm text-right">
                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 font-medium">
                          {result.rate}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Overall Success Rate</span>
              <span className="text-2xl font-bold text-green-500">99.2%</span>
            </div>
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{t("uptimeMetric")}</h3>
            </div>

            {/* Simple bar chart */}
            <div className="h-48 flex items-end justify-between gap-2 px-4">
              {chartData.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex-1 flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="w-full relative" style={{ height: "160px" }}>
                    <motion.div
                      className="absolute bottom-0 w-full bg-primary/20 rounded-t-lg"
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${item.value}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                    />
                    <motion.div
                      className="absolute bottom-0 w-full bg-primary rounded-t-lg"
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${item.value * 0.8}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.7 + i * 0.1 }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Reliability Index</span>
                </div>
                <span className="font-medium">Trend: <span className="text-green-500">+8.5%</span></span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            { title: "Real-time Detection", desc: "Fraud attempts detected within 2 seconds" },
            { title: "100% Alert Delivery", desc: "All notifications successfully delivered" },
            { title: "Zero False Positives", desc: "No false alarms during testing period" },
          ].map((achievement, i) => (
            <div
              key={achievement.title}
              className="glass-card rounded-xl p-6 text-center"
            >
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h4 className="font-semibold mb-1">{achievement.title}</h4>
              <p className="text-sm text-muted-foreground">{achievement.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
