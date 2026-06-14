import express from "express";
import {
  addPatient,
  getQueue,
  callNextPatient,
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/", addPatient);
router.get("/", getQueue);
router.patch("/call-next", callNextPatient);

export default router;