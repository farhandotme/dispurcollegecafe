"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { Physics, useBox } from "@react-three/cannon";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
type CoffeeSceneProps = {
  beanSize?: [number, number];
  scale?: number;   // NEW prop: overall scale for 3D model
};

type BeanData = {
  id: number;
  position: [number, number, number];
};
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const MAX_BEANS = isMobile ? 200 : 300;
const BURST_HORIZONTAL_SPEED = 0.1; // X & Z axis – sideways splash
const BURST_VERTICAL_SPEED = 0.1;   // Y axis – upward splash
const ON_MOBILE_SPAWN_TIME: number = 1500;
const BOUNCE_INTENSITY = 16; // global bounce velocity, tweak this to adjust bounce height
const ON_PC_SPAWN_TIME: number = 1200;
const SPAWN_INTERVAL = isMobile ? ON_MOBILE_SPAWN_TIME : ON_PC_SPAWN_TIME;
const BLAST_RATE: [radius: number, widthSegments: number, heightSegments: number] = [0.08, 1, 1];
type BurstPiece = THREE.Mesh & {
  userData: {
    velocity: THREE.Vector3;
    life: number;
  };
};

// --- Burst system hook ---
function useBurstSystem() {
  const groupRef = useRef<THREE.Group>(null);

  // Helper to create burst piece with correct typing and userData
  function createBurstPiece(material: THREE.Material): BurstPiece {
    const geometry = new THREE.SphereGeometry(...BLAST_RATE); // slightly bigger burst pieces
    const mesh = new THREE.Mesh(geometry, material) as unknown as BurstPiece;
    mesh.userData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * BURST_HORIZONTAL_SPEED,
        Math.random() * BURST_VERTICAL_SPEED,
        (Math.random() - 0.5) * BURST_HORIZONTAL_SPEED
      ),
      life: 1,
    };
mesh.userData.velocity.y -= 0.01; // instead of 0.02
    // Make sure burst pieces are visible and not culled
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((mat) => {
        mat.transparent = true;
        mat.opacity = 1;
      });
    } else {
      mesh.material.transparent = true;
      mesh.material.opacity = 1;
    }
    mesh.frustumCulled = false;

    return mesh;
  }

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child) => {
      const mesh = child as BurstPiece;
      mesh.position.add(mesh.userData.velocity);
      mesh.userData.velocity.y -= 0.02; // gravity
      mesh.scale.multiplyScalar(0.95);

      const mat = mesh.material as THREE.MeshPhongMaterial | THREE.MeshPhongMaterial[];
      if (Array.isArray(mat)) {
        mat.forEach((m) => {
          if (!m.transparent) m.transparent = true;
          m.opacity -= 0.02;
        });
      } else {
        if (!mat.transparent) mat.transparent = true;
        mat.opacity -= 0.02;
      }

      if (
        (Array.isArray(mat) && mat.every((m) => m.opacity <= 0)) ||
        (!Array.isArray(mat) && mat.opacity <= 0)
      ) {
        groupRef.current?.remove(mesh);
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });
  });

  const addBurst = (position: THREE.Vector3, original: THREE.Object3D) => {
    if (!groupRef.current) return;

    original.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        let material = child.material;
        if (Array.isArray(material)) {
          material = material.map((mat) => {
            const clone = mat.clone();
            clone.transparent = true;
            clone.opacity = 1;
            return clone;
          }) as unknown as THREE.Material;
        } else {
          material = material.clone();
          material.transparent = true;
          material.opacity = 1;
        }

        const burstPiece = createBurstPiece(material);
        burstPiece.position.copy(position);
        burstPiece.frustumCulled = false;
        if (groupRef.current)
          groupRef.current.add(burstPiece);
      }
    });
  };

  return { groupRef, addBurst };
}



