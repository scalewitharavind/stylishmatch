import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, ArrowRight, CornerDownLeft, Calendar } from "lucide-react";
import { STYLISTS, SAMPLE_CHAT_RESPONSES } from "../data";
import { Stylist } from "../types";

interface AIBeautyConciergeProps {
  setView: (view: string, extra?: { stylistId?: string }) => void;
  onBookNow: (stylist: Stylist) => void;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  recommendedStylistIds?: string[];
}

export default function AIBeautyConcierge({ setView, onBookNow }: AIBeautyConciergeProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m_init",
      sender: "ai",
      text: "Welcome to your StylistMatch Concierge. I am your premium beauty and grooming assistant in Bangalore. Tell me your beauty goal, hair texture, or venue location, and I will recommend the absolute perfect stylists for you."
    }
  ]);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const triggerAIResponse = (userQuery: string) => {
    const query = userQuery.toLowerCase();
    let responseText = "";
    let matchedIds: string[] = [];

    // Keyword match engine
    const foundMatch = SAMPLE_CHAT_RESPONSES.find((resp) =>
      resp.keywords.some((keyword) => query.includes(keyword))
    );

    if (foundMatch) {
      responseText = foundMatch.answer;
      
      // Extract matched stylists ids for direct link mapping in chat
      if (query.includes("korean") || query.includes("two-block") || query.includes("perm")) {
        matchedIds = ["sty_05", "sty_02", "sty_18"];
      } else if (query.includes("engagement") || query.includes("wedding") || query.includes("bridal") || query.includes("bride")) {
        matchedIds = ["sty_03", "sty_20", "sty_16"];
      } else if (query.includes("color") || query.includes("balayage") || query.includes("highlight")) {
        matchedIds = ["sty_02", "sty_04", "sty_14"];
      } else if (query.includes("beard") || query.includes("grooming")) {
        matchedIds = ["sty_01", "sty_09", "sty_05", "sty_17"];
      } else if (query.includes("haircut") || query.includes("cut") || query.includes("scissors")) {
        matchedIds = ["sty_01", "sty_02", "sty_06", "sty_07", "sty_19"];
      }
    } else {
      // General fall-back
      responseText = "That sounds fascinating! To give you a high-status custom recommendation, please mention whether you are preparing for a wedding/engagement, looking for complex hair color shifts (like Balayage), or interested in precise cuts (like Korean Two-Blocks, classic beard crafts, or curls). I can match schedules immediately.";
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `ai_${Date.now()}`,
        sender: "ai",
        text: responseText,
        recommendedStylistIds: matchedIds.length > 0 ? matchedIds : undefined
      }
    ]);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setMessages((prev) => [
      ...prev,
      { id: `user_${Date.now()}`, sender: "user", text: userText }
    ]);
    setInputText("");

    setTimeout(() => {
      triggerAIResponse(userText);
    }, 1000);
  };

  const handleQuickPrompt = (promptText: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `user_${Date.now()}`, sender: "user", text: promptText }
    ]);
    setTimeout(() => {
      triggerAIResponse(promptText);
    }, 800);
  };

  const suggestions = [
    { text: "I need a hairstyle for my engagement.", label: "Engagement Ideas" },
    { text: "Who does authentic Korean Two-Block down perms?", label: "Korean Down Perms" },
    { text: "Looking for top zero-damage Balayage coloring.", label: "Balayage Colors" },
    { text: "Need a luxury executive scissor cut & beard alignment.", label: "Executive Grooming" }
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 font-sans" id="ai-concierge-page">
      
      {/* Header Info */}
      <div className="text-center mb-8 max-w-xl mx-auto">
        <div className="inline-flex items-center px-3 py-1 bg-white border border-[#C5A059]/30 rounded-full text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">
          Intelligent Concierge
        </div>
        <h1 className="mt-3 text-3xl font-extrabold text-black font-sans">
          Your Luxury Beauty Concierge
        </h1>
        <p className="mt-1.5 text-xs text-gray-500">
          Obtain custom guidance on beauty transitions, matching timings, or specialist availability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Quick Suggestion Sidebar (Left Column on desktop) */}
        <div className="md:col-span-4 space-y-4 text-left">
          <span className="block text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
            Quick Inquiries
          </span>
          <div className="space-y-2">
            {suggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleQuickPrompt(sug.text)}
                className="w-full text-left rounded-2xl border border-gray-100 bg-white hover:border-amber-300 p-4 shadow-sm hover:shadow-md transition-all text-xs text-gray-700 font-sans font-medium"
              >
                <div className="text-amber-600 font-bold mb-1 uppercase tracking-wider text-[9px]">
                  Prompt #{i+1} • {sug.label}
                </div>
                "{sug.text}"
              </button>
            ))}
          </div>
        </div>

        {/* Core Chat Sandbox (Right Column) */}
        <div className="md:col-span-8 flex flex-col h-[520px] rounded-3xl border border-gray-150 bg-white overflow-hidden shadow-sm">
          
          {/* Chat Panel Top Frame */}
          <div className="bg-neutral-50 px-6 py-4 border-b border-gray-100 flex items-center space-x-3 text-left">
            <div className="h-9 w-9 bg-black rounded-xl text-white flex items-center justify-center">
              <Bot className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-black">Beauty Concierge Consultant</h4>
              <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-widest flex items-center">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                Active Analysis
              </span>
            </div>
          </div>

          {/* Messages Feed View */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none bg-neutral-50/20">
            {messages.map((m) => {
              const isAi = m.sender === "ai";
              return (
                <div 
                  key={m.id} 
                  className={`flex flex-col ${isAi ? "items-start text-left" : "items-end text-right"} animate-in fade-in duration-250`}
                >
                  <div className="flex items-center space-x-2 text-gray-400 mb-1">
                    {isAi ? (
                      <>
                        <Bot className="h-4 w-4 text-amber-500" />
                        <span className="text-[9px] uppercase tracking-wider font-extrabold font-sans">CONCIERGE</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[9px] uppercase tracking-wider font-extrabold font-sans">YOU</span>
                        <User className="h-4 w-4 text-black" />
                      </>
                    )}
                  </div>

                  <div className={`rounded-2xl px-4 py-3 text-xs leading-relaxed max-w-[85%] font-sans ${
                    isAi 
                      ? "bg-white text-gray-800 border border-gray-100 shadow-sm"
                      : "bg-black text-white"
                  }`}>
                    <p>{m.text}</p>

                    {/* Integrated matches logic */}
                    {isAi && m.recommendedStylistIds && (
                      <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                        <span className="block text-[9px] font-extrabold uppercase text-amber-700 tracking-widest font-sans">Matched Stylists:</span>
                        <div className="space-y-1.5">
                          {m.recommendedStylistIds.map((id) => {
                            const stylist = STYLISTS.find((st) => st.id === id);
                            if (!stylist) return null;
                            return (
                              <div 
                                key={id} 
                                className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-150 p-2.5 hover:border-amber-400 transition-colors"
                              >
                                <div className="flex items-center space-x-2">
                                  <img 
                                    src={stylist.image} 
                                    alt={stylist.name} 
                                    className="h-7 w-7 rounded-lg object-cover" 
                                  />
                                  <div>
                                    <h5 className="font-bold text-[11px] text-gray-900">{stylist.name}</h5>
                                    <p className="text-[9px] text-gray-400 font-sans uppercase font-bold tracking-wider">{stylist.location} • Starts ₹{stylist.startingPrice}</p>
                                  </div>
                                </div>

                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => setView("profile", { stylistId: stylist.id })}
                                    className="rounded-lg bg-white border px-2 py-1 text-[9px] font-bold text-gray-700 hover:text-black hover:border-black transition-colors uppercase tracking-wider"
                                  >
                                    Profile
                                  </button>
                                  <button
                                    onClick={() => onBookNow(stylist)}
                                    className="rounded-lg bg-black text-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors"
                                  >
                                    Book
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Form Area */}
          <form onSubmit={handleSendMessage} className="bg-white px-6 py-4 border-t border-gray-100 flex items-center space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about wedding prep, down perms, balayage, or schedules..."
              className="w-full border border-gray-250 bg-white rounded-xl px-4 py-3 text-xs outline-none focus:border-amber-500 placeholder-gray-400 font-sans"
              id="concierge-input-text-bar"
            />
            <button
              type="submit"
              className="rounded-xl h-10 w-11 bg-black text-white flex items-center justify-center hover:bg-amber-600 active:scale-95 transition-all shrink-0"
              id="concierge-send-btn"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
