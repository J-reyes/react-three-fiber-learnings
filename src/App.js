import "./App.css";
import { Canvas, useFrame } from "react-three-fiber";
import { useRef } from "react";

const Box = () => {
  // reference the box
  const boxRef = useRef();

  // used to animate box
  useFrame((state) => {
    console.log(boxRef)
    // .current is from the useRef api
    boxRef.current.rotation.x += 0.01;
    boxRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={boxRef}>
      <boxBufferGeometry />
      <meshBasicMaterial color="blue"/>
    </mesh>
  );
};

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas style={{ background: "black" }}>
        <Box />
      </Canvas>
    </div>
  );
}

export default App;
