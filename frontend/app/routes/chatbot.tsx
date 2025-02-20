import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import type { Route } from "./+types/chatbot";
import { useFetcher, Form } from "react-router";
import { Heart } from "lucide-react";

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
    <div className="flex flex-col justify-between h-full">
      {/* Chat Messages Display */}
      <div className="flex flex-col gap-3 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <Card
            key={index}
            className={msg.role === "bot" ? "bg-gray-200" : "bg-green-200"}>
            <CardContent className="p-3">
              {msg.role === "user" ? (
                <p>{msg.content}</p>
              ) : (
                <div>
                  <h2 className="text-lg font-semibold">{msg.content.title}</h2>
                  <p className="text-sm">{msg.content.description}</p>
                  {msg.content.imageUrl && (
                    <img
                      src={msg.content.imageUrl}
                      alt={msg.content.title}
                      className="w-full h-auto rounded-md my-2"
                    />
                  )}
                  <h3 className="font-semibold mt-2">Ingredients:</h3>
                  <ul className="list-disc pl-5">
                    {msg.content.ingredients?.map((ingredient, i) => (
                      <li key={i}>
                        {ingredient.name} - {ingredient.quantity}{" "}
                        {ingredient.unit}
                      </li>
                    ))}
                  </ul>
                  <h3 className="font-semibold mt-2">Instructions:</h3>
                  <ol className="list-decimal pl-5">
                    {msg.content.instructions?.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                  <div className="mt-3 text-sm flex flex-col items-center gap-1 border-t pt-3">
                    <div className="flex gap-3">
                      <div>
                        Prep:
                        <span className="font-bold">
                          {" "}
                          {msg.content.prepTime}{" "}
                        </span>
                        mins ⏱
                      </div>
                      |
                      <div>
                        Cook:
                        <span className="font-bold">
                          {" "}
                          {msg.content.cookTime}{" "}
                        </span>
                        mins 🍲
                      </div>
                    </div>
                    <div>
                      🍽 Servings:{" "}
                      <span className="font-bold">{msg.content.servings}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <fetcher.Form method="post" className="h-6">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          fetcher.submit(msg.content, {
                            method: "POST",
                            encType: "application/json",
                          });
                        }}
                        name="intent"
                        value="favorite"
                        type="submit">
                        <Heart className="w-6 h-6 text-red-500" />
                      </button>
                    </fetcher.Form>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

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
