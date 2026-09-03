import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

import earthMap from "@/assets/earth-map.jpg";
import { clamp01, easeInOut, lerp } from "@/lib/scroll";

const TARGET_LAT = 19.077446;
const TARGET_LON = 72.980077;
const DEG = Math.PI / 180;

/** Rotation that brings the given lat/lon toward the camera (+Z). */
function targetRotation() {
  return {
    y: -TARGET_LON * DEG - Math.PI / 2,
    x: TARGET_LAT * DEG,
  };
}

function Globe({ p }: { p: MutableRefObject<number> }) {
  const map = useLoader(THREE.TextureLoader, earthMap);
  const group = useRef<THREE.Group>(null);
  const eased = useRef(0);

  useMemo(() => {
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 4;
  }, [map]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    eased.current += (p.current - eased.current) * (1 - Math.exp(-6 * dt));
    const t = easeInOut(clamp01(eased.current));
    const rot = targetRotation();
    if (group.current) {
      const idle = state.clock.elapsedTime * 0.012 * (1 - t);
      group.current.rotation.y = lerp(rot.y - 1.05, rot.y, t) + idle;
      group.current.rotation.x = lerp(0.12, rot.x, t);
    }
    state.camera.position.z = lerp(6.2, 1.42, t);
    state.camera.position.y = lerp(0.55, 0.0, t);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial map={map} roughness={0.92} metalness={0.02} />
      </mesh>
      {/* atmospheric rim */}
      <mesh scale={1.045}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{ uColor: { value: new THREE.Color("#3d7fa8") } }}
          vertexShader={`
            varying vec3 vNormal;
            void main(){
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }`}
          fragmentShader={`
            uniform vec3 uColor;
            varying vec3 vNormal;
            void main(){
              float i = pow(0.72 - dot(vNormal, vec3(0.0,0.0,1.0)), 2.6);
              gl_FragColor = vec4(uColor, clamp(i,0.0,1.0) * 0.75);
            }`}
        />
      </mesh>
    </group>
  );
}

function Satellite({ p }: { p: MutableRefObject<number> }) {
  const orbit = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    if (orbit.current) {
      orbit.current.rotation.y = t * 0.13;
      orbit.current.rotation.z = 0.32;
      const fade = 1 - clamp01((p.current - 0.16) / 0.14);
      orbit.current.scale.setScalar(Math.max(0.0001, fade));
      orbit.current.visible = fade > 0.02;
    }
    if (body.current) body.current.rotation.y += dt * 0.25;
  });

  return (
    <group ref={orbit}>
      <group ref={body} position={[1.85, 0.35, 0]} scale={0.085}>
        <mesh>
          <boxGeometry args={[1, 0.72, 0.72]} />
          <meshStandardMaterial color="#c9d3da" metalness={0.7} roughness={0.35} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 1.55, 0, 0]}>
            <boxGeometry args={[2, 0.02, 0.78]} />
            <meshStandardMaterial
              color="#16324a"
              metalness={0.6}
              roughness={0.25}
              emissive="#0d2233"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
        <mesh position={[0, -0.62, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.42, 0.6, 20, 1, true]} />
          <meshStandardMaterial
            color="#9fb0ba"
            metalness={0.5}
            roughness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.7, 6]} />
          <meshStandardMaterial color="#8d9aa3" />
        </mesh>
      </group>
    </group>
  );
}

export default function EarthScene({ progressRef }: { progressRef: MutableRefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.55, 6.2], fov: 42 }}
    >
      <color attach="background" args={["#08090d"]} />
      <ambientLight intensity={0.16} />
      <directionalLight position={[-4, 2.2, 3.2]} intensity={2.6} color="#eaf2ff" />
      <directionalLight position={[3, -1, -2]} intensity={0.25} color="#2b5f8a" />
      <Stars radius={80} depth={40} count={2600} factor={2.6} saturation={0} fade speed={0.4} />
      <Suspense fallback={null}>
        <Globe p={progressRef} />
      </Suspense>
      <Satellite p={progressRef} />
    </Canvas>
  );
}
