"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import GpsLeafletMap from "../gps-leaflet-map";

// Dynamic import for MiniChart to avoid SSR issues
const MiniChart = dynamic(() => import("../mini-chart"), {
  ssr: false,
  loading: () => (
    <div className="relative h-[140px] w-full bg-slate-800/50 rounded-lg flex items-center justify-center">
      <div className="text-xs text-slate-400 font-mono">Loading chart...</div>
    </div>
  ),
});

// Types
interface Driver {
  id: string;
  name: string;
  num: number;
  auth: boolean;
}

interface LogEntry {
  time: string;
  html: string;
}

interface GpsPoint {
  l: string;
  t: string;
  lat: string;
  lon: string;
  v: string;
}

// Constants
const DRIVERS: Driver[] = [
  { id: "A3:F2:11:CC", name: "Anwer Rebai", num: 21, auth: true },
  { id: "B7:4D:29:EA", name: "Moataz Mahfoudhi", num: 14, auth: true },
  { id: "C1:88:3A:FF", name: "Sami Triki", num: 9, auth: true },
  { id: "D4:7C:00:B3", name: "Unknown", num: 0, auth: false },
];

const LOCS = ["Tunis", "Kairouan", "Sbeitla", "Kasserine"];

const TUNIS_DEPOT = { lat: 36.8065, lon: 10.1815 };

const GPS_PTS: GpsPoint[] = [
  { l: "20%", t: "30%", lat: "36.8065", lon: "10.1815", v: "0" },
  { l: "35%", t: "40%", lat: "36.5234", lon: "10.0121", v: "45" },
  { l: "52%", t: "60%", lat: "35.1922", lon: "9.5197", v: "65" },
  { l: "70%", t: "75%", lat: "35.1800", lon: "9.5000", v: "55" },
];

const CCTV_VIDEOS = [
  "/26183924-preview.mp4",
];

// Helper functions
function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function now(): string {
  const d = new Date();
  return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
}

// Sub-components with professional academic styling
function AlarmBanner({
  type,
  visible,
  detail,
  onAck,
}: {
  type: "leak" | "rfid" | "locked";
  visible: boolean;
  detail?: string;
  onAck?: () => void;
}) {
  if (!visible) return null;

  const config = {
    leak: {
      bg: "linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(220,38,38,0.03) 100%)",
      border: "rgba(220,38,38,0.4)",
      iconBg: "rgba(220,38,38,0.15)",
      iconColor: "#dc2626",
      title: "LEAK ALARM - Valve Closed, Level Decreasing",
      ackText: "ACKNOWLEDGE",
    },
    rfid: {
      bg: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.03) 100%)",
      border: "rgba(245,158,11,0.4)",
      iconBg: "rgba(245,158,11,0.15)",
      iconColor: "#f59e0b",
      title: "UNAUTHORIZED ACCESS - Valve Locked Automatically",
      ackText: "ACK + UNLOCK",
    },
    locked: {
      bg: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.03) 100%)",
      border: "rgba(139,92,246,0.4)",
      iconBg: "rgba(139,92,246,0.15)",
      iconColor: "#8b5cf6",
      title: "VALVE LOCKED - Command Disabled",
      ackText: null,
    },
  };

  const c = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl px-4 py-3 flex items-center gap-3 mb-3 shadow-lg"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
        style={{ background: c.iconBg, color: c.iconColor }}
      >
        {type === "locked" ? "LK" : "!"}
      </div>
      <div className="flex-1">
        <div className="text-xs font-semibold tracking-wide" style={{ color: c.iconColor }}>
          {c.title}
        </div>
        {detail && (
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{detail}</div>
        )}
      </div>
      {c.ackText && onAck && (
        <button
          onClick={onAck}
          className="px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-wide transition-all duration-200 hover:scale-105"
          style={{ 
            background: c.iconBg, 
            color: c.iconColor,
            border: `1px solid ${c.border}`,
          }}
        >
          {c.ackText}
        </button>
      )}
    </motion.div>
  );
}

function StatusBar({ clock }: { clock: string }) {
  const items = [
    { label: "ESP32", value: "ONLINE", status: "ok" },
    { label: "GSM", value: "OK", status: "ok" },
    { label: "GPS", value: "FIX 3D", status: "ok" },
    { label: "RFID", value: "ACTIVE", status: "ok" },
    { label: "CAM", value: "STANDBY", status: "idle" },
    { label: "LEAK", value: "OK", status: "ok" },
  ];

  return (
    <div className="flex gap-4 flex-wrap mb-4 bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl px-5 py-3 items-center shadow-lg">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: item.status === "ok" ? "#22c55e" : "#64748b",
              boxShadow: item.status === "ok" ? "0 0 8px rgba(34,197,94,0.5)" : "none",
            }}
          />
          <span className="text-[11px] text-slate-400 font-medium">{item.label}</span>
          <span className="text-[11px] text-slate-200 font-mono">{item.value}</span>
        </div>
      ))}
      <div className="ml-auto text-xs text-slate-300 font-mono tracking-wider">{clock}</div>
    </div>
  );
}

