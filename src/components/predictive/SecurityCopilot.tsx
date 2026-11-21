import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { copilotSuggestions } from "@/lib/predictive-data";

interface Msg {
  role: "user" | "ai";
  text: string;
}

export function SecurityCopilot() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hi, I'm the SentinelAI Security Copilot, powered by Gemini. Paste a suspicious message or describe a possible cyber threat, and I'll help you analyse it.",
    },
  ]);

  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const ask = async (question: string) => {
    if (!question.trim() || busy) return;

    setBusy(true);
    setInput("");

    setMessages((previous) => [
      ...previous,
      { role: "user", text: question },
      { role: "ai", text: "Analysing your input with Gemini..." },
    ]);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      setMessages((previous) => {
        const updated = [...previous];
        updated[updated.length - 1] = {
          role: "ai",
          text: data.analysis || "No analysis was generated.",
        };
        return updated;
      });
    } catch (error) {
      console.error("Copilot error:", error);

      setMessages((previous) => {
        const updated = [...previous];
        updated[updated.length - 1] = {
          role: "ai",
          text:
            error instanceof Error
              ? `Sorry, I couldn't complete the analysis: ${error.message}`
              : "Sorry, the analysis service is temporarily unavailable.",
        };
        return updated;
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex h-[520px] flex-col overflow-hidden rounded-xl border border-border/60 bg-background/40">
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2.5 ${
              message.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                message.role === "ai"
                  ? "bg-cyber-cyan/10 text-cyber-cyan"
                  : "bg-cyber-blue/10 text-cyber-blue"
              }`}
            >
              {message.role === "ai" ? (
                <Bot className="h-4 w-4" />
              ) : (
                <User className="h-4 w-4" />
              )}
            </span>

            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                message.role === "ai"
                  ? "border border-border/60 bg-card/60 text-foreground"
                  : "bg-cyber-blue/15 text-foreground"
              }`}
            >
              {message.text}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-border/60 p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          <AnimatePresence>
            {copilotSuggestions.slice(0, 4).map((suggestion) => (
              <button
                key={suggestion.q}
                onClick={() => ask(suggestion.q)}
                disabled={busy}
                className="flex items-center gap-1 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/5 px-2.5 py-1 text-[11px] text-cyber-cyan transition hover:bg-cyber-cyan/15 disabled:opacity-50"
              >
                <Sparkles className="h-3 w-3" />
                {suggestion.q}
              </button>
            ))}
          </AnimatePresence>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            ask(input);
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Describe a suspicious message or threat..."
            className="bg-background/60"
            disabled={busy}
          />

          <Button
            type="submit"
            size="icon"
            disabled={busy || !input.trim()}
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}