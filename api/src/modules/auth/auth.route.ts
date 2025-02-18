import express from "express";
import { authController } from "./auth.controller.js";

export const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
