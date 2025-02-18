import { Schema, model, type InferSchemaType } from "mongoose";

// Define the schema for the "users" collection in MongoDB
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
      select: false,
    },
    imageUrl: { type: String, required: [true, "Image URL is required"] },
    favoriteRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      flattenObjectIds: true,
      getters: true,
    },
  }
);

// Define the type for the user schema
export type UserType = InferSchemaType<typeof userSchema> & {
  _id: string;
};

// Create the User model used to interact with the "users" collection
const User = model<UserType>("User", userSchema);

export default User;