function Card({
  children,
  className = "",
  accentColor,
  title,
  status,
  span,
}: {
  children: React.ReactNode;
  className?: string;
  accentColor?: "cyan" | "emerald" | "amber" | "rose" | "violet";
  title?: string;
  status?: "live" | "danger" | "idle";
  span?: number;
}) {
  const accents = {
    cyan: { border: "rgba(6,182,212,0.3)", glow: "rgba(6,182,212,0.1)", text: "#06b6d4" },
    emerald: { border: "rgba(16,185,129,0.3)", glow: "rgba(16,185,129,0.1)", text: "#10b981" },
    amber: { border: "rgba(245,158,11,0.3)", glow: "rgba(245,158,11,0.1)", text: "#f59e0b" },
    rose: { border: "rgba(244,63,94,0.3)", glow: "rgba(244,63,94,0.1)", text: "#f43f5e" },
    violet: { border: "rgba(139,92,246,0.3)", glow: "rgba(139,92,246,0.1)", text: "#8b5cf6" },
  };

  const accent = accentColor ? accents[accentColor] : null;
  const statusColors = {
    live: "#22c55e",
    danger: "#ef4444",
    idle: "#64748b",
  };

  return (
    <div
      className={`relative rounded-2xl p-4 transition-all duration-300 hover:translate-y-[-2px] ${
        span === 2 ? "md:col-span-2" : span === 3 ? "md:col-span-3" : ""
      } ${className}`}
      style={{
        background: "linear-gradient(180deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%)",
        border: `1px solid ${accent?.border || "rgba(71,85,105,0.4)"}`,
        boxShadow: accent ? `0 8px 32px ${accent.glow}, inset 0 1px 0 rgba(255,255,255,0.05)` : "0 4px 24px rgba(0,0,0,0.2)",
        backdropFilter: "blur(12px)",
      }}
    >
      {title && (
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700/50">
          {status && (
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: statusColors[status],
                boxShadow: status !== "idle" ? `0 0 8px ${statusColors[status]}50` : "none",
                animation: status === "live" ? "pulse 2s infinite" : undefined,
              }}
            />
          )}
          <span className="text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: accent?.text || "#94a3b8" }}>
            {title}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

function FuelGauge({ fuel }: { fuel: number }) {
  const pct = Math.round(fuel);
  const offset = 175.9 - 175.9 * (fuel / 100);
  const color = fuel > 30 ? "#22c55e" : fuel > 15 ? "#f59e0b" : "#ef4444";
  const glowColor = fuel > 30 ? "rgba(34,197,94,0.3)" : fuel > 15 ? "rgba(245,158,11,0.3)" : "rgba(239,68,68,0.3)";

  return (
    <div className="relative">
      <svg width="90" height="90" viewBox="0 0 90 90">
        {/* Background track */}
        <circle cx="45" cy="45" r="35" fill="none" stroke="rgba(51,65,85,0.5)" strokeWidth="8" />
        {/* Progress arc */}
        <circle
          cx="45"
          cy="45"
          r="35"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray="219.9"
          strokeDashoffset={offset * (219.9 / 175.9)}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
          style={{ 
            transition: "stroke-dashoffset 0.5s ease, stroke 0.3s ease",
            filter: `drop-shadow(0 0 6px ${glowColor})`,
          }}
        />
        {/* Center text */}
        <text x="45" y="42" textAnchor="middle" className="text-2xl font-bold" fill={color} fontFamily="monospace">
          {pct}
        </text>
        <text x="45" y="56" textAnchor="middle" className="text-[10px]" fill="#64748b" fontFamily="monospace">
          %
        </text>
      </svg>
    </div>
  );
}

function VanneIcon({ open, locked }: { open: boolean; locked: boolean }) {
  const rotation = locked ? 45 : open ? 90 : 0;
  const color = locked ? "#8b5cf6" : open ? "#ef4444" : "#22c55e";
  const glowColor = locked ? "rgba(139,92,246,0.4)" : open ? "rgba(239,68,68,0.4)" : "rgba(34,197,94,0.4)";
  
  return (
    <div className="relative">
      <svg width="64" height="64" viewBox="0 0 64 64">
        {/* Outer ring */}
        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(71,85,105,0.3)" strokeWidth="2" />
        {/* Inner structure */}
        <rect x="8" y="24" width="48" height="16" rx="4" fill="rgba(30,41,59,0.8)" stroke="rgba(71,85,105,0.4)" strokeWidth="1" />
        <rect x="24" y="8" width="16" height="48" rx="4" fill="rgba(30,41,59,0.8)" stroke="rgba(71,85,105,0.4)" strokeWidth="1" />
        {/* Center indicator */}
        <circle cx="32" cy="32" r="10" fill="none" stroke={color} strokeWidth="2" style={{ filter: `drop-shadow(0 0 4px ${glowColor})` }} />
        <line
          x1="32"
          y1="22"
          x2="32"
          y2="42"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${rotation} 32 32)`}
          style={{ transition: "transform 0.4s ease", filter: `drop-shadow(0 0 4px ${glowColor})` }}
        />
      </svg>
    </div>
  );
}

function RfidRow({
  id,
  name,
  status,
}: {
  id: string;
  name: string;
  status: "auth" | "block" | "scan";
}) {
  const styles = {
    auth: { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)", text: "#22c55e" },
    block: { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)", text: "#ef4444" },
    scan: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", text: "#f59e0b" },
  };
  const s = styles[status];

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-700/30 last:border-b-0">
      <span className="font-mono text-[11px] text-cyan-400 min-w-[85px] tracking-wider">{id}</span>
      <span className="text-xs text-slate-300 flex-1 font-medium">{name}</span>
      <span
        className="text-[10px] px-2.5 py-1 rounded-md font-semibold tracking-wider"
        style={{ 
          background: s.bg, 
          border: `1px solid ${s.border}`, 
          color: s.text,
          animation: status === "scan" ? "pulse 0.6s infinite" : undefined,
        }}
      >
        {status.toUpperCase()}
      </span>
    </div>
  );
}

function CameraBox({
  cameraActive,
  recording,
  intrusion,
  leakActive,
  videoSrc,
}: {
  cameraActive: boolean;
  recording: boolean;
  intrusion: boolean;
  leakActive: boolean;
  videoSrc: string;
}) {
  return (
    <div className="bg-slate-950 rounded-xl h-36 flex items-center justify-center relative border border-slate-700/30 overflow-hidden">
      {cameraActive ? (
        <video
          key={videoSrc}
          src={videoSrc}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-mono text-xs tracking-widest">
          CAMERA STANDBY
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
      <div className="absolute top-2 left-3 flex items-center gap-1.5">
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: cameraActive ? "#ef4444" : "#64748b",
            boxShadow: cameraActive ? "0 0 8px rgba(239,68,68,0.6)" : "none",
            animation: cameraActive ? "pulse 0.8s infinite" : undefined,
          }}
        />
        <span className="font-mono text-[9px] text-slate-200">
          {cameraActive ? "LIVE CCTV" : "STANDBY"}
        </span>
      </div>
      <div className="absolute bottom-2 left-3 right-3 text-[10px] font-mono text-center text-slate-100/90 px-2">
        {intrusion
          ? "SECURITY RECORDING - INTRUSION"
          : leakActive
          ? "ALERT RECORDING - LEAK DETECTED"
          : recording
          ? "LIVE CCTV - VALVE OPEN"
          : "STANDBY - VALVE CLOSED"}
      </div>
    </div>
  );
}

function LogEntry({ time, html }: { time: string; html: string }) {
  return (
    <div className="flex gap-3 py-2 border-b border-slate-700/20 items-start">
      <span className="text-slate-500 text-[10px] min-w-[52px] pt-0.5 flex-shrink-0 font-mono">{time}</span>
      <span className="leading-relaxed text-[11px] font-mono text-slate-300" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

// Wiring Diagram Tab
function WiringDiagram() {
  return (
    <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h3 className="text-sm font-semibold text-slate-200 mb-4 tracking-wide">System Wiring Schematic</h3>
      <svg className="w-full" viewBox="0 0 680 480" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="aw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(30,41,59,0.9)" />
            <stop offset="100%" stopColor="rgba(15,23,42,0.95)" />
          </linearGradient>
        </defs>
        
        {/* ESP32 Main */}
        <rect x="255" y="185" width="170" height="90" rx="12" fill="url(#cardGrad)" stroke="#06b6d4" strokeWidth="1.5" />
        <text x="340" y="217" textAnchor="middle" fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#06b6d4">TTGO T-Call V1.4</text>
        <text x="340" y="234" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#94a3b8">ESP32 + SIM800L</text>
        <text x="340" y="250" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#64748b">3.3V Logic - GPIO 26/25/27/34/16/17/5</text>
        <text x="340" y="265" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#64748b">Leak Detection: Delta Level/Time</text>

        {/* HC-SR04 Ultrasonic */}
        <rect x="25" y="25" width="130" height="48" rx="10" fill="url(#cardGrad)" stroke="#22c55e" strokeWidth="1" />
        <text x="90" y="46" textAnchor="middle" fontFamily="system-ui" fontSize="11" fontWeight="600" fill="#22c55e">HC-SR04</text>
        <text x="90" y="62" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#94a3b8">{"Ultrasonic 5V → div 3.3V"}</text>
        <rect x="25" y="80" width="130" height="22" rx="6" fill="rgba(15,23,42,0.8)" stroke="#f59e0b" strokeWidth="0.7" />
        <text x="90" y="95" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#f59e0b">{"R1=10k R2=20k → GPIO34"}</text>
        <path d="M155 50 L200 50 L200 205 L255 218" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="4 2" markerEnd="url(#aw)" />

        {/* RFID RC522 */}
        <rect x="280" y="25" width="120" height="48" rx="10" fill="url(#cardGrad)" stroke="#06b6d4" strokeWidth="1" />
        <text x="340" y="46" textAnchor="middle" fontFamily="system-ui" fontSize="11" fontWeight="600" fill="#06b6d4">RFID RC522</text>
        <text x="340" y="62" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#94a3b8">SPI 3.3V - GPIO 5/18/19/21</text>
        <path d="M340 73 L340 185" fill="none" stroke="#06b6d4" strokeWidth="1.2" markerEnd="url(#aw)" />

        {/* GPS NEO-6M */}
        <rect x="525" y="25" width="130" height="48" rx="10" fill="url(#cardGrad)" stroke="#f59e0b" strokeWidth="1" />
        <text x="590" y="46" textAnchor="middle" fontFamily="system-ui" fontSize="11" fontWeight="600" fill="#f59e0b">GPS NEO-6M</text>
        <text x="590" y="62" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#94a3b8">{"UART TX→16 RX→17 3.3V"}</text>
        <path d="M525 49 L470 49 L470 218 L425 220" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 2" markerEnd="url(#aw)" />

        {/* Camera OV2640 */}
        <rect x="525" y="185" width="130" height="48" rx="10" fill="url(#cardGrad)" stroke="#8b5cf6" strokeWidth="1" />
        <text x="590" y="206" textAnchor="middle" fontFamily="system-ui" fontSize="11" fontWeight="600" fill="#8b5cf6">Camera OV2640</text>
        <text x="590" y="222" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#94a3b8">{"I2C/DVP 3.3V - GPIO 27"}</text>
        <path d="M525 209 L425 237" fill="none" stroke="#8b5cf6" strokeWidth="1.2" markerEnd="url(#aw)" />

        {/* Solenoid Valve */}
        <rect x="25" y="300" width="130" height="48" rx="10" fill="url(#cardGrad)" stroke="#ef4444" strokeWidth="1" />
        <text x="90" y="321" textAnchor="middle" fontFamily="system-ui" fontSize="11" fontWeight="600" fill="#ef4444">Solenoid Valve</text>
        <text x="90" y="337" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#94a3b8">24V DC - Truck Battery</text>
        <rect x="25" y="258" width="130" height="30" rx="6" fill="rgba(15,23,42,0.8)" stroke="#ef4444" strokeWidth="0.7" />
        <text x="90" y="271" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ef4444">5V Relay - IN1</text>
        <text x="90" y="284" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#94a3b8">NPN transistor 2N2222</text>
        <path d="M155 270 L200 270 L200 255 L255 255" fill="none" stroke="#ef4444" strokeWidth="1.2" markerEnd="url(#aw)" />
        <text x="170" y="264" fontFamily="monospace" fontSize="8" fill="#ef4444">GPIO 26</text>
        <line x1="90" y1="288" x2="90" y2="300" stroke="#ef4444" strokeWidth="1" />

        {/* Buzzer */}
        <rect x="280" y="360" width="120" height="48" rx="10" fill="url(#cardGrad)" stroke="#f59e0b" strokeWidth="1" />
        <text x="340" y="381" textAnchor="middle" fontFamily="system-ui" fontSize="11" fontWeight="600" fill="#f59e0b">Buzzer 5V</text>
        <text x="340" y="397" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#94a3b8">NPN transistor - GPIO 25</text>
        <path d="M340 360 L340 275" fill="none" stroke="#f59e0b" strokeWidth="1.2" markerEnd="url(#aw)" />

        {/* GSM SIM800L */}
        <rect x="525" y="340" width="130" height="48" rx="10" fill="url(#cardGrad)" stroke="#06b6d4" strokeWidth="1" />
        <text x="590" y="361" textAnchor="middle" fontFamily="system-ui" fontSize="11" fontWeight="600" fill="#06b6d4">SIM800L GSM</text>
        <text x="590" y="377" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#94a3b8">Integrated TTGO - Ext Antenna</text>

        {/* Power Supply */}
        <rect x="230" y="430" width="220" height="36" rx="10" fill="rgba(15,23,42,0.8)" stroke="rgba(71,85,105,0.4)" />
        <text x="340" y="445" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#f59e0b">{"Power: 12V truck → LM2596 → 5V"}</text>
        <text x="340" y="459" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#94a3b8">AMS1117 3.3V for ESP32 / RFID / GPS / Cam</text>

        {/* Leak Detection */}
        <rect x="430" y="300" width="160" height="28" rx="8" fill="rgba(15,23,42,0.8)" stroke="rgba(239,68,68,0.4)" strokeWidth="0.7" />
        <text x="510" y="313" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ef4444">{"Leak Alarm: Delta Lvl/t > 0.5%/min"}</text>
        <text x="510" y="323" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#94a3b8">{"Valve=Closed + Level drops → ALERT"}</text>
      </svg>
    </div>
  );
}

// Command Tab
function CommandTab({
  onOpen,
  onClose,
  onSimNoRFID,
  onSimLeak,
  onSendSMS,
  atTerminal,
  onSendAT,
}: {
  onOpen: () => void;
  onClose: () => void;
  onSimNoRFID: () => void;
  onSimLeak: () => void;
  onSendSMS: () => void;
  atTerminal: string[];
  onSendAT: (cmd: string) => void;
}) {
  const [atInput, setAtInput] = useState("");
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [atTerminal]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card accentColor="cyan" title="Quick Commands - Dashboard" status="live" span={2}>
        <div className="flex gap-3 flex-wrap mt-2">
          <button onClick={onOpen} className="cmd-btn cmd-btn-primary">OPEN VALVE</button>
          <button onClick={onClose} className="cmd-btn">CLOSE VALVE</button>
          <button onClick={onSimNoRFID} className="cmd-btn cmd-btn-danger">SIM RFID INTRUS</button>
          <button onClick={onSimLeak} className="cmd-btn cmd-btn-warning">SIM LEAK</button>
          <button onClick={onSendSMS} className="cmd-btn">SEND SMS</button>
        </div>
      </Card>

      <Card accentColor="cyan" title="AT Terminal - SIM800L" status="live">
        <div 
          ref={termRef} 
          className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] h-[150px] overflow-y-auto border border-slate-700/30 mt-2"
        >
          {atTerminal.map((line, i) => (
            <div key={i} className={line.startsWith(">>") ? "text-slate-500" : "text-emerald-400"}>{line}</div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={atInput}
            onChange={(e) => setAtInput(e.target.value)}
            placeholder="AT+CSQ"
            className="flex-1 bg-slate-900/60 border border-slate-700/50 rounded-lg px-3 py-2 text-slate-200 font-mono text-[11px] focus:border-cyan-500/50 outline-none transition-colors"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSendAT(atInput || "AT");
                setAtInput("");
              }
            }}
          />
          <button
            onClick={() => {
              onSendAT(atInput || "AT");
              setAtInput("");
            }}
            className="cmd-btn"
          >
            SEND
          </button>
        </div>
      </Card>

      <Card title="MQTT Topics" status="live">
        <div className="font-mono text-[11px] leading-[2.2] text-slate-400 mt-2">
          <div><span className="text-cyan-400 font-semibold">pub</span> comet/fuel/level</div>
          <div><span className="text-cyan-400 font-semibold">pub</span> comet/vanne/state</div>
          <div><span className="text-cyan-400 font-semibold">pub</span> comet/alarm/leak</div>
          <div><span className="text-cyan-400 font-semibold">pub</span> comet/alarm/rfid</div>
          <div><span className="text-cyan-400 font-semibold">pub</span> comet/gps/position</div>
          <div><span className="text-rose-400 font-semibold">sub</span> comet/vanne/command</div>
        </div>
      </Card>
    </div>
  );
}

// Main Dashboard Component
export function DashboardSection() {
  // State
  const [activeTab, setActiveTab] = useState<"dash" | "wire" | "cmd">("dash");
  const [fuel, setFuel] = useState(87.0);
  const [prevFuel, setPrevFuel] = useState(87.0);
  const [vanneOpen, setVanneOpen] = useState(false);
  const [locked, setLocked] = useState(false);
  const [leakActive, setLeakActive] = useState(false);
  const [leakAcked, setLeakAcked] = useState(false);
  const [locIdx, setLocIdx] = useState(2);
  const [gpsIndex, setGpsIndex] = useState(2);
  const [clock, setClock] = useState("");
  const [cctvVideo, setCctvVideo] = useState(CCTV_VIDEOS[0]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [rfidStatus, setRfidStatus] = useState<("auth" | "block" | "scan")[]>(["auth", "auth", "auth", "block"]);
  const [intrusion, setIntrusion] = useState(false);
  const [atTerminal, setAtTerminal] = useState<string[]>([
    "SIM800L Ready",
    "Call Ready - SMS Ready",
    "Network: Tunisie Telecom - Signal: 18/31",
  ]);
  const [fuelHistory, setFuelHistory] = useState<number[]>(() => {
    const arr: number[] = [];
    for (let i = 0; i < 25; i++) {
      arr.push(+(87 + Math.random() * 1.5 - 0.5).toFixed(2));
    }
    return arr;
  });
  const [vanneHistory, setVanneHistory] = useState<number[]>(() => new Array(25).fill(0));
  const [timeLabels, setTimeLabels] = useState<string[]>(() => {
    const arr: string[] = [];
    for (let i = 0; i < 25; i++) {
      const t = new Date(Date.now() - (24 - i) * 4000);
      arr.push(pad(t.getMinutes()) + ":" + pad(t.getSeconds()));
    }
    return arr;
  });

  // Refs for intervals
  const prevFuelRef = useRef(prevFuel);

  // Add log helper
  const addLog = useCallback((html: string) => {
    setLogs((prev) => [{ time: now(), html }, ...prev.slice(0, 59)]);
  }, []);

  const cameraActive = vanneOpen || intrusion || leakActive;
  const buzzerActive = leakActive || intrusion;

  useEffect(() => {
    if (!cameraActive) return;
    setCctvVideo(CCTV_VIDEOS[Math.floor(Math.random() * CCTV_VIDEOS.length)]);
  }, [cameraActive]);

  // Actions
  const doOpen = useCallback(() => {
    if (locked) {
      addLog('<span style="color:#ef4444">OPEN command rejected - Valve locked</span>');
      return;
    }
    if (vanneOpen) return;
    setVanneOpen(true);
    setIntrusion(false);
    const driver = DRIVERS[0];
    addLog(
      `<span style="color:#22c55e">[RFID OK]</span> <span style="color:#f59e0b;font-weight:600">Driver #${driver.num}: ${driver.name}</span> - valve opened at ${now()} - Zone: ${LOCS[locIdx]}`
    );
    addLog('<span style="color:#22c55e">Camera started - recording active</span>');
  }, [locked, vanneOpen, addLog, locIdx]);

  const doClose = useCallback(() => {
    if (!vanneOpen) return;
    setVanneOpen(false);
    addLog(`<span style="color:#22c55e">Valve closed manually - ${now()}</span>`);
    addLog('<span style="color:#22c55e">Camera stopped - file saved</span>');
  }, [vanneOpen, addLog]);

  const lockVanne = useCallback(() => {
    setLocked(true);
    setVanneOpen(false);
  }, []);

  const forceUnlock = useCallback(() => {
    setLocked(false);
    setIntrusion(false);
    addLog('<span style="color:#f59e0b">Valve unlocked manually - supervisor required</span>');
  }, [addLog]);

  const ackLeak = useCallback(() => {
    setLeakAcked(true);
    setLeakActive(false);
    addLog('<span style="color:#f59e0b">Leak alarm acknowledged - monitoring continues</span>');
  }, [addLog]);

  const ackRfid = useCallback(() => {
    setLocked(false);
    setIntrusion(false);
    addLog('<span style="color:#22c55e">RFID alarm acknowledged - valve unlocked</span>');
  }, [addLog]);

  const simRFIDOK = useCallback(() => {
    const dIdx = Math.floor(Math.random() * 3);
    const d = DRIVERS[dIdx];
    setRfidStatus((prev) => {
      const next = [...prev];
      next[dIdx] = "scan";
      return next;
    });
    setTimeout(() => {
      setRfidStatus((prev) => {
        const next = [...prev];
        next[dIdx] = "auth";
        return next;
      });
    }, 1200);
    addLog(
      `<span style="color:#22c55e">[RFID]</span> Badge <span style="color:#06b6d4">${d.id}</span> - <span style="color:#f59e0b;font-weight:600">${d.name}</span> - access authorized`
    );
    setTimeout(() => doOpen(), 100);
  }, [addLog, doOpen]);

  const simNoRFID = useCallback(() => {
    addLog(
      '<span style="color:#ef4444">[RFID]</span> Unknown badge D4:7C:00:B3 - <span style="color:#ef4444">ACCESS DENIED</span>'
    );
    addLog(
      '<span style="color:#ef4444">Unauthorized valve opening attempt - valve locked</span>'
    );
    addLog(`<span style="color:#f59e0b">SMS sent to supervisor: INTRUSION ALERT - ${LOCS[locIdx]}</span>`);
    addLog('<span style="color:#22c55e">Camera started - security recording active</span>');
    lockVanne();
    setIntrusion(true);
  }, [addLog, lockVanne, locIdx]);

  const simLeak = useCallback(() => {
    if (vanneOpen) {
      addLog('<span style="color:#f59e0b">Valve open - close before leak test</span>');
      return;
    }
    setLeakActive(true);
    setLeakAcked(false);
    addLog('<span style="color:#ef4444">LEAK DETECTED - Valve closed but level dropping!</span>');
    addLog('<span style="color:#ef4444">Delta: -1.2%/min - Threshold: 0.5%/min - ALARM</span>');
    addLog(
      `<span style="color:#f59e0b">SMS sent: FUEL LEAK - ${LOCS[locIdx]} - Level: ${Math.round(fuel)}%</span>`
    );
  }, [vanneOpen, addLog, locIdx, fuel]);

  const sendSMS = useCallback(() => {
    setAtTerminal((prev) => [...prev, '>> AT+CMGS="+21655000000"']);
    setTimeout(() => {
      setAtTerminal((prev) => [
        ...prev,
        `> SMS: COMET ALERT - Valve:${vanneOpen ? "OPEN" : "CLOSED"} Fuel:${Math.round(fuel)}% Zone:${LOCS[locIdx]} ${now()}`,
      ]);
      addLog('<span style="color:#22c55e">SMS sent to supervisor via SIM800L</span>');
    }, 600);
  }, [vanneOpen, fuel, locIdx, addLog]);

  const sendAT = useCallback((cmd: string) => {
    setAtTerminal((prev) => [...prev, `>> ${cmd}`]);
    const responses: Record<string, string> = {
      AT: "OK",
      "AT+CSQ": "+CSQ: 18,0\nOK",
      "AT+CREG?": "+CREG: 0,1\nOK",
      "AT+CMGF=1": "OK",
    };
    setTimeout(() => {
      setAtTerminal((prev) => [...prev, responses[cmd.toUpperCase()] || "OK"]);
    }, 350);
  }, []);

  // Effects
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setClock(new Date().toLocaleString("en-US", { 
        hour12: false, 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric"
      }));
    }, 1000);

    const gpsInterval = setInterval(() => {
      setGpsIndex((prev) => (prev + 1) % GPS_PTS.length);
    }, 4000);

    addLog('<span style="color:#06b6d4">System COMET started - TTGO T-Call V1.4</span>');
    addLog('<span style="color:#22c55e">GPS FIX 3D - Satellites: 8 - Zone: Tunis</span>');
    addLog('<span style="color:#22c55e">RFID RC522 init - SPI OK</span>');
    addLog('<span style="color:#22c55e">Valve closed - nominal initial state</span>');
    addLog('<span style="color:#22c55e">Leak detection active - threshold 0.5%/min</span>');

    return () => {
      clearInterval(clockInterval);
      clearInterval(gpsInterval);
    };
  }, [addLog]);

  // Fuel simulation
  useEffect(() => {
    const fuelInterval = setInterval(() => {
      setPrevFuel(fuel);
      prevFuelRef.current = fuel;

      setFuel((prev) => {
        let next = prev;
        if (vanneOpen) {
          next = Math.max(0, prev - 0.22);
        } else if (leakActive && !leakAcked) {
          next = Math.max(0, prev - 0.18);
        } else {
          next = Math.min(100, prev + Math.random() * 0.03);
        }
        return next;
      });

      setFuelHistory((prev) => {
        const next = [...prev, fuel];
        if (next.length > 35) next.shift();
        return next;
      });
      setVanneHistory((prev) => {
        const next = [...prev, vanneOpen ? 1 : 0];
        if (next.length > 35) next.shift();
        return next;
      });
      setTimeLabels((prev) => {
        const next = [...prev, now().slice(3)];
        if (next.length > 35) next.shift();
        return next;
      });

      if (Math.random() < 0.008) {
        setLocIdx((prev) => {
          const next = (prev + 1) % LOCS.length;
          addLog(`<span style="color:#06b6d4">GPS: New zone - ${LOCS[next]}</span>`);
          return next;
        });
      }
    }, 1000);

    return () => clearInterval(fuelInterval);
  }, [vanneOpen, leakActive, leakAcked, fuel, addLog]);

  const delta = prevFuel - fuel;
  const rate = +((delta * 60) / 4).toFixed(2);
  const leakColor = !vanneOpen && rate > 0.5 ? "#ef4444" : !vanneOpen && rate > 0.2 ? "#f59e0b" : "#22c55e";

  const gps = GPS_PTS[gpsIndex];

  return (
    <section id="dashboard" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .cmd-btn {
          cursor: pointer;
          border: 1px solid rgba(71,85,105,0.4);
          background: linear-gradient(180deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%);
          color: #e2e8f0;
          font-family: system-ui;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 10px 16px;
          border-radius: 10px;
          transition: all 0.2s ease;
        }
        .cmd-btn:hover:not(:disabled) {
          border-color: rgba(6,182,212,0.5);
          box-shadow: 0 4px 16px rgba(6,182,212,0.15);
          transform: translateY(-1px);
        }
        .cmd-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .cmd-btn-primary:hover:not(:disabled) {
          border-color: rgba(34,197,94,0.5);
          box-shadow: 0 4px 16px rgba(34,197,94,0.15);
        }
        .cmd-btn-danger {
          border-color: rgba(239,68,68,0.4);
          color: #fca5a5;
        }
        .cmd-btn-danger:hover {
          border-color: rgba(239,68,68,0.6);
          box-shadow: 0 4px 16px rgba(239,68,68,0.15);
          background: linear-gradient(180deg, rgba(239,68,68,0.1) 0%, rgba(15,23,42,0.9) 100%);
        }
        .cmd-btn-warning {
          border-color: rgba(245,158,11,0.4);
          color: #fcd34d;
        }
        .cmd-btn-warning:hover {
          border-color: rgba(245,158,11,0.6);
          box-shadow: 0 4px 16px rgba(245,158,11,0.15);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400" style={{ animation: "pulse 2s infinite" }} />
            <span className="text-xs font-medium text-cyan-400 tracking-wider">REAL-TIME MONITORING</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Control <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Dashboard</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
            SecureTank IoT system control and supervision interface with real-time telemetry, 
            valve control, and comprehensive event logging.
          </p>
        </motion.div>

        <div className="space-y-4">
          {/* Alarm Banners */}
          <AnimatePresence>
            <AlarmBanner
              key="leak-alarm"
              type="leak"
              visible={leakActive && !leakAcked}
              detail={`Delta: -1.2%/min - Threshold: 0.5%/min - Zone: ${LOCS[locIdx]}`}
              onAck={ackLeak}
            />
            <AlarmBanner
              key="rfid-alarm"
              type="rfid"
              visible={intrusion && locked}
              detail={`Badge D4:7C:00:B3 - Zone: ${LOCS[locIdx]} - ${now()}`}
              onAck={ackRfid}
            />
            <AlarmBanner 
              key="locked-alarm"
              type="locked" 
              visible={locked && !intrusion} 
              detail="Acknowledge RFID alarm to unlock" 
            />
          </AnimatePresence>

          {/* Status Bar */}
          <StatusBar clock={clock} />

          {/* Tabs */}
          <div className="flex gap-0 bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
            {[
              { id: "dash", label: "Dashboard" },
              { id: "wire", label: "Wiring Diagram" },
              { id: "cmd", label: "GSM Commands" },
            ].map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "dash" | "wire" | "cmd")}
                className={`flex-1 py-3 text-center text-xs font-semibold tracking-wider transition-all duration-200 ${
                  i < 2 ? "border-r border-slate-700/50" : ""
                } ${
                  activeTab === tab.id
                    ? "bg-slate-800/80 text-cyan-400"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                {tab.label.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "dash" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Fuel Level */}
              <Card accentColor="emerald" title="Fuel Level" status="live">
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white font-mono">{Math.round(fuel)}</span>
                      <span className="text-sm text-slate-400">%</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 font-mono">
                      {Math.round(fuel * 250).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} L / 25,000 L
                    </div>
                    <div className="text-xs mt-2 font-mono" style={{ color: delta > 0.05 ? "#ef4444" : "#64748b" }}>
                      {delta > 0.05 ? `Decreasing: -${delta.toFixed(2)}%` : "Level Stable"}
                    </div>
                  </div>
                  <FuelGauge fuel={fuel} />
                </div>
                <div className="flex items-center justify-between mt-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                  <span className="text-[11px] text-slate-400 font-medium">Variation Rate</span>
                  <span className="font-mono text-xs font-semibold" style={{ color: leakColor }}>
                    {rate > 0 ? "-" : ""}{Math.abs(rate).toFixed(2)} %/min
                  </span>
                </div>
              </Card>

              {/* Valve Control */}
              <Card accentColor="rose" title="Pneumatic Valve - Control" status={locked ? "danger" : vanneOpen ? "live" : "idle"}>
                <div className="flex gap-4 items-center mt-2">
                  <div className="flex-1">
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                      style={{
                        background: locked
                          ? "rgba(139,92,246,0.15)"
                          : vanneOpen
                            ? "rgba(239,68,68,0.15)"
                            : "rgba(34,197,94,0.15)",
                        border: `1px solid ${locked ? "rgba(139,92,246,0.3)" : vanneOpen ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.3)"}`,
                        color: locked ? "#a78bfa" : vanneOpen ? "#f87171" : "#4ade80",
                      }}
                    >
                      {locked ? "LOCKED" : vanneOpen ? "OPEN" : "CLOSED"}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-2 font-mono">{"GPIO 26 → Relay → 24V"}</div>
                  </div>
                  <VanneIcon open={vanneOpen} locked={locked} />
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={doOpen} disabled={locked || vanneOpen} className="cmd-btn cmd-btn-primary flex-1">
                    OPEN
                  </button>
                  <button onClick={doClose} disabled={!vanneOpen} className="cmd-btn flex-1">
                    CLOSE
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-700/30">
                  <div className={`text-xs flex-1 font-medium ${locked ? "text-violet-400" : "text-emerald-400"}`}>
                    {locked ? "LOCKED - Access Denied" : "UNLOCKED"}
                  </div>
                  {locked && (
                    <button onClick={forceUnlock} className="cmd-btn cmd-btn-danger text-[10px] py-1.5">
                      FORCE UNLOCK
                    </button>
                  )}
                </div>
              </Card>

              {/* RFID */}
              <Card accentColor="cyan" title="RFID RC522 - Badges" status="live">
                <div className="mt-2">
                  {DRIVERS.map((d, i) => (
                    <RfidRow 
                      key={d.id} 
                      id={d.id} 
                      name={`${d.name}${d.num ? ` #${String(d.num).padStart(2, "0")}` : ""}`} 
                      status={rfidStatus[i]} 
                    />
                  ))}
                </div>
              </Card>

              {/* GPS */}
              <Card accentColor="amber" title="GPS NEO-6M" status="live">
                <div className="mt-2">
                  <div className="h-[200px] w-full">
                    <GpsLeafletMap
                      currentPosition={{ lat: parseFloat(gps.lat), lon: parseFloat(gps.lon) }}
                      speed={gps.v}
                      zone={LOCS[locIdx]}
                      startPoint={TUNIS_DEPOT}
                      startLabel="Tunis Depot"
                      destinationLabel="Live Position"
                      trail={GPS_PTS.map(pt => ({ lat: parseFloat(pt.lat), lon: parseFloat(pt.lon) }))}
                    />
                  </div>
                  <div className="flex justify-between mt-3 font-mono text-[10px] text-slate-400">
                    <span>LAT: <span className="text-amber-400">{gps.lat}N</span></span>
                    <span>LON: <span className="text-amber-400">{gps.lon}E</span></span>
                    <span>V: <span className="text-amber-400">{gps.v} km/h</span></span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2 font-mono">Zone: {LOCS[locIdx]}</div>
                </div>
              </Card>

              {/* Camera */}
              <Card title="Camera + Buzzer" status={intrusion || leakActive ? "danger" : vanneOpen ? "live" : "idle"}>
                <div className="mt-2">
                  <CameraBox
                    cameraActive={cameraActive}
                    recording={vanneOpen}
                    intrusion={intrusion}
                    leakActive={leakActive}
                    videoSrc={cctvVideo}
                  />
                  <div className="flex justify-between mt-3">
                    <div className="text-[10px] text-slate-500 font-mono">
                      {"GPIO 27 → OV2640"}
                      <br />
                      {"GPIO 25 → Buzzer"}
                    </div>
                    <div
                      className="text-[10px] font-mono border rounded-lg px-3 py-1.5 self-center"
                      style={{
                        color: buzzerActive ? "#ef4444" : "#64748b",
                        borderColor: buzzerActive ? "rgba(239,68,68,0.3)" : "rgba(71,85,105,0.3)",
                        background: buzzerActive ? "rgba(239,68,68,0.1)" : "transparent",
                      }}
                    >
                      {buzzerActive ? "BUZZER ACTIVE" : "BUZZER OFF"}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Chart */}
              <Card span={3} title="History - Fuel % / Valve State / Alerts" status="live">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                  <div className="flex gap-5 text-[10px] font-mono">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-0.5 bg-emerald-500 rounded-full" />
                      <span className="text-slate-400">Fuel Level</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-rose-500/30 rounded" />
                      <span className="text-slate-400">Valve Open</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-0.5 border-t-2 border-dashed border-rose-500" />
                      <span className="text-slate-400">Leak Alert</span>
                    </span>
                  </div>
                </div>
                <MiniChart fuelHistory={fuelHistory} vanneHistory={vanneHistory} labels={timeLabels} />
              </Card>

              {/* Logs */}
              <Card span={3} title="Event Log" status="live">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                  <div className="flex gap-2">
                    <button onClick={simRFIDOK} className="cmd-btn text-[10px] py-1.5">SIM RFID OK</button>
                    <button onClick={simNoRFID} className="cmd-btn text-[10px] py-1.5">SIM NO RFID</button>
                    <button onClick={simLeak} className="cmd-btn text-[10px] py-1.5">SIM LEAK</button>
                  </div>
                </div>
                <div className="max-h-[180px] overflow-y-auto font-mono text-[11px] pr-2">
                  {logs.map((log, i) => (
                    <LogEntry key={i} time={log.time} html={log.html} />
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === "wire" && <WiringDiagram />}

          {activeTab === "cmd" && (
            <CommandTab
              onOpen={doOpen}
              onClose={doClose}
              onSimNoRFID={simNoRFID}
              onSimLeak={simLeak}
              onSendSMS={sendSMS}
              atTerminal={atTerminal}
              onSendAT={sendAT}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default DashboardSection;
