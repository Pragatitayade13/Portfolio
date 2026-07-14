import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

// Interactive floating abstract mesh shape
const AnimatedSphere = () => {
  const meshRef = useRef(null);

  useFrame(({ clock, mouse }) => {
    if (!meshRef.current) return;
    
    // Idle rotation
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.15;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    
    // Subtle cursor based tilt
    meshRef.current.rotation.x += mouse.y * 0.05;
    meshRef.current.rotation.y += mouse.x * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      <Sphere args={[1.5, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color="#9B7CFF"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </mesh>
  );
};

const HeroCanvas = () => {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-5, 5, 5]} intensity={1} />
        
        <AnimatedSphere />
        
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
