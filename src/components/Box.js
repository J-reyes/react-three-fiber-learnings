import {
  useFrame,
  useLoader,
} from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import * as THREE from "three";
import { useRef } from "react";

const Box = (props) => {
  const [boxRef, api] = useBox(() => ({mass: 1, ...props}))
  // to add textures
  const texture = useLoader(THREE.TextureLoader, "/wood.jpeg");

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
      // add api so we can interact with api events
      api={api}
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