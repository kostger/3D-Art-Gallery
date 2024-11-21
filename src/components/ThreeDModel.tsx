import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";

type ThreeDModelProps = {
  onLoadComplete?: () => void;
  onMoveCamera?: (
    moveFn: (coordinates: {
      position: THREE.Vector3;
      lookAt: THREE.Vector3;
    }) => void
  ) => void;
};

const ThreeDModel: React.FC<ThreeDModelProps> = ({
  onLoadComplete,
  onMoveCamera,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;

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

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const cursorLight = new THREE.PointLight(0xffffff, 100, 100);
    scene.add(cursorLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
    scene.add(ambientLight);
    const updateLightPosition = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      cursorLight.position.set(x * 50, y * 50, 10);
      cursorLight.lookAt(0, 5, 0);
    };

    window.addEventListener("mousemove", updateLightPosition);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/amor_und_psyche.glb", (gltf) => {
      scene.add(gltf.scene);
      if (onLoadComplete) onLoadComplete();
    });

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    if (onMoveCamera) {
      onMoveCamera(({ position, lookAt }) => {
        gsap.to(camera.position, { ...position, duration: 1.5 });
        gsap.to(
          {},
          {
            onUpdate: () => camera.lookAt(lookAt.x, lookAt.y, lookAt.z),
            duration: 1.5,
          }
        );
      });
    }

    return () => {
      renderer.dispose();
      scene.traverse((object) => {
        if ((object as THREE.Mesh).geometry)
          (object as THREE.Mesh).geometry.dispose();
        if ((object as THREE.Mesh).material) {
          const material = (object as THREE.Mesh).material;
          if (Array.isArray(material)) {
            material.forEach((mat) => mat.dispose());
          } else {
            material.dispose();
          }
        }
      });
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [onLoadComplete, onMoveCamera]);

  return <div ref={mountRef} />;
};

export default ThreeDModel;
