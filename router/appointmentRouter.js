import express from "express";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";
import { makeApoointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/make", isPatientAuthenticated, makeApoointment);

export default router;
