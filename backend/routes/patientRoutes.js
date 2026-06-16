import express from "express";

import {
  addPatient,
  getQueue,
  callNextPatient,
  completeCurrentPatient,
  clearQueue,
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/", addPatient);
router.get("/", getQueue);
router.patch("/call-next", callNextPatient);
router.patch("/complete-current", completeCurrentPatient);
router.delete("/clear", clearQueue);

export default router;