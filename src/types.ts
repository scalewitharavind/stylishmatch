export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string; // e.g., "45 mins"
  category: string; // e.g., "Haircut", "Color", "Bridal", "Grooming"
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  tags?: string[];
}

export interface PortfolioItem {
  id: string;
  stylistId: string;
  stylistName: string;
  image: string;
  category: string; // "Haircut" | "Color" | "Bridal" | "Makeup" | "Grooming" | "Transformation"
  title: string;
  description: string;
  tags: string[];
}

export interface Stylist {
  id: string;
  name: string;
  image: string;
  salonName: string;
  experience: number; // in years
  rating: number;
  reviewsCount: number;
  specialization: string[]; // e.g., ["Korean Layered Cut", "Balayage", "Bridal Styling"]
  location: string; // Bangalore areas like Indiranagar, Koramangala
  priceRange: "₹₹ (Premium)" | "₹₹₹ (Elite/Luxury)" | "₹₹₹₹ (Ultra-Luxury)";
  startingPrice: number; // e.g., 2500
  bio: string;
  about: string;
  certifications: string[]; // eVIDENCE OF EXCELLENCE
  tags: string[]; // tags for AI querying e.g. ["curly", "balayage", "beard", "korean"]
  services: Service[];
  reviews: Review[];
  portfolio: PortfolioItem[];
  availability: {
    days: string[]; // e.g., ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    slots: string[]; // e.g., ["10:00 AM", "11:30 AM", "1:00 PM"]
  };
  aiAnalysis: {
    matchScore: number;
    matchExplainer: string;
    pros: string[];
    cons: string[];
  };
}

export interface Booking {
  id: string;
  stylistId: string;
  stylistName: string;
  stylistAvatar: string;
  serviceName: string;
  price: number;
  date: string;
  timeSlot: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
  userEmail?: string;
  paymentMethod?: string;
}

export interface SearchCriteria {
  hairType: string;
  occasion: string;
  gender: string;
  budget: string;
  preferredArea: string;
  desiredStyle: string;
}
