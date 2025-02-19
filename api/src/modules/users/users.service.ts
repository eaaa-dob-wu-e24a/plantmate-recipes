import User, { UserType } from "./users.model.js";

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
};
