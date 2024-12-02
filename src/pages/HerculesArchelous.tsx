import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import ThreeDModel from "../components/ThreeDModel";
import { HerculesTexts } from "../assets/constants";
import gsap from "gsap";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Coordinates = {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
};

const HerculesArchelous: React.FC = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const currentIndexRef = useRef(0); // Ref to track the current state index

  const moveCameraRef = useRef<(coordinates: Coordinates) => void>();
  const currentTextRef = useRef<HTMLParagraphElement | null>(null);
  const titleRefLeft = useRef<HTMLHeadingElement | null>(null);
  const titleRefRight = useRef<HTMLHeadingElement | null>(null);
  const titleRefCenter = useRef<HTMLHeadingElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  const STATES = [
    {
      key: "HERCULES",
      coordinates: {
        position: new THREE.Vector3(20, -55, 15),
        lookAt: new THREE.Vector3(0, 6, 0),
      },
      text: HerculesTexts.HERCULES,
    },
    {
      key: "ARCHELOUS",
      coordinates: {
        position: new THREE.Vector3(-7, 10, 12),
        lookAt: new THREE.Vector3(0, 6, 0),
      },
      text: HerculesTexts.ARCHELOUS,
    },
    {
      key: "FIGHTING",
      coordinates: {
        position: new THREE.Vector3(100, -80, 80),
        lookAt: new THREE.Vector3(0, 6, 0),
      },
      text: HerculesTexts.STORY_1,
    },
    {
      key: "FIGHTING_2",
      coordinates: {
        position: new THREE.Vector3(100, -80, -40),
        lookAt: new THREE.Vector3(0, 6, 0),
      },
      text: HerculesTexts.STORY_2,
    },
    {
      key: "RESET",
      coordinates: {
        position: new THREE.Vector3(0, 0, 180),
        lookAt: new THREE.Vector3(0, 6, 0),
      },
      text: HerculesTexts.STORY_3,
    },
  ];

  useEffect(() => {
    if (modelLoaded) {
      const animations: gsap.core.Tween[] = [];

      // Fade-in animation
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

      // Cleanup animations on unmount
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
    const currentIndex = currentIndexRef.current; // Get the current index
    handleClick(currentIndex); // Trigger the action for the current index
    currentIndexRef.current = (currentIndex + 1) % STATES.length; // Update the index
  };

  const handlePrevious = () => {
    const currentIndex = currentIndexRef.current; // Get the current index
    handleClick(currentIndex); // Trigger the action for the current index
    currentIndexRef.current =
      (currentIndex - 1 + STATES.length) % STATES.length; // Update the index
  };

  return (
    <div className="relative w-full h-screen">
      <ThreeDModel
        modelName="/hercule_combattant_archelous.glb"
        initialPosition={new THREE.Vector3(0, 0, 180)}
        initialLookAt={new THREE.Vector3(0, 0, 0)}
        initialModelPosition={new THREE.Vector3(-90, -120, 0)}
        onLoadComplete={() => setModelLoaded(true)}
        onMoveCamera={(moveFn) => (moveCameraRef.current = moveFn)}
        lightIntensity={200}
        lightDistance={3}
      />
      {modelLoaded && (
        <>
          <h1
            ref={titleRefLeft}
            className="absolute top-1/4 left-10 text-[40px] text-gray-500  "
          >
            Hercules
          </h1>
          <h1
            ref={titleRefCenter}
            className="absolute top-1/4 left-64 text-[40px] text-gray-500 "
          >
            Fighting
          </h1>
          <h1
            ref={titleRefRight}
            className="absolute top-1/3 left-40 text-[40px] text-gray-500  "
          >
            Archelous
          </h1>
          <p
            ref={(el) => (currentTextRef.current = el)}
            className="absolute bottom-1/4 right-4 w-[300px] text-wrap pt-8 text-gray-500"
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
};

export default HerculesArchelous;
