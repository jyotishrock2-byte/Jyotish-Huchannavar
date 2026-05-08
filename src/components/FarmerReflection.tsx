import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, User, Sprout } from "lucide-react";
import { askFarmer } from "@/src/lib/gemini";
import ReactMarkdown from "react-markdown";
import { cn } from "@/src/lib/utils";

export function FarmerReflection() {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Welcome to my home, traveler. The soil tells many stories today. Would you like to hear one, or do you have questions about the life of a son of the soil?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    const response = await askFarmer(userMsg);
    setMessages(prev => [...prev, { role: "bot", text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-[600px] glass rounded-3xl overflow-hidden shadow-2xl border-stone-800">
      <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-earth-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-clay-500/20 flex items-center justify-center text-clay-500">
            <Sprout size={20} />
          </div>
          <div>
            <h3 className="font-serif font-medium text-stone-100">Conversations with Hari</h3>
            <p className="text-stone-400 text-xs uppercase tracking-widest font-mono">The Village Elder</p>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex items-start gap-3",
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                msg.role === "user" ? "bg-stone-700" : "bg-clay-500/10 text-clay-500"
              )}>
                {msg.role === "user" ? <User size={14} /> : <Sprout size={14} />}
              </div>
              <div className={cn(
                "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                msg.role === "user" 
                  ? "bg-earth-800 text-stone-200 rounded-tr-none" 
                  : "bg-earth-900/80 text-stone-300 rounded-tl-none border border-stone-800"
              )}>
                <div className="markdown-body prose prose-invert prose-p:leading-relaxed prose-sm">
                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-clay-500/10 text-clay-500 flex items-center justify-center animate-pulse">
                <Sprout size={14} />
              </div>
              <div className="p-4 bg-earth-900/80 border border-stone-800 rounded-2xl animate-pulse">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-clay-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-clay-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-clay-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 bg-earth-900/50 border-t border-stone-800">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask about the harvest, the water, or his memories..."
            className="w-full bg-earth-950 border border-stone-800 rounded-xl py-3 pl-4 pr-12 text-stone-200 focus:outline-none focus:border-clay-500 transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-clay-500 hover:text-harvest-500 disabled:opacity-50 transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
