import express from "express";
import { recipeController } from "./recipes.controller.js";

export const router = express.Router();

router.get("/", recipeController.getAllRecipes);
router.post("/", recipeController.createRecipe);
router.post("/generate", recipeController.generateRecipe);
router.get("/:id", recipeController.getRecipeById);
router.post("/favorite/:userId", recipeController.addFavoriteRecipe);
router.delete("/favorite/:userId/:recipeId", recipeController.deleteFavoriteRecipe);
