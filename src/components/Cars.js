

import { Suspense } from "react";
import Dragable from "./Dragable";
import Models from "./Models";
// for debugging
import BoundingBox from "./BoudingBox";

const Cars = ({}) => {
  return (
    <Suspense fallback={null}>
      <Dragable transformGroup>
        <BoundingBox
          
          position={[4, 4, 0]}
          // bbounty box dimesions
          dims={[3, 2, 6]}
          // moves model forward
          offset={[0, -0.4, 0.8]}
        >
          <Models
            path="./tesla_model_3/scene.gltf"
            scale={new Array(3).fill(0.01)}
          />
        </BoundingBox>
      </Dragable>
      <Dragable transformGroup>
        <BoundingBox
          
          position={[-4, 4, 0]}
          dims={[3, 2, 7.1]}
          offset={[0, -0.8, 0.2]}
        >
          <Models
            path="./tesla_model_s/scene.gltf"
            scale={new Array(3).fill(0.013)}
          />
        </BoundingBox>
      </Dragable>
    </Suspense>
  );
};

export default Cars;
