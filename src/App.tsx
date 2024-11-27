import { Routes, Route } from "react-router-dom";
import AmorPsyche from "./pages/AmorPsyche";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import HerculesArchelous from "./pages/HerculesArchelous";
import Sculptures from "./pages/Sculptures";
function App() {
  return (
    <>
      <div className="bg-black font-cinzel">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sculptures" element={<Sculptures />} />
          <Route path="/amor" element={<AmorPsyche />} />
          <Route path="/about" element={<About />} />
          <Route path="/hercules" element={<HerculesArchelous />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </>
  );
}

export default App;
