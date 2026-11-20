import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { copilotSuggestions } from "@/lib/predictive-data";

interface Msg {
  role: "user" | "ai";
  text: string;
  typing?: boolean;
}

function findAnswer(q: string): string {
  const lc = q.toLowerCase();
  const match = copilotSuggestions.find((s) => s.q.toLowerCase() === lc);
  if (match) return match.a;
  const fuzzy = copilotSuggestions.find((s) =>
    lc.split(" ").some((w) => w.length > 3 && s.q.toLowerCase().includes(w)),
  );
  return (
    fuzzy?.a ??
    "SentinelAI analyzed the current telemetry. No critical anomalies detected in that scope. Behavioral drift is within threshold and predictive models remain stable. Ask about risk forecasts, blocked transactions, or mitigation for deeper insight."
  );
}

export function SecurityCopilot() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi, I'm the SentinelAI Security Copilot. Ask me about today's threats, blocked transactions, or predicted attacks." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const ask = (question: string) => {
    if (!question.trim() || busy) return;
    setBusy(true);
    setInput("");
    const answer = findAnswer(question);
    setMessages((m) => [...m, { role: "user", text: question }, { role: "ai", text: "", typing: true }]);

    let i = 0;
    const type = () => {
      i += Math.max(2, Math.round(answer.length / 60));
      const slice = answer.slice(0, i);
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "ai", text: slice, typing: i < answer.length };
        return copy;
      });
      if (i < answer.length) {
        setTimeout(type, 24);
      } else {
        setBusy(false);
      }
    };
    setTimeout(type, 350);
  };

  return (
    <div className="flex h-[520px] flex-col overflow-hidden rounded-xl border border-border/60 bg-background/40">
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                m.role === "ai" ? "bg-cyber-cyan/10 text-cyber-cyan" : "bg-cyber-blue/10 text-cyber-blue"
              }`}
            >
              {m.role === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </span>
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "ai"
                  ? "border border-border/60 bg-card/60 text-foreground"
                  : "bg-cyber-blue/15 text-foreground"
              }`}
            >
              {m.text}
              {m.typing && <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-cyber-cyan align-middle" />}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-border/60 p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          <AnimatePresence>
            {copilotSuggestions.slice(0, 4).map((s) => (
              <button
                key={s.q}
                onClick={() => ask(s.q)}
                disabled={busy}
                className="flex items-center gap-1 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/5 px-2.5 py-1 text-[11px] text-cyber-cyan transition hover:bg-cyber-cyan/15 disabled:opacity-50"
              >
                <Sparkles className="h-3 w-3" />
                {s.q}
              </button>
            ))}
          </AnimatePresence>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the Security Copilot…"
            className="bg-background/60"
          />
          <Button type="submit" size="icon" disabled={busy || !input.trim()} className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}