import { Link } from "react-router-dom";
import receptionistImg from "../assets/receptionist.png";
import waitingRoomImg from "../assets/waiting-room.webp";

function Home() {
  return (
    
      <div className="min-h-screen  bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center p-6">
      
        <div className="max-w-4xl bg-white/80 backdrop-blur-xl   shadow-[0_25px_60px_rgba(0,0,0,0.18)] rounded-3xl shadow-2xl p-12 text-center hover:scale-[1.01] transition-all duration-500">
        <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold mb-5">
          SmartClinic Queue
        </div>

        <h1 className="
text-5xl
font-black
bg-gradient-to-r
from-indigo-600
via-fuchsia-500
to-rose-500
bg-clip-text
text-transparent
">
          Welcome to Smart Clinic Queue
        </h1>

        <p className="text-gray-800 text-lg mb-8">
          Choose how you want to continue
        </p>


        <div className="grid md:grid-cols-2 gap-8  mt-10">

    <Link to="/receptionist">
        <div className="bg-white/90 rounded-2xl  overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300">

            <img
                src={receptionistImg}
                className="h-52 w-full object-cover"
                alt=""
            />

            <div className="p-6  ">

                <h3 className="text-2xl font-bold text-gray-800">
                    Receptionist Dashboard
                </h3>

                <p className="text-gray-600 mt-2">
                    Register patients, manage queues and monitor live statistics.
                </p>

            </div>

        </div>
    </Link>

    <Link to="/waiting-room">
        <div className="bg-white/90 rounded-2xl   overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300">

            <img
                src={waitingRoomImg}
                className="h-52 w-full object-cover"
                alt=""
            />

            <div className="p-6">

                <h3 className="text-2xl font-bold text-gray-800">
                    Patient Waiting Room
                </h3>

                <p className="text-gray-600 mt-2">
                    View the live queue, current token and estimated waiting time.
                </p>

            </div>

        </div>
    </Link>

</div>
      </div>
    </div>
  );
}

export default Home;