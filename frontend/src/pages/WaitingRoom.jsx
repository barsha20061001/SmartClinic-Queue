import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

function WaitingRoom() {
  const [patients, setPatients] = useState([]);

  const fetchQueue = async () => {
    const res = await axios.get("http://localhost:5000/api/patients");
    setPatients(res.data);
  };

  useEffect(() => {
    fetchQueue();
     socket.on("queueUpdated", fetchQueue);

  return () => {
    socket.off("queueUpdated", fetchQueue);
  };
  }, []);

  const servingPatient = patients.find((p) => p.status === "serving");
  const waitingPatients = patients.filter((p) => p.status === "waiting");

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Patient Waiting Room
      </h1>

      <div className="bg-white p-8 rounded-xl shadow text-center mb-6">
        <p className="text-gray-500 mb-2">Now Serving</p>

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

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">People Waiting</h2>
          <p className="text-5xl font-bold text-blue-600">
            {waitingPatients.length}
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