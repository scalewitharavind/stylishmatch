import { useState, useEffect } from "react";
import { Sparkles, Calendar, ChevronRight, ChevronLeft, MapPin, Star, Heart, Check, RefreshCw, UserCheck } from "lucide-react";
import { STYLISTS } from "../data";
import { Stylist, SearchCriteria } from "../types";

interface AIStylistFinderProps {
  initialQuery?: string;
  onBookNow: (stylist: Stylist) => void;
  setView: (view: string, extra?: { stylistId?: string }) => void;
}

export default function AIStylistFinder({ initialQuery = "", onBookNow, setView }: AIStylistFinderProps) {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<{ stylist: Stylist; calculatedScore: number; explainer: string }[]>([]);

  const [criteria, setCriteria] = useState<SearchCriteria>({
    hairType: "straight",
    occasion: "corporate",
    gender: "female",
    budget: "₹5000–10000",
    preferredArea: "indiranagar",
    desiredStyle: initialQuery
  });

  const hairTypes = [
    { id: "straight", label: "Straight", desc: "Fine, sleek, or flat roots" },
    { id: "curly", label: "Curly", desc: "Tight, coarse, or springy coils" },
    { id: "wavy", label: "Wavy", desc: "Natural beach loops, loose body" },
    { id: "thick", label: "Thick", desc: "High density, coarse fibers" },
    { id: "thin", label: "Thin", desc: "Fine, delicate strands needing volume" }
  ];

  const occasions = [
    { id: "daily", label: "Daily Refresh", desc: "Easy, everyday effortless maintenance" },
    { id: "corporate", label: "Corporate Elite", desc: "Executive presentations & business keynotes" },
    { id: "wedding", label: "Bridal/Groom D-Day", desc: "High fidelity, long-duration wedding wear" },
    { id: "engagement", label: "Engagement Portrait", desc: "Photogenic soft-glam preparation" },
    { id: "party", label: "High Society Party", desc: "Bold, modern creative transformation" },
    { id: "photoshoot", label: "Editorial Photoshoot", desc: "Runway-ready portfolio framing" }
  ];

  const genders = ["female", "male", "other"];

  const budgets = [
    { id: "₹2000–5000", label: "₹2000 – ₹5000", desc: "Premium styling" },
    { id: "₹5000–10000", label: "₹5000 – ₹10000", desc: "Elite / Luxury styling" },
    { id: "₹10000+", label: "₹10,000+", desc: "Ultra-Luxury custom packages" }
  ];

  const areas = [
    "indiranagar",
    "koramangala",
    "hsr layout",
    "whitefield",
    "jayanagar",
    "mg road",
    "malleshwaram",
    "sadashivanagar"
  ];

  // Auto-run search if initialQuery is passed through search bar
  useEffect(() => {
    if (initialQuery) {
      setCriteria(prev => ({ ...prev, desiredStyle: initialQuery }));
      processMatching(initialQuery);
    }
  }, [initialQuery]);

  const processMatching = (forceQueryText?: string) => {
    setLoading(true);
    setStep(4); // Move directly to results screen/loading state

    setTimeout(() => {
      const activeQuery = (forceQueryText !== undefined ? forceQueryText : criteria.desiredStyle).toLowerCase();
      
      const matchedScores = STYLISTS.map((stylist) => {
        let score = 70; // Base score

        // 1. Gender alignment
        if (criteria.gender === "male" && stylist.tags.includes("male")) {
          score += 15;
        } else if (criteria.gender === "female" && stylist.tags.includes("female")) {
          score += 15;
        } else if (criteria.gender === "male" && stylist.tags.includes("grooming")) {
          score += 10;
        }

        // 2. Location alignment
        if (stylist.location.toLowerCase() === criteria.preferredArea.toLowerCase()) {
          score += 20;
        } else if (["indiranagar", "mg road", "koramangala"].includes(stylist.location.toLowerCase()) && 
                   ["indiranagar", "mg road", "koramangala"].includes(criteria.preferredArea.toLowerCase())) {
          score += 8; // high proximity areas
        }

        // 3. Hair Type tags
        if (stylist.tags.includes(criteria.hairType)) {
          score += 10;
        }

        // 4. Occasion alignment
        const isWedding = ["wedding", "engagement"].includes(criteria.occasion);
        if (isWedding && stylist.tags.includes("wedding")) {
          score += 12;
        }
        if (isWedding && stylist.tags.includes("bridal")) {
          score += 12;
        }
        if (criteria.occasion === "corporate" && stylist.tags.includes("executive")) {
          score += 12;
        }

        // 5. Budget alignment
        if (criteria.budget === "₹2000–5000" && stylist.startingPrice <= 3500) {
          score += 10;
        } else if (criteria.budget === "₹5000–10000" && stylist.startingPrice > 3000 && stylist.startingPrice <= 6500) {
          score += 10;
        } else if (criteria.budget === "₹10000+" && stylist.startingPrice >= 6000) {
          score += 15;
        } else {
          score -= 5; // slight misalignment penalty
        }

        // 6. Free text heuristic matches
        let specificMatchNote = "";
        if (activeQuery) {
          if (activeQuery.includes("korean") && stylist.tags.includes("korean")) {
            score += 25;
            specificMatchNote = "specialized in authentic Korean layered systems and down perms";
          }
          if (activeQuery.includes("balayage") && stylist.tags.includes("balayage")) {
            score += 25;
            specificMatchNote = "highly requested for hand-painted multi-tonal French balayages";
          }
          if ((activeQuery.includes("beard") || activeQuery.includes("shave")) && stylist.tags.includes("grooming")) {
            score += 25;
            specificMatchNote = "a classic master for razor-sharp beard shaping and hot-towel treatments";
          }
          if (activeQuery.includes("bridal") || activeQuery.includes("wedding") || activeQuery.includes("saree")) {
            if (stylist.tags.includes("bridal") || stylist.tags.includes("wedding")) {
              score += 25;
              specificMatchNote = "renowned as a top-tier bridal cosmetics lead for 4K video photography";
            }
          }
          if (activeQuery.includes("crop") || activeQuery.includes("executive") || activeQuery.includes("fade") || activeQuery.includes("men")) {
            if (stylist.tags.includes("executive") || stylist.tags.includes("grooming")) {
              score += 20;
              specificMatchNote = "highly demanded for sharp executive cuts and classic corporate profiles";
            }
          }
          if (activeQuery.includes("curl") && stylist.tags.includes("curly")) {
            score += 25;
            specificMatchNote = "accredited expert for dry-cutting curly textures (DevaCut certified)";
          }
        }

        // Bound scores
        if (score > 99) score = 99;
        if (score < 60) score = 60 + Math.floor(Math.random() * 10);

        // Generate dynamic explanation
        let explainerSentence = "";
        if (specificMatchNote) {
          explainerSentence = `Recommended because ${stylist.name} is ${specificMatchNote}, matching your custom text preference of "${criteria.desiredStyle}".`;
        } else {
          explainerSentence = `Highly recommended because this stylist specializes in styled cuts, works extensively with ${criteria.hairType} hair, and frequently serves ${criteria.occasion === 'corporate' ? 'corporate professionals' : criteria.occasion === 'wedding' ? 'brides/grooms' : 'high-society residents'} in Bangalore's ${stylist.location} district.`;
        }

        return {
          stylist,
          calculatedScore: score,
          explainer: explainerSentence
        };
      });

      // Sort by score
      matchedScores.sort((a, b) => b.calculatedScore - a.calculatedScore);
      setResults(matchedScores);
      setLoading(false);
    }, 1800);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 font-sans" id="ai-stylist-finder-page">
      
      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center px-3 py-1 bg-white border border-[#C5A059]/30 rounded-full text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">
          Proprietary AI Match Engine
        </div>
        <h1 className="mt-3.5 font-sans font-extrabold text-3xl text-black">
          Discover Your Perfect Luxury Stylist
        </h1>
        <p className="mt-2 text-xs text-gray-500">
          Answer 5 simple questions. Our model screens 20 elite independent beauty professionals in Bangalore to find your aesthetic soulmate.
        </p>
      </div>

      {/* Progress indicators Header (Only on steps 1-3) */}
      {step < 4 && (
        <div className="max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-between text-xs text-gray-400 font-extrabold uppercase tracking-widest font-sans">
            <span className={step >= 1 ? "text-[#C5A059]" : ""}>1. Hair & Occasion</span>
            <span className={step >= 2 ? "text-[#C5A059]" : ""}>2. Profile & Budget</span>
            <span className={step >= 3 ? "text-[#C5A059]" : ""}>3. Location & Style</span>
          </div>
          <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#C5A059] rounded-full transition-all duration-300" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: HAIR TYPE & OCCASION */}
      {step === 1 && (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {/* Hair Type selection */}
          <div className="space-y-4">
            <label className="block text-sm font-extrabold uppercase tracking-widest text-black">
              1. What describes your hair type / fiber pattern?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {hairTypes.map((t) => {
                const isSelected = criteria.hairType === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setCriteria({ ...criteria, hairType: t.id })}
                    className={`flex flex-col text-left p-5 rounded-2xl border transition-all duration-200 ${
                      isSelected 
                        ? "border-black bg-black text-white shadow-lg scale-102" 
                        : "border-gray-200 bg-white text-gray-800 hover:border-gray-400"
                    }`}
                    id={`hair-type-${t.id}`}
                  >
                    <span className="font-sans font-bold text-sm tracking-tight">{t.label}</span>
                    <span className={`mt-1 text-[11px] leading-snug ${isSelected ? "text-gray-300" : "text-gray-400"}`}>
                      {t.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Occasion Selection */}
          <div className="space-y-4 pt-4">
            <label className="block text-sm font-extrabold uppercase tracking-widest text-black">
              2. What event or occasion is this booking for?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {occasions.map((o) => {
                const isSelected = criteria.occasion === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => setCriteria({ ...criteria, occasion: o.id })}
                    className={`flex flex-col text-left p-5 rounded-2xl border transition-all duration-200 ${
                      isSelected 
                        ? "border-black bg-black text-white shadow-lg scale-102" 
                        : "border-gray-200 bg-white text-gray-800 hover:border-gray-400"
                    }`}
                    id={`occasion-${o.id}`}
                  >
                    <span className="font-sans font-bold text-sm tracking-tight">{o.label}</span>
                    <span className={`mt-1 text-[11px] leading-snug ${isSelected ? "text-gray-300" : "text-gray-400"}`}>
                      {o.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-6 flex justify-end">
            <button
              onClick={nextStep}
              className="flex items-center space-x-1.5 rounded-full bg-black hover:bg-neutral-800 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all"
              id="finder-next-1"
            >
              <span>Continue</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 2: GENDER & BUDGET */}
      {step === 2 && (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {/* Gender */}
          <div className="space-y-4">
            <label className="block text-sm font-extrabold uppercase tracking-widest text-black">
              3. Stylist Matching Category (Gender-bias Filter)
            </label>
            <div className="flex gap-4">
              {genders.map((g) => {
                const isSelected = criteria.gender === g;
                return (
                  <button
                    key={g}
                    onClick={() => setCriteria({ ...criteria, gender: g })}
                    className={`flex-1 overflow-hidden p-5 rounded-2xl border text-center font-sans font-bold text-sm uppercase tracking-wider transition-all duration-200 ${
                      isSelected 
                        ? "border-black bg-black text-white shadow-lg" 
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                    id={`gender-${g}`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-4 pt-4">
            <label className="block text-sm font-extrabold uppercase tracking-widest text-black">
              4. Choose Your Starting Price Bracket (Per Service)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {budgets.map((b) => {
                const isSelected = criteria.budget === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setCriteria({ ...criteria, budget: b.id })}
                    className={`flex flex-col text-left p-5 rounded-2xl border transition-all duration-200 ${
                      isSelected 
                        ? "border-black bg-black text-white shadow-lg scale-102" 
                        : "border-gray-200 bg-white text-gray-800 hover:border-gray-400"
                    }`}
                    id={`budget-${b.id}`}
                  >
                    <span className="font-sans font-extrabold text-sm tracking-tight text-amber-500">{b.id}</span>
                    <span className="mt-1 font-sans font-bold text-sm tracking-tight">{b.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-6 flex justify-between">
            <button
              onClick={prevStep}
              className="flex items-center space-x-1.5 rounded-full border border-gray-200 hover:border-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-black transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <button
              onClick={nextStep}
              className="flex items-center space-x-1.5 rounded-full bg-black hover:bg-neutral-800 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all"
              id="finder-next-2"
            >
              <span>Continue</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 3: PREFERRED AREA & CUSTOM STYLE INSPIRATION */}
      {step === 3 && (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {/* Preferred Area */}
          <div className="space-y-4">
            <label className="block text-sm font-extrabold uppercase tracking-widest text-black">
              5. Where in Bangalore is most convenient for you?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {areas.map((area) => {
                const isSelected = criteria.preferredArea === area;
                return (
                  <button
                    key={area}
                    onClick={() => setCriteria({ ...criteria, preferredArea: area })}
                    className={`p-4 rounded-xl border text-center font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                      isSelected 
                        ? "border-black bg-black text-white shadow-lg" 
                        : "border-gray-200 bg-white text-gray-700 hover:bg-neutral-50"
                    }`}
                    id={`area-${area}`}
                  >
                    <MapPin className={`inline h-3.5 w-3.5 mr-1 ${isSelected ? "text-amber-500" : "text-gray-400"}`} />
                    <span>{area}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desired Style Textarea */}
          <div className="space-y-4 pt-4">
            <label className="block text-sm font-extrabold uppercase tracking-widest text-black">
              6. Describe your target style in your own words (AI Prompt)
            </label>
            <div className="relative rounded-2xl border border-gray-200 bg-white p-4 focus-within:border-amber-500 shadow-sm">
              <textarea
                value={criteria.desiredStyle}
                onChange={(e) => setCriteria({ ...criteria, desiredStyle: e.target.value })}
                rows={3}
                placeholder="Examples: 'I want a premium Korean hairstyle with down perms', 'I need a soft-dewy Lakme Fashion Week signature bridal makeover', 'Looking for an executive scissors-only haircut for thick coarse beard'..."
                className="w-full border-0 bg-transparent text-sm text-gray-800 outline-none resize-none focus:ring-0 placeholder-gray-400"
                id="finder-style-textarea"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-6 flex justify-between">
            <button
              onClick={prevStep}
              className="flex items-center space-x-1.5 rounded-full border border-gray-200 hover:border-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-black transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => processMatching()}
              className="flex items-center space-x-2 rounded-full bg-black hover:bg-amber-600 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-xl hover:shadow-amber-200 transition-all"
              id="finder-submit-btn"
            >
              <span>Match Me!</span>
              <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 4: MOCK AI RESULTS & LOADING TIMEOUT CANVAS */}
      {step === 4 && (
        <div className="max-w-6xl mx-auto">
          
          {loading ? (
            /* Loading State Animation */
            <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center animate-pulse">
              <div className="relative flex items-center justify-center">
                <div className="h-20 w-20 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
                <Sparkles className="absolute h-8 w-8 text-amber-400 animate-ping" />
              </div>
              <div className="space-y-2">
                <h3 className="font-sans font-extrabold text-xl text-black">Analyzing Stylist Databases...</h3>
                <p className="text-xs text-gray-400 max-w-sm">
                  Screening reviews, categorizing portfolio visual parameters, verifying Indiranagar traffic schedules, and calculating weights...
                </p>
              </div>
            </div>
          ) : (
            /* RESULTS CANVAS */
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-400">
              
              {/* Back CTA / Summary Panel */}
              <div className="flex flex-col sm:flex-row items-center justify-between rounded-3xl bg-neutral-950 p-6 sm:p-8 text-white shadow-lg">
                <div className="space-y-1 mb-4 sm:mb-0">
                  <div className="inline-flex items-center space-x-1.5 rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wider font-extrabold text-emerald-400">
                    <UserCheck className="h-3 w-3 mr-1" /> Match Completed
                  </div>
                  <h3 className="font-sans font-extrabold text-lg sm:text-xl text-white">We Found {results.length} Stylists matched for you</h3>
                  <p className="text-xs text-neutral-400 max-w-xl">
                    Our AI mapped your preference for <span className="text-amber-400 font-semibold">{criteria.hairType} hair</span> during <span className="text-amber-400 font-semibold">{criteria.occasion}</span> within <span className="text-amber-400 font-semibold">{criteria.preferredArea}</span> starting at <span className="text-amber-400 font-semibold">{criteria.budget}</span>.
                  </p>
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="flex items-center space-x-1 rounded-full border border-neutral-800 hover:border-white text-xs font-bold uppercase tracking-wider px-5 py-3 transition-colors text-white"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Restart Matcher</span>
                </button>
              </div>

              {/* Recommendation Grid */}
              <div className="space-y-6">
                {results.slice(0, 3).map((result, idx) => {
                  const s = result.stylist;
                  return (
                    <div 
                      key={s.id} 
                      className={`relative flex flex-col lg:flex-row rounded-3xl border bg-white p-6 gap-6 shadow-sm hover:shadow-lg transition-all duration-300 ${
                        idx === 0 ? "border-amber-400 bg-amber-50/10" : "border-gray-100"
                      }`}
                    >
                      {/* Top Rank Badge */}
                      {idx === 0 && (
                        <div className="absolute -top-3.5 left-6 rounded-full bg-amber-500 px-4 py-1 text-[10px] uppercase tracking-widest font-extrabold text-black flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-black text-black" />
                          <span>AI Rank #1 Master Match</span>
                        </div>
                      )}

                      {/* Left: Stylist Photo */}
                      <div className="w-full lg:w-48 aspect-[3/4] rounded-2.5xl overflow-hidden shrink-0 bg-gray-50">
                        <img 
                          src={s.image} 
                          alt={s.name} 
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-top" 
                        />
                      </div>

                      {/* Right: Info and Breakdown */}
                      <div className="flex-1 flex flex-col justify-between">
                        
                        <div className="space-y-3">
                          
                          {/* Rating & Match Score Header */}
                          <div className="flex flex-wrap items-center justify-between gap-y-2">
                            <div>
                              <span className="text-xs uppercase tracking-wider font-extrabold text-gray-400">{s.salonName}</span>
                              <h4 className="font-sans font-extrabold text-xl text-black">{s.name}</h4>
                              <p className="text-xs text-gray-500 mt-0.5 flex items-center">
                                <MapPin className="h-3.5 w-3.5 text-amber-600 mr-1" />
                                <span>{s.location} • {s.experience} Years of Craft Experience</span>
                              </p>
                            </div>

                            {/* Match Score Display */}
                            <div className="flex items-center space-x-3 bg-white border rounded-2xl p-2.5 shadow-sm">
                              <div className="text-right">
                                <span className="block text-[9px] uppercase tracking-widest font-extrabold text-gray-400">Match score</span>
                                <span className="text-xl font-black font-sans text-amber-600">{result.calculatedScore}%</span>
                              </div>
                              <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-amber-50 text-amber-600">
                                <Sparkles className="h-5 w-5" />
                              </div>
                            </div>
                          </div>

                          {/* Matching Reason / Explanation Card */}
                          <div className="rounded-2xl bg-amber-50/50 p-4 border border-amber-200/40">
                            <span className="block text-[10px] uppercase font-bold text-amber-800 tracking-wider">AI RECOMMENDATION INSIGHT</span>
                            <p className="text-xs text-gray-700 leading-relaxed italic mt-1">
                              "{result.explainer}"
                            </p>
                          </div>

                          {/* Specialties */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {s.specialization.map((spec, i) => (
                              <span key={i} className="rounded-full bg-gray-100 border border-gray-150 px-3 py-1 text-[11px] font-semibold text-gray-700">
                                {spec}
                              </span>
                            ))}
                          </div>

                        </div>

                        {/* Pros / Cons Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Matched assets</span>
                            <ul className="mt-1 space-y-1">
                              {s.aiAnalysis.pros.slice(0, 2).map((pro, i) => (
                                <li key={i} className="text-xs text-gray-600 flex items-start">
                                  <span className="text-emerald-500 mr-1.5 font-bold">✓</span>
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Transparency insights</span>
                            <ul className="mt-1 space-y-1">
                              {s.aiAnalysis.cons.slice(0, 2).map((con, i) => (
                                <li key={i} className="text-xs text-gray-600 flex items-start">
                                  <span className="text-amber-500 mr-1.5 font-bold">!</span>
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-y-4">
                          <div>
                            <span className="block text-[10px] text-gray-400 uppercase tracking-widest">Pricing threshold</span>
                            <span className="font-sans font-extrabold text-black text-lg">Starts at ₹{s.startingPrice}</span>
                          </div>

                          <div className="flex space-x-3 w-full sm:w-auto">
                            <button
                              onClick={() => setView("profile", { stylistId: s.id })}
                              className="flex-1 sm:flex-none text-center bg-gray-100 hover:bg-gray-200 text-black text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition-colors"
                            >
                              Explore Bio & Portfolio
                            </button>
                            <button
                              onClick={() => onBookNow(s)}
                              className="flex-1 sm:flex-none text-center bg-black hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg hover:shadow-amber-200 transition-all"
                            >
                              Instant Online Booking
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
