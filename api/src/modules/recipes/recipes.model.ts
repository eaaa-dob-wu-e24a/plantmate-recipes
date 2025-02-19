import { Schema, model, type InferSchemaType } from "mongoose";

// Define the schema for the "recipes" collection in MongoDB
const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
      },
    ],
    instructions: [{ type: String, required: true }],
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"],
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      flattenObjectIds: true,
      getters: true,
    },
  },
);

// Infer TypeScript type for the schema
export type RecipeType = InferSchemaType<typeof recipeSchema> & {
  _id: string;
};

// This model provides an interface to interact with the "recipes" collection in MongoDB
const Recipe = model<RecipeType>("Recipe", recipeSchema);

// Export the Recipe model for use in other parts of the application
export default Recipe;
