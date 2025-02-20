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
    })
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
          content: `
          "You are a plant-based recipe advisor. 
          "Your goal is to generate a creative, healthy, and easy-to-cook recipe for someone who wants a vegetarian or vegan meal."

          "Constraints:\n" +
          "- Must be vegetarian or vegan.\n" +
          "- Aim for a short prep time (under 45 minutes).\n" +
          "- Use liters, grams, and other units commonly used in Danish measurements.\n\n" +
          "While these constraints ensure a quick, plant-based meal, your suggestion should still be tasty, 
          nutritious, and feasible for someone with basic cooking skills. 
          Focus on a single recipe idea that fits these constraints.\n\n" +

          "Always reply with one concise recipe.\n\n" +
          "These recipes have already been generated, so do not suggest them:\n" +
          "We made the options "Breakfast", "Lunch", "Dinner", "Dessert", "Snack" available for you to choose from."
          `,
        },
        {
          role: "user" as const,
          content: userMessage,
        },
      ],
      // If the user has already provided a message, include it in the message thread
      ...(message
        ? [
            {
              role: "assistant" as const,
              content:
                "Can you provide me with a project idea that you want me to expand?",
            },
            {
              role: "user" as const,
              content: message,
            },
          ]
        : []),
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
