import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Queue Cure '26</h1>
      <p className="text-gray-600 mb-8 text-center">
        A real-time digital clinic queue management system.
      </p>

      <div className="flex gap-4">
        <Link to="/receptionist" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Receptionist View
        </Link>

        <Link to="/waiting-room" className="bg-green-600 text-white px-6 py-3 rounded-lg">
          Patient Waiting Room
        </Link>
      </div>
    </div>
  );
}

export default Home;