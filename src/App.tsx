import { Routes, Route } from "react-router-dom";
import AmorPsyche from "./pages/AmorPsyche";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import HerculesArchelous from "./pages/HerculesArchelous";
function App() {
  return (
    <>
      <div className="bg-black font-sans">
        <Navbar />
        <Routes>
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
