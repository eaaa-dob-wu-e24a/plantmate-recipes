export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export type Category = "Breakfast" | "Lunch" | "Dinner" | "Dessert" | "Snack";

export interface RecipeType {
  _id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  imageUrl: string;
  category: Category;
  createdAt: Date;
}
