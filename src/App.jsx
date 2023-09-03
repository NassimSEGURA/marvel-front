import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import des pages
import LogoAnimation from "./pages/LogoAnimation";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import CharacterDetails from "./pages/CharacterDetails";
import Comics from "./pages/Comics";
import ComicDetails from "./pages/ComicDetails";
import Favoris from "./pages/Favoris";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoAnimation />} />
        <Route path="/home" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:characterId" element={<CharacterDetails />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comic/:comicId" element={<ComicDetails />} />
        <Route path="/favoris" element={<Favoris />} />
      </Routes>
    </Router>
  );
}

export default App;
