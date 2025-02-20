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
server.use(
  cors({
    origin: "*", // This allows all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  }),
);

// // ========== Routes ========== //

// Root route
import { router as RecipeRoute } from "./modules/recipes/recipes.route.js";
server.use("/recipes", RecipeRoute);
import { router as UserRoute } from "./modules/users/users.route.js";
server.use("/users", UserRoute);
import { router as AuthRoute } from "./modules/auth/auth.route.js";
server.use("/auth", AuthRoute);

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
