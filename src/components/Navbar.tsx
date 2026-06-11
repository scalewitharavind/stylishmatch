import { useState } from "react";
import { Sparkles, Calendar, Menu, X, User, Compass, MessageSquare, Image, Award, LogIn } from "lucide-react";

interface NavbarProps {
  currentView: string;
  setView: (view: string, extra?: { stylistId?: string }) => void;
  bookingCount: number;
  currentUser: { name: string; email: string; role: "user" | "stylist" } | null;
}

export default function Navbar({ currentView, setView, bookingCount, currentUser }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Compass },
    { id: "marketplace", label: "Explore Stylists", icon: Award },
    { id: "finder", label: "AI Match Finder", icon: Sparkles },
    { id: "concierge", label: "Concierge", icon: MessageSquare },
    { id: "portfolio-search", label: "Portfolio", icon: Image },
  ];

  const handleNav = (id: string) => {
    setView(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 lg:px-8">
        
        {/* Brand Logo - Luxury typographic branding */}
        <div 
          onClick={() => handleNav("home")} 
          className="flex cursor-pointer items-center space-x-2.5"
          id="nav-logo"
        >
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-md">
            <div className="w-4 h-4 bg-[#C5A059] rotate-45 transition-transform duration-500 hover:rotate-135"></div>
          </div>
          <div>
            <span className="font-sans font-extrabold text-lg tracking-tight uppercase text-black">
              StylistMatch <span className="text-[#C5A059]">AI</span>
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`relative flex items-center space-x-1.5 py-2 font-sans text-sm font-medium transition-colors duration-200 ${
                  isActive 
                    ? "text-black font-semibold" 
                    : "text-gray-500 hover:text-black"
                }`}
                id={`nav-item-${item.id}`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-amber-500" : "text-gray-400"}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-amber-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button: Dashboard / Appointments */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <button
              onClick={() => handleNav("dashboard")}
              className={`flex items-center space-x-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                currentView === "dashboard"
                  ? "border-black bg-black text-white"
                  : "border-gray-200 text-gray-700 bg-white hover:border-black"
              }`}
              id="nav-booking-btn"
            >
              <User className="h-4 w-4 text-[#C5A059]" />
              <span>{currentUser.role === "stylist" ? `Studio (${currentUser.name.split(" ")[0]})` : `Dashboard (${currentUser.name.split(" ")[0]})`}</span>
              {bookingCount > 0 && currentUser.role === "user" && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-extrabold text-white animate-bounce">
                  {bookingCount}
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={() => handleNav("login")}
              className={`flex items-center space-x-2 rounded-full border px-4.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                currentView === "login"
                  ? "border-[#C5A059] bg-[#C5A059] text-white"
                  : "border-[#C5A059]/40 text-[#A68037] bg-[#C5A059]/5 hover:bg-[#C5A059] hover:text-white"
              }`}
              id="nav-login-btn"
            >
              <LogIn className="h-4 w-4" />
              <span>Log In / Sign Up</span>
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-3">
          {currentUser ? (
            <button
              onClick={() => handleNav("dashboard")}
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-gray-700 ${
                currentView === "dashboard" ? "border-black bg-black text-white" : "border-gray-200 bg-white"
              }`}
              aria-label="Dashboard"
            >
              <User className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => handleNav("login")}
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-[#C5A059] ${
                currentView === "login" ? "bg-[#C5A059] text-white border-[#C5A059]" : "border-gray-200 bg-white"
              }`}
              aria-label="Login"
            >
              <LogIn className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-black focus:outline-none"
            id="mobile-menu-trigger"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-medium font-medium transition-colors ${
                  isActive 
                    ? "bg-amber-50/50 text-amber-700" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-amber-500" : "text-gray-400"}`} />
                <span className="font-sans text-sm">{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-gray-100">
            {currentUser ? (
              <button
                onClick={() => handleNav("dashboard")}
                className="flex w-full items-center justify-between rounded-xl bg-black px-4 py-3 text-white transition-colors hover:bg-neutral-800"
              >
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-amber-400" />
                  <span className="font-sans text-sm font-semibold">
                    {currentUser.role === "stylist" ? "Studio Workspace" : "User Dashboard"}
                  </span>
                </div>
                {bookingCount > 0 && currentUser.role === "user" && (
                  <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold">
                    {bookingCount} active
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={() => handleNav("login")}
                className="flex w-full items-center justify-center space-x-3 rounded-xl bg-[#C5A059] px-4 py-3 text-white transition-colors hover:bg-amber-600 font-sans text-sm font-semibold uppercase tracking-wider"
              >
                <LogIn className="h-5 w-5" />
                <span>Log In / Sign Up</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
