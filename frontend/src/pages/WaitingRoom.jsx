import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

function WaitingRoom() {
  const [patients, setPatients] = useState([]);
  const [averageTime, setAverageTime] = useState(7);

  const fetchQueue = async () => {
    const res = await axios.get("http://localhost:5000/api/patients");
    setPatients(res.data);
  };

  const fetchSetting = async () => {
    const res = await axios.get("http://localhost:5000/api/settings");
    setAverageTime(res.data.averageConsultationTime);
  };

  const playBell = () => {
  const audio = new Audio("/bell.wav");
  audio.play().catch(() => {
    console.log("Sound blocked until user interacts with page");
  });
};

  useEffect(() => {
  fetchQueue();
  fetchSetting();

  socket.on("queueUpdated", () => {
    fetchQueue();
    playBell();
  });

  socket.on("settingsUpdated", fetchSetting);

  return () => {
    socket.off("queueUpdated");
    socket.off("settingsUpdated", fetchSetting);
  };
}, []);

  const servingPatient = patients.find((p) => p.status === "serving");
  const waitingPatients = patients.filter((p) => p.status === "waiting");
  const estimatedWaitTime = waitingPatients.length * averageTime;

  return (
    <div className="min-h-screen bg-green-50 p-6  bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <div className="flex items-center justify-between mb-10">

       <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full
bg-white/10 backdrop-blur-xl border border-emerald-400/30
text-emerald-300 font-semibold shadow-lg">
    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
    Live Sync Active
</div>


      <h1 className="text-center text-6xl font-black mb-8 pb-2 tracking-tight leading-[1.25] bg-gradient-to-r from-pink-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent drop-shadow-lg">
        Patient Waiting Room
      </h1>
       {/* Empty div to balance layout */}
  <div className="w-48"></div>
</div>
    

      <div className="bg-white p-8 rounded-xl shadow text-center mb-6">
        <p className="text-black-800 mb-2">Now Serving</p>

        {servingPatient ? (
          <h2 className="text-7xl font-bold text-green-600">
            Token {servingPatient.tokenNumber}
          </h2>
        ) : (
          <h2 className="text-4xl font-bold text-gray-400">
            No token called yet
          </h2>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">People Waiting</h2>
          <p className="text-5xl font-bold text-blue-600">
            {waitingPatients.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Estimated Wait Time</h2>
          <p className="text-5xl font-bold text-purple-600">
            {estimatedWaitTime} min
          </p>
          <p className="text-gray-500 mt-2">
            Based on {averageTime} min per patient
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Upcoming Tokens</h2>

          {waitingPatients.length === 0 ? (
            <p className="text-gray-500">No upcoming tokens</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {waitingPatients.slice(0, 6).map((patient) => (
                <span
                  key={patient._id}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold"
                >
                  Token {patient.tokenNumber}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;