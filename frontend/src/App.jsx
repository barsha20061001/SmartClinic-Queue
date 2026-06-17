import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Receptionist from "./pages/Receptionist";
import WaitingRoom from "./pages/WaitingRoom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receptionist" element={<Receptionist />} />
        <Route path="/waiting-room" element={<WaitingRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
