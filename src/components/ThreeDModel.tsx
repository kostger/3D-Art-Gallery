import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
type ThreeDModelProps = {
  lightIntensity: number;
  lightDistance: number;
  modelName: string;
  initialPosition: THREE.Vector3;
  initialLookAt: THREE.Vector3;
  initialModelPosition?: THREE.Vector3; // Add this new prop
  onLoadComplete?: () => void;
  onMoveCamera?: (
    moveFn: (coordinates: {
      position: THREE.Vector3;
      lookAt: THREE.Vector3;
    }) => void
  ) => void;
};

const ThreeDModel: React.FC<ThreeDModelProps> = ({
  lightDistance,
  lightIntensity,
  modelName,
  initialPosition,
  initialLookAt,
  initialModelPosition = new THREE.Vector3(0, 0, 0), // Default to (0, 0, 0)
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
    camera.position.copy(initialPosition);
    camera.lookAt(initialLookAt);
    cameraRef.current = camera;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const cursorLight = new THREE.PointLight(
      0xffffff,
      lightIntensity,
      100,
      1.7
    );
    scene.add(cursorLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
    scene.add(ambientLight);

    const updateLightPosition = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      cursorLight.position.set(x * 50, y * 50, lightDistance);
    };

    window.addEventListener("mousemove", updateLightPosition);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(modelName, (gltf) => {
      const model = gltf.scene;
      model.position.copy(initialModelPosition); // Set model's initial position
      scene.add(model);

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
  }, [
    lightIntensity,
    lightDistance,
    modelName,
    initialPosition,
    initialLookAt,
    initialModelPosition,
    onLoadComplete,
    onMoveCamera,
  ]);

  return <div ref={mountRef} />;
};

export default ThreeDModel;
