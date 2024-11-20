import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";

const ThreeDModel = ({ onLoadComplete, onMoveCamera }) => {
  const mountRef = useRef(null);
  const cameraRef = useRef(null); // Ref for the camera
  const sceneRef = useRef(null); // Ref for the scene

  useEffect(() => {
    const loadingManager = new THREE.LoadingManager(() => {
      if (onLoadComplete) onLoadComplete();
    });

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 11);
    camera.lookAt(0, 5, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    mountRef.current.appendChild(renderer.domElement);

    const gltfLoader = new GLTFLoader(loadingManager);
    gltfLoader.load("../../public/amor_und_psyche.glb", (gltf) => {
      const model = gltf.scene;
      scene.add(model);
    });

    const cursorLight = new THREE.PointLight(0xffffff, 100, 100);
    scene.add(cursorLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);
    const updateLightPosition = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      cursorLight.position.set(x * 50, y * 50, 10);
      cursorLight.lookAt(0, 5, 0);
    };

    window.addEventListener("mousemove", updateLightPosition);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Expose the moveCamera method
    if (onMoveCamera) {
      onMoveCamera(({ position, lookAt }) => {
        gsap.to(camera.position, {
          x: position.x,
          y: position.y,
          z: position.z,
          duration: 1.5,
        });
        gsap.to(camera, {
          onUpdate: () => {
            camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
          },
          duration: 1.5,
        });
      });
    }

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("mousemove", updateLightPosition);
    };
  }, [onLoadComplete, onMoveCamera]);

  return <div ref={mountRef} />;
};

export default ThreeDModel;
