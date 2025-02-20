import { Request, Response } from "express";
import { userService } from "./users.service.js";

export const userController = {
  getUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ users });
    } catch (error: any) {
      console.error("Controller error fetching users:", error);
      res.status(500).json({ message: error.message });
    }
  },

  getUserById: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json({ user });
    } catch (error: any) {
      console.error("Controller error fetching user by ID:", error);
      res.status(500).json({ message: error.message });
    }
  },

  createUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json({
        message: "User created successfully",
        userId: newUser._id,
      });
    } catch (error: any) {
      console.error("Controller error creating user:", error);
      res.status(500).json({ message: error.message });
    }
  },
};
