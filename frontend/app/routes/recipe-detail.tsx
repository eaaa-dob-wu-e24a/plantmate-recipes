import { Card, CardContent } from "../components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Bookmark, ArrowLeft } from "lucide-react";
import type { Route } from "./+types/recipe-detail";
import { type RecipeType } from "../../../api/src/modules/recipes/recipes.model";

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(`${process.env.API_URL}/recipes/${params.id}`);
  const data = await response.json();
  const recipe: RecipeType = await data.recipe;

  console.log("Full recipe data:", recipe);

  return { recipe };
}

const RecipeDetails = ({ loaderData }: Route.ComponentProps) => {
  const { recipe } = loaderData;
  return (
    <div className="flex flex-col h-full bg-[var(--primary-white)] overflow-y-auto">
      <div className="relative">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full shadow-md h-60 object-cover"
        />
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 bg-white/50 hover:bg-white p-2 rounded-full shadow-md transition"
        >
          <ArrowLeft className="h-6 w-6 text-[var(--primary-green)]" />
        </button>
      </div>
      <div className="flex flex-col gap-4 justify-between items-center px-4 py-2">
        <div className="flex flex-row justify-between w-full">
          <h1 className="text-xl font-bold text-green-950">{recipe.title}</h1>
          <Bookmark className="text-green-900" />
        </div>
        <p className="text-sm text-[var(--primary-green)]">
          {recipe.description}
        </p>

        <div className="flex flex-row justify-between w-full text-[var(--primary-green)]">
          <div className="flex flex-col items-center">
            <span className="font-bold">Total time:</span>
            <span>{recipe.cookTime + recipe.prepTime}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">Prep time:</span>
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">Cook time:</span>
            <span>{recipe.cookTime}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="ingredients" className="mt-0 p-2 ">
        <TabsList className="w-full bg-[var(--secondary-white)]">
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
          <Card className="border-none shadow-none bg-[var(--primary-white)]">
            <CardContent className="p-2 border-none shadow-none ">
              {recipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 border-b last:border-none"
                >
                  <span>{ingredient.name}</span>
                  <span className="text[var(--primary-green)]">
                    {ingredient.quantity}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructions" className="border-none shadow-none">
          <Card className="border-none shadow-none bg-[var(--primary-white)]">
            <CardContent className="p-2 border-none shadow-none">
              <ol className="list-decimal pl-5">
                {recipe.instructions.map((step, index) => (
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
