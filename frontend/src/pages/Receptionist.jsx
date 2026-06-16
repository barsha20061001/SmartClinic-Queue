import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

function Receptionist() {
  const [name, setName] = useState("");
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

  const addPatient = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter patient name");
      return;
    }

    await axios.post("http://localhost:5000/api/patients", { name });
    setName("");
    fetchQueue();
  };

  const callNext = async () => {
    try {
      await axios.patch("http://localhost:5000/api/patients/call-next");
      fetchQueue();
    } catch {
      alert("No patients waiting in queue");
    }
  };

  const completeCurrent = async () => {
    try {
      await axios.patch("http://localhost:5000/api/patients/complete-current");
      fetchQueue();
    } catch {
      alert("No patient is currently serving");
    }
  };

  const updateAverageTime = async () => {
    await axios.patch("http://localhost:5000/api/settings", {
      averageConsultationTime: averageTime,
    });

    alert("Average consultation time updated");
  };

  const clearQueue = async () => {
    const confirmClear = confirm("Are you sure you want to clear the full queue?");
    if (!confirmClear) return;

    await axios.delete("http://localhost:5000/api/patients/clear");
    fetchQueue();
  };

  useEffect(() => {
    fetchQueue();
    fetchSetting();

    socket.on("queueUpdated", fetchQueue);
    socket.on("settingsUpdated", fetchSetting);

    return () => {
      socket.off("queueUpdated", fetchQueue);
      socket.off("settingsUpdated", fetchSetting);
    };
  }, []);

  const waitingPatients = patients.filter((p) => p.status === "waiting");
  const completedPatients = patients.filter((p) => p.status === "completed");
  const servingPatient = patients.find((p) => p.status === "serving");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Receptionist Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Add Patient</h2>

          <form onSubmit={addPatient} className="flex gap-3">
            <input
              type="text"
              placeholder="Enter patient name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded-lg w-full"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-3 rounded-lg"
            >
              Add
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Currently Serving</h2>

          {servingPatient ? (
            <div className="text-4xl font-bold text-green-600">
              Token {servingPatient.tokenNumber}
            </div>
          ) : (
            <p className="text-gray-500">No patient is being served</p>
          )}

          <div className="flex gap-4 mt-5">
            <button
              onClick={completeCurrent}
              disabled={!servingPatient}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
            >
              Mark Completed
            </button>

            <button
              onClick={callNext}
              disabled={waitingPatients.length === 0}
              className="bg-green-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
            >
              Call Next
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Avg Consultation Time</h2>

          <div className="flex gap-3">
            <input
              type="number"
              min="1"
              value={averageTime}
              onChange={(e) => setAverageTime(Number(e.target.value))}
              className="border p-3 rounded-lg w-full"
            />

            <button
              onClick={updateAverageTime}
              className="bg-purple-600 text-white px-5 py-3 rounded-lg"
            >
              Save
            </button>
          </div>

          <p className="text-gray-500 mt-2">
            Current average: {averageTime} minutes
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Waiting Queue</h2>

        {waitingPatients.length === 0 ? (
          <p className="text-gray-500">No patients waiting</p>
        ) : (
          <div className="space-y-3">
            {waitingPatients.map((patient, index) => (
              <div
                key={patient._id}
                className="flex justify-between border p-4 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{patient.name}</p>
                  <p className="text-sm text-gray-500">
                    Patients ahead: {index}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-blue-600">
                    Token {patient.tokenNumber}
                  </p>
                  <p className="text-sm text-purple-600">
                    Est. wait: {index * averageTime} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Completed Patients</h2>

        {completedPatients.length === 0 ? (
          <p className="text-gray-500">No completed patients yet</p>
        ) : (
          <div className="space-y-3">
            {completedPatients.map((patient) => (
              <div
                key={patient._id}
                className="flex justify-between border p-4 rounded-lg bg-gray-50"
              >
                <span>{patient.name}</span>
                <span className="font-bold text-gray-600">
                  Token {patient.tokenNumber}
                </span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={clearQueue}
          className="mt-5 bg-red-600 text-white px-6 py-3 rounded-lg"
        >
          Clear Full Queue
        </button>
      </div>
    </div>
  );
}

export default Receptionist;