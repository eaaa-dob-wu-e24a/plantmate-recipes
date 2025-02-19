import express from "express";
import { recipeController } from "./recipes.controllers.js";

export const router = express.Router();

router.get("/", recipeController.getAllRecipes);
router.post("/", recipeController.createRecipe);
router.post("/generate", recipeController.generateRecipe);
