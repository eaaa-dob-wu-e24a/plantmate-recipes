import { type RecipeType } from "../../../api/src/modules/recipes/recipes.model";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { SlidersHorizontal } from "lucide-react";

export async function loader() {
  const response = await fetch(`${process.env.API_URL}/recipes/`);
  const { recipes }: { recipes: RecipeType[] } = await response.json();
  return { recipes };
}

export default function RecipesPage({
  loaderData,
}: {
  loaderData: { recipes: RecipeType[] };
}) {
  const [search, setSearch] = useState("");
  const recipes = loaderData.recipes;

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[var(--primary-white)] overflow-y-auto p-2">
      <h1 className="text-2xl font-bold text-green-950 p-4 mx-auto">Recipes</h1>
      {/* Search & Filter Section */}
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md"
        />
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-5 w-5" />
          Filter
        </Button>
      </div>

      {/* Recipe Cards */}
      <section className="grid grid-cols-2 gap-2">
        {filteredRecipes.length ? (
          filteredRecipes.map(({ _id, title, description }) => (
            <Card
              key={_id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-lg text-green-900">
                  {title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">
            No recipes found.
          </p>
        )}
      </section>
    </div>
  );
}
