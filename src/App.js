import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Physics } from "@react-three/cannon";
import Orbit from "./components/Orbit";
import Box from "./components/Box";
import Background from "./components/Background";
import Floor from "./components/Floor";
import Bulb from "./components/Bulb";
import ColorPicker from "./components/ColorPicker";
import Dragable from "./components/Dragable";
import Models from "./components/Models";

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ColorPicker />
      <Canvas
        shadows
        style={{ background: "black" }}
        camera={{ position: [7, 7, 7] }}
      >
        {/* <fog attach="fog" args={["white", 1, 10]} /> */}
        <ambientLight intensity={0.2} />
        <axesHelper args={[5]} />
        <Physics>
          <Dragable>
            <Bulb position={[0, 3, 0]} />
            <Suspense fallback={null}>
              <Models
                path="./tesla_model_3/scene.gltf"
                scale={new Array(3).fill(0.01)}
                position={[4,0.6,0]}
              />
              <Models
                path="./tesla_model_s/scene.gltf"
                scale={new Array(3).fill(0.012)}
                position={[-4,0.2,0]}
              />
            </Suspense>
          </Dragable>
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
