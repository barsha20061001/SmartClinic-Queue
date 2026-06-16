import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import patientRoutes from "./routes/patientRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());

app.set("io", io);

app.get("/", (req, res) => {
  res.send("Queue Cure backend is running");
});

app.use("/api/patients", patientRoutes);
app.use("/api/settings", settingRoutes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});