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
    // console.log(boxRef);
    // .current is from the useRef api
    boxRef.current.rotation.y += 0.01;
    boxRef.current.rotation.x += 0.01;
  });

  return (
    <mesh
      ref={boxRef}
      {...props}
      castShadow
      // receiveShadow
    >
      <boxBufferGeometry />
      <meshPhysicalMaterial map={texture} />
    </mesh>
  );
};

const Background = (props) => {
  const { scene } = useThree()
  const texture = useLoader(THREE.TextureLoader, 'autoshop.jpeg')
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.background = texture
  return null
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
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas
        shadows
        style={{ background: "black" }}
        camera={{ position: [3, 3, 3] }}
      >
        {/* <fog attach="fog" args={["white", 1, 10]} /> */}
        <ambientLight intensity={0.2} />
        <Bulb position={[0, 3, 0]} />
        <Suspense fallback={null}>
          <Box position={[0, 1, 0]} />
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
