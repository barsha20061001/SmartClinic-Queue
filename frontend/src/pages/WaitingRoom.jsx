function WaitingRoom() {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Patient Waiting Room
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <p>Patients will see live token updates here.</p>
      </div>
    </div>
  );
}

export default WaitingRoom;