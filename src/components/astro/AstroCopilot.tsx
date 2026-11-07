import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  X,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Layers,
  ShieldCheck,
  Minimize2,
} from "lucide-react";
import { useAstro } from "./AstroContext";
import { generateContextualAnswer } from "@/lib/astroKnowledge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "astro";
  text: string;
  sources?: string[] | undefined;
  contextBadge?: string | undefined;
  timestamp: string;
}

export function AstroCopilot() {
  const {
    context,
    isOpen,
    setIsOpen,
    toggleOpen,
    initialPrompt,
    clearInitialPrompt,
  } = useAstro();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro-1",
      sender: "astro",
      text: "Hello explorer! I am **ASTRO**, your AI Space Exploration Copilot. I'm connected to NASA mission archives, telemetry logs, and planetary records.\n\nAsk me anything about the machines we left behind, their scientific instruments, or why their missions concluded.",
      sources: ["NASA Science Archives"],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check Python backend health once
  useEffect(() => {
    fetch("http://localhost:8000/api/health")
      .then((res) => {
        if (res.ok) setBackendAvailable(true);
        else setBackendAvailable(false);
      })
      .catch(() => setBackendAvailable(false));
  }, []);

  // Handle incoming initialPrompt
  useEffect(() => {
    if (initialPrompt && isOpen) {
      sendMessage(initialPrompt);
      clearInitialPrompt();
    }
  }, [initialPrompt, isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const activeContextSummary = [
    context.selectedPlanet && `Planet: ${context.selectedPlanet}`,
    context.selectedArtifact && `Artifact: ${context.selectedArtifact}`,
    context.selectedComponent && `Component: ${context.selectedComponent}`,
    context.currentStoryStage && `Stage: ${context.currentStoryStage}`,
  ]
    .filter(Boolean)
    .join(" · ");

  const suggestions = getContextualSuggestions(context);

  const sendMessage = async (questionText: string) => {
    const q = questionText.trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    let answerText = "";
    let sources: string[] = ["NASA Mission Records"];

    try {
      // Try local FastAPI backend first
      if (backendAvailable !== false) {
        const response = await fetch("http://localhost:8000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: q,
            context: {
              selected_planet: context.selectedPlanet,
              selected_mission: context.selectedMission,
              selected_artifact: context.selectedArtifact,
              selected_component: context.selectedComponent,
              current_story_stage: context.currentStoryStage,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          answerText = data.answer;
          sources = data.sources || sources;
        } else {
          throw new Error("Backend response error");
        }
      } else {
        throw new Error("Backend not running");
      }
    } catch {
      // Offline fallback: verified knowledge retrieval
      const result = generateContextualAnswer(q, context);
      answerText = result.answer;
      sources = result.sources;
    } finally {
      setIsTyping(false);
      const astroMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "astro",
        text: answerText,
        sources,
        contextBadge: activeContextSummary || undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, astroMsg]);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: "intro-reset",
        sender: "astro",
        text: "Chat cleared. What NASA mission or planetary artifact would you like to explore next?",
        sources: ["NASA Science Archives"],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* Floating launcher button */}
      <div className="fixed bottom-5 right-5 z-40">
        <motion.button
          type="button"
          onClick={toggleOpen}
          aria-label="Open ASTRO AI Space Exploration Copilot"
          className={cn(
            "group relative flex items-center gap-2.5 rounded-full p-2.5 sm:px-4 sm:py-3 font-medium transition-all shadow-glow",
            isOpen
              ? "bg-secondary text-secondary-foreground border border-border"
              : "bg-mars-gradient text-primary-foreground border border-primary/50 hover:scale-105",
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <span className="grid size-8 place-items-center rounded-full bg-background/25">
              <Bot className="size-5" />
            </span>
            <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-teal animate-ping" />
            <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-teal" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold tracking-wide flex items-center gap-1 font-display">
              ASTRO <Sparkles className="size-3 text-gold" />
            </span>
            <span className="text-[10px] opacity-80 font-mono">AI Exploration Copilot</span>
          </div>
        </motion.button>
      </div>

      {/* Slide-in Conversation Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-20 sm:bottom-24 sm:right-6 sm:inset-x-auto z-50 flex h-[620px] max-h-[82svh] w-auto sm:w-[440px] flex-col overflow-hidden rounded-3xl border border-border bg-panel shadow-panel backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/80 px-4 py-3 bg-space/60">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-2xl bg-mars-gradient text-primary-foreground shadow-glow">
                  <Bot className="size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-display text-sm font-semibold text-foreground">ASTRO</h2>
                    <span className="rounded-full bg-teal/20 px-1.5 py-0.2 font-mono text-[9px] uppercase tracking-wider text-teal">
                      Copilot
                    </span>
                  </div>
                  <p className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                    <ShieldCheck className="size-3 text-signal" /> Grounded NASA Archives
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClear}
                  title="Clear chat"
                  className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <RefreshCw className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Minimize ASTRO"
                  className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Minimize2 className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Context Awareness Pill */}
            {activeContextSummary && (
              <div className="flex items-center gap-2 border-b border-border/50 bg-background/40 px-4 py-2 text-[11px] text-muted-foreground">
                <Layers className="size-3.5 text-primary-glow shrink-0" />
                <span className="truncate">
                  Observing: <strong className="text-foreground">{activeContextSummary}</strong>
                </span>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex flex-col max-w-[88%] text-sm",
                    m.sender === "user" ? "ml-auto items-end" : "mr-auto items-start",
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 shadow-sm leading-relaxed",
                      m.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-xs"
                        : "bg-background/80 border border-border/70 text-foreground rounded-tl-xs",
                    )}
                  >
                    <div className="whitespace-pre-line prose-sm dark:prose-invert">
                      {renderMarkdown(m.text)}
                    </div>
                  </div>

                  {/* Sources tag */}
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1 items-center px-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                        Source:
                      </span>
                      {m.sources.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center gap-0.5 rounded-full bg-muted/70 px-2 py-0.5 font-mono text-[9px] text-teal"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="mt-1 px-1 font-mono text-[9px] text-muted-foreground/60">
                    {m.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 rounded-2xl bg-background/60 border border-border/60 p-3 w-20">
                  <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                  <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                  <span className="size-1.5 rounded-full bg-primary animate-bounce" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Contextual Suggested Questions */}
            {suggestions.length > 0 && (
              <div className="border-t border-border/50 bg-background/25 px-3 py-2">
                <p className="px-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Suggested questions:
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-border bg-panel/80 px-2.5 py-1 text-left text-[11px] text-foreground/90 transition-colors hover:border-primary/50 hover:bg-muted"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3 bg-space/60"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  context.selectedComponent
                    ? `Ask about ${context.selectedComponent}…`
                    : "Ask ASTRO about space exploration…"
                }
                className="flex-1 rounded-2xl border border-input bg-background/60 px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button
                type="submit"
                size="sm"
                variant="hero"
                disabled={!input.trim()}
                className="rounded-2xl px-3"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function getContextualSuggestions(ctx: ReturnType<typeof useAstro>["context"]): string[] {
  if (ctx.selectedComponent) {
    return [
      `What does the ${ctx.selectedComponent} do?`,
      `How was the ${ctx.selectedComponent} engineered?`,
      "What discoveries were made with this component?",
    ];
  }

  if (ctx.currentStoryStage) {
    return [
      `Tell me what happened during ${ctx.currentStoryStage}.`,
      "What were the technical challenges at this stage?",
      "Why is this milestone historically significant?",
    ];
  }

  if (ctx.selectedArtifact === "spirit") {
    return [
      "Why did Spirit's mission end?",
      "What did Spirit discover at Home Plate?",
      "How did Spirit survive without the front wheel?",
    ];
  }

  if (ctx.selectedPlanet === "mars") {
    return [
      "Which rovers are still active on Mars?",
      "Why is landing on Mars so difficult?",
      "Where is Gusev Crater located?",
    ];
  }

  if (ctx.selectedPlanet === "moon") {
    return [
      "What hardware did Apollo 11 leave on the Moon?",
      "How many rovers are abandoned on the Moon?",
      "Can we still signal the lunar reflectors?",
    ];
  }

  return [
    "Why was Spirit Rover left behind on Mars?",
    "What is the oldest machine still on the Moon?",
    "How did the airbag landing system work?",
  ];
}

/** Lightweight bold and list formatter for assistant chat responses */
function renderMarkdown(text: string) {
  const parts = text.split("\n\n");
  return parts.map((part, i) => {
    if (part.startsWith("### ")) {
      return (
        <h4 key={i} className="font-display font-medium text-primary-glow text-sm mt-1 mb-1">
          {part.replace("### ", "")}
        </h4>
      );
    }
    if (part.startsWith("- ") || part.includes("\n- ")) {
      const items = part
        .split("\n")
        .filter((l) => l.trim().startsWith("- "))
        .map((l) => l.replace("- ", ""));
      return (
        <ul key={i} className="list-disc pl-4 space-y-1 my-1.5">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ul>
      );
    }
    return (
      <p
        key={i}
        className="my-1"
        dangerouslySetInnerHTML={{ __html: formatInline(part) }}
      />
    );
  });
}

function formatInline(str: string) {
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-glow">$1</strong>')
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
}
