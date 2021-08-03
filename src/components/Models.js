import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const Model = (props) => {
  const model = useLoader(GLTFLoader, props.path);

  let mixer;
  if (model.animations.length > 0) {
    mixer = new THREE.AnimationMixer(model.scene);
    model.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  // delta - some seconds since the last frame
  useFrame((scene, delta ) => {
    mixer?.update(delta);
  });

  // go through an object and all of its children
  model.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.recieveShadow = true;
      child.material.side = THREE.FrontSide;
    }
  });

  return <primitive object={model.scene} scale={props.scale} />;
};

export default Model;
