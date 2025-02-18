import { Card, CardContent } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Bookmark, Minus, Plus } from "lucide-react";

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
    <div className="max-w-2xl mx-auto p-4">
      <img
        src={dummyRecipe.image}
        alt={dummyRecipe.title}
        className="w-full rounded-lg shadow-md mt-2 h-60 object-cover"
      />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mt-4 text-green-900">
          {dummyRecipe.title}
        </h1>
        <Bookmark className="text-green-900" />
      </div>
      <p className="text-gray-600">
        Total time: {dummyRecipe.totalTime} | Prep: {dummyRecipe.prepTime} |
        Cook: {dummyRecipe.cookTime}
      </p>

      <Tabs defaultValue="ingredients" className="mt-4">
        <TabsList>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
        </TabsList>

        <TabsContent value="ingredients">
          <div className="flex items-center justify-end gap-2 text-green-900">
            <span>Ingredients for</span>
            <Minus />
            <span>4</span>
            <Plus />
            <span>servings</span>
          </div>
          <Card>
            <CardContent>
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

        <TabsContent value="instructions">
          <Card>
            <CardContent>
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
  );
};

export default RecipeDetails;
