// Imports
import express, { Express } from "express";
import cors from "cors";
import { connectToDatabase } from "./config/database.server.js";

// ========== Setup ========== //

// Create Express app
const server: Express = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Configure middleware
server.use(express.json()); // to parse JSON bodies
server.use(cors()); // Enable CORS for all routes

// // ========== Routes ========== //

// Root route
import { router as RecipeRoutes } from "./modules/recipes/recipes.routes.js";
server.use("/recipes", RecipeRoutes);
import { router as UserRoutes } from "./modules/users/users.routes.js";
server.use("/users", UserRoutes);

server.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

// ========== Start server ========== //

async function startServer(): Promise<void> {
  try {
    await connectToDatabase();
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
