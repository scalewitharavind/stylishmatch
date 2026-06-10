import { useState } from "react";
import { Star, MapPin, Award, Calendar, Check, AlertCircle, ShoppingBag, ShieldCheck, Heart, Sparkles, Clock, ChevronRight } from "lucide-react";
import { Stylist, Service } from "../types";

interface StylistProfileViewProps {
  stylist: Stylist;
  onBookNow: (stylist: Stylist, service?: Service) => void;
  savedStylists: string[];
  onSaveToggle: (id: string) => void;
  setView: (view: string) => void;
}

export default function StylistProfileView({
  stylist,
  onBookNow,
  savedStylists,
  onSaveToggle,
  setView
}: StylistProfileViewProps) {
  const [activeTab, setActiveTab] = useState<"services" | "portfolio" | "reviews">("services");
  const isSaved = savedStylists.includes(stylist.id);

  const matchedScore = stylist.aiAnalysis?.matchScore || 96;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 font-sans" id="stylist-profile-page">
      
      {/* Back button */}
      <button 
        onClick={() => setView("marketplace")}
        className="flex items-center space-x-1.5 text-xs font-bold text-gray-400 hover:text-black uppercase tracking-wider mb-6"
        id="profile-back-btn"
      >
        <span>← Back to Discovery</span>
      </button>

      {/* Main Bento Profile Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Left Column: Huge Portrait */}
        <div className="lg:col-span-4 relative rounded-3xl overflow-hidden aspect-[4/5] bg-gray-50 shadow-md">
          <img 
            src={stylist.image} 
            alt={stylist.name} 
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-top" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <button
            onClick={() => onSaveToggle(stylist.id)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-amber-500 shadow-md hover:scale-110 active:scale-95 transition-all"
            id={`profile-save-btn-${stylist.id}`}
          >
            <Star className={`h-5 w-5 ${isSaved ? "fill-amber-500 text-amber-500" : "text-gray-400"}`} />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white text-left">
            <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400">
              {stylist.salonName}
            </span>
            <h1 className="mt-1 font-sans font-extrabold text-2xl tracking-tight text-white">
              {stylist.name}
            </h1>
            <p className="text-xs text-neutral-300 mt-1 flex items-center">
              <MapPin className="h-4 w-4 text-amber-500 mr-1 shrink-0" />
              <span>{stylist.location} District, Bangalore</span>
            </p>
          </div>
        </div>

        {/* Right Column: Key Details & Certs */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-6">
              <div>
                <span className="block text-[10px] text-gray-400 uppercase tracking-widest">Experience</span>
                <span className="font-sans font-extrabold text-black text-xl">{stylist.experience} Years</span>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <span className="block text-[10px] text-gray-400 uppercase tracking-widest">Rating</span>
                <span className="font-sans font-extrabold text-black text-xl flex items-center">
                  <Star className="h-4.5 w-4.5 fill-amber-500 text-amber-500 mr-1 shrink-0" />
                  <span>{stylist.rating}</span>
                </span>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <span className="block text-[10px] text-gray-400 uppercase tracking-widest">Reviews</span>
                <span className="font-sans font-extrabold text-black text-xl">{stylist.reviewsCount} clients</span>
              </div>
            </div>

            {/* AI Match Gauge */}
            <div className="inline-flex items-center space-x-3 bg-amber-50/50 rounded-2xl border border-amber-200/40 px-4 py-2 shadow-sm">
              <div className="text-right">
                <span className="block text-[9px] uppercase tracking-widest font-extrabold text-amber-800">Recommend match</span>
                <span className="text-lg font-black font-sans text-amber-600">{matchedScore}%</span>
              </div>
              <div className="h-9 w-9 bg-amber-500 text-white rounded-full flex items-center justify-center">
                <Sparkles className="h-4.5 w-4.5 animate-pulse" />
              </div>
            </div>
          </div>

          {/* About & Bio */}
          <div className="space-y-2 text-left">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-black">Professional Biography</h3>
            <p className="text-xs text-gray-400 font-sans italic">"{stylist.bio}"</p>
            <p className="text-sm text-gray-600 leading-relaxed font-sans">{stylist.about}</p>
          </div>

          {/* Specializations & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-left">
            {/* Specializations */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-black">Aesthetic Specialties</h4>
              <div className="flex flex-wrap gap-1.5">
                {stylist.specialization.map((spec, i) => (
                  <span key={i} className="rounded-full bg-gray-50 border border-gray-150 px-3 py-1 text-xs font-semibold text-gray-800">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Evidence of Excellence */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-black">Verified Credentials</h4>
              <ul className="space-y-1.5">
                {stylist.certifications.map((cert, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-start">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span className="font-sans font-medium">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Direct booking shortcut bar */}
          <div className="rounded-2xl bg-neutral-950 p-4 flex items-center justify-between text-white shadow-md text-left">
            <div>
              <span className="block text-[9px] uppercase text-neutral-400 tracking-wider">Starting rate</span>
              <span className="text-base font-extrabold text-white">Starts at ₹{stylist.startingPrice}</span>
            </div>
            <button
              onClick={() => onBookNow(stylist)}
              className="rounded-full bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold uppercase tracking-wider px-6 py-2.5 transition-colors"
              id="profile-fast-book"
            >
              Book Consultation
            </button>
          </div>

        </div>

      </div>

      {/* AI REVIEW SUMMARY FEATURE (Insights block requested!) */}
      <section className="rounded-3xl border border-amber-300 bg-amber-50/10 p-6 sm:p-8 mb-12 shadow-sm relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 h-24 w-24 bg-amber-500/5 rounded-bl-full flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-amber-500/70" />
        </div>
        
        <div className="inline-flex items-center space-x-1.5 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-800 uppercase tracking-wide">
          <Sparkles className="h-3.5 w-3.5 mr-1" /> AI REVIEW INTELLIGENCE SUMMARY
        </div>
        
        <h3 className="mt-3 font-sans font-extrabold text-lg sm:text-xl text-black">
          Client Sentiment & Transparency Report
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          Our model analyzed {stylist.reviewsCount} customer reviews to generate a sentiment summary.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {/* Customers Love */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 flex items-center space-x-1">
              <Check className="h-4 w-4 text-emerald-600 mr-1" />
              <span>Customers Love:</span>
            </h4>
            <ul className="space-y-2">
              {stylist.aiAnalysis.pros.map((pro, i) => (
                <li key={i} className="text-xs text-gray-700 bg-emerald-500/5 rounded-xl border border-emerald-500/10 p-3 flex items-start">
                  <div className="mr-2 h-4 w-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</div>
                  <span className="font-sans font-medium">{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Customers Mention */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-800 flex items-center space-x-1">
              <AlertCircle className="h-4 w-4 text-amber-600 mr-1" />
              <span>Customers Mention:</span>
            </h4>
            <ul className="space-y-2">
              {stylist.aiAnalysis.cons.map((con, i) => (
                <li key={i} className="text-xs text-gray-700 bg-amber-500/5 rounded-xl border border-amber-500/10 p-3 flex items-start">
                  <div className="mr-2 h-4 w-4 bg-amber-500 text-black rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">!</div>
                  <span className="font-sans font-medium">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tabs Menu: Services offered, Portfolio Gallery, Client Reviews */}
      <div className="border-b border-gray-100 mb-8 flex items-center space-x-8">
        {[
          { tab: "services", label: "Book Services" },
          { tab: "portfolio", label: `Portfolio (${stylist.portfolio?.length || 0})` },
          { tab: "reviews", label: `Reviews (${stylist.reviews?.length || 0})` }
        ].map((t) => (
          <button
            key={t.tab}
            onClick={() => setActiveTab(t.tab as any)}
            className={`pb-4 text-sm font-bold tracking-wider uppercase relative ${
              activeTab === t.tab 
                ? "text-black border-b-2 border-black" 
                : "text-gray-400 hover:text-gray-800"
            }`}
            id={`profile-tab-${t.tab}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Active Tab Panels */}
      <div>
        
        {/* SERVICES TAB */}
        {activeTab === "services" && (
          <div className="space-y-4 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stylist.services.map((service) => (
                <div 
                  key={service.id} 
                  className="rounded-2xl border border-gray-100 bg-white p-5 hover:border-gray-300 transition-colors flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-amber-600 tracking-wider font-mono">
                      {service.category}
                    </span>
                    <h4 className="font-sans font-bold text-base text-gray-900">{service.name}</h4>
                    <span className="text-xs text-gray-400 flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" /> {service.duration}
                    </span>
                  </div>

                  <div className="text-right flex items-center space-x-4">
                    <div>
                      <span className="block text-[8px] text-gray-400 uppercase tracking-wider font-semibold">Bespoke price</span>
                      <span className="font-sans font-extrabold text-black text-base">₹{service.price}</span>
                    </div>
                    <button
                      onClick={() => onBookNow(stylist, service)}
                      className="rounded-full bg-black hover:bg-amber-600 text-white hover:text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
                      id={`book-service-${service.id}`}
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PORTFOLIO TAB */}
        {activeTab === "portfolio" && (
          <div>
            {stylist.portfolio.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {stylist.portfolio.map((p) => (
                  <div key={p.id} className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-50 shadow-sm border border-gray-100">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent text-left opacity-90 group-hover:opacity-100 transition-all flex flex-col justify-end p-5 text-white" />
                    
                    <div className="absolute bottom-5 left-5 right-5 text-white text-left z-10">
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">{p.category}</span>
                      <h4 className="mt-1 font-sans font-bold text-base">{p.title}</h4>
                      <p className="text-[11px] text-gray-300 font-sans line-clamp-2 leading-relaxed mt-1">
                        {p.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-xs text-gray-400">Images are currently updating from portfolio directories...</p>
              </div>
            )}
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div className="space-y-6 text-left max-w-4xl">
            {stylist.reviews.length > 0 ? (
              <div className="space-y-4">
                {stylist.reviews.map((r) => (
                  <div key={r.id} className="rounded-2xl border border-gray-100 p-5 space-y-3 bg-white shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-full bg-amber-50 text-amber-700 font-bold text-xs flex items-center justify-center">
                          {r.userName[0]}
                        </div>
                        <div>
                          <h4 className="font-sans font-bold text-xs text-black">{r.userName}</h4>
                          <span className="text-[10px] text-gray-400">{r.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1">
                        {[...Array(r.rating)].map((_, idx) => (
                          <Star key={idx} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed font-sans">{r.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-xs text-gray-400">Be the first to leave a premium review after completing booking.</p>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
