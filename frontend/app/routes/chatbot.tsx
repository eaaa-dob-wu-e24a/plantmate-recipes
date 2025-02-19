import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import type { Route } from "./+types/chatbot";
import { Form } from "react-router";
import { useFetcher } from "react-router";

export const loader = async () => {
  return null;
};

export async function action({ params, request }: Route.ActionArgs) {
  let formData = Object.fromEntries(await request.formData());
  try {
    const response = await fetch(process.env.API_URL + "/recipies", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Placeholder for message interface til chatbotten.
interface Message {
  text: string;
  sender: "bot" | "user";
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const fetcher = useFetcher();

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-3 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Card
              className={`max-w-[75%] p-3 rounded-xl shadow-sm ${
                msg.sender === "user"
                  ? "bg-[var(--primary-green)] text-[var(--primary-white)] rounded-br-none"
                  : "bg-[var(--grey-color)] text-[var(--black-color)] rounded-bl-none"
              }`}
            >
              <CardContent className="p-0">{msg.text}</CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex relative bottom-0 items-center gap-2 p-4 bg-[var(--primary-white)]">
        <fetcher.Form method="post" className="flex w-full gap-2">
          <Input
            className="flex-1 bg-[#E6E2D8] p-3 rounded-xl border-none focus:ring-0 text-sm"
            type="text"
            name="message"
            placeholder="Message lil Miso Homie"
          />
          <Button className="bg-[var(--primary-green)] text-[var(--primary-white)] rounded-xl px-4 py-2 text-sm">
            Send
          </Button>
        </fetcher.Form>
      </div>
    </div>
  );
};

export default Chatbot;
