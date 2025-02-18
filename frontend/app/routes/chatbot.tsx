import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Home, Bookmark, User } from "lucide-react";

export const loader = async () => {
  return null;
};

// Placeholder for message interface til chatbotten. 
interface Message {
  text: string;
  sender: "bot" | "user";
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hey, welcome back to Plant Mate! Let's chat.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[var(--primary-green)]">
     
      <div className="flex flex-col h-[80vh] w-full max-w-[350px] bg-[var(--primary-white)] shadow-lg border border-gray-300 rounded-2xl">
        
        
        <div className="flex justify-center rounded-2xl items-center p-4 bg-[var(--primary-white)]">
          <img src="/pmlogo.svg" alt="Plant Mate" className="h-8 w-auto" />
        </div>

       
        <div className="flex flex-col flex-grow gap-3 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
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

      
        <div className="flex items-center gap-2 p-4 bg-[var(--primary-white)]">
        <Input
  className="flex-1 bg-[#E6E2D8] p-3 rounded-xl border-none focus:ring-0 text-sm"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  }}
  placeholder="Message lil Miso Homie"
/>
          <Button
            className="bg-[var(--primary-green)] text-[var(--primary-white)] rounded-xl px-4 py-2 text-sm"
            onClick={handleSend}
          >
            Send
          </Button>
        </div>

        {/* Footer (Bottom Nav) */}
        <footer className="flex justify-around items-center py-3 rounded-b-2xl border-t border-[#E6E2D8] bg-[var(--primary-white)]">
          <Home className="w-6 h-6 text-[var(--primary-green)]" />
          <Bookmark className="w-6 h-6 text-[var(--primary-green)]" />
          <User className="w-6 h-6 text-[var(--primary-green)]" />
        </footer>
      </div>
    </div>
  );
};

export default Chatbot;
