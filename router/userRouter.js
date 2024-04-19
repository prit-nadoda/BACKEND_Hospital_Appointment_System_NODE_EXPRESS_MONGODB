import express from "express";
import { petientRegister } from "../controllers/userController.js";

const router = express.Router();

router.post("/petient/register", petientRegister);

export default router;
