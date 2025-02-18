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
};
