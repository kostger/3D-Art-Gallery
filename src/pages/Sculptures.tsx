import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const sculptures = [
  {
    name: "Amor und Psyche",
    path: "/amor",
    image: "../assets/Amor_und_Psyche.png",
  },
  {
    name: "Hercules Fighting Archelous",
    path: "/hercules",
    image: "../assets/Hercules.png",
  },
  // Add more sculptures here
];

function Sculptures() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const sculpturesRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, duration: 2, x: -50, delay: 1 },
      { opacity: 1, x: 0 }
    );
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, duration: 2, x: -50, delay: 1 },
      { opacity: 1, x: 0 }
    );
    gsap.fromTo(
      sculpturesRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, duration: 1, stagger: 0.5, delay: 1, x: 0 }
    );
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="relative w-full h-[66vh] md:h-[50vh] flex items-center justify-center">
        <img
          src="/assets/les-cariatides.jpg"
          alt="Sculptures"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 flex flex-col items-start justify-center px-20 gap-2">
          <h1 ref={titleRef} className="text-4xl font-bold text-white">
            Sculptures
          </h1>
          <p ref={subtitleRef}>View them like you were in the museum</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sculptures.map((sculpture, index) => (
            <Link
              to={sculpture.path}
              key={sculpture.name}
              className="group"
              ref={(el) => {
                sculpturesRef.current[index] = el;
              }}
            >
              <div className="p-4 rounded-lg shadow-lg transform transition-transform group-hover:scale-105">
                <img
                  src={sculpture.image}
                  alt={sculpture.name}
                  className="w-full h-80 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl">{sculpture.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sculptures;
