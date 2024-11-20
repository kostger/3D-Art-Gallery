import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function Navbar() {
  const navbarRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navbarRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, delay: 1 }
    );
  }, []);

  return (
    <div
      ref={navbarRef}
      className="w-full h-[50px] fixed top-0 left-0 z-10 bg-black"
    >
      <nav>
        <ul className="text-gray-600 flex justify-center gap-16 p-2">
          <li className="hover:text-white">Art</li>
          <li className="hover:text-white">About</li>
          <li className="hover:text-white">Shop</li>
          <li className="hover:text-white">Visit</li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
