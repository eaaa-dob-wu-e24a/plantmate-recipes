import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { UserType } from "../users/users.model.js";

export const authController = {
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+passwordHash");
      if (!user) {
        res.status(401).json({ message: "Invalid email" });
        return;
      }
      if (!user.passwordHash) {
        res.status(401).json({ message: "No password found" });
        return;
      }
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid password" });
        return;
      }
      res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Error logging in" });
    }
  },
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { password, ...rest } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser: UserType = await User.create({ ...rest, passwordHash });
      res.status(201).json({
        message: "User created successfully",
        newUserId: newUser._id,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: error });
    }
  },
};
