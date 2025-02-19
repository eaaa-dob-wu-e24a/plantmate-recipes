import { Request, Response } from "express";
import User, { UserType } from "./users.model.js";

export const userController = {
  // Get all users
  getUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users: UserType[] = await User.find();
      // should use view to serve the reponse
      res.status(200).json({ users });
    } catch (error) {
      // should use view to serve the reponse
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Error fetching users" });
    }
  },
  createUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const newUser: UserType = await User.create(req.body);
      res.status(201).json({
        message: "User created successfully",
        newRecipeId: newUser._id,
      });
    } catch (error) {
      console.error("Error creating recipe:", error);
      res.status(500).json({ message: "Error creating recipe" });
    }
  },
};
