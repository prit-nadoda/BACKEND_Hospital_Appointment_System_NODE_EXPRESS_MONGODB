import express from "express";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";
import {
  deleteAppointment,
  getAllAppointments,
  makeApoointment,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/make", isPatientAuthenticated, makeApoointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;
