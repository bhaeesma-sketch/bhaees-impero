import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, ContactShadows, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function GoldGeometry({ position, scale, rotationSpeed, geometryType }: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed * 0.2;
      meshRef.current.rotation.y += delta * rotationSpeed * 0.3;
    }
  });

  const Geometry = useMemo(() => {
    switch (geometryType) {
      case 'torus': return <torusGeometry args={[0.8, 0.2, 16, 32]} />;
      case 'octahedron': return <octahedronGeometry args={[1, 0]} />;
      case 'icosahedron': return <icosahedronGeometry args={[1, 0]} />;
      default: return <sphereGeometry args={[1, 32, 32]} />;
    }
  }, [geometryType]);

  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
      position={position}
    >
      <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
        {Geometry}
        <meshPhysicalMaterial
          ref={materialRef}
          color="#FFD700"
          emissive="#553300"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={1}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  const { mouse, viewport, camera } = useThree();

  useFrame((state) => {
    // Parallax effect based on mouse position
    // Normalized mouse x/y is -1 to 1
    const x = (mouse.x * viewport.width) / 10;
    const y = (mouse.y * viewport.height) / 10;

    // Smoothly interpolate camera position
    camera.position.x += (x - camera.position.x) * 0.02;
    camera.position.y += (y - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFD700" />

      <group position={[0, 0, 0]}>
         <GoldGeometry position={[0, 0, 0]} scale={1.5} rotationSpeed={0.5} geometryType="icosahedron" />
         <GoldGeometry position={[-4, 2, -2]} scale={0.8} rotationSpeed={0.3} geometryType="torus" />
         <GoldGeometry position={[4, -2, -3]} scale={1} rotationSpeed={0.4} geometryType="octahedron" />
         <GoldGeometry position={[-3, -3, 1]} scale={0.5} rotationSpeed={0.6} geometryType="sphere" />
         <GoldGeometry position={[3, 3, -1]} scale={0.6} rotationSpeed={0.2} geometryType="sphere" />
      </group>

      <Sparkles count={50} scale={10} size={4} speed={0.4} opacity={0.5} color="#FFD700" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />

      {/* Environment for reflections */}
      <Environment preset="city" />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
        <Scene />
      </Canvas>
      {/* Gradient Overlay to blend with UI */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />
    </div>
  );
}
