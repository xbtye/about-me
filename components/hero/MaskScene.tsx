"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Particle positions computed once at module load — Math.random() is not safe inside useMemo */
const PARTICLE_COUNT = 120;
const PARTICLE_POSITIONS = (() => {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 16;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 3;
  }
  return pos;
})();

/* Particles only — the mask image is rendered in CSS, not WebGL */
function Particles() {
  const { geo, mat } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(PARTICLE_POSITIONS, 3));
    const m = new THREE.PointsMaterial({
      color: new THREE.Color(0xcc0000),
      size: 0.034,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    return { geo: g, mat: m };
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0004;
    ref.current.rotation.x += 0.00015;
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

export default function MaskScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
      aria-hidden="true"
    >
      <Particles />
    </Canvas>
  );
}
