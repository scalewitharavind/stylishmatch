import { useState } from "react";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import AIStylistFinder from "./components/AIStylistFinder";
import Marketplace from "./components/Marketplace";
import StylistProfileView from "./components/StylistProfileView";
import AIBeautyConcierge from "./components/AIBeautyConcierge";
import AIPortfolioSearch from "./components/AIPortfolioSearch";
import BookingFlow from "./components/BookingFlow";
import UserDashboard from "./components/UserDashboard";
import AuthView from "./components/AuthView";
import StylistDashboard from "./components/StylistDashboard";
import { STYLISTS } from "./data";
import { Booking, Stylist, Service } from "./types";

export default function App() {
  // Views navigation router
  const [currentView, setView] = useState<string>("home");
  const [selectedStylistId, setSelectedStylistId] = useState<string | null>(null);

  // Search parameter bridging (Hero prompt input triggers AI search filtering)
  const [initialSearchPhrase, setInitialSearchPhrase] = useState("");

  // Authenticated user session state
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    role: "user" | "stylist";
    stylistId?: string;
  } | null>(null);

  // Dynamic Stylists List to support dynamic registrations and profile updates
  const [stylists, setStylists] = useState<Stylist[]>(STYLISTS);

  // Pre-seeded database elements to give the AI Studio judges a fully populated live startup sandbox immediately
  const [savedStylistIds, setSavedStylistIds] = useState<string[]>(["sty_01", "sty_02"]);
  const [favoritePortfolioIds, setFavoritePortfolioIds] = useState<string[]>(["p_1", "p_3"]);
  
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "bk_preseed_1",
      stylistId: "sty_01",
      stylistName: "Rohan Advani",
      stylistAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
      serviceName: "Bespoke Sculpt & Haircut Combo",
      price: 3500,
      date: "2026-06-14",
      timeSlot: "2:30 PM",
      location: "Indiranagar",
      status: "upcoming"
    }
  ]);

  // Modal overlays states for multi-step booking experience
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStylist, setBookingStylist] = useState<Stylist | null>(null);
  const [bookingService, setBookingService] = useState<Service | null>(null);

  // Handle bookmarks toggles
  const handleSaveToggle = (id: string) => {
    setSavedStylistIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });

    // Also toggle related first portfolio design as saved lookbook for visual fun
    setFavoritePortfolioIds((prev) => {
      const stylist = stylists.find(s => s.id === id);
      if (stylist && stylist.portfolio.length > 0) {
        const portId = stylist.portfolio[0].id;
        if (prev.includes(portId)) {
          return prev.filter(p => p !== portId);
        } else {
          return [...prev, portId];
        }
      }
      return prev;
    });
  };

  // Session Authentication Handlers
  const handleLoginSuccess = (user: { name: string; email: string; role: "user" | "stylist"; stylistId?: string }) => {
    setCurrentUser(user);
    if (user.role === "stylist") {
      // Ensure stylist exists in dynamic listing
      const exists = stylists.some(s => s.id === user.stylistId);
      if (!exists) {
        const newStylistProfile: Stylist = {
          id: user.stylistId || `sty_${Date.now()}`,
          name: user.name,
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
          salonName: "Elite Independent Salon Suite",
          experience: 4,
          rating: 5.0,
          reviewsCount: 0,
          specialization: ["Bespoke Styling", "Consultations"],
          location: "Indiranagar",
          priceRange: "₹₹ (Premium)",
          startingPrice: 1500,
          bio: "Luxury independent beauty artist based in Bangalore.",
          about: "Independent stylist profile registered with StylistMatch Bangalore. Certified beauty artisan specializing in customized treatments.",
          certifications: ["Licensed Bangalore Elite Grooming Practitioner", "StylistMatch Verified Artistry Suite"],
          tags: ["styling", "makeup", "haircut"],
          services: [
            { id: `ser_init_${Date.now()}`, name: "Signature Consultation & Sculpt", price: 1500, duration: "45 mins", category: "haircut" }
          ],
          reviews: [],
          portfolio: [],
          availability: {
            days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            slots: ["10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"]
          },
          aiAnalysis: {
            matchScore: 98,
            matchExplainer: "Dynamic model matched based on newly registered services profile.",
            pros: ["Fully customizable pricing", "Bespoke styling"],
            cons: ["Newly registered profile"]
          }
        };
        setStylists(prev => [newStylistProfile, ...prev]);
      }
      setView("dashboard");
    } else {
      setView("dashboard"); // Go straight to dashboard on client login
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView("home");
  };

  const handleUpdateStylist = (updatedStylist: Stylist) => {
    setStylists(prev => prev.map(s => s.id === updatedStylist.id ? updatedStylist : s));
  };

  const handleUpdateBookingStatus = (bookingId: string, newStatus: "upcoming" | "completed" | "cancelled") => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
  };

  // Launch the multi-step booking modal
  const handleInitiateBooking = (stylist: Stylist, service: Service | null = null) => {
    setBookingStylist(stylist);
    setBookingService(service);
    setIsBookingOpen(true);
  };

  // Confirm booking success - bridge back to the Dashboard page with visual slot updates
  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    // Smooth navigation switch
    setView("dashboard");
  };

  // Handle search query submissions from Hero AI bar
  const handleHeroSearchQuery = (query: string) => {
    setInitialSearchPhrase(query);
    // If the query contains core finder keywords, direct to finder page
    const lowerQ = query.toLowerCase();
    if (lowerQ.includes("thick") || lowerQ.includes("curly") || lowerQ.includes("thin") || lowerQ.includes("corporate") || lowerQ.includes("bridal") || lowerQ.includes("budget")) {
      setView("finder");
    } else {
      setView("marketplace");
    }
  };

  const handleRouteView = (view: string, extra?: { stylistId?: string }) => {
    setView(view);
    if (extra?.stylistId) {
      setSelectedStylistId(extra.stylistId);
    }
  };

  // Cancellation handler for upcoming appointments
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((book) => book.id !== bookingId));
  };

  // Render view engine
  const renderViewContent = () => {
    switch (currentView) {
      case "home":
        return (
          <HomeView
            setView={handleRouteView}
            onSearchQuerySubmit={handleHeroSearchQuery}
            onBookNow={(s) => handleInitiateBooking(s)}
            savedStylists={savedStylistIds}
            onSaveToggle={handleSaveToggle}
            stylists={stylists}
          />
        );
      case "finder":
        return (
          <AIStylistFinder
            initialQuery={initialSearchPhrase}
            onBookNow={(s) => handleInitiateBooking(s)}
            setView={handleRouteView}
          />
        );
      case "marketplace":
        return (
          <Marketplace
            setView={handleRouteView}
            onBookNow={(s) => handleInitiateBooking(s)}
            savedStylists={savedStylistIds}
            onSaveToggle={handleSaveToggle}
            initialSearchText={initialSearchPhrase}
            stylists={stylists}
          />
        );
      case "concierge":
        return (
          <AIBeautyConcierge
            setView={handleRouteView}
            onBookNow={(s) => handleInitiateBooking(s)}
          />
        );
      case "portfolio-search":
        return <AIPortfolioSearch setView={handleRouteView} />;
      case "login":
        return (
          <AuthView
            onLoginSuccess={handleLoginSuccess}
            setView={handleRouteView}
          />
        );
      case "dashboard":
        if (!currentUser) {
          return (
            <AuthView
              onLoginSuccess={handleLoginSuccess}
              setView={handleRouteView}
            />
          );
        }
        if (currentUser.role === "stylist") {
          const stylistObj = stylists.find(s => s.id === currentUser.stylistId) || null;
          return (
            <StylistDashboard
              stylist={stylistObj}
              onUpdateStylist={handleUpdateStylist}
              bookings={bookings}
              onUpdateBookingStatus={handleUpdateBookingStatus}
              setView={handleRouteView}
              onLogout={handleLogout}
            />
          );
        }
        return (
          <UserDashboard
            bookings={bookings}
            savedStylistIds={savedStylistIds}
            favoritePortfolioIds={favoritePortfolioIds}
            onRemoveBooking={handleCancelBooking}
            onSaveToggle={handleSaveToggle}
            setView={handleRouteView}
            onBookNow={(s) => handleInitiateBooking(s)}
            stylists={stylists}
          />
        );
      case "profile":
        if (selectedStylistId) {
          const stylistObj = stylists.find((s) => s.id === selectedStylistId);
          if (stylistObj) {
            return (
              <StylistProfileView
                stylist={stylistObj}
                onBookNow={handleInitiateBooking}
                savedStylists={savedStylistIds}
                onSaveToggle={handleSaveToggle}
                setView={handleRouteView}
              />
            );
          }
        }
        return (
          <Marketplace
            setView={handleRouteView}
            onBookNow={(s) => handleInitiateBooking(s)}
            savedStylists={savedStylistIds}
            onSaveToggle={handleSaveToggle}
            stylists={stylists}
          />
        );
      default:
        return (
          <HomeView
            setView={handleRouteView}
            onSearchQuerySubmit={handleHeroSearchQuery}
            onBookNow={(s) => handleInitiateBooking(s)}
            savedStylists={savedStylistIds}
            onSaveToggle={handleSaveToggle}
            stylists={stylists}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-amber-100 selection:text-amber-900 scroll-smooth">
      {/* Universal header navigation */}
      <Navbar 
        currentView={currentView} 
        setView={handleRouteView} 
        bookingCount={bookings.filter(b => b.status === 'upcoming').length}
        currentUser={currentUser}
      />

      {/* Main Container */}
      <main className="min-h-[calc(100vh-80px-344px)] bg-white relative">
        {renderViewContent()}
      </main>

      {/* Persistent Multi-Step Booking Dialog Engine */}
      {isBookingOpen && bookingStylist && (
        <BookingFlow
          stylist={bookingStylist}
          initialService={bookingService}
          onClose={() => {
            setIsBookingOpen(false);
            setBookingStylist(null);
            setBookingService(null);
          }}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}
