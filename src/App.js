import "./App.css";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// extend orbit controls to use it inside of jsx
extend({ OrbitControls });

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
    console.log(boxRef);
    // .current is from the useRef api
    boxRef.current.rotation.x += 0.01;
    boxRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={boxRef} {...props}>
      <boxBufferGeometry />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
};

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas style={{ background: "black" }} camera={{ position: [3, 3, 3] }}>
        <Box position={[-1, -1, 2]} />
        <Orbit />
        <axesHelper args={[5]} />
      </Canvas>
    </div>
  );
}

export default App;
