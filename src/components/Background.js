import { useLoader, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { useMemo } from 'react';

const Background = props => {
    const texture = useLoader(
        THREE.TextureLoader,
        process.env.PUBLIC_URL + '/autoshop.jpeg'
    );

    const { gl } = useThree();
    const formatted = useMemo(() => 
        new THREE.WebGLCubeRenderTarget(
                texture.image.height
        ).fromEquirectangularTexture(gl, texture)
    ,[])

    return (
        <primitive
            attach='background'
            object={formatted.texture}
        />
    )
}

export default Background;


// import * as THREE from "three";
// import { useThree, useLoader } from "@react-three/fiber";

// const Background = (props) => {
//   const { scene } = useThree();
//   const texture = useLoader(THREE.TextureLoader, "autoshop.jpeg");
//   texture.mapping = THREE.EquirectangularReflectionMapping;
//   scene.background = texture;
//   return null;
// };

// export default Background;
