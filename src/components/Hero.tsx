import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const titleRef = useRef(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, delay: 1, duration: 1 }
    );
    gsap.fromTo(
      buttonsRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, delay: 1 }
    );
  }, []);

  return (
    <div className="relative h-screen w-full">
      {/* Fullscreen video */}
      <video
        className="absolute top-0 left-0 w-full h-5/6 object-cover"
        autoPlay
        muted
        loop
      >
        <source
          src="./assets/Louvre Museum Official Website.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <div className="absolute inset-0 p-6 flex flex-col items-center justify-start md:items-start md:justify-center text-white">
        <h1
          ref={titleRef}
          className="text-3xl w-full md:w-1/3 md:text-4xl lg:text-6xl text-wrap"
        >
          Escape with the Louvre
        </h1>
      </div>

      {/* Additional Info */}
      <div
        ref={buttonsRef}
        className="absolute left-0 md:left-auto top-2/4 md:top-1/2 right-0 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 bg-gray-600 bg-opacity-50 text-white p-4 rounded"
      >
        <div>
          <p>Welcome to the Louvre</p>
          <p>The museum is open today</p>
          <p>
            <strong>9:00 AM</strong> → <strong>9:00 PM</strong>
          </p>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Link to={"/tickets"}>
            <button className="bg-teal-500 rounded-2xl p-3 hover:bg-teal-800">
              Book a ticket
            </button>
          </Link>
          <Link to={"/visit"}>
            <button className="bg-white text-black rounded-2xl p-3 hover:bg-gray-500">
              Plan your visit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
