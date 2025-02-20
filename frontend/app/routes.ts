
import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/chatbot.tsx"),
  route("/login", "routes/login.tsx"),
  route("/recipes", "routes/recipes.tsx"),
  route("recipes/:id", "routes/recipe-detail.tsx"),
  route("/profile", "routes/profile.tsx"),

] satisfies RouteConfig;
