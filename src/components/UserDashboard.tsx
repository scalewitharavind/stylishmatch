import { Star, MapPin, Calendar, Clock, Sparkles, Heart, CreditCard, HelpCircle, Scissors, Trash2 } from "lucide-react";
import { Booking, Stylist, PortfolioItem } from "../types";
import { STYLISTS } from "../data";

interface UserDashboardProps {
  bookings: Booking[];
  savedStylistIds: string[];
  favoritePortfolioIds: string[];
  onRemoveBooking?: (id: string) => void;
  onSaveToggle: (id: string) => void;
  setView: (view: string, extra?: { stylistId?: string }) => void;
  onBookNow: (stylist: Stylist) => void;
}

export default function UserDashboard({
  bookings,
  savedStylistIds,
  favoritePortfolioIds,
  onRemoveBooking,
  onSaveToggle,
  setView,
  onBookNow
}: UserDashboardProps) {

  // Past completed bookings seed database
  const pastBookings: Booking[] = [
    {
      id: "bk_past_1",
      stylistId: "sty_19",
      stylistName: "Ramanathan Iyer",
      stylistAvatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&auto=format&fit=crop&q=80",
      serviceName: "Ram's Signature Elite Vintage Scissor Haircut",
      price: 2000,
      date: "2026-05-24",
      timeSlot: "11:30 AM",
      location: "Malleshwaram",
      status: "completed"
    },
    {
      id: "bk_past_2",
      stylistId: "sty_12",
      stylistName: "Zara Lin",
      stylistAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
      serviceName: "Luminous Prep Luxury Mini Hydrafacial & Makeup",
      price: 5000,
      date: "2026-06-01",
      timeSlot: "2:00 PM",
      location: "Malleshwaram",
      status: "completed"
    }
  ];

  // Map saved stylists objects
  const savedStylists = STYLISTS.filter((s) => savedStylistIds.includes(s.id));

  // Map favorite portfolio designs
  const allPortfolios = STYLISTS.flatMap((s) => s.portfolio);
  const favoritePortfolios = allPortfolios.filter((p) => favoritePortfolioIds.includes(p.id));

  // AI Recommendations Engine - dynamically suggest 2 matching Bangalore stylists who align with saved favorites
  const aiRecommendations = STYLISTS.filter((st) => {
    // Avoid recommending someone already saved
    if (savedStylistIds.includes(st.id)) return false;
    
    // If they have any saved stylist, recommend someone in the same region or same main tag
    if (savedStylists.length > 0) {
      const savedAres = savedStylists.map(s => s.location.toLowerCase());
      const savedTags = savedStylists.flatMap(s => s.tags);
      return (
        savedAres.includes(st.location.toLowerCase()) ||
        st.tags.some(t => savedTags.includes(t))
      );
    }
    
    // Default recommendations of high-impact stars
    return ["sty_01", "sty_02", "sty_03"].includes(st.id);
  }).slice(0, 2);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 font-sans" id="user-dashboard-root">
      
      {/* Top Banner Profile Summary */}
      <div className="rounded-3xl bg-neutral-950 p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center md:justify-between mb-10 shadow-lg text-left">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 rounded-full bg-amber-500/10 px-3 py-1 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>Black-Tier Luxury Member</span>
          </div>
          <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-white">
            Welcome Back, Elite Client
          </h1>
          <p className="text-xs text-neutral-400 font-sans">
            Managing your personal reservations, bookmarked beauty designs, and matched independent master artists in Bangalore.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6 md:mt-0 pt-6 md:pt-0 border-t border-neutral-800 md:border-0 font-sans text-center">
          <div>
            <span className="block text-[10px] text-neutral-400 uppercase tracking-widest leading-none">Reservations</span>
            <span className="font-mono font-extrabold text-white text-xl mt-1.5 inline-block">{bookings.length}</span>
          </div>
          <div className="h-8 w-px bg-neutral-800 self-center" />
          <div>
            <span className="block text-[10px] text-neutral-450 uppercase tracking-widest leading-none">Bookmarks</span>
            <span className="font-mono font-extrabold text-white text-xl mt-1.5 inline-block">{savedStylists.length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPACT CHANNELS (Column span 8: Bookings and Bookmarks) */}
        <div className="lg:col-span-8 space-y-10 text-left">
          
          {/* 1. UPCOMING RESERVATIONS */}
          <section className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-black">
              Upcoming Aesthetic Slots
            </h3>
            
            {bookings.length > 0 ? (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="rounded-2xl border-2 border-amber-300 bg-amber-50/10 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img 
                        src={booking.stylistAvatar} 
                        alt={booking.stylistName} 
                        className="h-12 w-12 rounded-xl object-cover shrink-0 border border-gray-200" 
                      />
                      <div className="space-y-0.5">
                        <span className="inline-block bg-amber-500/10 text-amber-800 border border-amber-500/20 text-[9px] uppercase font-bold px-1.5 py-0.5 rounded">
                          Confirmed VIP Ticket
                        </span>
                        <h4 className="font-sans font-extrabold text-base text-gray-900">{booking.stylistName}</h4>
                        <p className="text-xs text-gray-700 font-sans font-medium">{booking.serviceName}</p>
                        {booking.userEmail && (
                          <p className="text-[10px] text-gray-400 font-sans">
                            Receipt Sent To: <span className="font-semibold text-gray-600">{booking.userEmail}</span>
                          </p>
                        )}
                        <p className="text-[11px] text-gray-400 flex items-center pt-0.5">
                          <MapPin className="h-3 w-3 text-[#C5A059] mr-1 shrink-0" />
                          <span>{booking.location} Neighborhood</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-0 pt-3 sm:pt-0 border-gray-150">
                      <div className="text-left sm:text-right font-sans">
                        <div className="flex items-center text-xs text-gray-600 space-x-1.5 sm:justify-end">
                          <Calendar className="h-3.5 w-3.5 text-amber-500" />
                          <span>{booking.date} @ {booking.timeSlot}</span>
                        </div>
                        <span className="block text-[11px] text-amber-700 font-extrabold mt-0.5">
                          ₹{booking.price} ({booking.paymentMethod || "Pay at Salon"})
                        </span>
                      </div>

                      {onRemoveBooking && (
                        <button
                          onClick={() => onRemoveBooking(booking.id)}
                          className="text-red-500 hover:text-red-700 text-xs font-semibold uppercase mt-0 sm:mt-2.5 flex items-center space-x-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Cancel Entry</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-neutral-50 p-8 text-center space-y-3">
                <Calendar className="h-10 w-10 text-gray-300 mx-auto" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-black uppercase">No active slot bookings</h4>
                  <p className="text-xs text-gray-400 mt-1">Book an appointment with matching stylists to fill this queue.</p>
                </div>
                <button
                  onClick={() => setView("finder")}
                  className="rounded-full bg-black text-white text-[10px] font-extrabold uppercase tracking-widest px-5 py-2 transition-colors"
                >
                  Find My Stylist
                </button>
              </div>
            )}
          </section>

          {/* 2. SAVED STYLISTS */}
          <section className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-black">
              Bookmarked Beauty Artists
            </h3>

            {savedStylists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedStylists.map((st) => (
                  <div 
                    key={st.id} 
                    className="rounded-2xl border border-gray-100 bg-white p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={st.image} 
                        alt={st.name} 
                        className="h-10 w-10 rounded-full object-cover shrink-0" 
                      />
                      <div>
                        <h4 className="font-sans font-extrabold text-xs text-gray-900">{st.name}</h4>
                        <p className="text-[10px] text-gray-400 font-medium">{st.salonName} • {st.location}</p>
                        <p className="text-[10px] text-amber-700 font-semibold">Starts ₹{st.startingPrice}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 items-end shrink-0">
                      <button
                        onClick={() => onSaveToggle(st.id)}
                        className="text-[10px] font-bold text-gray-400 hover:text-black uppercase"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => setView("profile", { stylistId: st.id })}
                        className="rounded-lg bg-black text-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider hover:bg-amber-600 transition-all"
                      >
                        Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-6 text-center text-xs text-gray-400">
                You haven't bookmarked any stylists yet. Click the ⭐️ icon on credit cards to save them here.
              </div>
            )}
          </section>

          {/* 3. HISTORIC LOGS (PAST APPOINTMENTS) */}
          <section className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-black">
              Past Completed Visits
            </h3>

            <div className="space-y-3">
              {pastBookings.map((pb) => (
                <div 
                  key={pb.id} 
                  className="rounded-2xl border border-gray-150 p-4 bg-white/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 text-left opacity-90"
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={pb.stylistAvatar} 
                      alt={pb.stylistName} 
                      className="h-9 w-9 rounded-full object-cover shrink-0 grayscale" 
                    />
                    <div>
                      <h4 className="font-sans font-extrabold text-xs text-gray-800">{pb.stylistName}</h4>
                      <p className="text-[11px] text-gray-600 font-sans">{pb.serviceName}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 sm:text-right font-sans shrink-0">
                    <div className="text-[11px] text-gray-400">
                      <span>{pb.date} @ {pb.timeSlot}</span>
                    </div>
                    <span className="rounded bg-gray-100 text-gray-600 text-[9px] font-extrabold px-1.5 py-0.5 uppercase">
                      ✓ Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT ANALYTIC SIDEBAR (Column span 4: AI Recommendations & Liked designs) */}
        <div className="lg:col-span-4 space-y-8 text-left">
          
          {/* AI MATCHED MATCH RECOMMENDATIONS */}
          <section className="rounded-3xl border border-amber-300 bg-amber-50/10 p-6 space-y-4 shadow-sm relative overflow-hidden">
            <div className="inline-flex items-center space-x-1 bg-amber-140/40 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-spin-slow mr-1" /> Personalized For You
            </div>
            
            <h3 className="font-sans font-extrabold text-base text-gray-950">
              Aesthetic AI Discovery Feed
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Based on your search filters and booked areas, our matches suggest exploring these nearby craft profiles:
            </p>

            <div className="space-y-3.5">
              {aiRecommendations.map((st) => (
                <div 
                  key={st.id} 
                  className="rounded-2xl bg-white border border-gray-150 p-3.5 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2.5">
                    <img 
                      src={st.image} 
                      alt={st.name} 
                      className="h-8 w-8 rounded-lg object-cover" 
                    />
                    <div className="space-y-0.5">
                      <h4 className="font-sans font-bold text-xs text-black">{st.name}</h4>
                      <p className="text-[9px] font-bold uppercase text-amber-600">{st.location} • starts ₹{st.startingPrice}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setView("profile", { stylistId: st.id })}
                    className="rounded-lg bg-neutral-950 text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 text-center"
                  >
                    Match Setup
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* LIKED DESIGN PORTFOLIOS */}
          <section className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-black">
              Saved Style Lookbook ({favoritePortfolios.length})
            </h3>

            {favoritePortfolios.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {favoritePortfolios.map((p) => (
                  <div 
                    key={p.id} 
                    onClick={() => setView("profile", { stylistId: p.stylistId })}
                    className="cursor-pointer group relative rounded-xl overflow-hidden aspect-square bg-gray-50 border border-gray-100"
                  >
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="h-full w-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute bottom-2 left-2 right-2 text-[9px] text-white font-bold truncate">
                      {p.title}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-150 p-6 text-center text-xs text-gray-400">
                Bookmarks under 'AI Portfolio' gallery will be stored here.
              </div>
            )}
          </section>

        </div>

      </div>

    </div>
  );
}
