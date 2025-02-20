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
  getUserById: async (userId: string): Promise<UserType> => {
    try {
      const user: UserType | null = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Error fetching user by ID");
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
  removeFavoriteRecipe: async (
    userId: string,
    recipeId: string,
  ): Promise<void> => {
    try {
      const updatedResult = await User.updateOne(
        { _id: userId },
        { $pull: { favoriteRecipes: new ObjectId(recipeId) } },
      );

      if (updatedResult.modifiedCount === 0) {
        throw new Error("Failed to remove recipe from favorites");
      }
    } catch (error) {
      console.error("Error removing favorite recipe:", error);
      throw error;
    }
  },
  checkUserHasFavorite: async (
    userId: string,
    recipeId: string,
  ): Promise<boolean> => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Assuming favoriteRecipes is an array of recipe IDs
      return user.favoriteRecipes.some((id) => id.toString() === recipeId);
    } catch (error) {
      console.error("Error checking user favorite:", error);
      throw error;
    }
  },
};
