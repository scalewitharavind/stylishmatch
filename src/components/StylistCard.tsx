import { Star, MapPin, Sparkles, Award, ArrowRight } from "lucide-react";
import { Stylist } from "../types";

interface StylistCardProps {
  key?: string;
  stylist: Stylist;
  onViewProfile: (id: string) => void;
  onBookNow: (stylist: Stylist) => void;
  customButtonLabel?: string;
  onSaveToggle?: (id: string) => void;
  isSaved?: boolean;
}

export default function StylistCard({
  stylist,
  onViewProfile,
  onBookNow,
  customButtonLabel,
  onSaveToggle,
  isSaved
}: StylistCardProps) {
  // Random or pre-calculated matching vector for aesthetic display
  const matchScore = stylist.aiAnalysis?.matchScore || Math.floor(Math.random() * 15) + 84;

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:border-gray-200 hover:border-b-[#C5A059]/50 border-b-4 border-b-[#C5A059]/20 transition-all duration-300 transform hover:-translate-y-1"
      id={`stylist-card-${stylist.id}`}
    >
      
      {/* Img Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 rounded-t-[2.5] m-1 rounded-[1.8rem]">
        <img
          src={stylist.image}
          alt={stylist.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          {/* Location Area */}
          <div className="flex items-center space-x-1 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-black shadow-sm tracking-tight">
            <MapPin className="h-3 w-3 text-[#C5A059]" />
            <span>{stylist.location}</span>
          </div>

          {/* Experience Badge */}
          <div className="flex items-center space-x-1 rounded-full bg-black/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white shadow-sm tracking-tight">
            <Award className="h-3 w-3 text-[#C5A059]" />
            <span>{stylist.experience} Yrs Exp</span>
          </div>
        </div>

        {/* Match Score Gauge over Image */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1.5 text-[10px] font-black text-black border border-[#C5A059]/40 shadow-md">
            <Sparkles className="h-3.5 w-3.5 text-[#C5A059] animate-pulse" />
            <span className="tracking-tighter">{matchScore}% AI Match</span>
          </div>

          {onSaveToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSaveToggle(stylist.id);
              }}
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/95 backdrop-blur-md text-[#C5A059] shadow-md hover:scale-110 active:scale-90 transition-all border border-[#C5A059]/10"
              id={`save-btn-${stylist.id}`}
            >
              <Star className={`h-4 w-4 ${isSaved ? "fill-[#C5A059] text-[#C5A059]" : "text-gray-400"}`} />
            </button>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2 text-left">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#C5A059] font-sans">
              {stylist.salonName}
            </span>
            <h3 className="mt-1 font-sans font-extrabold text-base leading-tight text-black group-hover:text-[#C5A059] transition-colors">
              {stylist.name}
            </h3>
          </div>
          
          <div className="flex items-center space-x-0.5 rounded-lg bg-gray-50/50 px-2 py-0.5 text-xs font-bold text-black border border-gray-100 shrink-0">
            <Star className="h-3.5 w-3.5 fill-[#C5A059] text-[#C5A059] mr-0.5" />
            <span>{stylist.rating}</span>
          </div>
        </div>

        {/* Specialized Chips */}
        <div className="mt-2.5 flex flex-wrap gap-1 text-left">
          {stylist.specialization.slice(0, 3).map((spec, i) => (
            <span 
              key={i} 
              className="rounded-full bg-white border border-[#C5A059]/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-tight text-[#C5A059]/90 font-sans"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* AI Explainer Short Snippet */}
        <p className="mt-3.5 flex-1 text-xs text-gray-500 italic font-sans line-clamp-2 text-left leading-relaxed">
          "{stylist.aiAnalysis?.matchExplainer || `Highly recommended due to premium ${stylist.specialization[0]} expertise in ${stylist.location}.`}"
        </p>

        {/* Starting Price and Action Area */}
        <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-left">
          <div>
            <span className="block text-[9px] text-gray-400 uppercase tracking-widest font-sans font-extrabold">Starting rate</span>
            <span className="font-sans font-extrabold text-black text-sm">₹{stylist.startingPrice}</span>
          </div>

          <div className="flex space-x-1.5">
            <button
              onClick={() => onViewProfile(stylist.id)}
              className="rounded-xl bg-gray-100 hover:bg-gray-200 px-3.5 py-2 text-[11px] font-bold text-black transition-colors"
            >
              Profile
            </button>
            <button
              onClick={() => onBookNow(stylist)}
              className="flex items-center space-x-1 rounded-xl bg-black hover:bg-[#C5A059] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition-all duration-200 group/btn"
            >
              <span>{customButtonLabel || "Book"}</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
