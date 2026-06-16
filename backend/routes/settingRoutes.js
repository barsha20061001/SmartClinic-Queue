import express from "express";
import { getSetting, updateSetting } from "../controllers/settingController.js";

const router = express.Router();

router.get("/", getSetting);
router.patch("/", updateSetting);

export default router;