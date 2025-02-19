import { Card, CardContent } from "../components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Bookmark } from "lucide-react";
import type { Route } from "./+types/recipe-detail";

const API_URL = import.meta.env.API_URL;

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  if (!id) throw new Response("Missing recipe ID", { status: 400 });

  try {
    const recipe = await fetch(`${API_URL}/api/recipes/${id}`);
    if (!recipe.ok) throw new Error("Recipe not found");

    return Response.json({ recipe }); // Return the post and user data
  } catch (error) {
    throw new Response("Recipe not found", { status: 404 });
  }
}

interface Recipe {
  id: string;
  title: string;
  image: string;
  totalTime: string;
  prepTime: string;
  cookTime: string;
  ingredients: { name: string; quantity: string }[];
  instructions: string[];
}

const dummyRecipe: Recipe = {
  id: "1",
  title: "Tomato Lentils Spaghetti",
  image:
    "https://plus.unsplash.com/premium_photo-1712762311448-8077937f0ee2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  totalTime: "40 min",
  prepTime: "15 min",
  cookTime: "25 min",
  ingredients: [
    { name: "Dried red or brown lentils", quantity: "1/4 cup" },
    { name: "Olive oil", quantity: "3/4 tsp" },
    { name: "Medium onion", quantity: "1/4" },
    { name: "Clove garlic", quantity: "1/2 clove" },
    { name: "Large carrot", quantity: "1/4" },
    { name: "Celery stalk (optional)", quantity: "10 g (1/8 cup)" },
  ],
  instructions: [
    "Rinse the lentils thoroughly.",
    "Chop the onion, garlic, carrot, and celery.",
    "Heat olive oil in a pan and sauté the onion and garlic.",
    "Add lentils, water, and cook until soft.",
    "Mix with cooked spaghetti and serve with fresh herbs.",
  ],
};

const RecipeDetails = () => {

  return (
    <div className="flex justify-center items-center h-screen bg-[var(--primary-green)]">
      <div className="flex flex-col h-[80vh] w-full max-w-[350px] bg-[var(--primary-white)] shadow-lg border border-gray-300 rounded-2xl">
        <img
          src={dummyRecipe.image}
          alt={dummyRecipe.title}
          className="w-full rounded-t-2xl shadow-md h-60 object-cover"
        />
        <div className="flex flex-col gap-4 justify-between items-center px-4 py-2">
          <div className="flex flex-row justify-between w-full">
            <h1 className="text-xl font-bold text-green-950">
              {dummyRecipe.title}
            </h1>
            <Bookmark className="text-green-900" />
          </div>
          <div className="flex flex-row justify-between w-full text-gray-600 text-sm">
            <div className="flex flex-col items-center">
              <span className="font-bold">Total time:</span>
              <span>{dummyRecipe.totalTime}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">Prep time:</span>
              <span>{dummyRecipe.prepTime}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">Cook time:</span>
              <span>{dummyRecipe.cookTime}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="ingredients" className="mt-0 p-2">
          <TabsList className="w-full">
            <TabsTrigger value="ingredients" className="w-50">
              Ingredients
            </TabsTrigger>
            <TabsTrigger value="instructions" className="w-50">
              Instructions
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="ingredients"
            className="mt-2 focus:outline-none focus:ring-0 focus:ring-offset-0 border-none shadow-none"
          >
            <Card className="border-none shadow-none">
              <CardContent className="p-2 border-none shadow-none">
                {dummyRecipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b last:border-none"
                  >
                    <span>{ingredient.name}</span>
                    <span className="text-gray-500">{ingredient.quantity}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions" className="border-none shadow-none">
            <Card className="border-none shadow-none">
              <CardContent className="p-2 border-none shadow-none">
                <ol className="list-decimal pl-5">
                  {dummyRecipe.instructions.map((step, index) => (
                    <li key={index} className="py-1">
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RecipeDetails;
