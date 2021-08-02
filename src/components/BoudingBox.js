import { useBox } from "@react-three/cannon";

const BoundingBox = ({
  position = [0, 0, 0],
  offset = [0, 0, 0],
  // dimensions
  dims = [1, 1, 1],
  visible = false,
  children,
}) => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    args: dims,
    position: position,
  }));

  return (
    <group ref={ref} api={api}>
      <mesh scale={dims} visible={visible}>
        <boxBufferGeometry />
        <meshPhysicalMaterial wireframe />
      </mesh>
      {/* adjust children relative to the bounty box */}
      <group position={offset}>{children}</group>
    </group>
  );
};

export default BoundingBox