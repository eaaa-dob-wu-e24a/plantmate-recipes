import { Card, CardContent } from "../components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ArrowLeft, MoreVertical } from "lucide-react";
import type { Route } from "./+types/recipe-detail";
import { type RecipeType } from "../../../api/src/modules/recipes/recipes.model";
import { useState } from "react";

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(
    `${process.env.API_URL}/recipes/${params.id}`
  );
  const recipe: RecipeType = await response.json();

  console.log(recipe);
  return { recipe };
}

const RecipeDetails = ({ loaderData } : Route.ComponentProps ) => {
  const { recipe } = loaderData;
  // State to toggle the popover menu
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDelete = async () => {
    // 1) Confirm the user wants to delete
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmed) return;

    // 2) Call the DELETE endpoint
    try {
      const res = await fetch(`${process.env.API_URL}/recipes/${recipe._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Delete failed");
      }
      // 3) After success, maybe navigate back or show a message
      window.history.back(); // or redirect to /recipes
    } catch (err) {
      console.error("Error deleting recipe:", err);
      alert("Failed to delete recipe!");
    }
  };
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
        {/* 3-Dots Menu Button (top-right) */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-white/50 hover:bg-white p-2 rounded-full shadow-md transition"
          >
            <MoreVertical className="h-6 w-6 text-[var(--primary-green)]" />
          </button>

          {/* Popover Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-[120px] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <button
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-[var(--primary-green)]"
                onClick={handleDelete}
              >
                Delete
              </button>
              {/* You can add more menu options here if needed */}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between items-start px-4 py-2">
        <h1 className="ml-0 text-xl font-bold text-[var(--primary-green)]">
          {recipe.title}
        </h1>
        <p className="text-sm text-[var(--primary-green)]">
          {recipe.description}
        </p>

        <div className="flex flex-row text-sm justify-between w-full text-[var(--primary-green)]">
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
