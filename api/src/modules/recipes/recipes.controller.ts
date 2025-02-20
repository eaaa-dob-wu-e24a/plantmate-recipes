import { Request, Response } from "express";
import { recipeService } from "./recipes.service.js";
import { userService } from "../users/users.service.js";

export const recipeController = {
  getAllRecipes: async (req: Request, res: Response): Promise<void> => {
    try {
      const recipes = await recipeService.getAllRecipes();
      res.status(200).json({
        message: "Recipes fetched successfully",
        recipes,
      });
    } catch (error: any) {
      console.error("Controller error fetching recipes:", error);
      res.status(500).json({ message: error.message });
    }
  },

  getRecipeById: async (req: Request, res: Response): Promise<void> => {
    try {
      const recipe = await recipeService.getRecipeById(req.params.id);
      res.status(200).json({
        message: "Recipe fetched successfully",
        recipe,
      });
    } catch (error: any) {
      console.error("Controller error fetching recipe:", error);
      res.status(404).json({ message: error.message });
    }
  },

  createRecipe: async (req: Request, res: Response): Promise<void> => {
    try {
      const newRecipe = await recipeService.createRecipe(req.body);
      res.status(201).json({
        message: "Recipe created successfully",
        recipeId: newRecipe._id,
      });
    } catch (error: any) {
      console.error("Controller error creating recipe:", error);
      res.status(500).json({ message: error.message });
    }
  },

  generateRecipe: async (req: Request, res: Response): Promise<void> => {
    try {
      const { prompt } = req.body;
      const aiResponse = await recipeService.generateRecipe(prompt);
      res.status(200).json({
        message: "Recipe generated successfully",
        aiResponse,
      });
    } catch (error: any) {
      console.error("Controller error generating recipe:", error);
      res.status(500).json({ message: error.message });
    }
  },
  addFavoriteRecipe: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const recipeData = req.body;

      const newRecipe = await recipeService.createRecipe(recipeData);

      await userService.addFavoriteRecipe(userId, newRecipe._id);

      res.status(201).json({
        message: "Favorite recipe added successfully",
        recipeId: newRecipe._id,
      });
    } catch (error) {
      console.error("Controller error adding favorite recipe:", error);
      res.status(500).json({ message: "Error adding favorite recipe" });
    }
  },
  deleteFavoriteRecipe: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, recipeId } = req.params;

      const userHasFavorite = await userService.checkUserHasFavorite(
        userId,
        recipeId,
      );

      if (!userHasFavorite) {
        res.status(404).json({
          message: "Recipe not found in user's favorites",
        });
        return;
      }

      await userService.removeFavoriteRecipe(userId, recipeId);

      const deletedRecipe = await recipeService.deleteRecipe(recipeId);

      res.status(200).json({
        message: "Favorite recipe deleted successfully",
        recipeId: deletedRecipe._id || recipeId,
      });
    } catch (error) {
      console.error("Controller error removing favorite recipe:", error);
      res.status(500).json({ message: "Error removing favorite recipe" });
    }
  },
};
