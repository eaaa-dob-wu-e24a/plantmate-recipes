import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import type { Route } from "./+types/chatbot";
import { useFetcher, Form } from "react-router";
import RecipeDetailComp from "~/components/recipeDetailComp";
import RecipeCard from "~/components/recipeCard";

export const loader = async () => {
  null;
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  console.log("Form Data:", formData);
  const prompt = formData.get("prompt");
  console.log("Prompt:", prompt);
  if (prompt) {
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
  } else if (formData.get("intent") === "favorite") {
    try {
      const response = await fetch(
        process.env.API_URL + "/recipes/favorite/userid",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Data:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      return { error: "Failed to fetch response" };
    }
  }
}

export default function Chat({}: Route.ComponentProps) {
  const fetcher = useFetcher();
  const [messages, setMessages] = useState<{ role: string; content: any }[]>(
    []
  );
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  // Append AI response when fetcher.data updates
  if (
    fetcher.data &&
    !messages.some((msg) => msg.content === fetcher.data?.aiResponse)
  ) {
    console.log("Appending AI response to messages");
    setMessages((prev) => [
      ...prev,
      { role: "bot", content: fetcher.data.aiResponse },
    ]);
  }

  return (
    <div className="flex flex-col relative justify-between h-full">
      {/* Chat Messages Display */}
      <div className="flex flex-col gap-3 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <Card
            key={index}
            className={msg.role === "bot" ? "bg-gray-200" : "bg-green-200"}
            onClick={() =>
              msg.role === "bot" && setSelectedRecipe(msg.content)
            }>
            <CardContent className="p-0">
              {msg.role === "user" ? (
                <p className="m-3">{msg.content}</p>
              ) : (
                <RecipeCard {...msg.content} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal to display recipe details */}
      {selectedRecipe && (
        <div className="absolute inset-0 bg-[var(--primary-white)] z-200 flex justify-center items-center">
          <div className="pt-10 rounded-lg max-w-11/12 mx-auto max-h-full overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-2xl"
              onClick={() => setSelectedRecipe(null)}>
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
              ]);
            }
          }}>
          <Input
            className="flex-1 bg-[#E6E2D8] p-3 rounded-xl border-none focus:ring-0 text-sm"
            type="text"
            name="prompt"
            placeholder="Message lil Miso Homie"
          />
          <Button
            value="generate"
            type="submit"
            name="intent"
            className="bg-[var(--primary-green)] text-[var(--primary-white)] rounded-xl px-4 py-2 text-sm">
            Send
          </Button>
        </fetcher.Form>
      </div>
    </div>
  );
}
