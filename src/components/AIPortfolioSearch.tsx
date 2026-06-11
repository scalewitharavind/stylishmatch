import { useState, useMemo } from "react";
import { Search, Image, ExternalLink, Sparkles, Camera, Compass } from "lucide-react";
import { STYLISTS } from "../data";
import { PortfolioItem } from "../types";

interface AIPortfolioSearchProps {
  setView: (view: string, extra?: { stylistId?: string }) => void;
}

export default function AIPortfolioSearch({ setView }: AIPortfolioSearchProps) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { id: "All", label: "All Inspirations" },
    { id: "Haircut", label: "Precision Cuts" },
    { id: "Color", label: "Color Transformations" },
    { id: "Bridal", label: "Bridal Couture" },
    { id: "Makeup", label: "HD & Glass Glows" },
    { id: "Grooming", label: "Executive Grooming" }
  ];

  const visualSuggestions = [
    { text: "Korean hairstyle", label: "Korean Styles" },
    { text: "Balayage", label: "Balayage Waves" },
    { text: "Bridal makeover", label: "Bridal Makeover" },
    { text: "Executive haircut", label: "Executive Crop" },
    { text: "Luxury beard", label: "Beard Sculpture" }
  ];

  // Aggregate all portfolios with correct references
  const allPortfolioItems = useMemo(() => {
    return STYLISTS.flatMap((s) => 
      s.portfolio.map((p) => ({
        ...p,
        stylistId: s.id,
        stylistName: s.name,
      }))
    );
  }, []);

  // Filter items matching search phrase and selected category tab
  const filteredFeed = useMemo(() => {
    let list = [...allPortfolioItems];

    if (activeCategory !== "All") {
      list = list.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (searchPhrase.trim()) {
      const q = searchPhrase.toLowerCase().trim();
      list = list.filter((item) => {
        const isDirectMatch = (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.stylistName.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        );
        if (isDirectMatch) return true;

        const fillerWords = ["i", "want", "a", "an", "the", "in", "for", "with", "needed", "need", "looking", "to", "find", "me", "show", "of"];
        const searchTerms = q.split(/[\s,\-/]+/).filter(w => w.length > 1 && !fillerWords.includes(w));
        
        if (searchTerms.length > 0) {
          return searchTerms.some(term => 
            item.title.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term) ||
            item.stylistName.toLowerCase().includes(term) ||
            item.tags.some((t) => t.toLowerCase().includes(term))
          );
        }
        return false;
      });
    }

    return list;
  }, [searchPhrase, activeCategory, allPortfolioItems]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 font-sans" id="ai-portfolio-search-page">
      
      {/* Title */}
      <div className="text-left mb-8">
        <div className="inline-flex items-center px-3 py-1 bg-white border border-[#C5A059]/30 rounded-full text-[10px] font-bold text-[#C5A059] uppercase tracking-widest mb-3">
          Visual Query Engine
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-black font-sans">
          AI-Powered Portfolio Search
        </h1>
        <p className="mt-1.5 text-xs text-gray-500">
          Query our visual asset records. Search by hairstyle outcome, transition category, color code, or styling inspiration.
        </p>
      </div>

      {/* Inputs Panel */}
      <div className="rounded-3xl border border-gray-150 p-6 bg-white shadow-sm space-y-4 mb-8">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center rounded-2xl border border-gray-200 bg-gray-50/50 p-2 focus-within:bg-white focus-within:border-[#C5A059] focus-within:ring-2 focus-within:ring-[#C5A059]/10 transition-all duration-300">
          <div className="flex pl-3 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
            placeholder="Type dynamic queries, e.g., 'Korean haircut', 'Balayage', 'bridal makeover'..."
            className="w-full border-0 bg-transparent px-3 py-3 text-xs text-black outline-none focus:ring-0 placeholder-gray-400 font-sans"
            id="portfolio-search-phrase-input"
          />
        </div>

        {/* Suggestion tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Aesthetic Queries:</span>
          {visualSuggestions.map((vs, idx) => (
            <button
              key={idx}
              onClick={() => setSearchPhrase(vs.text)}
              className="rounded-full bg-white border border-gray-150 hover:border-black text-gray-700 hover:text-black px-3.5 py-1 text-xs font-semibold tracking-wide transition-all"
            >
              {vs.label}
            </button>
          ))}
        </div>

        {/* Categories Tab selector */}
        <div className="border-t border-gray-100 pt-4 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
                  isSelected 
                    ? "bg-black text-white" 
                    : "bg-gray-50 border border-gray-200 text-gray-500 hover:text-black"
                }`}
                id={`portfolio-cat-${cat.id}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Portfolios Feed Grid (Visual grid displaying assets) */}
      {filteredFeed.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredFeed.map((p) => {
            return (
              <div 
                key={p.id} 
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-neutral-950 border border-gray-100 shadow-sm"
              >
                {/* Photo */}
                <img 
                  src={p.image} 
                  alt={p.title} 
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90" 
                />
                
                {/* Vignette Layer */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent p-5 text-left flex flex-col justify-end" />

                {/* Info Text */}
                <div className="absolute bottom-5 left-5 right-5 z-10 text-white text-left text-xs-left">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-amber-500/20 text-amber-300 border border-amber-500/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider shrink-0 font-mono">
                      {p.category}
                    </span>
                    <button
                      onClick={() => setView("profile", { stylistId: p.stylistId })}
                      className="text-[10px] text-amber-500 hover:text-white font-bold flex items-center space-x-0.5"
                    >
                      <span>Creator profile</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>

                  <h3 className="mt-2 font-sans font-extrabold text-base text-white tracking-tight lead-snug">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-neutral-300 text-[11px] font-sans line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-white">
                    <div>
                      <span className="block text-[8px] uppercase tracking-wider text-neutral-400">Created by</span>
                      <span className="font-extrabold text-[11px] text-amber-400">{p.stylistName}</span>
                    </div>

                    <button
                      onClick={() => setView("profile", { stylistId: p.stylistId })}
                      className="rounded-full bg-white text-black px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider hover:bg-amber-500 transition-colors"
                    >
                      Consult Creator
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty Feed */
        <div className="text-center py-20 rounded-3xl border border-dashed border-gray-200 bg-neutral-50 max-w-lg mx-auto space-y-4">
          <Camera className="h-12 w-12 text-gray-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-sans font-bold text-lg text-black">No portfolio results found</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              No creations match that description yet. Search for 'Balayage', 'Korean', or 'Bridal' to inspect top results.
            </p>
          </div>
          <button
            onClick={() => setSearchPhrase("")}
            className="rounded-full bg-black text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}

    </div>
  );
}
