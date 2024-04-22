import express from "express";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";
import {
  getAllAppointments,
  makeApoointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/make", isPatientAuthenticated, makeApoointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);

export default router;
