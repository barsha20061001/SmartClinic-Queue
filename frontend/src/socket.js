import { io } from "socket.io-client";

const socket = io("https://smartclinic-backend-py33.onrender.com");

export default socket;