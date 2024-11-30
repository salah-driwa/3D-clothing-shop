import  { useRef } from 'react'

import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
    const shadows = useRef();
  
    return (
      <AccumulativeShadows
        ref={shadows}
        temporal
        frames={60}
        alphaTest={0.85}
        scale={15} // Adjust the scale for a larger backdrop
        rotation={[Math.PI / 2, 0, 0]} // Keeps it flat
        position={[0, -0.5, -0.50]} // Positioned under the model
      >
        <RandomizedLight
          amount={8}
          radius={10}
          intensity={1.2}
          ambient={0.6}
          position={[5, 10, 5]}
          bias={-0.01}
        />
        <RandomizedLight
          amount={4}
          radius={7}
          intensity={0.8}
          ambient={0.5}
          position={[-5, 10, -5]}
          bias={-0.01}
        />
      </AccumulativeShadows>
    );
  };

export default Backdrop