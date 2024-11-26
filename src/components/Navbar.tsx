import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

function Navbar() {
  const navbarRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, delay: 1 }
      );
    }
  }, []);

  return (
    <div
      ref={navbarRef}
      className="w-full h-[50px] fixed top-0 left-0 z-10 bg-black"
    >
      <nav>
        <ul className="text-gray-600 flex justify-center gap-16 p-2">
          <li className="hover:text-white">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-white">
            <Link to="/shop">Sculptures</Link>
          </li>
          <li className="hover:text-white">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-white">
            <Link to="/visit">Visit</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
