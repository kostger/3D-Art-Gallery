import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ThreeDModel from "../components/ThreeDModel";
import { TEXTS } from "../assets/constants";
import * as THREE from "three";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Coordinates = {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
};

function AmorPsyche() {
  const titleRefLeft = useRef<HTMLHeadingElement | null>(null);
  const titleRefRight = useRef<HTMLHeadingElement | null>(null);
  const titleRefCenter = useRef<HTMLHeadingElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const currentTextRef = useRef<HTMLParagraphElement | null>(null);
  const moveCameraRef = useRef<(coordinates: Coordinates) => void>(null!);
  const currentIndexRef = useRef(0); // Track the current state index
  const [modelLoaded, setModelLoaded] = useState(false);

  const STATES = [
    {
      key: "AMOR",
      coordinates: {
        position: new THREE.Vector3(-6, 7, 2),
        lookAt: new THREE.Vector3(0, 7, 0),
      },
      text: TEXTS.AMOR,
    },

    {
      key: "PSYCHE",
      coordinates: {
        position: new THREE.Vector3(-4, 7, 4),
        lookAt: new THREE.Vector3(0, 7, 0),
      },
      text: TEXTS.PSYCHE,
    },
    {
      key: "STORY_1",
      coordinates: {
        position: new THREE.Vector3(1, 1, 8),
        lookAt: new THREE.Vector3(0, 7, 0),
      },
      text: TEXTS.STORY_1,
    },
    {
      key: "STORY_2",
      coordinates: {
        position: new THREE.Vector3(-6, 1, 8),
        lookAt: new THREE.Vector3(0, 7, 0),
      },
      text: TEXTS.STORY_2,
    },
  ];

  useEffect(() => {
    if (modelLoaded) {
      const animations: gsap.core.Tween[] = [];

      // Fade-in animations
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
        ),
        gsap.fromTo(
          buttonsRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 3, delay: 5 }
        )
      );

      return () => animations.forEach((animation) => animation.kill());
    }
  }, [modelLoaded]);

  const handleClick = (index: number) => {
    const { coordinates, text } = STATES[index];
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

  const handleNext = () => {
    const currentIndex = currentIndexRef.current;
    handleClick(currentIndex);
    currentIndexRef.current = (currentIndex + 1) % STATES.length;
  };

  const handlePrevious = () => {
    const currentIndex = currentIndexRef.current;
    handleClick(currentIndex);
    currentIndexRef.current =
      (currentIndex - 1 + STATES.length) % STATES.length;
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
            className="absolute top-1/4 left-10 text-[40px] text-gray-500 "
          >
            Amor
          </h1>
          <h1
            ref={titleRefRight}
            className="absolute top-1/4 left-48 text-[40px] text-gray-500"
          >
            und
          </h1>
          <h1
            ref={titleRefCenter}
            className="absolute top-1/3 left-40 text-[40px] text-gray-500 "
          >
            Psyche
          </h1>
          <p
            ref={(el) => (currentTextRef.current = el)}
            className="absolute bottom-1/4 right-4 w-[300px] text-wrap text-gray-500"
          ></p>
          <div
            ref={buttonsRef}
            className="flex absolute top-2/4 left-40 justify-evenly gap-10 items-center border border-white rounded-3xl px-5"
          >
            <button
              className="text-[40px] text-gray-500 cursor-pointer hover:text-white"
              onClick={handlePrevious}
            >
              <ArrowBackIosIcon />
            </button>
            <button
              className="text-[40px] text-gray-500 cursor-pointer hover:text-white"
              onClick={handleNext}
            >
              <ArrowForwardIosIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AmorPsyche;
