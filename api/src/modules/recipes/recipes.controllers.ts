import { Request, Response } from "express";
import Recipe, { RecipeType } from "./recipes.model.js";

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
  getRecipeById: async (req: Request, res: Response): Promise<void> => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
        res.status(404).json({ message: "Recipe not found" });
        return;
      }
      res.status(200).json(recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      res.status(500).json({ message: "Error fetching recipe" });
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
};
