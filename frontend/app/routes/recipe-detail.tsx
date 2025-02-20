import RecipeDetailComp from "../components/recipeDetailComp";
import type { Route } from "./+types/recipe-detail";
import { type RecipeType } from "../types/Recipe";

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(`${process.env.API_URL}/recipes/${params.id}`);
  const data = await response.json();
  const recipe: RecipeType = await data.recipe;
  
  return { recipe };
}

const RecipeDetails = ({ loaderData }: Route.ComponentProps) => {
  const { recipe } = loaderData;
  return <RecipeDetailComp recipe={recipe} />;

};
export default RecipeDetails;
