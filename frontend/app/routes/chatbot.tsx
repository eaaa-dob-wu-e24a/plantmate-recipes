import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import type { Route } from "./+types/chatbot";
import { useFetcher, Form, useLoaderData } from "react-router";
import RecipeDetailComp from "~/components/recipeDetailComp";
import RecipeCard from "~/components/recipeCard";
import SkeletonCard from "~/components/skeletonCard";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const prompt = formData.get("prompt");
  console.log("Prompt:", prompt);
  try {
    console.log("trying to fetch");
    const response = await fetch(process.env.API_URL + "/recipes/generate", {
      method: "POST",
      body: JSON.stringify({ prompt: prompt }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Data:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Failed to fetch response" };
  }
}

export default function Chat({}: Route.ComponentProps) {
  const fetcher = useFetcher();
  const [messages, setMessages] = useState<
    { role: string; content: any; type?: string }[]
  >([
    {
      role: "bot",
      content: "Hi, I'm Miso, what can I do for you?",
      type: "text",
    },
  ]);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [showIntro, setShowIntro] = useState(true); // ✅ Added intro screen

  // Append AI response when fetcher.data updates
  if (
    fetcher.data &&
    !messages.some((msg) => msg.content === fetcher.data?.aiResponse)
  ) {
    // remove the bot-loading message
    setMessages((prev) => prev.filter((m) => m.role !== "bot-loading"));
    // then add the real "bot" message
    setMessages((prev) => [
      ...prev,
      { role: "bot", content: fetcher.data.aiResponse },
    ]);
  }

  return (
    <div className="flex flex-col relative justify-between h-full">
      {/* ✅ Only Adding This: Intro Screen */}
      {showIntro && (
        <div
          onClick={() => setShowIntro(false)}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--primary-white)]"
        >
          <img src="/miso.svg" alt="Miso" className="h-40 w-auto" />
          <p className="mt-4 text-[var(--black-color)] text-lg font-bold">
            Welcome to Plant Mate!
          </p>
          <p className="text-[var(--black-color)] text-sm">
            Tap anywhere to start chatting.
          </p>
        </div>
      )}

      {/* Chat Messages Display */}
      <div className="flex flex-col gap-3 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === "user" ? "flex justify-end" : "flex justify-start"
            }
          >
            <Card
              className={`w-64 ${
                msg.role === "bot"
                  ? "bg-gray-200 text-sm"
                  : msg.role === "bot-loading"
                  ? "bg-transparent border-none shadow-none"
                  : "bg-[var(--primary-green-30)] text-[var(--primary-green)] text-sm"
              }`}
              onClick={() =>
                msg.role === "bot" &&
                msg.type !== "text" &&
                setSelectedRecipe(msg.content)
              }
            >
              <CardContent className="p-0">
                {msg.role === "user" ? (
                  <p className="m-3">{msg.content}</p>
                ) : msg.type === "text" ? (
                  <p className="m-3">{msg.content}</p>
                ) : msg.role === "bot-loading" ? (
                  <SkeletonCard />
                ) : (
                  <RecipeCard {...msg.content} />
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal to display recipe details */}
      {selectedRecipe && (
        <div className="absolute inset-0 bg-[var(--primary-white)] z-50 flex justify-center items-center">
          <div className="pt-10 rounded-lg max-w-11/12 mx-auto max-h-full overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-2xl"
              onClick={() => setSelectedRecipe(null)}
            >
              &times;
            </button>
            <RecipeDetailComp recipe={selectedRecipe} />
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="flex relative bottom-0 items-center gap-2 p-4 bg-[var(--primary-white)]">
        <fetcher.Form
          method="post"
          className="flex w-full gap-2"
          onSubmit={(e) => {
            const formData = new FormData(e.currentTarget);
            const userMessage = formData.get("prompt") as string;
            if (userMessage.trim()) {
              setMessages((prev) => [
                ...prev,
                { role: "user", content: userMessage },
                { role: "bot-loading", content: null },
              ]);
              fetcher.submit(formData, { method: "post" });
            }
          }}
        >
          <Input
            className="flex-1 bg-[#E6E2D8] p-3 rounded-xl border-none focus:ring-0 text-sm"
            type="text"
            name="prompt"
            placeholder="Type a message for Miso..."
            onFocus={() => setShowIntro(false)} // ✅ FIX: Hide intro on input click
          />
          <Button
            value="generate"
            type="submit"
            name="intent"
            className="bg-[var(--primary-green)] text-[var(--primary-white)] rounded-xl px-4 py-2 text-sm"
          >
            Send
          </Button>
        </fetcher.Form>
      </div>
    </div>
  );
}
