import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Physics } from "@react-three/cannon";
import Orbit from "./components/Orbit";
import Background from "./components/Background";
import Floor from "./components/Floor";
import Bulb from "./components/Bulb";
import ColorPicker from "./components/ColorPicker";
import Cars from './components/Cars'
import CameraControls from './components/CameraControls'
import CameraButtons from './components/CameraButtons'

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ColorPicker />
      <CameraButtons />
      <Canvas
        shadows
        style={{ background: "black" }}
        camera={{ position: [7, 7, 7] }}
      >
        <CameraControls />
        {/* <fog attach="fog" args={["white", 1, 10]} /> */}
        <ambientLight intensity={0.2} />
        <axesHelper args={[5]} />
        <Bulb position={[0, 3, 0]} />
        <Physics>
          <Cars/>
          <Suspense fallback={null}>
            <Background />
          </Suspense>
          <Orbit />
          <Floor position={[0, -0.5, 0]} />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
