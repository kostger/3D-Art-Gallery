import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ThreeDModel from "../components/ThreeDModel";
import { TEXTS } from "../assets/constants";
import * as THREE from "three";

type Coordinates = {
  position: { x: number; y: number; z: number };
  lookAt: { x: number; y: number; z: number };
};

function AmorPsyche() {
  const titleRefLeft = useRef<HTMLHeadingElement | null>(null);
  const titleRefRight = useRef<HTMLHeadingElement | null>(null);
  const titleRefCenter = useRef<HTMLHeadingElement | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const moveCameraRef = useRef<(coordinates: Coordinates) => void | null>(null);
  const currentTextRef = useRef<HTMLParagraphElement | null>(null);

  const COORDINATES: Record<string, Coordinates> = {
    AMOR: {
      position: { x: -6, y: 7, z: 2 },
      lookAt: { x: 0, y: 7, z: 0 },
    },
    UND: {
      position: { x: 1, y: 1, z: 8 },
      lookAt: { x: 0, y: 7, z: 0 },
    },
    PSYCHE: {
      position: { x: -4, y: 7, z: 4 },
      lookAt: { x: 0, y: 7, z: 0 },
    },
  };

  useEffect(() => {
    if (modelLoaded) {
      const animations: gsap.core.Tween[] = [];

      animations.push(
        gsap.fromTo(
          titleRefLeft.current,
          { opacity: 0 },
          { opacity: 1, duration: 3, delay: 2 }
        ),
        gsap.fromTo(
          titleRefRight.current,
          { opacity: 0 },
          { opacity: 1, duration: 3, delay: 3 }
        ),
        gsap.fromTo(
          titleRefCenter.current,
          { opacity: 0 },
          { opacity: 1, duration: 3, delay: 4 }
        )
      );

      const breatheAnimation = (ref: HTMLElement | null) => {
        if (!ref) return;
        animations.push(
          gsap.to(ref, {
            scale: 1.02,
            duration: 1.1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          })
        );
      };

      breatheAnimation(titleRefLeft.current);
      breatheAnimation(titleRefRight.current);
      breatheAnimation(titleRefCenter.current);

      return () => animations.forEach((animation) => animation.kill());
    }
  }, [modelLoaded]);

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
        modelName="/amor_und_psyche.glb"
        initialPosition={new THREE.Vector3(0, 0, 11)}
        initialLookAt={new THREE.Vector3(0, 5, 0)}
        initialModelPosition={new THREE.Vector3(0, 0, 0)}
        onLoadComplete={() => setModelLoaded(true)}
        onMoveCamera={(moveFn) => (moveCameraRef.current = moveFn)}
        lightIntensity={100}
        lightDistance={10}
      />

      {modelLoaded && (
        <>
          <h1
            ref={titleRefLeft}
            className="absolute top-1/4 left-10 text-[40px] text-gray-500 cursor-pointer hover:text-white"
            onClick={() => handleClick(TEXTS.AMOR, COORDINATES.AMOR)}
          >
            Amor
          </h1>
          <h1
            ref={titleRefRight}
            className="absolute top-1/4 left-40 text-[40px] text-gray-500 cursor-pointer hover:text-white"
            onClick={() => handleClick(TEXTS.UND, COORDINATES.UND)}
          >
            und
          </h1>
          <h1
            ref={titleRefCenter}
            className="absolute top-1/3 left-40 text-[40px] text-gray-500 hover:text-white cursor-pointer"
            onClick={() => handleClick(TEXTS.PSYCHE, COORDINATES.PSYCHE)}
          >
            Psyche
          </h1>
          <p
            ref={(el) => (currentTextRef.current = el)}
            className="absolute bottom-1/4 right-4 w-[300px] text-wrap text-gray-500"
          ></p>
        </>
      )}
    </div>
  );
}

export default AmorPsyche;
