import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Receptionist from "./pages/Receptionist";
import WaitingRoom from "./pages/WaitingRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receptionist" element={<Receptionist />} />
        <Route path="/waiting-room" element={<WaitingRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
