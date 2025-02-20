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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "../components/ui/alert-dialog";
import { AlertDialogContent } from "@radix-ui/react-alert-dialog";

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(`${process.env.API_URL}/recipes/${params.id}`);
  const recipe: RecipeType = await response.json();

  console.log(recipe);
  return { recipe };
}

const RecipeDetails = ({ loaderData }: Route.ComponentProps) => {
  const { recipe } = loaderData;
  // State to toggle the popover menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // AlertDialog state
  const handleOpenDeleteDialog = () => {
    // 1. Close the popover
    setMenuOpen(false);
    // 2. Immediately open the alert dialog
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/recipes/${recipe._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Delete failed");
      }
      window.history.back(); // or navigate("/recipes")
    } catch (err) {
      console.error("Error deleting recipe:", err);
      // Could show a toast or error alert
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

        {/* 3-dot menu button */}
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
                onClick={handleOpenDeleteDialog}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-[var(--primary-green)]"
              >
                Delete
              </button>
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

      {/* AlertDialog (always in the tree, controlled by dialogOpen) */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              recipe.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RecipeDetails;
