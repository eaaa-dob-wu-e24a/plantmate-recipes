import User, { UserType } from "./users.model.js";
import { ObjectId } from "mongodb";

export const userService = {
  getAllUsers: async (): Promise<UserType[]> => {
    try {
      const users: UserType[] = await User.find();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Error fetching users");
    }
  },

  createUser: async (userData: Partial<UserType>): Promise<UserType> => {
    try {
      const newUser: UserType = await User.create(userData);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Error creating user");
    }
  },
  addFavoriteRecipe: async (
    userId: string,
    recipeId: string,
  ): Promise<void> => {
    try {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { favoriteRecipes: recipeId } },
        { new: true },
      );
    } catch (error) {
      console.error("Error adding favorite recipe:", error);
      throw error;
    }
  },
};
