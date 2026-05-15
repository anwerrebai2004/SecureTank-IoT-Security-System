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
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.12
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.08
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.06
      glowRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, 0]} scale={0.85}>
        {/* Main Tank Body */}
        <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.82, 2.9, 32, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.95}
            roughness={0.1}
            thickness={0.5}
            ior={1.45}
            chromaticAberration={0.08}
            anisotropy={0.1}
            distortion={0.04}
            distortionScale={0.2}
            temporalDistortion={0.1}
            clearcoat={1}
            attenuationDistance={0.6}
            attenuationColor="#00d4ff"
            color="#0d1b2a"
          />
        </mesh>

        {/* Tank glow effect */}
        <mesh ref={glowRef} position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.88, 3.0, 16, 32]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} />
        </mesh>

        {/* Cab */}
        <mesh position={[2.2, 0.28, 0]}>
          <boxGeometry args={[1, 1.1, 1.4]} />
          <meshPhysicalMaterial color="#111926" metalness={0.95} roughness={0.14} clearcoat={0.75} clearcoatRoughness={0.08} reflectivity={0.8} />
        </mesh>

        {/* Cab windshield */}
        <mesh position={[2.5, 0.54, 0]}>
          <boxGeometry args={[0.1, 0.58, 1.2]} />
          <meshStandardMaterial color="#08e0ff" metalness={0.9} roughness={0.05} emissive="#08e0ff" emissiveIntensity={0.4} transparent opacity={0.85} />
        </mesh>

        {/* Wheels */}
        {[-1.4, -0.55, 0.5, 1.85].map((x, i) => (
          <group key={i} position={[x, -0.32, 0]}>
            <mesh position={[0, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.34, 0.34, 0.22, 32]} />
              <meshPhysicalMaterial color="#0b1118" metalness={0.7} roughness={0.25} />
            </mesh>
            <mesh position={[0, 0, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.34, 0.34, 0.22, 32]} />
              <meshPhysicalMaterial color="#0b1118" metalness={0.7} roughness={0.25} />
            </mesh>
          </group>
        ))}

        {/* IoT Sensors */}
        <IoTSensor position={[-1.15, 1.35, 0]} color="#00ffc3" />
        <IoTSensor position={[0, 1.35, 0.58]} color="#ff7c3f" />
        <IoTSensor position={[0.82, 1.35, -0.5]} color="#3ee8ff" />

        {/* Holographic UI panels */}
        <HologramPanel position={[1.2, 1.1, 0.75]} rotation={[0, -0.35, 0]} color="#0bf" />
        <HologramPanel position={[0.5, 1.05, -0.9]} rotation={[0, 0.35, 0]} color="#2df" />
      </group>
    </Float>
  )
}

function IoTSensor({ position, color }: { position: [number, number, number]; color: string }) {
  const ringRef = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3.5) * 0.22
      ringRef.current.scale.set(scale, scale, 1)
      ;(ringRef.current.material as THREE.MeshBasicMaterial).opacity = 1 - (scale - 1) / 0.2
    }
    if (ring2Ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3.5 + 0.8) * 0.24
      ring2Ref.current.scale.set(scale, scale, 1)
      ;(ring2Ref.current.material as THREE.MeshBasicMaterial).opacity = 1 - (scale - 1) / 0.3
    }
  })

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.85} metalness={0.4} roughness={0.2} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.15, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.18, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.28} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function HologramPanel({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.15, 0.25]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1.05, 0.08]} />
        <meshBasicMaterial color={color} transparent opacity={0.42} />
      </mesh>
      <mesh position={[-0.38, 0.05, 0.01]}>
        <boxGeometry args={[0.24, 0.06, 0.01]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </mesh>
      <mesh position={[0.35, 0.05, 0.01]}>
        <boxGeometry args={[0.26, 0.06, 0.01]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

function DataStreams() {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < 32; i++) {
      pts.push(new THREE.Vector3((Math.random() - 0.5) * 7, Math.random() * 2 + 0.6, (Math.random() - 0.5) * 5))
    }
    return pts
  }, [])

  return (
    <group>
      {points.map((point, i) => (
        <DataParticle key={i} position={point} delay={i * 0.15} />
      ))}
    </group>
  )
}

function DataParticle({ position, delay }: { position: THREE.Vector3; delay: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const initialY = position.y

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 1.8 + delay) * 0.35
      const opacity = (Math.sin(state.clock.elapsedTime * 2.4 + delay) + 1) / 2
      ;(ref.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.65
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
    </mesh>
  )
}

function GridFloor() {
  return (
    <group position={[0, -1.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#070b14" metalness={0.2} roughness={0.75} />
      </mesh>
      <gridHelper args={[24, 36, "#0bf", "#073144"]} position={[0, 0.01, 0]} />
      <mesh position={[0, 0.015, 0]}>
        <planeGeometry args={[28, 28]} />
        <meshBasicMaterial color="#0bf" transparent opacity={0.06} />
      </mesh>
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.12
    state.camera.position.x = Math.sin(t) * 1.1
    state.camera.position.y = 3.4 + Math.sin(t * 0.5) * 0.14
    state.camera.position.z = 6 + Math.cos(t * 0.9) * 0.25
    state.camera.lookAt(0, 0.4, 0)
  })
  return null
}

export function TankerScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [5, 3.4, 6], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#05070f"]} />
        <fog attach="fog" args={["#05070f", 6, 24]} />

        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 8, 3]} intensity={1.1} color="#ffffff" />
        <pointLight position={[-2.5, 1.8, 1.8]} intensity={0.65} color="#00d4ff" />
        <pointLight position={[2.5, 1.8, -1.3]} intensity={0.55} color="#3effcc" />
        <pointLight position={[0, 2.8, -3]} intensity={0.4} color="#ff7c4d" />

        <CameraRig />
        <Tanker />
        <DataStreams />
        <GridFloor />
        <Stars radius={35} depth={40} count={700} factor={2} saturation={0} fade speed={0.7} />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
