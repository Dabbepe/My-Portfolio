import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

function Model({ mode, materialProps }) {
  const mesh = useRef();
  const { viewport } = useThree();
  const pointer = useRef(new THREE.Vector2(0, 0));

  // Global mouse tracker since the canvas has pointerEvents: 'none'
  useEffect(() => {
    const handleMouseMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame((state, delta) => {
    easing.damp3(
      mesh.current.position,
      [(pointer.current.x * viewport.width) / 2, (pointer.current.y * viewport.height) / 2, 0],
      0.15,
      delta
    );
    
    // Add subtle continuous rotation
    mesh.current.rotation.x += delta * 0.5;
    mesh.current.rotation.y += delta * 0.5;
  });

  // Built-in geometries to replace missing .glb files
  let geometry;
  if (mode === 'cube') {
    geometry = <boxGeometry args={[1, 1, 1]} />;
  } else if (mode === 'bar') {
    geometry = <cylinderGeometry args={[0.2, 0.2, 2, 32]} />;
  } else {
    // lens mode (using a flattened sphere to act like a lens)
    geometry = <sphereGeometry args={[1, 64, 64]} />;
  }

  const transmission = materialProps.transmission ?? 1;
  const scale = materialProps.scale || 0.25;

  return (
    <mesh ref={mesh} scale={mode === 'lens' ? [scale, scale, scale * 0.3] : scale}>
      {geometry}
      <MeshTransmissionMaterial 
        {...materialProps} 
        transmission={transmission}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </mesh>
  );
}

export default function FluidGlass({ mode = 'lens', ...props }) {
  const modeProps = props[`${mode}Props`] || {};
  const materialProps = { ...props, ...modeProps };

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      <Suspense fallback={null}>
        <Model mode={mode} materialProps={materialProps} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
