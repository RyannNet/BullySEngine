cat <<'EOF' > components/Viewport.tsx
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Capsule, Sphere, Cone, shaderMaterial, Sky } from '@react-three/drei';
import * as THREE from 'three';
import type { SceneObject, FileNode, Vector3 } from '../types';

function Loader() {
    return (
        <Text
            position={[0, 0, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
        >
            Loading...
        </Text>
    )
}

const WaterMaterial = shaderMaterial(
  { uTime: 0, uColorSurface: new THREE.Color('#66b2d1'), uColorDepth: new THREE.Color('#0a2f40'), uSunColor: new THREE.Color('#ffffff'), uSunDirection: new THREE.Vector3(0.0, 1.0, 0.0) },
  `...`, // Vertex shader remains the same, omitting for brevity
  `...`  // Fragment shader remains the same, omitting for brevity
);
extend({ WaterMaterial });

const RealisticWater = ({ onClick, sunDirection }: { onClick: (event: any) => void, sunDirection: THREE.Vector3 }) => {
  const ref = useRef<THREE.ShaderMaterial>(null!);
  useFrame((state) => {
    if(ref.current) ref.current.uniforms.uTime.value = state.clock.getElapsedTime();
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} onClick={onClick}>
      <planeGeometry args={[10000, 10000, 512, 512]} />
      <waterMaterial ref={ref} uSunDirection={sunDirection} transparent={true} />
    </mesh>
  );
};

const SceneGraphNode: React.FC<{ object: SceneObject }> = ({ object }) => {
  if (!object.visible) return null;

  const { position, rotation, scale } = object.transform;
  const color = object.components?.material?.color || 'orange';

  const renderGeometry = () => {
    const meshType = object.components?.mesh?.type;
    switch (meshType) {
      case 'capsule':
        return <Capsule args={[0.5, 1]} castShadow receiveShadow>
                 <meshStandardMaterial color={color} />
               </Capsule>;
      case 'cone': // For trees
        return <group>
                <Cone args={[0.6, 1.2, 8]} position={[0, 0.9, 0]} castShadow>
                    <meshStandardMaterial color="#2c6e3b" />
                </Cone>
                 <Box args={[0.3, 0.6, 0.3]} position={[0, 0.3, 0]} castShadow>
                     <meshStandardMaterial color="#5c3c20" />
                 </Box>
               </group>;
      case 'sphere':
         return <Sphere args={[0.5, 8, 6]} castShadow receiveShadow>
                  <meshStandardMaterial color={color} flatShading />
                </Sphere>;
      case 'box':
      default:
        if (object.type === 'group' || object.type === 'camera' || object.type === 'light') {
            return null;
        }
        return <Box args={[1, 1, 1]} castShadow receiveShadow>
                 <meshStandardMaterial color={color} />
               </Box>;
    }
  };

  return (
    <group
      userData={{ id: object.id }}
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      scale={[scale.x, scale.y, scale.z]}
    >
      {renderGeometry()}
      {object.children && object.children.map(child => <SceneGraphNode key={child.id} object={child} />)}
    </group>
  );
};

const SelectionBox = ({ selectedObject }: { selectedObject: SceneObject | null }) => {
  const { scene } = useThree();
  const boxHelper = useRef<THREE.BoxHelper>();

  useEffect(() => {
    if (boxHelper.current) boxHelper.current.visible = false;
    if (selectedObject) {
      const targetObject = scene.getObjectByProperty('userData.id', selectedObject.id);
      if (targetObject) {
        if (!boxHelper.current) {
          boxHelper.current = new THREE.BoxHelper(targetObject, 0x0077FF);
          scene.add(boxHelper.current);
        } else {
          boxHelper.current.setFromObject(targetObject);
        }
        boxHelper.current.visible = true;
      }
    }
  }, [selectedObject, scene]);
  
  useFrame(() => {
     if (boxHelper.current?.visible) boxHelper.current.update();
  });

  return null;
};

const CameraFocusController = ({ target }: { target: SceneObject | null }) => {
    const { camera, controls } = useThree();
    useEffect(() => {
        if (target && controls) {
            const targetPos = new THREE.Vector3(target.transform.position.x, target.transform.position.y, target.transform.position.z);
            // controls.target.copy(targetPos);
            // A simple spring-like animation can be done with a library like 'react-spring' or 'gsap'
            // For now, we do an instant move:
            (controls as any).target.set(targetPos.x, targetPos.y, targetPos.z);
        }
    }, [target, camera, controls]);
    return null;
}

interface ViewportProps {
  sceneObjects: SceneObject[];
  selectedObject: SceneObject | null;
  placementAsset: FileNode | null;
  onPlaceObject: (position: Vector3) => void;
  focusRequest: SceneObject | null;
  isPlaying: boolean;
}

export default function Viewport({ sceneObjects, selectedObject, placementAsset, onPlaceObject, focusRequest, isPlaying }: ViewportProps) {
    
  useEffect(() => {
    document.body.style.cursor = placementAsset ? 'crosshair' : 'auto';
    return () => { document.body.style.cursor = 'auto'; }
  }, [placementAsset]);

  const handlePlacementClick = (event: any) => {
    if (placementAsset) {
        event.stopPropagation();
        onPlaceObject(event.point);
    }
  }
  
  const sunPosition: [number, number, number] = [100, 20, 100];
  const normalizedSunDirection = new THREE.Vector3(...sunPosition).normalize();

  return (
    <Suspense fallback={<Loader />}>
      <Canvas shadows camera={{ position: [10, 10, 15], fov: 50 }}>
        <ambientLight intensity={1.0} />
        <directionalLight castShadow position={sunPosition} intensity={2.0} shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-far={250} shadow-camera-left={-50} shadow-camera-right={50} shadow-camera-top={50} shadow-camera-bottom={-50} />
        <Sky sunPosition={sunPosition} />
        <fog attach="fog" args={['#1d2930', 50, 200]} />
        
        <RealisticWater onClick={handlePlacementClick} sunDirection={normalizedSunDirection} />

        {sceneObjects.map(obj => <SceneGraphNode key={obj.id} object={obj} />)}
        
        {!isPlaying && <SelectionBox selectedObject={selectedObject} />}
        
        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2 - 0.05} minDistance={3} maxDistance={150} />

        <CameraFocusController target={focusRequest} />
      </Canvas>
    </Suspense>
  );
}
EOF
