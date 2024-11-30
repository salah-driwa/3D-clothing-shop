import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const HeroSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-1.5, 1, 5);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // White light, intensity 0.5
    scene.add(ambientLight);

    // Spotlight
    const spotlight = new THREE.PointLight(0xffffff, 10);
    spotlight.position.set(0, 2, 3);
    scene.add(spotlight);

    // Reference for the 3D model
    let model = null;

    // Load 3D Model
    const loader = new GLTFLoader();
    loader.load(
      "./3dassets/rock_jacket_mid-poly.glb", // Replace with your model path
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
      },
      undefined,
      (error) => console.error("Error loading model", error)
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the model if it's loaded
      if (model) {
        model.rotation.y += 0.001; // Adjust the speed as needed
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mouse light tracking with reset
    let mouseActive = false;
    const originalSpotlightPosition = { x: 0, y: 2, z: 3 };

    const handleMouseMove = (event) => {
      mouseActive = true;
      const rect = canvas.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      spotlight.position.x = mouseX * 6; // Adjust the factor for range
      spotlight.position.y = mouseY * 6; // Adjust the factor for range
    };

    const handleMouseLeave = () => {
      mouseActive = false;
    };

    const smoothReturn = () => {
      if (!mouseActive) {
        spotlight.position.x += (originalSpotlightPosition.x - spotlight.position.x) * 0.1;
        spotlight.position.y += (originalSpotlightPosition.y - spotlight.position.y) * 0.1;
      }
      requestAnimationFrame(smoothReturn);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    smoothReturn();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }} className="flex">
      {/* Left Section with Text and Button */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "5%",
          transform: "translateY(-50%)",
          color: "white",
          textAlign: "left",
          zIndex: 10,
        }}
      >
        <h1 style={{ fontSize: "3rem", margin: 0 }}>Discover 3D Fashion</h1>
        <p style={{ fontSize: "1.2rem", margin: "10px 0" }}>Virtual try-on with cutting-edge technology</p>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#ff0000",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => alert("Buy Now Clicked!")}
        >
          Buy Now
        </button>
      </div>

      {/* Canvas for 3D Scene */}
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default HeroSection;
