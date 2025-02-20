import { Bookmark } from "lucide-react";
import type { RecipeType } from "../../../api/src/modules/recipes/recipes.model";

export default function RecipeCard(content: RecipeType) {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${content.imageUrl})` }}
        className="w-full h-48 flex justify-end gap-2 rounded-md rounded-b-none bg-[#333] p-2">
        <div className="w-fit h-fit bg-[var(--secondary-white)] py-1 px-2 rounded-lg">
          {content.category}
        </div>
        <div className="w-fit h-fit bg-[var(--secondary-white)] py-1 px-2 rounded-lg">
          {content.cookTime + content.prepTime} mins
        </div>
      </div>
      <div className="flex justify-between px-4 py-2">
        <h1 className="">{content.title}</h1>
        <div className="flex items-center">
          {" "}
          <Bookmark className="w-6 h-6 text-[var(--primary-green)]" />
        </div>
      </div>
    </div>
  );
}
