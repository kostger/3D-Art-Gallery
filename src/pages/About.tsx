import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import GitHubIcon from "@mui/icons-material/GitHub";

function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      ref={aboutRef}
      className="min-h-screen w-full flex flex-col justify-start items-center text-white p-8 bg-black"
    >
      <h1 className="text-4xl font-bold mb-4">About This Project</h1>
      <p className="mb-4">
        This project is built using modern web technologies including:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>React</li>
        <li>TypeScript</li>
        <li>Vite</li>
        <li>Three.js</li>
        <li>GSAP</li>
        <li>Tailwind CSS</li>
      </ul>
      <p className="mb-4">
        It showcases a virtual tour of sculptures with interactive 3D models and
        animations.
      </p>
      <a
        href="https://github.com/kostger/3D-Art-Gallery"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-blue-500 hover:underline"
      >
        <GitHubIcon className="mr-2" />
        Source Code
      </a>
    </div>
  );
}

export default About;
