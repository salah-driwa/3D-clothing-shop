/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Plane, useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';

import Backdrop from '../assets/Canvas/Backdrop';

// Loading Spinner Component
const Loading = () => (
  <div className="absolute inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
    <div className="loader">Loading...</div>
  </div>
);



const Home = () => {
  const modelSrc = 'https://models.readyplayer.me/673f293b6ac45cca863c0dce.glb';
  const fbxSrc = 'Animation1.fbx'; // Replace with your FBX animation file URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const group = useRef();


  // Load the GLTF model
  const { scene } = useGLTF(modelSrc);

  // Load FBX animations
  const { animations: idleAnimation } = useFBX(fbxSrc);

  if (idleAnimation?.length > 0) {
    idleAnimation[0].name = "Idle"; // Rename the first animation
  }

  // Ground Component
const Ground = () => {
  return (
    <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0, 0]} receiveShadow>
      <meshStandardMaterial color="#444" roughness={0.8}  />
    </Plane>
  );
};


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <div style={{ width: '100%', height: '100vh' }}>
        {loading && <Loading />}
        {error && (
          <div className="absolute inset-0 flex justify-center items-center text-red-500 bg-gray-800 bg-opacity-75 z-50">
            {error}
          </div>
        )}
        <Canvas
          shadows
          camera={{
            position: [-0.4, 1.2, 3],
            rotation: [-0.1, -0.1, -0.1],
            fov: 50,
          }}
        >
          <OrbitControls />
          <ambientLight intensity={0.5} color="#01c1c9" />
          <directionalLight intensity={0.8}></directionalLight>
          <Environment preset="city" />
          <Backdrop />

          {/* Ground and Model */}
          <Ground />

          <ModelWithAnimation
            scene={scene}
            fbxSrc={idleAnimation}
            setLoading={setLoading}
            group={group}
            setError={setError}
          />
        </Canvas>
      </div>
    </motion.div>
  );
};

// Model and Animation Component
const ModelWithAnimation = ({ scene, fbxSrc,group, setLoading  }) => {
  console.log(scene)
  console.log(fbxSrc)
  // Set up animations
  const { actions } = useAnimations(fbxSrc, group);
  console.log(actions)
//
 //
  useEffect(() => {
   
      actions["Idle"].reset().play()
      setLoading(false); // Stop loading spinner once animation starts
  
  }, [actions]);
//
  return (
    <group ref={group} castShadow >
      <primitive
        object={scene}
        castShadow

        onPointerMissed={() => console.log('Clicked outside the model')}
      />
    </group>
  );
};



export default Home;
