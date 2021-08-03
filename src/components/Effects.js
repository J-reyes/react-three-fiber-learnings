import {
  EffectComposer,
  DepthOfField,
  Bloom,
  GodRays,
} from "@react-three/postprocessing";
import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";

const Effects = () => {
  // local state to track lights
  const [lights, setLights] = useState(null);
  const { scene } = useThree();
  useEffect(() => {
    if (scene.lights && scene.lights.length === 3) {
      setLights(scene.lights);
    }
  }, [scene.lights]);
  return lights ? (
    <EffectComposer>
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={0.5}
        height={480}
      />
      {/* go through lights and add a 
      gods array for each one */}
      {lights.map((light) => (
        <GodRays 
          key={light.current.uuid}
          sun={light.current} 
        />
      ))}
    </EffectComposer>
  ) : null;
};

export default Effects;
