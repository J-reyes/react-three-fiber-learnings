import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

const Bulb = (props) => {
  // add godrays to this component
  const ref = useRef();
  const {scene} = useThree()
  // will run aftet the first render
  useEffect(() => {
    // check if there is already a 
    // lights array - if true => push ref(lights array)
    if (scene.lights) scene.lights.push(ref)
    else scene.lights = [ref]
  }, [])

  return (
    <mesh {...props} ref={ref}>
      <pointLight
        castShadow
        shadow-mapSize-height={2 ** 10}
        shadow-mapSize-width={2 ** 10}
        shadow-radiues={10}
      />
      <sphereBufferGeometry args={[0.2, 20, 10]} />
      <meshPhongMaterial emissive="white" />
    </mesh>
  );
};

export default Bulb;
