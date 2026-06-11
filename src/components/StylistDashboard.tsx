import React, { useState } from "react";
import { 
  Sparkles, Plus, Trash2, Calendar, Clock, MapPin, 
  CreditCard, ShieldCheck, Mail, User, Phone, Save, 
  FileText, Star, Award, Check, Image as ImageIcon, AlertCircle
} from "lucide-react";
import { Stylist, Service, Booking, PortfolioItem } from "../types";

interface StylistDashboardProps {
  stylist: Stylist | null;
  onUpdateStylist: (updatedStylist: Stylist) => void;
  bookings: Booking[];
  onUpdateBookingStatus: (bookingId: string, newStatus: "upcoming" | "completed" | "cancelled") => void;
  setView: (view: string, extra?: { stylistId?: string }) => void;
  onLogout: () => void;
}

const STOCK_LOOKBOOKS = [
  { url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&auto=format&fit=crop&q=80", label: "Golden Highlight Waves" },
  { url: "https://images.unsplash.com/photo-1605497746444-ac9dbd43d4a6?w=600&auto=format&fit=crop&q=80", label: "Midnight Razor Shave" },
  { url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80", label: "Korean Soft Waves Perm" },
  { url: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&auto=format&fit=crop&q=80", label: "Modern Ash Balayage" },
  { url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&auto=format&fit=crop&q=80", label: "Deluxe Copper Underlights" },
  { url: "https://images.unsplash.com/photo-1591555200577-03577ccb810d?w=600&auto=format&fit=crop&q=80", label: "Intricate Bridal Halo Bun" }
];

export default function StylistDashboard({ 
  stylist, 
  onUpdateStylist, 
  bookings, 
  onUpdateBookingStatus, 
  setView,
  onLogout 
}: StylistDashboardProps) {
  
  // 1. Profile States
  const [name, setName] = useState(stylist?.name || "");
  const [salonName, setSalonName] = useState(stylist?.salonName || "");
  const [experience, setExperience] = useState(stylist?.experience || 5);
  const [location, setLocation] = useState(stylist?.location || "Indiranagar");
  const [priceRange, setPriceRange] = useState<"₹₹ (Premium)" | "₹₹₹ (Elite/Luxury)" | "₹₹₹₹ (Ultra-Luxury)">(
    stylist?.priceRange || "₹₹ (Premium)"
  );
  const [startingPrice, setStartingPrice] = useState(stylist?.startingPrice || 1500);
  const [bio, setBio] = useState(stylist?.bio || "");
  const [about, setAbout] = useState(stylist?.about || "");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(stylist?.tags || ["haircut", "styling"]);
  
  // 2. Services Management
  const [services, setServices] = useState<Service[]>(
    stylist?.services || [
      { id: "ser_seed_1", name: "Premium Scissor Cut", price: 1500, duration: "45 mins", category: "Haircut" }
    ]
  );
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState(1500);
  const [newServiceDuration, setNewServiceDuration] = useState("45 mins");
  const [newServiceCategory, setNewServiceCategory] = useState("Haircut");
  
  // 3. Portfolio Management
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(stylist?.portfolio || []);
  const [newPortTitle, setNewPortTitle] = useState("");
  const [newPortDesc, setNewPortDesc] = useState("");
  const [newPortCat, setNewPortCat] = useState("Haircut");
  const [newPortImg, setNewPortImg] = useState(STOCK_LOOKBOOKS[0].url);
  const [portTagInput, setPortTagInput] = useState("");

  const [activeTab, setActiveTab] = useState<"profile" | "services" | "portfolio" | "appointments">("profile");
  const [saveBanner, setSaveBanner] = useState(false);

  // Filter appointments relevant for this stylist id
  const receivedBookings = bookings.filter((b) => b.stylistId === (stylist?.id || "sty_placeholder"));

  // Add tag helper
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim().toLowerCase())) {
      setTags([...tags, tagInput.trim().toLowerCase()]);
      setTagInput("");
    }
  };

  // Remove tag helper
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  // Add Service helper
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const newSer: Service = {
      id: `ser_${Date.now()}`,
      name: newServiceName.trim(),
      price: newServicePrice,
      duration: newServiceDuration,
      category: newServiceCategory
    };

    setServices([...services, newSer]);
    setNewServiceName("");
    setSaveBanner(true);
  };

  // Delete Service helper
  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
    setSaveBanner(true);
  };

  // Add Portfolio Item helper
  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle.trim()) return;

    const tagsArr = portTagInput.split(",").map(t => t.trim().toLowerCase()).filter(t => t.length > 0);

    const newPort: PortfolioItem = {
      id: `p_${Date.now()}`,
      stylistId: stylist?.id || "sty_new",
      stylistName: name || "Elite Stylist",
      image: newPortImg,
      category: newPortCat,
      title: newPortTitle.trim(),
      description: newPortDesc.trim(),
      tags: tagsArr.length > 0 ? tagsArr : ["styling", "makeover"]
    };

    setPortfolio([...portfolio, newPort]);
    setNewPortTitle("");
    setNewPortDesc("");
    setPortTagInput("");
    setSaveBanner(true);
  };

  // Delete Portfolio helper
  const handleDeletePortfolio = (id: string) => {
    setPortfolio(portfolio.filter(p => p.id !== id));
    setSaveBanner(true);
  };

  // Save changes to parent state
  const handleSaveProfile = () => {
    const updatedStylistObject: Stylist = {
      id: stylist?.id || "sty_new",
      name: name.trim() || "Elite Stylist",
      image: stylist?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      salonName: salonName.trim() || "Independent Workspace",
      experience: Number(experience),
      rating: stylist?.rating || 5.0,
      reviewsCount: stylist?.reviewsCount || 0,
      specialization: services.slice(0, 3).map((s) => s.name),
      location: location,
      priceRange: priceRange,
      startingPrice: Number(startingPrice),
      bio: bio.trim() || "Specialist elite luxury hair artist based in Bangalore.",
      about: about.trim() || "Independently serving premium clients with premium custom techniques and classic aesthetics.",
      certifications: stylist?.certifications || ["Licensed Bangalore Elite Grooming Practitioner"],
      tags: tags,
      services: services,
      reviews: stylist?.reviews || [],
      portfolio: portfolio,
      availability: stylist?.availability || {
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        slots: ["10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"]
      },
      aiAnalysis: stylist?.aiAnalysis || {
        matchScore: 99,
        matchExplainer: "Dynamic model matched based on newly registered services profile.",
        pros: ["Fully customizable pricing tier", "Tailored independent artisan approach"],
        cons: ["Recently launched on platform"]
      }
    };

    onUpdateStylist(updatedStylistObject);
    setSaveBanner(false);
    
    // Alert nicely
    const modal = document.getElementById("success-save-noti");
    if (modal) {
      modal.classList.remove("opacity-0", "translate-y-2");
      setTimeout(() => {
        modal.classList.add("opacity-0", "translate-y-2");
      }, 3000);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 font-sans text-left">
      
      {/* Toast Notification */}
      <div 
        id="success-save-noti" 
        className="fixed bottom-6 right-6 z-50 bg-[#C5A059] text-white px-5 py-3 rounded-2xl shadow-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transform transition-all duration-300 opacity-0 translate-y-2 pointer-events-none"
      >
        <Check className="w-4.5 h-4.5" />
        Profile Published to Active Marketplace!
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-100 gap-4 mb-8">
        <div>
          <div className="inline-flex items-center px-2.5 py-0.5 bg-black rounded-full text-[10px] font-bold text-[#C5A059] uppercase tracking-widest mb-2.5">
            Artisan Studio Panel
          </div>
          <h1 className="text-3xl font-extrabold text-black font-sans leading-tight">
            Howdy, {name || "Professional"}!
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Stylist Dashboard. Register your craft, details, portfolio images and handle received customer requests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              handleSaveProfile();
              if (stylist?.id) setView("profile", { stylistId: stylist.id });
            }}
            className="rounded-xl border border-gray-200 bg-white hover:border-black text-xs font-bold uppercase tracking-wider px-5 py-3 transition-colors flex items-center gap-2"
          >
            Preview Profile Page →
          </button>
          
          <button
            onClick={onLogout}
            className="rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider px-4 py-3 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Save prompt floating block if services or portfolio changed */}
      {saveBanner && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-[#C5A059]/30 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-top-1">
          <p className="text-xs text-[#7A612E] font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#C5A059]" />
            You have unsaved additions or edits list modifications. Publish changes to make them visible in the search listings.
          </p>
          <button
            onClick={handleSaveProfile}
            className="w-full sm:w-auto px-4 py-2 bg-black hover:bg-[#C5A059] text-white text-[10px] font-bold uppercase rounded-lg tracking-wider block transition-all"
          >
            Publish Changes Now
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full text-left p-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-3 ${
              activeTab === "profile" 
                ? "bg-[#C5A059] text-white shadow-sm"
                : "bg-neutral-50 hover:bg-neutral-100 text-gray-700"
            }`}
          >
            <User className="w-4 h-4" />
            <span>1. Identity & Details</span>
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`w-full text-left p-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-3 ${
              activeTab === "services"
                ? "bg-[#C5A059] text-white shadow-sm"
                : "bg-neutral-50 hover:bg-neutral-100 text-gray-700"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>2. Premium Services ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("portfolio")}
            className={`w-full text-left p-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-3 ${
              activeTab === "portfolio"
                ? "bg-[#C5A059] text-white shadow-sm"
                : "bg-neutral-50 hover:bg-neutral-100 text-gray-700"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>3. Portfolio Lookbook ({portfolio.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("appointments")}
            className={`relative w-full text-left p-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-3 ${
              activeTab === "appointments"
                ? "bg-[#C5A059] text-white shadow-sm"
                : "bg-neutral-50 hover:bg-neutral-100 text-gray-700"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>4. Received Bookings</span>
            {receivedBookings.filter(b => b.status === "upcoming").length > 0 && (
              <span className="absolute right-3 bg-red-500 text-white rounded-full text-[9px] w-5 h-5 flex items-center justify-center font-bold">
                {receivedBookings.filter(b => b.status === "upcoming").length}
              </span>
            )}
          </button>

          {/* Metrics Preview */}
          <div className="bg-neutral-50 border border-gray-150 rounded-2xl p-4.5 space-y-3 mt-6 text-xs text-gray-500">
            <h5 className="font-extrabold uppercase text-[10px] text-gray-900 tracking-wider">
              Profile Marketplace Presence
            </h5>
            <div className="space-y-2 font-medium">
              <div className="flex justify-between">
                <span>Rating Average:</span>
                <span className="font-bold text-black flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {stylist?.rating || 5.0} / 5.0
                </span>
              </div>
              <div className="flex justify-between">
                <span>Completed Reviews:</span>
                <span className="font-bold text-black">{stylist?.reviewsCount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Assigned Area:</span>
                <span className="font-bold text-black">{location}</span>
              </div>
              <div className="flex justify-between">
                <span>Pricing Category:</span>
                <span className="font-bold text-[#C5A059]">{priceRange.split(" ")[0]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-9 bg-white border border-gray-150 rounded-3xl p-6.5 min-h-[480px]">
          
          {/* TAB 1: IDENTITY & DETAILS */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                <User className="h-5 w-5 text-[#C5A059]" />
                <h3 className="font-sans font-extrabold text-lg text-black">Aesthetic Identity Settings</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="stylist-name-input" className="block text-[10px] font-extrabold uppercase tracking-wide text-gray-500">Professional Name *</label>
                  <input
                    id="stylist-name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikram Singhania"
                    className="w-full px-3 py-2.5 text-xs text-black border border-gray-200 rounded-xl focus:outline-0 focus:border-[#C5A059] bg-white font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="stylist-salon-input" className="block text-[10px] font-extrabold uppercase tracking-wide text-gray-500">Luxury Studio or Salon Name *</label>
                  <input
                    id="stylist-salon-input"
                    type="text"
                    value={salonName}
                    onChange={(e) => setSalonName(e.target.value)}
                    placeholder="e.g. Noir Luxe Salon"
                    className="w-full px-3 py-2.5 text-xs text-black border border-gray-200 rounded-xl focus:outline-0 focus:border-[#C5A059] bg-white font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="stylist-exp-input" className="block text-[10px] font-extrabold uppercase tracking-wide text-gray-500">Years of Experience *</label>
                  <input
                    id="stylist-exp-input"
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(Number(e.target.value))}
                    className="w-full px-3 py-2.5 text-xs text-black border border-gray-200 rounded-xl focus:outline-0 focus:border-[#C5A059] bg-white font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="stylist-location-select" className="block text-[10px] font-extrabold uppercase tracking-wide text-gray-500">Bangalore Neighborhood District *</label>
                  <select
                    id="stylist-location-select"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs text-black border border-gray-200 rounded-xl focus:outline-0 focus:border-[#C5A059] bg-white font-sans"
                  >
                    <option value="Indiranagar">Indiranagar</option>
                    <option value="Koramangala">Koramangala</option>
                    <option value="Whitefield">Whitefield</option>
                    <option value="Jayanagar">Jayanagar</option>
                    <option value="Sadashivanagar">Sadashivanagar</option>
                    <option value="Malleshwaram">Malleshwaram</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="stylist-pricing-select" className="block text-[10px] font-extrabold uppercase tracking-wide text-gray-500">Pricing Tier *</label>
                  <select
                    id="stylist-pricing-select"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value as any)}
                    className="w-full px-3 py-2.5 text-xs text-black border border-gray-200 rounded-xl focus:outline-0 focus:border-[#C5A059] bg-white font-sans"
                  >
                    <option value="₹₹ (Premium)">₹₹ (Premium)</option>
                    <option value="₹₹₹ (Elite/Luxury)">₹₹₹ (Elite/Luxury)</option>
                    <option value="₹₹₹₹ (Ultra-Luxury)">₹₹₹₹ (Ultra-Luxury)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="stylist-starting-price" className="block text-[10px] font-extrabold uppercase tracking-wide text-gray-500">Starting Price (₹) *</label>
                  <input
                    id="stylist-starting-price"
                    type="number"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(Number(e.target.value))}
                    className="w-full px-3 py-2.5 text-xs text-black border border-gray-200 rounded-xl focus:outline-0 focus:border-[#C5A059] bg-white font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="stylist-bio-input" className="block text-[10px] font-extrabold uppercase tracking-wide text-gray-500">Short Catchy Professional Headline Bio *</label>
                <input
                  id="stylist-bio-input"
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="e.g. Master of Balayage coloring & sharp geometric cuts with over 8 years experience."
                  className="w-full px-3 py-2.5 text-xs text-black border border-gray-200 rounded-xl focus:outline-0 focus:border-[#C5A059] bg-white font-sans"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="stylist-about-input" className="block text-[10px] font-extrabold uppercase tracking-wide text-gray-500">Extended About Me / Technique Philosophy *</label>
                <textarea
                  id="stylist-about-input"
                  rows={4}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Detail your training, specialized materials used, style of consulting, and commitment..."
                  className="w-full px-3 py-2.5 text-xs text-black border border-gray-200 rounded-xl focus:outline-0 focus:border-[#C5A059] bg-white font-sans resize-none"
                />
              </div>

              {/* Tag Queries Match Manager */}
              <div className="space-y-3">
                <label className="block text-[10px] font-extrabold uppercase tracking-wide text-gray-400">
                  Search Engine Filter Tags (AI Matcher keywords)
                </label>
                <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-neutral-50/50 border border-gray-150 min-h-[50px]">
                  {tags.length === 0 ? (
                    <span className="text-gray-400 text-xs">No active match tags. Add some tags below! (e.g. balayage, curls, beard)</span>
                  ) : (
                    tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="inline-flex items-center px-2.5 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-700 capitalize shadow-sm"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1.5 text-gray-400 hover:text-black font-extrabold text-xs"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add search match tag (e.g. layers, curly, beard, wedding, keratin)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-0 focus:border-[#C5A059] bg-white font-sans"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag(e);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="rounded-xl px-4 py-2 bg-black hover:bg-[#C5A059] text-white text-[11px] font-bold uppercase tracking-wider block transition-all"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="rounded-xl bg-black hover:bg-[#C5A059] text-white py-3 px-8 text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-97 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Profile Identity</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES MANAGEMENT */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-[#C5A059]" />
                  <h3 className="font-sans font-extrabold text-lg text-black">Service Catalogue Menu</h3>
                </div>
                <span className="text-[10px] bg-neutral-100 px-2.5 py-1 rounded-full font-bold text-gray-500 uppercase tracking-widest">
                  {services.length} services serving
                </span>
              </div>

              {/* Service Add Subform */}
              <form onSubmit={handleAddService} className="bg-neutral-50/50 p-4 border border-gray-150 rounded-2xl space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wide text-black flex items-center space-x-1">
                  <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Introduce New Premium Option</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="service-name-field" className="block text-[9px] font-bold text-gray-500 uppercase">Service Name</label>
                    <input
                      id="service-name-field"
                      type="text"
                      required
                      placeholder="e.g. Designer Highlights"
                      value={newServiceName}
                      onChange={(e) => setNewServiceName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-0 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="service-price" className="block text-[9px] font-bold text-gray-500 uppercase">Rate (₹ Price)</label>
                    <input
                      id="service-price"
                      type="number"
                      required
                      min={0}
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-0 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="service-duration" className="block text-[9px] font-bold text-gray-500 uppercase">Duration (text)</label>
                    <input
                      id="service-duration"
                      type="text"
                      required
                      placeholder="e.g. 45 mins"
                      value={newServiceDuration}
                      onChange={(e) => setNewServiceDuration(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-0 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="service-cat-select" className="block text-[9px] font-bold text-gray-500 uppercase">Craft Category</label>
                    <select
                      id="service-cat-select"
                      value={newServiceCategory}
                      onChange={(e) => setNewServiceCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-0 bg-white"
                    >
                      <option value="Haircut">Haircut</option>
                      <option value="Color">Color</option>
                      <option value="Bridal">Bridal</option>
                      <option value="Grooming">Grooming</option>
                      <option value="Facial">Facial / Skin</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="rounded-lg bg-black hover:bg-[#C5A059] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider block transition-all"
                  >
                    Add Service Option
                  </button>
                </div>
              </form>

              {/* Current Services List */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                <span className="block text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
                  Active Services Available
                </span>
                
                {services.length === 0 ? (
                  <p className="p-6 border border-dashed border-gray-200 text-center text-xs text-gray-400 rounded-2xl">
                    No services. Please add at least one booking option for clients dynamically!
                  </p>
                ) : (
                  services.map((ser, i) => (
                    <div 
                      key={ser.id} 
                      className="flex justify-between items-center bg-white p-3 border border-gray-150 rounded-2xl shadow-xs"
                    >
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded bg-amber-50 text-[#C5A059] font-sans font-bold text-[8px] uppercase tracking-wider mb-0.5">
                          {ser.category}
                        </span>
                        <h4 className="font-sans font-bold text-xs text-gray-950">{ser.name}</h4>
                        <span className="block text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" /> {ser.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-mono font-extrabold text-sm text-black">
                          ₹{ser.price}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteService(ser.id)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PORTFOLIO LOOKBOOK BUILDER */}
          {activeTab === "portfolio" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="h-5 w-5 text-[#C5A059]" />
                  <h3 className="font-sans font-extrabold text-lg text-black">Portfolio Lookbook Designs</h3>
                </div>
                <span className="text-[10px] bg-neutral-100 px-2.5 py-1 rounded-full font-bold text-gray-500 uppercase tracking-widest">
                  {portfolio.length} Looks Registered
                </span>
              </div>

              {/* Lookbook Custom Construction Form */}
              <form onSubmit={handleAddPortfolio} className="bg-neutral-50/50 p-4 border border-gray-150 rounded-2xl space-y-3 text-xs text-gray-700">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wide text-black flex items-center space-x-1">
                  <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Add New Craft Transformation Post</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="port-title-field" className="block text-[9px] font-bold text-gray-500 uppercase">Lookbook Title</label>
                    <input
                      id="port-title-field"
                      type="text"
                      required
                      placeholder="e.g. Copper Caramel Balayage Shimmer"
                      value={newPortTitle}
                      onChange={(e) => setNewPortTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-0 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="port-category-select" className="block text-[9px] font-bold text-gray-500 uppercase">Craft Segment</label>
                    <select
                      id="port-category-select"
                      value={newPortCat}
                      onChange={(e) => setNewPortCat(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-0 bg-white"
                    >
                      <option value="Haircut">Haircut</option>
                      <option value="Color">Color</option>
                      <option value="Bridal">Bridal</option>
                      <option value="Makeup">Makeup</option>
                      <option value="Grooming">Grooming</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="port-desc-field" className="block text-[9px] font-bold text-gray-500 uppercase">Method Description (What techniques did you apply?)</label>
                  <input
                    id="port-desc-field"
                    type="text"
                    required
                    placeholder="Describe tools or brands used, hair condition starting point, etc."
                    value={newPortDesc}
                    onChange={(e) => setNewPortDesc(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-0 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="port-tags-field" className="block text-[9px] font-bold text-gray-500 uppercase">Look Specialization Tags (comma-separated, e.g. blonde, waves, perm)</label>
                  <input
                    id="port-tags-field"
                    type="text"
                    placeholder="curls, layers, balayage, sleek"
                    value={portTagInput}
                    onChange={(e) => setPortTagInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-0 bg-white"
                  />
                </div>

                {/* Stock Image Selection (High Craftsmanship helper) */}
                <div className="space-y-1.5 pt-1">
                  <label className="block text-[9px] font-bold text-gray-500 uppercase">
                    Select High-Fashion Stock Image Accent
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {STOCK_LOOKBOOKS.map((stock, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewPortImg(stock.url)}
                        className={`group relative h-14 rounded-lg overflow-hidden border-2 transition-all ${
                          newPortImg === stock.url ? "border-[#C5A059]" : "border-transparent"
                        }`}
                        title={stock.label}
                      >
                        <img 
                          src={stock.url} 
                          alt={stock.label} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          referrerPolicy="no-referrer"
                        />
                        {newPortImg === stock.url && (
                          <div className="absolute inset-0 bg-[#C5A059]/10 flex items-center justify-center">
                            <Check className="w-5 h-5 text-white bg-black/60 rounded-full p-0.5" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] text-gray-400 font-mono">
                    Image selected: {STOCK_LOOKBOOKS.find(s => s.url === newPortImg)?.label || "Accent Link"}
                  </span>
                  <button
                    type="submit"
                    className="rounded-lg bg-black hover:bg-[#C5A059] text-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider block transition-all"
                  >
                    Add Look Post
                  </button>
                </div>
              </form>

              {/* Lookbook Posts Listings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {portfolio.length === 0 ? (
                  <div className="col-span-full py-8 border border-dashed border-gray-200 text-center text-xs text-gray-400 rounded-2xl">
                    No lookbook posts registered. Introduce your transformations dynamically above!
                  </div>
                ) : (
                  portfolio.map((look) => (
                    <div 
                      key={look.id} 
                      className="group/item border border-gray-150 rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-md transition-all relative flex flex-col h-full"
                    >
                      <div className="relative h-44 overflow-hidden bg-neutral-100">
                        <img 
                          src={look.image} 
                          alt={look.title} 
                          className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeletePortfolio(look.id)}
                          className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sub hover:bg-red-500 rounded-full text-red-700 hover:text-white transition-colors shadow-xs"
                          title="Remove post"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="p-3 text-left space-y-1 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="inline-block px-1.5 py-0.5 rounded bg-amber-50 text-[8px] font-extrabold uppercase text-[#C5A059]">
                            {look.category}
                          </span>
                          <h4 className="font-sans font-bold text-xs text-gray-950 mt-1 line-clamp-1">{look.title}</h4>
                          <p className="text-[10px] text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">{look.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {look.tags.map((tg, idx) => (
                            <span key={idx} className="text-[9px] bg-gray-50 px-1.5 py-0.5 rounded text-gray-400 font-mono font-medium">#{tg}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: RECOVERY / RECEIVED APPOINTMENTS */}
          {activeTab === "appointments" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                <Calendar className="h-5 w-5 text-[#C5A059]" />
                <h3 className="font-sans font-extrabold text-lg text-black">Received Studio Calendar Bookings</h3>
              </div>

              {receivedBookings.length === 0 ? (
                <div className="p-12 border border-dashed border-gray-200 text-center text-xs text-gray-400 rounded-2xl">
                  <Clock className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                  <p className="font-bold">No client bookings received yet in your pipeline.</p>
                  <p className="text-[11px] mt-0.5">Logout and log in as a Client to schedule an appointment with yourself to test this flow!</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {receivedBookings.map((book) => (
                    <div 
                      key={book.id} 
                      className={`p-4 border border-gray-150 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                        book.status === "completed" 
                          ? "bg-neutral-50/50 opacity-70" 
                          : book.status === "cancelled" 
                            ? "bg-red-50/30 opacity-60" 
                            : "bg-white"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-sans font-bold text-sm text-gray-950">
                            Client Receipt Slot
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide ${
                            book.status === "upcoming" 
                              ? "bg-amber-100 text-[#C5A059]" 
                              : book.status === "completed" 
                                ? "bg-emerald-100 text-emerald-800" 
                                : "bg-red-100 text-red-800"
                          }`}>
                            {book.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-650 font-bold font-sans">
                          {book.serviceName}
                        </p>
                        <div className="text-[10px] text-gray-400 font-sans space-y-0.5">
                          <p>Schedule: <span className="font-semibold text-gray-800">{book.date} @ {book.timeSlot}</span></p>
                          <p>Client Email: <span className="font-semibold text-gray-800">{book.userEmail || "scalewitharavind@gmail.com"}</span></p>
                          <p>Billing: <span className="font-semibold text-[#C5A059]">₹{book.price} ({book.paymentMethod || "Pay at Salon"})</span></p>
                        </div>
                      </div>

                      {/* Status Edit Controller actions */}
                      {book.status === "upcoming" && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateBookingStatus(book.id, "completed")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl transition-colors shrink-0"
                          >
                            Mark Complete
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => onUpdateBookingStatus(book.id, "cancelled")}
                            className="bg-neutral-100 hover:bg-ref-100 hover:text-red-700 text-gray-500 text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-xl transition-colors shrink-0"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
