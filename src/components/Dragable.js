import { DragControls } from "three/examples/jsm/controls/DragControls";
import { useRef, useEffect, useState } from "react";
import { extend, useThree } from "@react-three/fiber";
extend({ DragControls });

const Dragable = (props) => {
  // ref to get access to our controlObject
  const controlsRef = useRef();
  const groupRef = useRef();
  const [children, setChildren] = useState([]);
  // orbbit controls on set in the scene
  const { camera, gl, scene } = useThree();

  useEffect(() => {
    console.log(groupRef.current);
    setChildren(groupRef.current.children);
  }, []);

  // is triggered when there is a change in children
  useEffect(() => {
    controlsRef.current.addEventListener(
      "hoveron",
      (e) =>
        // set orbit controls to false to allow us to drag our box
        // without messing with the orbbit controls
        scene.orbitControls.enabled = false
    );
    controlsRef.current.addEventListener(
      "hoveroff",
      (e) =>
        // set back to true once pointer is not hovering 
        scene.orbitControls.enabled = true
    );
  }, [children, scene]);

  return (
    <group ref={groupRef}>
      {/* pass children thhat were set withh useState */}
      <dragControls
        ref={controlsRef}
        args={[children, camera, gl.domElement]}
      />
      {props.children}
    </group>
  );
};

export default Dragable;
