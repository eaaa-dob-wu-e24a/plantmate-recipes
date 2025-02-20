import Recipe, { RecipeType } from "./recipes.model.js";
import User from "../users/users.model.js";
import { ObjectId } from "mongodb";
import { generateRecipeFromAI } from "./recipes.ai.service.js";

export const recipeService = {
  // Retrieve all recipes
  getAllRecipes: async (): Promise<RecipeType[]> => {
    try {
      const recipes: RecipeType[] = await Recipe.find();
      return recipes;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw new Error("Error fetching recipes");
    }
  },

  // Retrieve a single recipe by its ID
  getRecipeById: async (id: string): Promise<RecipeType> => {
    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        throw new Error("Recipe not found");
      }
      return recipe;
    } catch (error) {
      console.error("Error fetching recipe:", error);
      throw new Error("Error fetching recipe");
    }
  },

  // Create a new recipe and return the newly created data
  createRecipe: async (
    recipeData: Partial<RecipeType>,
  ): Promise<RecipeType> => {
    try {
      const newRecipe: RecipeType = await Recipe.create(recipeData);
      return newRecipe;
    } catch (error) {
      console.error("Error creating recipe:", error);
      throw new Error("Error creating recipe");
    }
  },

  // Delete recipe
  deleteRecipe: async (recipeId: string): Promise<any> => {
    try {
      const deletedRecipe = await Recipe.deleteOne({ _id: recipeId });
      return deletedRecipe;
    } catch (error) {
      console.error("Error deleting recipe:", error);
      throw error;
    }
  },

  // Generate a recipe using AI based on the provided prompt
  generateRecipe: async (prompt: string): Promise<any> => {
    try {
      if (!prompt) {
        throw new Error("Prompt is required");
      }
      const aiResponse = await generateRecipeFromAI({ message: prompt });
      return aiResponse;
    } catch (error) {
      console.error("Error generating recipe:", error);
      throw new Error("Error generating recipe");
    }
  },
};
