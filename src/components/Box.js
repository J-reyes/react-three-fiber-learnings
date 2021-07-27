import {
  useFrame,
  useLoader,
} from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

const Box = (props) => {
  // reference the box
  const boxRef = useRef();
  // to add textures
  const texture = useLoader(THREE.TextureLoader, "/wood.jpeg");
  // used to animate box
  useFrame((state) => {
    boxRef.current.rotation.y += 0.01;
    boxRef.current.rotation.x += 0.01;
  });

  const handlePointDown = (e) => {
    // save mesh to window
    // dont do this wit production code
    e.object.active = true;

    // if there is an active mesh scale it down
    if (window.activeMesh) {
      scaleDown(window.activeMesh);
    }
    window.activeMesh = e.object;
  };

  const handlePointerEnter = (e) => {
    e.object.scale.x = 1.5;
    e.object.scale.y = 1.5;
    e.object.scale.z = 1.5;
  };

  const handlePointerLeave = (e) => {
    // if its active it wont scale down
    if (!e.object.active) {
      scaleDown(e.object);
    }
  };

  const scaleDown = (object) => {
    object.scale.x = 1;
    object.scale.y = 1;
    object.scale.z = 1;
  };

  return (
    <mesh
      ref={boxRef}
      {...props}
      castShadow
      // receiveShadow
      onPointerDown={handlePointDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <boxBufferGeometry />
      <meshPhysicalMaterial map={texture} />
    </mesh>
  );
};

export default Box;