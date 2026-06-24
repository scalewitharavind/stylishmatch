import { motion } from "motion/react";
import { Sparkles, HelpCircle, Scissors, Users, Calendar, ArrowRight, ShieldCheck, Check, MessageSquare, Image, Star, Eye } from "lucide-react";
import { STYLISTS, TESTIMONIALS } from "../data";
import { Stylist } from "../types";
import Hero from "./Hero";
import StylistCard from "./StylistCard";

interface HomeViewProps {
  setView: (view: string, extra?: { stylistId?: string }) => void;
  onSearchQuerySubmit: (query: string) => void;
  onBookNow: (stylist: Stylist) => void;
  savedStylists: string[];
  onSaveToggle: (id: string) => void;
  stylists?: Stylist[];
}

export default function HomeView({
  setView,
  onSearchQuerySubmit,
  onBookNow,
  savedStylists,
  onSaveToggle,
  stylists
}: HomeViewProps) {
  // Take top 4 highly graded stylists as featured
  const list = stylists || STYLISTS;
  const featuredStylists = list.slice(0, 4);

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <Hero
        onFindStylist={() => setView("finder")}
        onExploreStylists={() => setView("marketplace")}
        onSearchQuerySubmit={onSearchQuerySubmit}
      />

      {/* 2. FEATURED LUXURY STYLISTS */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8" id="featured-stylists">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="inline-flex items-center px-3 py-1 bg-white border border-[#C5A059]/30 rounded-full text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">
              Craft & Refinement
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-black sm:text-4xl font-sans">
              Bangalore's Most Recommended Stylists
            </h2>
            <p className="mt-3 text-sm text-gray-500 max-w-xl font-sans">
              These elite hair artists and makeup designers represent the peak rating thresholds of Indiranagar, Koramangala, and Sadashivanagar.
            </p>
          </div>
          <button
            onClick={() => setView("marketplace")}
            className="mt-4 md:mt-0 flex items-center space-x-1 text-sm font-semibold text-amber-600 hover:text-black transition-colors font-sans"
          >
            <span>Explore all 20 stylists</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Scaled Grid of Stylist Cards */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredStylists.map((stylist) => (
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
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="bg-gray-50/50 py-16 sm:py-24 border-y border-gray-100" id="how-it-works">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-extrabold text-amber-600 font-sans">Effortless Discovery</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-black sm:text-4xl font-sans">
              The Luxury Stylist Journey
            </h2>
            <p className="mt-3 text-sm text-gray-500 font-sans">
              Bypass the salon guess-work. StylistMatch designs matches customized for your beauty assets.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {[
              {
                step: "01",
                title: "Tell us your beauty goal",
                desc: "Choose your hair type, desired style, occasion, budget range, and preferred micro-neighborhood in Bangalore."
              },
              {
                step: "02",
                title: "Smart preference analysis",
                desc: "Our model screens experiences, verified client sentiment, and portfolio catalogs to find perfect fits."
              },
              {
                step: "03",
                title: "Discover matching stylists",
                desc: "Study comprehensive matching explanations and breakdown summaries, analyzing real portfolio aesthetics."
              },
              {
                step: "04",
                title: "Book instantly",
                desc: "Lock in premium private suite times online with real-time slot confirmations. Zero-friction."
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="font-mono text-4xl font-black text-amber-200/60 group-hover:text-amber-500/30 transition-colors duration-300">{item.step}</div>
                <h3 className="mt-4 font-sans font-bold text-base text-black">{item.title}</h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI FEATURES SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8" id="ai-features">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-center">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center px-3 py-1 bg-white border border-[#C5A059]/30 rounded-full text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">
              Algorithmic Platform
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-black sm:text-4xl font-sans">
              Proprietary Styling Tech
            </h2>
            <p className="text-sm text-gray-500 font-sans leading-relaxed">
              We leverage intelligent classification, semantic sentiment analysis, and photographic feature matches to replace salon standardizing with single-person craft.
            </p>
            <button
              onClick={() => setView("finder")}
              className="inline-flex items-center space-x-1 text-sm font-semibold text-black hover:text-amber-600 transition-colors font-sans pt-2"
            >
              <span>Launch Stylist Matcher</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div 
              onClick={() => setView("finder")}
              className="cursor-pointer group flex flex-col justify-between p-6 rounded-3xl border border-gray-100 bg-white hover:border-amber-300 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-sans font-bold text-emerald-950 text-base">Artisan Stylist Match</h3>
                <p className="mt-2 text-xs text-gray-500 font-sans">
                  Instantly obtain custom specialist suggestions built around straight, curly, wavy hair attributes and corporate or bridal objectives.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-semibold text-black group-hover:text-amber-600">
                <span>Find perfect matches</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            <div 
              onClick={() => setView("portfolio-search")}
              className="cursor-pointer group flex flex-col justify-between p-6 rounded-3xl border border-gray-100 bg-white hover:border-amber-300 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Image className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-sans font-bold text-emerald-950 text-base">Portfolio Search</h3>
                <p className="mt-2 text-xs text-gray-500 font-sans">
                  Query our visual index by outcome. Type inputs like 'Balayage waves' or 'Korean fringes' to scan real styling image portfolios.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-semibold text-black group-hover:text-amber-600">
                <span>Scan image gallery</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            <div 
              onClick={() => setView("marketplace")}
              className="cursor-pointer group flex flex-col justify-between p-6 rounded-3xl border border-gray-100 bg-white hover:border-amber-300 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Star className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-sans font-bold text-emerald-950 text-base">Review Insights</h3>
                <p className="mt-2 text-xs text-gray-500 font-sans">
                  Consolidated sentiment analysis instantly separates client praise points (consultation depth, attention to detail) from constraints (congestion risk).
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-semibold text-black group-hover:text-amber-600">
                <span>View review audits</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            <div 
              onClick={() => setView("concierge")}
              className="cursor-pointer group flex flex-col justify-between p-6 rounded-3xl border border-gray-100 bg-white hover:border-amber-300 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-sans font-bold text-emerald-950 text-base">Concierge Guide</h3>
                <p className="mt-2 text-xs text-gray-500 font-sans">
                  Real-time interactive stylist guide. Consult about your event styling, obtain hair health tips, and receive matching schedules.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-semibold text-black group-hover:text-amber-600">
                <span>Start conversations</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. WHY STYLISTMATCH */}
      <section className="bg-neutral-950 text-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest font-extrabold text-[#C5A059] font-sans">A New Paradigm</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-sans">
                Why Book a Stylist, Not a Salon?
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                Typical platform directories sell you a salon brand. But hair and skin aren't styled by corporate entities—they are shaped by the individual artist holding the tools.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                A famous salon can have freshman apprentices or veteran artistic leads, yet they charge similar pricing tiers. StylistMatch shifts the spotlight back to pure craft.
              </p>

              <div className="space-y-3 pt-4">
                {[
                  "Double validated artist-only credentials",
                  "Verified matching explanations based on actual hair geometries",
                  "Direct, transparent pricing controlled by the artists themselves",
                  "Private client lounge access options"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-sm">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="font-sans text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 space-y-3">
                  <h3 className="font-sans font-bold text-lg text-white">Classic Hair Directories</h3>
                  <div className="space-y-2 text-xs text-neutral-400">
                    <p className="flex items-center space-x-2">
                      <span className="text-red-400">✗</span>
                      <span>Book blindly based on salon name</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="text-red-400">✗</span>
                      <span>Unpredictable technician expertise</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="text-red-400">✗</span>
                      <span>Cookie-cutter catalog cuts</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="text-red-400">✗</span>
                      <span>High waiting lines on weekends</span>
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-500/30 bg-neutral-900/50 p-6 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-16 w-16 bg-amber-500/10 rounded-bl-full flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-amber-400" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-amber-400">StylistMatch</h3>
                  <div className="space-y-2 text-xs text-neutral-200">
                    <p className="flex items-center space-x-2">
                      <span className="text-amber-400">✓</span>
                      <span>Discover the specific master artist</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="text-amber-400">✓</span>
                      <span>Proven portfolio track records</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="text-amber-400">✓</span>
                      <span>Bespoke custom geometries</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="text-amber-400">✓</span>
                      <span>Private reserved priority slots</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8" id="testimonials">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 bg-white border border-[#C5A059]/30 rounded-full text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">
            Community Sentiment
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-black sm:text-4xl font-sans">
            Endorsed by Bangalore's Discerning Trendsetters
          </h2>
          <p className="mt-3 text-sm text-gray-500 font-sans">
            Our customers expect nothing less than perfection. Read their honest, verified experiences with their individual matched stylists.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id} 
              className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 relative"
            >
              <div>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="font-sans text-sm text-gray-700 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center space-x-3">
                <img 
                  src={t.photo} 
                  alt={t.name} 
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full object-cover shrink-0" 
                />
                <div>
                  <h4 className="font-sans font-bold text-xs text-black">{t.name}</h4>
                  <p className="text-[10px] text-gray-400 font-semibold">{t.role}</p>
                  <p className="mt-0.5 text-[10px] text-amber-700 font-medium">Matched with <span className="font-bold">{t.stylistName}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. startup FOOTER */}
      <footer className="border-t border-gray-100 bg-neutral-50 py-16 font-sans">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-md">
                  <div className="w-4 h-4 bg-[#C5A059] rotate-45"></div>
                </div>
                <span className="font-sans font-extrabold text-lg tracking-tight uppercase text-black">
                  StylistMatch
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Bangalore's premium boutique matchmaking marketplace for high-end styling, bridal makeovers, and custom grooming. Delivering elite artistic experiences across premium developments.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-black">Platform</h4>
              <ul className="mt-4 space-y-2 text-xs text-gray-500">
                <li><button onClick={() => setView("marketplace")} className="hover:text-black">Explore Stylists</button></li>
                <li><button onClick={() => setView("finder")} className="hover:text-black">Match Finder</button></li>
                <li><button onClick={() => setView("concierge")} className="hover:text-black">Beauty Concierge Chat</button></li>
                <li><button onClick={() => setView("portfolio-search")} className="hover:text-black">Portfolio Outcome Search</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-black">Luxury Areas</h4>
              <ul className="mt-4 space-y-2 text-xs text-gray-500">
                <li><span className="text-gray-400">✓ Indiranagar</span></li>
                <li><span className="text-gray-400">✓ Koramangala</span></li>
                <li><span className="text-gray-400">✓ Sadashivanagar</span></li>
                <li><span className="text-gray-400">✓ Whitefield & Jayanagar</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-black">Startup Office</h4>
              <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                Level 5, Capital Tower,<br />
                80 Feet Road, Indiranagar,<br />
                Bangalore, Karnataka 560038
              </p>
              <p className="mt-2 text-xs text-amber-700 font-semibold">
                contact@stylistmatch.com
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between text-xs text-gray-400">
            <p>© 2026 StylistMatch. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="hover:text-black">Terms of Service</button>
              <button className="hover:text-black">Privacy Policy</button>
              <button className="hover:text-black">VC Investor Deck</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
