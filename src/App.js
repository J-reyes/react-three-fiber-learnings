import "./App.css";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Face3, Geometry } from "three/examples/jsm/deprecated/Geometry";
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

  // used to animate box
  useFrame((state) => {
    // console.log(boxRef);
    // .current is from the useRef api
    boxRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={boxRef} {...props} castShadow receiveShadow>
      <boxBufferGeometry />
      <meshPhysicalMaterial color="blue" fog={false}/>
    </mesh>
  );
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
        camera={{ position: [1, 5, 1] }}
      >
        <fog attach='fog' args={['white', 1, 10]}/>
        <ambientLight intensity={0.2} />
        <Bulb position={[0, 3, 0]} />
        <Box position={[0, 1, 0]} />
        <Orbit />
        <axesHelper args={[5]} />
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
