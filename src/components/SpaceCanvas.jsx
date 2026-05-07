import { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useApp, CM } from '../context/AppContext';

// ─── Single Box Object ─────────────────────────────────────────────────────
function BoxObject({ obj, isSelected, onSelect }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const aw = obj.w * CM;
  const ad = obj.d * CM;
  const ah = obj.h * CM;

  // Subtle floating animation for selected box
  useFrame(({ clock }) => {
    if (groupRef.current && isSelected) {
      groupRef.current.position.y = ah / 2 + Math.sin(clock.elapsedTime * 2) * 0.01;
    }
  });

  const initialPos = obj.position || obj.slot;

  return (
    <group
      ref={groupRef}
      position={[initialPos.x, ah / 2, initialPos.z]}
      onPointerDown={(e) => {
        e.stopPropagation();
        onSelect(obj.id);
        setIsDragging(true);
        dragStart.current = { x: e.point.x, y: e.point.z };
        e.target.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!isDragging) return;
        e.stopPropagation();
        const dx = e.point.x - dragStart.current.x;
        const dz = e.point.z - dragStart.current.y;
        if (groupRef.current) {
          groupRef.current.position.x += dx * 0.5;
          groupRef.current.position.z += dz * 0.5;
        }
        dragStart.current = { x: e.point.x, y: e.point.z };
      }}
      onPointerUp={(e) => {
        setIsDragging(false);
        e.target.releasePointerCapture(e.pointerId);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Solid face */}
      <mesh>
        <boxGeometry args={[aw, ah, ad]} />
        <meshPhongMaterial
          color={obj.color}
          transparent
          opacity={isSelected ? 0.85 : hovered ? 0.78 : 0.68}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <boxGeometry args={[aw, ah, ad]} />
        <meshBasicMaterial color={obj.color} wireframe />
      </mesh>

      {/* Selection ring */}
      {isSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -ah / 2 + 0.001, 0]}>
          <ringGeometry args={[Math.max(aw, ad) * 0.6, Math.max(aw, ad) * 0.7, 32]} />
          <meshBasicMaterial color={obj.color} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Dimension label */}
      <Html
        position={[0, ah / 2 + 0.06, 0]}
        center
        distanceFactor={3}
        style={{ pointerEvents: 'none' }}
      >
        <div className="whitespace-nowrap rounded-md bg-black/70 px-2 py-0.5 font-[var(--font-display)] text-[9px] text-white backdrop-blur-sm">
          {obj.name} · {obj.w}×{obj.d}×{obj.h}
        </div>
      </Html>
    </group>
  );
}

// ─── Grid & Floor ──────────────────────────────────────────────────────────
function SceneGrid() {
  return (
    <group>
      <gridHelper args={[3, 12, '#4A9EFF', '#1E3A5F']}
        material-transparent={true}
        material-opacity={0.55}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial color="#080C18" transparent opacity={0.28} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ─── Main Canvas Component ─────────────────────────────────────────────────
export default function SpaceCanvas() {
  const { state, dispatch } = useApp();

  const handleSelect = useCallback((id) => {
    dispatch({ type: 'SELECT_OBJECT', payload: id });
  }, [dispatch]);

  return (
    <div className="pointer-events-auto fixed inset-0 z-[1]">
      <Canvas
        camera={{
          fov: 60,
          near: 0.01,
          far: 100,
          position: [0, 2.5, 1.5],
        }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, -0.5);
        }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 5, 2]} intensity={0.5} />

        {/* Grid */}
        <SceneGrid />

        {/* Placed Objects */}
        {state.objects.map(obj => (
          <BoxObject
            key={obj.id}
            obj={obj}
            isSelected={obj.id === state.selectedId}
            onSelect={handleSelect}
          />
        ))}
      </Canvas>
    </div>
  );
}
