import { useFrame } from "@react-three/fiber";
import state from "../state";
import * as THREE from "three";

const CameraControls = ({}) => {
  useFrame(({ camera, scene }) => {
    if (state.shouldUpdate) {
      // interpolates vectors
      camera.position.lerp(state.cameraPos, 0.1);
      // set camera to target one of the models
      scene.orbitControls.target.lerp(state.target, 0.1)

      scene.orbitControls.update();
      // copy so that we dont modify the original vector
      const diff = camera.position.clone().sub(state.cameraPos).length();
      console.log("diff", diff)
      // check if cam pos is = to state cam position
      if (diff < 0.1) state.shouldUpdate = false;
    }
  });

  return null;
};

export default CameraControls;
