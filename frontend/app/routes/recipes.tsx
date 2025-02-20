import { type RecipeType } from "../types/Recipe";
import { useState, useMemo } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { Toggle } from "../components/ui/toggle";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router";

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
  const [open, setOpen] = useState(false); // popover open state

  const recipes = loaderData.recipes;

  // find all categories
  const categories = useMemo(
    () => [...new Set(recipes.map((r) => r.category))],
    [recipes]
  );

  // calculate total times
  const totalTimeOptions = useMemo(() => {
    return [...new Set(recipes.map((r) => r.prepTime + r.cookTime))]
      .sort((a, b) => a - b)
      .filter((time) => time <= 45);
  }, [recipes]);

  // toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // toggle time selection
  const toggleTime = (time: number) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  // remove a filter from the toggle list
  const removeFilter = (type: "category" | "time", value: string | number) => {
    if (type === "category") {
      setSelectedCategories((prev) => prev.filter((c) => c !== value));
    } else {
      setSelectedTimes((prev) => prev.filter((t) => t !== value));
    }
  };

  // filter logic
  const filteredRecipes = recipes.filter((recipe) => {
    const totalTime = recipe.prepTime + recipe.cookTime;
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = selectedCategories.length
      ? selectedCategories.includes(recipe.category)
      : true;
    const matchesTime = selectedTimes.length
      ? selectedTimes.some((t) => totalTime <= t)
      : true;

    return matchesSearch && matchesCategory && matchesTime;
  });

  return (
    <div className="flex flex-col h-full bg-[var(--primary-white)] overflow-y-auto">
      <div className="text-center mt-0 mb-4 font-bold text-xl text-[var(--primary-green)]">
        Recipes
      </div>

      {/* Search & Filter Section */}
      <div className="sticky top-0 pb-2 bg-[var(--primary-white)] flex flex-col px-4 gap-2">
        <div className="flex justify-between items-center gap-2">
          <Input
            placeholder="Search recipes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white text-[var(--primary-green)] border-none shadow-sm"
          />

          {/* Popover for filter */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-[var(--primary-green)] text-[var(--primary-white)]"
              >
                <SlidersHorizontal className="mr-2 h-5 w-5" />
                Filter
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="relative p-4 bg-[var(--primary-white)] rounded-xl shadow-xl w-[320px] max-w-sm"
              align="end"
              side="bottom"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 text-[var(--primary-green)] hover:text-[var(--primary-green)-70]"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Category Selection */}
              <div className="mt-4">
                <p className="text-[var(--primary-green)] font-medium">
                  Type of meal
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map((category) => (
                    <Toggle
                      key={category}
                      pressed={selectedCategories.includes(category)}
                      onPressedChange={() => toggleCategory(category)}
                      className="rounded-full px-4 py-2 transition-colors"
                    >
                      {category}
                    </Toggle>
                  ))}
                </div>
              </div>

              {/* Total time selection */}
              <div className="mt-4">
                <p className="text-[var(--primary-green)] font-medium">
                  Prep time
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {totalTimeOptions.map((time) => (
                    <Toggle
                      key={time}
                      pressed={selectedTimes.includes(time)}
                      onPressedChange={() => toggleTime(time)}
                      className="rounded-full px-4 py-2 transition-colors"
                    >
                      Under {time} min
                    </Toggle>
                  ))}
                </div>
              </div>

              {/* Filter buttons */}
              <div className="mt-6 flex flex-col gap-2">
                <Button
                  className="w-full bg-[var(--primary-green)] text-[var(--primary-white)]"
                  onClick={() => setOpen(false)}
                >
                  Apply filters
                </Button>
                <Button
                  variant="ghost"
                  className="text-[var(--primary-green)]"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedTimes([]);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Showing selected filters as toggles when popover is closed */}
        {(selectedCategories.length > 0 || selectedTimes.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-1 mb-1">
            {selectedCategories.map((category) => (
              <Toggle
                key={category}
                pressed
                className="flex items-center rounded-full px-4 py-2 bg-[var(--primary-green)] text-white"
              >
                {category}
                <button
                  onClick={() => removeFilter("category", category)}
                  className="ml-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </Toggle>
            ))}
            {selectedTimes.map((time) => (
              <Toggle
                key={time}
                pressed
                className="flex items-center rounded-full px-4 py-2 bg-[var(--primary-green)] text-white"
              >
                Under {time} min
                <button
                  onClick={() => removeFilter("time", time)}
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </Toggle>
            ))}
          </div>
        )}
      </div>

      {/* Recipe Cards */}
      <section className="grid grid-cols-2 gap-4 px-4">
        {filteredRecipes.length ? (
          filteredRecipes.map(({ _id, title, description }) => (
            <Link to={`/recipes/${_id}`} key={_id}>
              <Card
                key={_id}
                className="hover:shadow-lg transition-shadow duration-300 h-full mt-1"
              >
                <CardHeader>
                  <CardTitle className="text-md text-[var(--primary-green)]">
                    {title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-[var(--primary-green)] col-span-full text-center">
            No recipes found.
          </p>
        )}
      </section>
    </div>
  );
}
