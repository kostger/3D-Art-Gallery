import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ThreeDModel from "./ThreeDModel";

function Hero() {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const moveCameraRef = useRef(null); // Ref to control the camera movement

  useEffect(() => {
    if (modelLoaded) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 3, delay: 2 }
      );
      gsap.fromTo(
        textRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 3, delay: 4 }
      );
    }
  }, [modelLoaded]);

  const moveCamera = (coordinates) => {
    if (moveCameraRef.current) {
      moveCameraRef.current(coordinates);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {!modelLoaded && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            color: "#fff",
            fontSize: "24px",
          }}
        ></div>
      )}
      <ThreeDModel
        onLoadComplete={() => setModelLoaded(true)}
        onMoveCamera={(moveFn) => (moveCameraRef.current = moveFn)}
      />
      {modelLoaded && (
        <>
          <h1
            ref={titleRef}
            className="absolute top-1/4 left-10 text-[40px] text-gray-500 cursor-pointer hover:text-white "
            onClick={() =>
              moveCamera({
                position: { x: -6, y: 7, z: 2 },
                lookAt: { x: 0, y: 7, z: 0 },
              })
            }
          >
            Amor
          </h1>
          <h1
            ref={titleRef}
            className="absolute top-1/4 left-40 text-[40px] text-gray-500 cursor-pointer  hover:text-white"
            onClick={() =>
              moveCamera({
                position: { x: -10, y: 5, z: 8 },
                lookAt: { x: 0, y: 5, z: 0 },
              })
            }
          >
            und
          </h1>
          <h1
            ref={titleRef}
            className="absolute top-1/3 left-40 text-[40px] text-gray-500 hover:text-white  cursor-pointer"
            onClick={() =>
              moveCamera({
                position: { x: -4, y: 7, z: 4 },
                lookAt: { x: 0, y: 7, z: 0 },
              })
            }
          >
            Psyche
          </h1>
          <p
            ref={textRef}
            className="absolute bottom-1/4 right-4 w-[300px] text-wrap text-gray-500"
          >
            *"Amor und Psyche" (or Cupid and Psyche) is a timeless myth of love
            and trust, originally found in Metamorphoses by the Roman author
            Apuleius. The story narrates the trials of Psyche, a mortal woman
            whose beauty rivals that of Venus, earning the goddess's wrath.
            Psyche's journey leads her to fall in love with Amor (Cupid),
            Venus's son, though their union is tested by secrecy and challenges
            imposed by the gods. It symbolizes the transformative power of love,
            the triumph of perseverance, and the harmony between human emotions
            and divine forces.
          </p>
        </>
      )}
    </div>
  );
}

export default Hero;
