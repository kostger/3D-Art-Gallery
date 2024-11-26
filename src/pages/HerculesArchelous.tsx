import React, { useState, useRef } from "react";
import * as THREE from "three";
import ThreeDModel from "../components/ThreeDModel";

type Coordinates = {
  position: { x: number; y: number; z: number };
  lookAt: { x: number; y: number; z: number };
};

const HerculesArchelous: React.FC = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const moveCameraRef = useRef<(coordinates: Coordinates) => void | null>(null);
  const currentTextRef = useRef<HTMLParagraphElement | null>(null);

  const TEXTS = {
    HERCULES: "Hercules: The hero of Greek mythology.",
    ARCHELOUS: "Archelous: The river god and adversary of Hercules.",
  };

  const COORDINATES: Record<string, Coordinates> = {
    HERCULES: {
      position: { x: 2, y: 6, z: 10 },
      lookAt: { x: 0, y: 6, z: 0 },
    },
    ARCHELOUS: {
      position: { x: -5, y: 4, z: 8 },
      lookAt: { x: 0, y: 5, z: 0 },
    },
  };

  const handleClick = (text: string, coordinates: Coordinates) => {
    if (currentTextRef.current) {
      currentTextRef.current.textContent = text;
    }

    if (moveCameraRef.current) {
      moveCameraRef.current(coordinates);
    }

    gsap.fromTo(
      currentTextRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 3, delay: 1.5 }
    );
  };

  return (
    <div className="relative w-full h-screen">
      <ThreeDModel
        modelName="/hercule_combattant_archelous.glb" // Replace with the path to your GLTF model
        initialPosition={new THREE.Vector3(0, 0, 180)}
        initialLookAt={new THREE.Vector3(0, 0, 0)}
        initialModelPosition={new THREE.Vector3(-90, -120, 0)}
        onLoadComplete={() => setModelLoaded(true)}
        onMoveCamera={(moveFn) => (moveCameraRef.current = moveFn)}
      />
      {modelLoaded && (
        <>
          <h1
            className="absolute top-1/4 left-10 text-[40px] text-gray-500 cursor-pointer hover:text-white"
            onClick={() => handleClick(TEXTS.HERCULES, COORDINATES.HERCULES)}
          >
            Hercules
          </h1>
          <h1
            className="absolute top-1/4 left-40 text-[40px] text-gray-500 cursor-pointer hover:text-white"
            onClick={() => handleClick(TEXTS.ARCHELOUS, COORDINATES.ARCHELOUS)}
          >
            Archelous
          </h1>
          <p
            ref={(el) => (currentTextRef.current = el)}
            className="absolute bottom-1/4 right-4 w-[300px] text-wrap text-gray-500"
          ></p>
        </>
      )}
    </div>
  );
};

export default HerculesArchelous;
