import express from "express";
import { recipeController } from "./recipes.controllers.js";

export const router = express.Router();

router.get("/", recipeController.getAllRecipes);
