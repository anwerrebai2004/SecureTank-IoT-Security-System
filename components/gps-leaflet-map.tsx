"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then(mod => mod.Polyline), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const useMap = dynamic(() => import("react-leaflet").then(mod => mod.useMap), { ssr: false });

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue in Next.js
const createCustomIcon = (color: string) => {
  // This will be called after L is available
  return (L: any) => L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 16px ${color}80, 0 2px 8px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
      "></div>
      <style>
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      </style>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Component to animate map view changes
function MapUpdater({ center }: { center: [number, number] }) {
  const [UseMapComponent, setUseMapComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    import("react-leaflet").then(mod => {
      setUseMapComponent(() => mod.useMap);
    });
  }, []);

  if (!UseMapComponent) return null;

  return <MapUpdaterInner center={center} useMapHook={UseMapComponent} />;
}

function MapUpdaterInner({ center, useMapHook }: { center: [number, number]; useMapHook: any }) {
  const map = useMapHook();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), { duration: 2 });
  }, [center, map]);
  return null;
}

interface GpsLeafletMapProps {
  currentPosition: { lat: number; lon: number };
  speed: string;
  zone: string;
  trail: { lat: number; lon: number }[];
  startPoint?: { lat: number; lon: number };
  startLabel?: string;
  destinationLabel?: string;
}

export default function GpsLeafletMap({ currentPosition, speed, zone, trail, startPoint, startLabel, destinationLabel }: GpsLeafletMapProps) {
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [icons, setIcons] = useState<{ tankerIcon: any; startIcon: any; targetIcon: any } | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Load Leaflet dynamically
    import("leaflet").then(leaflet => {
      setL(leaflet.default);
    });
  }, []);

  useEffect(() => {
    if (L) {
      const createIcon = createCustomIcon("#f59e0b");
      const tankerIcon = createIcon(L);
      const startIcon = createCustomIcon("#22c55e")(L);
      const targetIcon = createCustomIcon("#38bdf8")(L);
      setIcons({ tankerIcon, startIcon, targetIcon });
    }
  }, [L]);

  if (!mounted || !L || !icons) {
    return (
      <div className="w-full h-full bg-slate-900/60 rounded-xl flex items-center justify-center border border-slate-700/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-xs text-slate-400 font-mono">Loading GPS Map...</span>
        </div>
      </div>
    );
  }

  const center: [number, number] = [currentPosition.lat, currentPosition.lon];
  const trailPath: [number, number][] = trail.map(p => [p.lat, p.lon]);
  const startPosition: [number, number] = startPoint ? [startPoint.lat, startPoint.lon] : trailPath[0];
  const routePath: [number, number][] = [startPosition, center];

  const startLabelText = startLabel || "Route Start";
  const destinationLabelText = destinationLabel || "Live Position";
  const destinationPosition = center;

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-700/30">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        zoomControlOptions={{
          position: 'bottomright'
        }}
        attributionControl={false}
        ref={mapRef}
        className="modern-map"
      >
        <TileLayer
          key="tile-layer"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapUpdater key="map-updater" center={center} />
        
        {/* Route line from start to live truck position */}
        {routePath.length > 1 && (
          <Polyline
            key="route-polyline"
            positions={routePath}
            pathOptions={{
              color: "#38bdf8",
              weight: 4,
              opacity: 0.8,
            }}
          />
        )}

        {/* Trail polyline */}
        {trailPath.length > 1 && (
          <Polyline
            key="trail-polyline"
            positions={trailPath}
            pathOptions={{
              color: "#f59e0b",
              weight: 3,
              opacity: 0.5,
              dashArray: "8, 8",
            }}
          />
        )}

        {/* Start marker */}
        {startPosition && (
          <Marker key="start-marker" position={startPosition} icon={icons.startIcon}>
            <Popup className="custom-popup">
              <div className="text-xs font-mono">
                <div className="font-semibold text-emerald-400">{startLabelText}</div>
                <div className="text-slate-400">{startPosition[0].toFixed(4)}, {startPosition[1].toFixed(4)}</div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Destination marker */}
        {trailPath.length > 1 && destinationPosition && (
          <Marker key="destination-marker" position={destinationPosition} icon={icons.targetIcon}>
            <Popup className="custom-popup">
              <div className="text-xs font-mono">
                <div className="font-semibold text-sky-400">{destinationLabelText}</div>
                <div className="text-slate-400">{destinationPosition[0].toFixed(4)}, {destinationPosition[1].toFixed(4)}</div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Current position marker */}
        <Marker key="current-marker" position={center} icon={icons.tankerIcon}>
          <Popup className="custom-popup">
            <div className="text-xs font-mono">
              <div className="font-semibold text-amber-400">Tanker T-2847</div>
              <div className="text-slate-400">Speed: {speed} km/h</div>
              <div className="text-slate-400">Zone: {zone}</div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Overlay info panel */}
      <div className="absolute top-2 left-2 bg-slate-900/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-700/50 z-[1000]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-slate-300">LIVE TRACKING</span>
        </div>
      </div>

      {/* Coordinates display */}
      <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-700/50 z-[1000]">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <div className="flex gap-4">
            <span className="text-slate-400">
              LAT: <span className="text-cyan-400">{currentPosition.lat.toFixed(4)}</span>
            </span>
            <span className="text-slate-400">
              LON: <span className="text-cyan-400">{currentPosition.lon.toFixed(4)}</span>
            </span>
          </div>
          <div className="flex gap-3">
            <span className="text-slate-400">
              SPD: <span className="text-emerald-400">{speed} km/h</span>
            </span>
            <span className="text-slate-400">
              ZONE: <span className="text-amber-400">{zone}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
