import { Schema, model, type InferSchemaType } from "mongoose";

// Define the schema for the "users" collection in MongoDB
const userSchema = new Schema(
  {
    title: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    imageUrl: { type: String, required: true },
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
