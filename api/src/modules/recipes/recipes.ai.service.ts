import mistral from "../../config/mistral.server.js";
import { z } from "zod";

// Define Zod schema for recipe validation
const recipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      unit: z.string(),
    }),
  ),
  instructions: z.array(z.string()),
  prepTime: z.number(),
  cookTime: z.number(),
  servings: z.number(),
  imageUrl: z.string().optional(),
  category: z.enum(["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"]),
});

// Export the TypeScript type derived from the Zod schema
export type RecipeZodType = z.infer<typeof recipeSchema>;

export async function generateRecipeFromAI({ message }: { message?: string }) {
  try {
    // Use a default message if none provided
    const userMessage = message || "Generate a tasty dinner recipe";

    const response = await mistral.chat.parse({
      model: "mistral-small",
      messages: [
        {
          role: "system" as const,
          content: `You are a recipe generator.`,
        },
        {
          role: "user" as const,
          content: userMessage,
        },
      ],
      responseFormat: recipeSchema,
    });

    // Extract the parsed response
    const recipeData = response.choices?.[0]?.message?.parsed;

    if (!recipeData) {
      throw new Error("Failed to parse recipe data from AI response");
    }

    // Set a placeholder image if not provided
    if (!recipeData.imageUrl) {
      recipeData.imageUrl = "/api/placeholder/600/400";
    }

    return recipeData;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe from AI");
  }
}
