import * as THREE from 'three'
// model3: "Capot001_CAR_PAINT_0" 
// models: "object005_bod_0"

const state = {
  activeMesh: {},
  activeMeshName: "Capot001_CAR_PAINT_0",
  cameraPos: new THREE.Vector3(9,2,4),
  // position of our model3
  target: new THREE.Vector3(4,0,0),
  // for camera,
  shouldUpdate: true,
}

export default state;