import { extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

const Orbit = () => {
  // destruct
  const { camera, gl } = new useThree();
  return <orbitControls attach='orbitControls' args={[camera, gl.domElement]} />;
};

export default Orbit;