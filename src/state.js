import * as THREE from 'three'

const state = {
  activeMesh: null,
  cameraPos: new THREE.Vector3(7,7,7),
  // position of our model3
  target: new THREE.Vector3(4,0,0),
  // for camera,
  shouldUpdate: true,
}

export default state;