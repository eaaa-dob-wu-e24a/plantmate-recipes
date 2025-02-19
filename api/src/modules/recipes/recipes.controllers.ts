import { Request, Response } from "express";
import Recipe, { RecipeType } from "./recipes.model.js";
import { generateRecipeFromAI } from "./recipes.ai.service.js";

export const recipeController = {
  // Get all recipes
  getAllRecipes: async (req: Request, res: Response): Promise<void> => {
    try {
      const recipes: RecipeType[] = await Recipe.find();
      // should use view to serve the reponse
      res.status(200).json({ recipes });
    } catch (error) {
      // should use view to serve the reponse
      console.error("Error fetching recipes:", error);
      res.status(500).json({ message: "Error fetching recipes" });
    }
  },
  createRecipe: async (req: Request, res: Response): Promise<void> => {
    try {
      const newRecipe: RecipeType = await Recipe.create(req.body);
      res.status(201).json({
        message: "Recipe created successfully",
        newRecipeId: newRecipe._id,
      });
    } catch (error) {
      console.error("Error creating recipe:", error);
      res.status(500).json({ message: "Error creating recipe" });
    }
  },
  generateRecipe: async (req: Request, res: Response): Promise<void> => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        res.status(400).json({ error: "Prompt is required" });
      }
      const aiResponse = await generateRecipeFromAI({ message: prompt });
      res.status(200).json({ aiResponse });
    } catch (error) {
      console.error("Error generating recipe:", error);
      res.status(500).json({ error: "Failed to generate recipe" });
    }
  },
};
