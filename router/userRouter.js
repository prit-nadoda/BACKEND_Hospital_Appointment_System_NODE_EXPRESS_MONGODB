import express from "express";
import { isAdminAuthenticated } from "../middlewares/auth.js";
import {
  addNewAdmin,
  getAllDoctors,
  login,
  patientRegister,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/addNewAdmin", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);

export default router;
