import { useEffect, useState } from "react";
import axios from "axios";

function Receptionist() {
  const [name, setName] = useState("");
  const [patients, setPatients] = useState([]);

  const fetchQueue = async () => {
    const res = await axios.get("http://localhost:5000/api/patients");
    setPatients(res.data);
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
    } catch (error) {
      alert("No patients waiting in queue");
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const waitingPatients = patients.filter((p) => p.status === "waiting");
  const servingPatient = patients.find((p) => p.status === "serving");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Receptionist Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
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

            <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">
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

          <button
            onClick={callNext}
            disabled={waitingPatients.length === 0}
            className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
          >
            Call Next
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Waiting Queue</h2>

        {waitingPatients.length === 0 ? (
          <p className="text-gray-500">No patients waiting</p>
        ) : (
          <div className="space-y-3">
            {waitingPatients.map((patient) => (
              <div
                key={patient._id}
                className="flex justify-between border p-4 rounded-lg"
              >
                <span>{patient.name}</span>
                <span className="font-bold text-blue-600">
                  Token {patient.tokenNumber}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Receptionist;