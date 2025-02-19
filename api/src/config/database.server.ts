import mongoose from "mongoose";


const uri: string = process.env.MONGODB_URI || "";
const db: string = process.env.MONGODB_DATABASE || "";

if (!uri) throw new Error("MONGODB_URI is not defined");
if (!db) throw new Error("MONGODB_DATABASE is not defined");

export async function connectToDatabase(): Promise<void> {
    if (process.env.NODE_ENV === "development") {
      mongoose.set("overwriteModels", true);
    }
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: db,
    } as mongoose.ConnectOptions);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

// Handle connection events
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
