import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Bookmark, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { type RecipeType } from "../types/Recipe";
import { useLocation } from "react-router";

export default function RecipeDetailComp({ recipe }: { recipe: RecipeType }) {
  const location = useLocation();
  // path equal to / hide back button
  const showBackButton = location.pathname !== "/";
  const handleBookmarkClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/recipes/favorite/" + "67b4f6700909b81e6bfa1a46",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipe),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("favorite added:", data);
    } catch (error) {
      console.error("Error adding bookmark:", error);
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
        {showBackButton && (
          <button
            onClick={() => window.history.back()}
            className="absolute top-4 left-4 bg-white/50 hover:bg-white p-2 rounded-full shadow-md transition">
            <ArrowLeft className="h-6 w-6 text-[var(--primary-green)]" />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4 justify-between items-center px-4 py-2">
        <div className="flex flex-row justify-between w-full">
          <h1 className="text-xl font-bold text-green-950">{recipe.title}</h1>
          <Bookmark
            onClick={() => handleBookmarkClick()}
            className="text-green-900"
          />
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
          className="mt-2 focus:outline-none focus:ring-0 focus:ring-offset-0 border-none shadow-none">
          <Card className="border-none shadow-none bg-[var(--primary-white)]">
            <CardContent className="p-2 border-none shadow-none ">
              {recipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 border-b last:border-none">
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
}
