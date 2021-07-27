import "./App.css";
import {
  Canvas,
  useFrame,
  extend,
  useThree,
  useLoader,
} from "@react-three/fiber";
import { useRef, Suspense } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Face3, Geometry } from "three/examples/jsm/deprecated/Geometry";
import * as THREE from "three";
// extend orbit controls to use it inside of jsx
extend({ OrbitControls, Geometry, Face3 });

const Orbit = () => {
  // destruct
  const { camera, gl } = new useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};

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

const Background = (props) => {
  const { scene } = useThree();
  const texture = useLoader(THREE.TextureLoader, "autoshop.jpeg");
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  return null;
};

const Floor = (props) => {
  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial />
    </mesh>
  );
};

const Bulb = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 20, 10]} />
      <meshPhongMaterial emissive="yellow" />
    </mesh>
  );
};

function App() {
  const handleClick = e => {
    // if no active mesh on window return otherwise change color of active mesh
    if (!window.activeMesh) return;
    window.activeMesh.material.color = new THREE.Color(e.target.style.background)
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div style={{ position: "absolute", zIndex: 1 }}>
        <div
          onClick={handleClick}
          style={{ background: "blue", height: 50, width: 50 }}
        ></div>
        <div
          onClick={handleClick}
          style={{ background: "yellow", height: 50, width: 50 }}
        ></div>
        <div
          onClick={handleClick}
          style={{ background: "white", height: 50, width: 50 }}
        ></div>
      </div>
      <Canvas
        shadows
        style={{ background: "black" }}
        camera={{ position: [7, 7, 7] }}
      >
        {/* <fog attach="fog" args={["white", 1, 10]} /> */}
        <ambientLight intensity={0.2} />
        <Bulb position={[0, 3, 0]} />
        <Suspense fallback={null}>
          <Box position={[-4, 1, 0]} />
        </Suspense>
        <Suspense fallback={null}>
          <Box position={[4, 1, 0]} />
        </Suspense>
        <Suspense fallback={null}>
          <Background />
        </Suspense>
        <Orbit />
        <axesHelper args={[5]} />
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
