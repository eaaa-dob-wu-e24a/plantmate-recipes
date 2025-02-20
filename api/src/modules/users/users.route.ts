import express from "express";
import { userController } from "./users.controller.js";

export const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
