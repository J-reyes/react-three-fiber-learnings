import * as THREE from "three";
import { useThree, useLoader } from "@react-three/fiber";

const Background = (props) => {
  const { scene } = useThree();
  const texture = useLoader(THREE.TextureLoader, "autoshop.jpeg");
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  return null;
};

export default Background;
