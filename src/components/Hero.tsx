import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Search, MapPin, Star, UserCheck } from "lucide-react";

interface HeroProps {
  onFindStylist: () => void;
  onExploreStylists: () => void;
  onSearchQuerySubmit: (query: string) => void;
}

export default function Hero({ onFindStylist, onExploreStylists, onSearchQuerySubmit }: HeroProps) {
  const placeholders = [
    "I want a layered haircut for thick hair",
    "Looking for a bridal makeup artist",
    "Need a luxury beard makeover",
    "I want a premium Korean hairstyle",
    "Looking for a French ash balayage"
  ];

  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [typedQuery, setTypedQuery] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryToSend = typedQuery.trim() || placeholders[placeholderIdx];
    onSearchQuerySubmit(queryToSend);
  };

  const trendingSuggestions = [
    "Korean hairstyle",
    "Balayage waves",
    "Bridal makeover",
    "Executive haircut",
    "Luxury beard styling"
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white pb-16 pt-20 sm:pb-24 sm:pt-28" id="hero-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-12 lg:items-center">
          
          {/* Left Column - Sophisticated Typography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center px-3 py-1 bg-white border border-[#C5A059]/30 rounded-full text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">
              Bangalore's Premier Network
            </div>

            <h1 className="font-sans font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.1]">
              Find Bangalore's <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-[#C5A059] to-black">Perfect</span> Luxury Stylist with AI
            </h1>

            <p className="font-sans text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              Your beauty goals, hair type, and occasion analyzed by our AI to match you with top-tier professionals in your neighborhood. Choose handcrafted mastery over generic salons.
            </p>

            {/* AI Search Engine Bar - Interactive design */}
            <form onSubmit={handleSearchSubmit} className="mt-8 max-w-xl">
              <div className="relative flex items-center rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-gray-100 hover:border-[#C5A059] focus-within:border-[#C5A059] focus-within:ring-2 focus-within:ring-[#C5A059]/20 transition-all duration-300">
                <div className="flex pl-3 text-gray-400">
                  <Search className="h-5 w-5 text-[#C5A059]" />
                </div>
                <input
                  type="text"
                  value={typedQuery}
                  onChange={(e) => setTypedQuery(e.target.value)}
                  placeholder={placeholders[placeholderIdx]}
                  className="w-full border-0 bg-transparent px-3 py-3 text-sm text-black outline-none placeholder-gray-400 focus:ring-0"
                  id="hero-ai-search-input"
                />
                <button
                  type="submit"
                  className="flex items-center space-x-1 rounded-xl bg-black px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C5A059] transition-colors"
                >
                  <span>Match</span>
                  <Sparkles className="h-4 w-4 text-[#C5A059]" />
                </button>
              </div>

              {/* Suggestions */}
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-xs text-gray-400 font-medium font-sans">Suggestions:</span>
                {trendingSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setTypedQuery(suggestion);
                      onSearchQuerySubmit(suggestion);
                    }}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-[#C5A059]/20 hover:text-black transition-colors font-sans"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onFindStylist}
                className="flex items-center justify-center space-x-2 rounded-full bg-black px-8 py-4 text-sm font-semibold tracking-wider text-white hover:bg-[#C5A059] hover:shadow-lg active:scale-95 transition-all duration-200 group"
                id="hero-match-cta"
              >
                <span>Find My Stylist</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onExploreStylists}
                className="flex items-center justify-center space-x-2 rounded-full border border-gray-200 bg-white px-8 py-4 text-sm font-semibold tracking-wider text-gray-800 hover:border-black hover:bg-gray-50 active:scale-95 transition-all duration-200"
                id="hero-explore-cta"
              >
                <span>Explore Stylists</span>
              </button>
            </div>
          </div>

          {/* Right Column - Premium floating card elements representing modern startup outcomes */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Background design accents */}
            <div className="absolute -top-12 -left-12 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl -z-10" />
            <div className="absolute -bottom-12 -right-12 h-72 w-72 rounded-full bg-gray-200/50 blur-3xl -z-10" />

            <div className="relative w-full max-w-sm rounded-[2.5rem] border border-gray-100 bg-white p-6 shadow-2xl transition-all duration-500 hover:rotate-1">
              
              {/* Premium image representing luxury haircut service */}
              <div className="overflow-hidden rounded-[1.8rem] aspect-square bg-gray-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&auto=format&fit=crop&q=80"
                  alt="Luxury Haircut"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Stylist Label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs font-semibold text-amber-400 font-sans tracking-wide">MATCH OF THE MONTH</p>
                    <p className="font-extrabold text-sm tracking-tight font-sans">Priya Murthy</p>
                  </div>
                  <div className="bg-amber-500/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center space-x-1 text-xs font-bold text-black">
                    <Star className="h-3 w-3 fill-black text-black" />
                    <span>4.95</span>
                  </div>
                </div>
              </div>

              {/* Floating AI Match Badge */}
              <div className="absolute -top-4 -right-4 rounded-2xl bg-black border border-amber-400 p-4 shadow-xl text-white flex flex-col items-center justify-center animate-bounce">
                <Sparkles className="h-5 w-5 text-amber-400 mb-1" />
                <span className="text-[10px] uppercase font-bold text-gray-300 tracking-wider">AI MATCH SCORE</span>
                <span className="text-xl font-extrabold font-mono text-amber-400">97%</span>
              </div>

              {/* Floating review card in front */}
              <div className="absolute -bottom-6 -left-6 max-w-[210px] rounded-xl border border-gray-100 bg-white/95 backdrop-blur-md p-3.5 shadow-lg flex items-start space-x-2">
                <div className="h-8 w-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-xs shrink-0">
                  <UserCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Client Insight</p>
                  <p className="text-[11px] font-medium text-gray-900 leading-snug">"Priya's Korean layered cut completely transformed my hair volume!"</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
