import { useEffect, useRef, useState, RefObject } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

function Navbar() {
  const navbarRef: RefObject<HTMLDivElement> = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, delay: 1 }
      );
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div ref={navbarRef} className="w-full bg-black">
      <nav className="flex flex-col md:flex-row justify-between items-center p-4">
        <Link to={"/"}>
          <h1 className="text-gray-400 text-2xl md:text-4xl hover:text-white">
            Louvre
          </h1>
        </Link>
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={toggleMenu}
        >
          ☰
        </button>
        <ul
          className={`text-gray-400 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 p-2 ${
            isMenuOpen ? "block" : "hidden"
          } md:flex`}
        >
          <li className="hover:text-white">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-white">
            <Link to="/sculptures">Sculptures</Link>
          </li>
          {/* <li className="hover:text-white">
            <Link to="/about">About</Link>
          </li> */}
          <li className="hover:text-white">
            <Link to="/visit">Visit</Link>
          </li>
        </ul>
        <Link to="/tickets">
          <button className="bg-teal-500 rounded-2xl px-4 py-2 text-white hover:bg-teal-800 mt-4 md:mt-0">
            <BookOnlineIcon />
            Tickets
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
