import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, MapPin, Grid, RefreshCw, Sparkles } from "lucide-react";
import { STYLISTS } from "../data";
import { Stylist } from "../types";
import StylistCard from "./StylistCard";

interface MarketplaceProps {
  currentCategory?: string;
  setView: (view: string, extra?: { stylistId?: string }) => void;
  onBookNow: (stylist: Stylist) => void;
  savedStylists: string[];
  onSaveToggle: (id: string) => void;
  initialSearchText?: string;
  stylists?: Stylist[];
}

export default function Marketplace({
  currentCategory = "All",
  setView,
  onBookNow,
  savedStylists,
  onSaveToggle,
  initialSearchText = "",
  stylists
}: MarketplaceProps) {
  
  const [searchText, setSearchText] = useState(initialSearchText);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("best-match");

  // Sync initialSearchText when it changes from the parent
  useEffect(() => {
    setSearchText(initialSearchText);
  }, [initialSearchText]);

  const categories = [
    { id: "All", label: "All Crafts" },
    { id: "haircut", label: "Hair Specialists" },
    { id: "bridal", label: "Bridal Research" },
    { id: "grooming", label: "Men's Grooming" },
    { id: "color", label: "Hair Coloring" },
    { id: "luxury", label: "Luxury Styling" },
    { id: "makeup", label: "Makeup Artists" }
  ];

  const locations = [
    "All",
    "Indiranagar",
    "Koramangala",
    "HSR Layout",
    "Whitefield",
    "Jayanagar",
    "MG Road",
    "Malleshwaram",
    "Sadashivanagar"
  ];

  // Core Filtering & Sorting Logic (using useMemo for performance)
  const filteredStylists = useMemo(() => {
    let list = [...(stylists || STYLISTS)];

    // 1. Text Search Match Heuristics
    if (searchText.trim()) {
      const q = searchText.toLowerCase().trim();
      list = list.filter((s) => {
        // Direct matching
        const isDirectMatch = (
          s.name.toLowerCase().includes(q) ||
          s.salonName.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.specialization.some((spec) => spec.toLowerCase().includes(q)) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
        );
        if (isDirectMatch) return true;

        // Custom word-based smart matching
        const fillerWords = ["i", "want", "a", "an", "the", "in", "for", "with", "needed", "need", "looking", "style", "styling", "styles", "hairstyle", "hair", "haircuts", "haircut", "artist", "practitioner", "makeover", "makeovers"];
        const searchTerms = q.split(/[\s,\-/]+/).filter(w => w.length > 1 && !fillerWords.includes(w));
        
        if (searchTerms.length > 0) {
          return searchTerms.some(term => 
            s.name.toLowerCase().includes(term) ||
            s.salonName.toLowerCase().includes(term) ||
            s.location.toLowerCase().includes(term) ||
            s.specialization.some((spec) => spec.toLowerCase().includes(term)) ||
            s.tags.some((t) => t.toLowerCase().includes(term))
          );
        }
        return false;
      });
    }

    // 2. Category Filters (mapped from ID to tags/categories)
    if (selectedFilter !== "All") {
      list = list.filter((s) => {
        if (selectedFilter === "haircut") {
          return s.tags.includes("straight") || s.tags.includes("curly") || s.tags.includes("wavy") || s.specialization.some(sp => sp.toLowerCase().includes("haircut") || sp.toLowerCase().includes("cut"));
        }
        if (selectedFilter === "bridal") {
          return s.tags.includes("bridal") || s.tags.includes("wedding");
        }
        if (selectedFilter === "grooming") {
          return s.tags.includes("grooming");
        }
        if (selectedFilter === "color") {
          return s.tags.includes("color") || s.tags.includes("balayage") || s.tags.includes("highlight");
        }
        if (selectedFilter === "luxury") {
          return s.priceRange === "₹₹₹₹ (Ultra-Luxury)" || s.specialization.some(s => s.toLowerCase().includes("luxury"));
        }
        if (selectedFilter === "makeup") {
          return s.tags.includes("makeup");
        }
        return true;
      });
    }

    // 3. Location Filter
    if (selectedLocation !== "All") {
      list = list.filter(
        (s) => s.location.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    // 4. Sorting logic
    if (sortBy === "highest-rated") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "most-experienced") {
      list.sort((a, b) => b.experience - a.experience);
    } else if (sortBy === "trending") {
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else {
      // "best-match" is our default (simulates highest AI score metrics)
      list.sort((a, b) => {
        const scoreA = a.aiAnalysis?.matchScore || 90;
        const scoreB = b.aiAnalysis?.matchScore || 90;
        return scoreB - scoreA;
      });
    }

    return list;
  }, [searchText, selectedFilter, selectedLocation, sortBy]);

  const handleResetFilters = () => {
    setSearchText("");
    setSelectedFilter("All");
    setSelectedLocation("All");
    setSortBy("best-match");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 font-sans" id="marketplace-discovery-page">
      
      {/* Page Header */}
      <div className="mb-10 text-left">
        <div className="inline-flex items-center px-3 py-1 bg-white border border-[#C5A059]/30 rounded-full text-[10px] font-bold text-[#C5A059] uppercase tracking-widest mb-3">
          Premium Discovery
        </div>
        <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-black">
          The Luxury Stylist Marketplace
        </h1>
        <p className="mt-1.5 text-xs text-gray-500">
          Filter and discover Bangalore's top independent beauty practitioners by specialized craft, regional district, and proven portfolios.
        </p>
      </div>

      {/* Filter and search bar layout */}
      <div className="sticky top-20 z-10 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-150 p-4 shadow-sm mb-8 space-y-4">
        
        {/* Row 1: Search Input & Sorting */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Dynamic Search Box */}
          <div className="relative flex items-center w-full md:max-w-md rounded-xl border border-gray-250 bg-white px-3 py-2 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-50 transition-colors">
            <Search className="h-4.5 w-4.5 text-gray-400 shrink-0" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by name, specialty, style, e.g. 'balayage'..."
              className="w-full border-0 bg-transparent px-3 text-xs text-black outline-none focus:ring-0"
              id="marketplace-search-input"
            />
          </div>

          {/* District Selector & Sporter */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
            
            {/* Location Selector */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">District:</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="rounded-xl border border-gray-250 bg-white px-3 py-2 text-xs font-medium text-gray-800 outline-none focus:border-amber-500 w-full sm:w-40"
                id="location-filter-select"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorter Selector */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-gray-250 bg-white px-3 py-2 text-xs font-medium text-gray-800 outline-none focus:border-amber-500 w-full sm:w-44"
                id="sort-filter-select"
              >
                <option value="best-match">👑 Best Match (AI Recommended)</option>
                <option value="highest-rated">⭐ Highest Rated</option>
                <option value="most-experienced">💼 Most Experienced</option>
                <option value="trending">🔥 Trending / Active</option>
              </select>
            </div>

          </div>

        </div>

        {/* Row 2: Category Filters (Luxury chips) */}
        <div className="border-t border-gray-100 pt-3 flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-none">
          <div className="flex gap-2">
            {categories.map((cat) => {
              const isSelected = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                    isSelected
                      ? "bg-black text-white shadow-sm"
                      : "bg-gray-50 border border-gray-150 text-gray-500 hover:text-black hover:bg-gray-100"
                  }`}
                  id={`craft-filter-${cat.id}`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {(searchText || selectedFilter !== "All" || selectedLocation !== "All") && (
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-bold text-amber-700 hover:text-black flex items-center space-x-1 uppercase tracking-wider"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Clear filters</span>
            </button>
          )}
        </div>

      </div>

      {/* Grid of Results */}
      {filteredStylists.length > 0 ? (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredStylists.map((stylist) => (
            <StylistCard
              key={stylist.id}
              stylist={stylist}
              onViewProfile={(id) => setView("profile", { stylistId: id })}
              onBookNow={onBookNow}
              onSaveToggle={onSaveToggle}
              isSaved={savedStylists.includes(stylist.id)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 rounded-3xl border border-dashed border-gray-200 bg-neutral-50 max-w-xl mx-auto space-y-4">
          <SlidersHorizontal className="h-12 w-12 text-gray-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-sans font-bold text-lg text-black">No matching luxury stylists</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              We couldn't locate any stylists matching those selections. Try shifting location tags or clearing search parameters.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="rounded-full bg-black hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