type CoffeeBeanProps = {
  position: [number, number, number];
  size: [number, number];
  scale? : number,
  onRemove: () => void;
  burstOnRemove?: boolean;
  addBurst: (pos: THREE.Vector3, obj: THREE.Object3D) => void;
};
function CoffeeBean({
  position,
  size,
  scale,
  onRemove,
  burstOnRemove = true,
  addBurst,
}: CoffeeBeanProps) {
  const { scene } = useGLTF("/model3d/coffee_bean.gltf");
  const [diffuse, aoMap, specularMap] = useTexture([
    "model3d/textures/coffee_bean_diffuse.png",
    "model3d/textures/coffee_bean_ao.png",
    "model3d/textures/Coffee_DM_01_01_occlusion.png",
  ]);

  const bounceCount = useRef(0);
  const bounceVelocity = useRef(BOUNCE_INTENSITY);

  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [size[0], size[1], size[0]],
    onCollide: () => {
      if (bounceCount.current < 3) {
        // Apply upward velocity for bounce
        api.velocity.set(0, bounceVelocity.current, 0);
        bounceCount.current += 1;
        bounceVelocity.current *= 0.5; // reduce bounce height by half each bounce
      }
    },
  }));

  // Clone scene once for this bean, and replace materials with new ones
  const cloned = useMemo(() => {
    const clonedScene = scene.clone(true);
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: diffuse,
          aoMap,
          metalnessMap : specularMap,
          roughness : 0,
          metalness : 0,
          aoMapIntensity: 1,
        });
      }
    });
    return clonedScene;
  }, [scene, diffuse, aoMap, specularMap]);

  // Lifetime timer between 4-10 seconds per bean
  const timerRef = useRef(0);
  const lifetime = useRef(4 + Math.random() * 6);

  useFrame((_, delta) => {
    timerRef.current += delta;
    if (timerRef.current >= lifetime.current) {
      if (ref.current && burstOnRemove) {
        const pos = new THREE.Vector3();
        ref.current.getWorldPosition(pos);
        addBurst(pos, cloned);
      }
      onRemove();
    }
  });

  // Dispose of cloned geometry/materials on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      cloned.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [cloned]);

  return <primitive object={cloned} ref={ref} scale={scale} />;
}

function Ground() {
  const { viewport } = useThree();
  const bottomY = -viewport.height / 2;

  const [ref] = useBox(() => ({
    type: "Static",
    position: [0, bottomY, 0],
    rotation: [-Math.PI / 2, 0, 0],
    args: [100, 100, 1],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[100, 100, 1]} />
      <meshStandardMaterial transparent opacity={0} />
    </mesh>
  );
}

function TextColliders() {
  const colliders: {
    position: [number, number, number];
    size: [number, number, number];
  }[] = [
      { position: [0, 0.5, 0], size: [5, 0.5, 0.5] },
      { position: [0, 0, 0], size: [5, 0.3, 0.5] },
      { position: [-2, 1, 0], size: [1, 1, 0.5] },
    ];

  return (
    <>
      {colliders.map((col, i) => {
        const [ref] = useBox(() => ({
          type: "Static",
          position: col.position,
          args: col.size,
        }));

        return (
          <mesh key={i} ref={ref}>
            <boxGeometry args={col.size} />
            <meshStandardMaterial transparent opacity={0} />
          </mesh>
        );
      })}
    </>
  );
}

type BurstGroupProps = {
  addBurstRef: React.RefObject<((pos: THREE.Vector3, obj: THREE.Object3D) => void) | null>;
};

function BurstGroup({ addBurstRef }: BurstGroupProps) {
  const { groupRef, addBurst } = useBurstSystem();

  useEffect(() => {
    addBurstRef.current = addBurst;
    return () => {
      addBurstRef.current = null;
    };
  }, [addBurst, addBurstRef]);

  return <group ref={groupRef} />;
}

export default function CoffeeScene({ beanSize = [0.2, 0.2] , scale = 0.2}: CoffeeSceneProps) {
  const [beans, setBeans] = useState<BeanData[]>([]);
  const idRef = useRef(0);

  const addBurstRef = useRef<((pos: THREE.Vector3, obj: THREE.Object3D) => void) | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setBeans((prev) => {
        if (prev.length >= MAX_BEANS) return prev;
        return [
          ...prev,
          {
            id: idRef.current++,
            position: [Math.random() * 4 - 2, 5 + Math.random() * 2, Math.random() * 2 - 1],
          },
        ];
      });
    }, SPAWN_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const handleRemove = (idToRemove: number) => {
    setBeans((prev) => prev.filter((bean) => bean.id !== idToRemove));
  };

  return (
    <>
      <div className="w-full h-screen fixed top-0 left-0 pointer-events-none z-[999]">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight />
          <directionalLight position={[2, 2, 2]} />
          <Suspense fallback={null}>
            <Physics gravity={[0, -9.8, 0]}>
              {beans.map(({ id, position }) => (
                <CoffeeBean
                  key={id}
                  position={position}
                  size={beanSize}
                  scale={scale}
                  onRemove={() => handleRemove(id)}
                  addBurst={(pos, obj) => {
                    addBurstRef.current?.(pos, obj);
                  }}
                />
              ))}
              <Ground />
              <TextColliders />
              <BurstGroup addBurstRef={addBurstRef} />
            </Physics>
          </Suspense>
          <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
        </Canvas>
      </div>
    </>
  );
}
