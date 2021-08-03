import {
  useLoader,
  extend
} from "@react-three/fiber";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'

const Model = props => {
  const model = useLoader (
    GLTFLoader,
    props.path
  )
  
  // go through an object and all of its children
  model.scene.traverse(child => {
    if (child.isMesh) {
      child.castShadow = true;
      child.recieveShadow = true;
      child.material.side = THREE.FrontSide
    }
  })

  return (
    <primitive object={model.scene} scale={props.scale}/>
  )
}

export default Model;