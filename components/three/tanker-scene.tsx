"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshTransmissionMaterial, Environment, Stars } from "@react-three/drei"
import * as THREE from "three"

function Tanker() {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      glowRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, 0, 0]} scale={0.8}>
        {/* Main Tank Body */}
        <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.8, 3, 32, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.9}
            roughness={0.1}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#ff6b35"
            color="#1a1a2e"
          />
        </mesh>

        {/* Tank glow effect */}
        <mesh ref={glowRef} position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.85, 3.1, 16, 32]} />
          <meshBasicMaterial color="#ff6b35" transparent opacity={0.1} />
        </mesh>

        {/* Cab */}
        <mesh position={[2.2, 0.3, 0]}>
          <boxGeometry args={[1, 1.2, 1.4]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Cab windshield */}
        <mesh position={[2.5, 0.5, 0]}>
          <boxGeometry args={[0.1, 0.6, 1.2]} />
          <meshStandardMaterial color="#00d4ff" metalness={0.9} roughness={0.1} emissive="#00d4ff" emissiveIntensity={0.3} />
        </mesh>

        {/* Wheels */}
        {[-1.5, -0.5, 0.5, 1.8].map((x, i) => (
          <group key={i} position={[x, -0.3, 0]}>
            <mesh position={[0, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
              <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
            </mesh>
            <mesh position={[0, 0, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
              <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
            </mesh>
          </group>
        ))}

        {/* IoT Sensors */}
        <IoTSensor position={[-1.2, 1.4, 0]} color="#00ff88" label="GPS" />
        <IoTSensor position={[0, 1.4, 0.6]} color="#ff6b35" label="RFID" />
        <IoTSensor position={[0.8, 1.4, -0.5]} color="#00d4ff" label="Level" />
      </group>
    </Float>
  )
}

function IoTSensor({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  const ringRef = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3
      ringRef.current.scale.set(scale, scale, 1)
      ringRef.current.material.opacity = 1 - (scale - 1) / 0.3
    }
    if (ring2Ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3 + 1) * 0.3
      ring2Ref.current.scale.set(scale, scale, 1)
      ring2Ref.current.material.opacity = 1 - (scale - 1) / 0.3
    }
  })

  return (
    <group position={position}>
      {/* Sensor body */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
      {/* Pulse rings */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.15, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.15, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function DataStreams() {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i < 50; i++) {
      pts.push(new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 5
      ))
    }
    return pts
  }, [])

  return (
    <group>
      {points.map((point, i) => (
        <DataParticle key={i} position={point} delay={i * 0.1} />
      ))}
    </group>
  )
}

function DataParticle({ position, delay }: { position: THREE.Vector3; delay: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const initialY = position.y

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = initialY + Math.sin(state.clock.elapsedTime + delay) * 0.5
      const opacity = (Math.sin(state.clock.elapsedTime * 2 + delay) + 1) / 2
      ;(ref.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.6
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
    </mesh>
  )
}

function GridFloor() {
  return (
    <group position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper args={[20, 40, "#ff6b35", "#1a1a2e"]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

export function TankerScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [5, 3, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0a0a12"]} />
        <fog attach="fog" args={["#0a0a12", 8, 25]} />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-3, 2, 0]} intensity={0.5} color="#ff6b35" />
        <pointLight position={[3, 2, 0]} intensity={0.5} color="#00d4ff" />
        
        <Tanker />
        <DataStreams />
        <GridFloor />
        <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={1} />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
