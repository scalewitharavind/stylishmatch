import { Stylist, PortfolioItem } from "./types";

// Premium Unsplash images representing models, hairstyles, and luxury work
const IMAGES = {
  stylists: [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80", // Female 1
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80", // Male 1
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80", // Female 2
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80", // Male 2
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80", // Female 3
    "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=500&auto=format&fit=crop&q=80", // Male 3
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80", // Female 4
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80", // Male 4
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=80", // Female 5
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80", // Male 5
    "https://images.unsplash.com/photo-1594744803329-e58b31de215f?w=500&auto=format&fit=crop&q=80", // Female 6
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80", // Male 6
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80", // Female 7
    "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&auto=format&fit=crop&q=80", // Male 7
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&auto=format&fit=crop&q=80", // Female 8
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=80", // Male 8
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80", // Female 9
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80", // Male 9
    "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=500&auto=format&fit=crop&q=80", // Female 10
    "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=500&auto=format&fit=crop&q=80", // Male 10
  ],
  haircuts: [
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605497746444-ac9dbd43d4a6?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80",
  ],
  color: [
    "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1634449571010-02c1040f5a01?w=600&auto=format&fit=crop&q=80",
  ],
  bridal: [
    "https://images.unsplash.com/photo-1591555200577-03577ccb810d?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80",
  ],
  grooming: [
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1593702295094-aea22597af65?w=600&auto=format&fit=crop&q=80",
  ],
  makeup: [
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80",
  ]
};

// Seed 20 highly stylized luxury stylists in Bangalore
export const STYLISTS: Stylist[] = [
  {
    id: "sty_01",
    name: "Rohan Advani",
    image: IMAGES.stylists[1],
    salonName: "The Prestige Lounge",
    experience: 12,
    rating: 4.9,
    reviewsCount: 238,
    specialization: ["Luxury Beard Makeover", "Executive Scissors Fade", "Hair Treatment"],
    location: "Indiranagar",
    priceRange: "₹₹₹ (Elite/Luxury)",
    startingPrice: 3500,
    bio: "Ex-creative director for Tony & Guy London, Rohan has styled Bangalore's elite VC crowd and startup founders.",
    about: "With more than a decade of international training, Rohan specializes in classic gentleman grooming, sharp academic cuts, and modern texturizing. His precision is legendary and he maintains a strict one-client-at-a-time focus to guarantee absolute styling control.",
    certifications: ["Vidal Sassoon Diploma, London", "American Crew All-Star Trainer License", "Elite Grooming Masterclass"],
    tags: ["male", "grooming", "executive", "beard", "undercut", "straight", "wavy", "indiranagar"],
    availability: {
      days: ["Mon", "Tue", "Thu", "Fri", "Sat"],
      slots: ["10:30 AM", "12:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"]
    },
    services: [
      { id: "ser_1", name: "Bespoke Sculpt & Haircut Combo", price: 3500, duration: "60 mins", category: "Grooming" },
      { id: "ser_2", name: "Premium Royal Shave & Facial Massage", price: 2200, duration: "45 mins", category: "Grooming" },
      { id: "ser_3", name: "Scalp Nourishing Ritual with Steam & Styling", price: 4000, duration: "75 mins", category: "Hair Treatment" }
    ],
    reviews: [
      { id: "rev_1", userName: "Aravind S.", rating: 5, comment: "Hands down the best beard work in Bangalore. The attention Rohan pays to the facial geometry is amazing. Well worth the price.", date: "2026-05-24" },
      { id: "rev_2", userName: "Nikhil Kamath", rating: 5, comment: "Rohan has been cutting my hair for 3 years. Pristine attention to detail and a fantastic single slot luxury focus.", date: "2026-06-02" }
    ],
    portfolio: [
      { id: "p_1", stylistId: "sty_01", stylistName: "Rohan Advani", image: IMAGES.grooming[1], category: "Grooming", title: "Sharp Textured Executive Undercut", description: "Balanced temple fade paired with high-volume executive texturizing.", tags: ["undercut", "fade", "grooming"] },
      { id: "p_2", stylistId: "sty_01", stylistName: "Rohan Advani", image: IMAGES.grooming[2], category: "Grooming", title: "Luxury Beard Crafting & Hot Towel Finish", description: "Symmetric line shape and volume control using premium organic oils.", tags: ["beard", "grooming"] }
    ],
    aiAnalysis: {
      matchScore: 98,
      matchExplainer: "Highly matching because Rohan is a top specialist in grooming and executive cuts located in Indiranagar, perfect for elite mens' styling.",
      pros: ["Precision beard sculpting expert", "Trained at Vidal Sassoon London", "High-stress executive consulting available"],
      cons: ["Booked out 2 weeks in advance", "Premium pricing on weekend slots"]
    }
  },
  {
    id: "sty_02",
    name: "Priya Murthy",
    image: IMAGES.stylists[0],
    salonName: "Maison de Luxe Boutique",
    experience: 14,
    rating: 4.95,
    reviewsCount: 312,
    specialization: ["Balayage & Ombre", "Korean Haircuts", "Keratin Therapy"],
    location: "Koramangala",
    priceRange: "₹₹₹₹ (Ultra-Luxury)",
    startingPrice: 5500,
    bio: "Priya is renowned for her effortless French-style lived-in colors and precision bangs suited for corporate founders and luxury professionals.",
    about: "Educated in Paris and Seoul, Priya blends Korean dynamic texturizing with luxury French hair painting. Her clients fly in from Mumbai and Delhi for her bespoke dimensional balayages which look stunning even after months of regrowth.",
    certifications: ["Paris L'Oréal Professionnel Color Master", "La Biosthetique Paris Advanced Esthetician", "Seoul Hair Styling Association Recognition"],
    tags: ["female", "color", "balayage", "korean", "curly", "wavy", "straight", "koramangala"],
    availability: {
      days: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      slots: ["10:00 AM", "1:00 PM", "3:30 PM", "6:00 PM"]
    },
    services: [
      { id: "ser_4", name: "Vanguard Balayage & Olaplex Treatment", price: 8500, duration: "180 mins", category: "Color" },
      { id: "ser_5", name: "Premium Korean Fluid Layered Design", price: 5500, duration: "75 mins", category: "Haircut" },
      { id: "ser_6", name: "Luxury French Glossing & Blowout", price: 3800, duration: "50 mins", category: "Color" }
    ],
    reviews: [
      { id: "rev_3", userName: "Deepika R.", rating: 5, comment: "I asked for a lived-in balayage and Priya created absolute magic. My hair looks expensive yet so natural!", date: "2026-05-18" },
      { id: "rev_4", userName: "Kriti Sharma", rating: 5, comment: "Her Korean layered cut has changed my entire look. Highly recommend if you want dynamic framing for thick hair.", date: "2026-05-29" }
    ],
    portfolio: [
      { id: "p_3", stylistId: "sty_02", stylistName: "Priya Murthy", image: IMAGES.color[0], category: "Color", title: "Soft Honey Balayage & French Waves", description: "Dimensional hand-painted highlights melting into deep natural roots.", tags: ["balayage", "color"] },
      { id: "p_4", stylistId: "sty_02", stylistName: "Priya Murthy", image: IMAGES.haircuts[0], category: "Haircut", title: "Korean Layered Cut with Fluid Framing", description: "Lightweight texture on thick hair with curtain bangs tailored for rectangular face layout.", tags: ["korean", "haircut"] }
    ],
    aiAnalysis: {
      matchScore: 97,
      matchExplainer: "Best suited for individuals seeking luxury dimensional hair coloring, subtle transitions, and high-impact custom Korean haircuts.",
      pros: ["Global training in Paris & Seoul", "Exceptional color longevity", "Incredible consultation detail"],
      cons: ["Stricter cancellation window (24 hrs)", "Starting price is premium"]
    }
  },
  {
    id: "sty_03",
    name: "Meera Nair",
    image: IMAGES.stylists[2],
    salonName: "Bridal Atelier & Co.",
    experience: 16,
    rating: 4.98,
    reviewsCount: 420,
    specialization: ["Bridal Makeover", "HD Airbrush Makeup", "Intricate Bridal Buns"],
    location: "Koramangala",
    priceRange: "₹₹₹₹ (Ultra-Luxury)",
    startingPrice: 8000,
    bio: "Meera is Bangalore's most sought-after celebrity bridal stylist. She has crafted timeless looks for over 500 premium weddings.",
    about: "Meera approach blends subtle traditional charm with modern high-fashion aesthetics. She specializes in HD airbrush look, glass skin finishes, and complex South/North Indian hair transformations that stay photogenic for over 18 hours.",
    certifications: ["Bridal Makeover Guild Certified", "Anastasia Beverly Hills Master Class", "Kryolan Airbrush Professional Certification"],
    tags: ["female", "bridal", "makeup", "wedding", "glam", "koramangala"],
    availability: {
      days: ["Wed", "Thu", "Fri", "Sat", "Sun"],
      slots: ["8:00 AM", "12:00 PM", "3:30 PM", "7:00 PM"]
    },
    services: [
      { id: "ser_7", name: "Royal HD Airbrush Bridal Makeover & Draping", price: 18000, duration: "210 mins", category: "Bridal" },
      { id: "ser_8", name: "South Indian Luxury Bridal Hair Transformation", price: 8000, duration: "120 mins", category: "Bridal" },
      { id: "ser_9", name: "Premium Engagement Dewy Glow Makeup & Hair", price: 11000, duration: "150 mins", category: "Makeup" }
    ],
    reviews: [
      { id: "rev_5", userName: "Ananya Hegde", rating: 5, comment: "Meera styled me for my wedding. The HD makeup was stunning under both high flash and bright sunlight. She is a queen!", date: "2026-06-01" },
      { id: "rev_6", userName: "Divya Rao", rating: 5, comment: "Extremely professional. She calmed my nerves and made me look better than I could have ever imagined for my engagement.", date: "2026-06-05" }
    ],
    portfolio: [
      { id: "p_5", stylistId: "sty_03", stylistName: "Meera Nair", image: IMAGES.bridal[0], category: "Bridal", title: "Imperial Gold Bridal Bun & Dewy Makeover", description: "Bespoke traditional hair art matching gold embroidery, featuring ultra-glam skin.", tags: ["bridal", "wedding"] },
      { id: "p_6", stylistId: "sty_03", stylistName: "Meera Nair", image: IMAGES.makeup[0], category: "Makeup", title: "Soft Dewy Rosewood Makeup", description: "Minimalist yet highly photographic makeup using exclusive, premium organic serums.", tags: ["makeup", "glam"] }
    ],
    aiAnalysis: {
      matchScore: 99,
      matchExplainer: "Excellent match for bridal styling, traditional events, HD camera makeup, and high-stakes wedding preps in Bangalore.",
      pros: ["Highly experienced in high-profile events", "Masters complex draping & hair work", "Top-shelf global cosmetic products used"],
      cons: ["Requires high advance deposit", "Fills up quickly on wedding season dates"]
    }
  },
  {
    id: "sty_04",
    name: "Kabir Sen",
    image: IMAGES.stylists[3],
    salonName: "Aura Creative Space",
    experience: 9,
    rating: 4.88,
    reviewsCount: 189,
    specialization: ["Creative Highlights", "Platinum Transformations", "Precision Bob Cut"],
    location: "HSR Layout",
    priceRange: "₹₹ (Premium)",
    startingPrice: 2800,
    bio: "Ex-Wella Master Colorist Kabir is the go-to for vibrant, bold, and modern aesthetic color shifts in South Bangalore.",
    about: "Kabir treats hair as a canvas. From gorgeous Ash Blonde to rich Auburn with precision bobs, Kabir uses complex bond repair systems to keep coloring healthy, shiny, and structurally flawless.",
    certifications: ["Wella Master Color Expert", "Olaplex Certified Hair Science Technician", "B3 Bond Builder Master Certification"],
    tags: ["male", "color", "highlight", "bob", "straight", "thin", "wavy", "hsr layout"],
    availability: {
      days: ["Mon", "Tue", "Wed", "Fri", "Sat"],
      slots: ["11:00 AM", "1:30 PM", "4:00 PM", "6:30 PM"]
    },
    services: [
      { id: "ser_10", name: "Elite Full Bleach & Creative Highlights", price: 6500, duration: "150 mins", category: "Color" },
      { id: "ser_11", name: "Sassoon Precision Bob & Organic Gloss", price: 3200, duration: "90 mins", category: "Haircut" },
      { id: "ser_12", name: "Premium Blonde Toning & Olaplex Repair", price: 2800, duration: "60 mins", category: "Color" }
    ],
    reviews: [
      { id: "rev_7", userName: "Tanya M.", rating: 5, comment: "Kabir is a literal genius. Got my silver-blonde highlights done, and my hair still feels incredibly soft. No damage at all!", date: "2026-05-15" }
    ],
    portfolio: [
      { id: "p_7", stylistId: "sty_04", stylistName: "Kabir Sen", image: IMAGES.color[1], category: "Color", title: "Subtle Ash Silver Highlights & Wave Styling", description: "Custom multi-tonal hand painting for high-contrast short textures.", tags: ["color", "highlights"] }
    ],
    aiAnalysis: {
      matchScore: 94,
      matchExplainer: "Best suited for fashion-forward color changes, metallic highlight tones, and precise structuring bobs.",
      pros: ["Wella Licensed master colorist", "Bond-preserving science approach", "Friendly, collaborative consultation"],
      cons: ["Requires a pre-strand checking visit for high-bleach services"]
    }
  },
  {
    id: "sty_05",
    name: "Jin-Woo Park",
    image: IMAGES.stylists[5],
    salonName: "K-Beauty Avenue",
    experience: 11,
    rating: 4.93,
    reviewsCount: 165,
    specialization: ["Korean Two-Block Cut", "Down Perms", "Shadow Perm & Texturing"],
    location: "Indiranagar",
    priceRange: "₹₹₹ (Elite/Luxury)",
    startingPrice: 3200,
    bio: "Hailing from Gangnam, Seoul, Jin-Woo specializes in authentic modern Korean men's haircuts, down perms, and textured waves.",
    about: "Jin-Woo has designed hair in Gangnam's high-end style cafes before moving to Bangalore. He brings original Korean hair solutions, including heat styling perms and secret chemicals imported directly from South Korea designed to soften coarse hair and shape sideburns flat.",
    certifications: ["Gangnam Elite Styling Academy Diploma", "Shiseido Professional Perm Specialist", "Korean Mens Grooming Association Master"],
    tags: ["male", "grooming", "korean", "straight", "thick", "indiranagar"],
    availability: {
      days: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      slots: ["11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"]
    },
    services: [
      { id: "ser_13", name: "Korean Signature Two-Block & Down Perm", price: 4200, duration: "90 mins", category: "Grooming" },
      { id: "ser_14", name: "Shadow Perm Styling & Sculpt Cut", price: 5000, duration: "120 mins", category: "Haircut" },
      { id: "ser_15", name: "Executive K-Styling & Deep Clean Mash", price: 3200, duration: "60 mins", category: "Grooming" }
    ],
    reviews: [
      { id: "rev_8", userName: "Varun R.", rating: 5, comment: "Finally, someone in Bangalore who can actually do a real Korean Down Perm. Incredible volume control on the sides. Love it!", date: "2026-05-20" }
    ],
    portfolio: [
      { id: "p_8", stylistId: "sty_05", stylistName: "Jin-Woo Park", image: IMAGES.haircuts[1], category: "Haircut", title: "Textured Volume Shadow Perm with Soft Sides", description: "Premium side-flattening down perm paired with textured premium light crown waves.", tags: ["korean", "haircut"] }
    ],
    aiAnalysis: {
      matchScore: 96,
      matchExplainer: "Best matching for East-Asian styles, sleek sideburn containment, layered volume perms, and premium textured haircuts.",
      pros: ["Imported South Korean products", "Gangnam-trained stylist", "Solves the 'puffy Asian hair sideburns' struggle"],
      cons: ["Communication matches English beautifully, but he speaks fairly fast"]
    }
  },
  {
    id: "sty_06",
    name: "Aisha Khan",
    image: IMAGES.stylists[4],
    salonName: "Chroma House",
    experience: 8,
    rating: 4.86,
    reviewsCount: 142,
    specialization: ["Curly Hair Sculpting", "Curly Styling (DevaCut)", "Vibrant Copper Toners"],
    location: "HSR Layout",
    priceRange: "₹₹ (Premium)",
    startingPrice: 2000,
    bio: "Known as the 'Bangalore Curl Specialist', Aisha is dedicated entirely to the art of wavy, curly, and coily hair styling.",
    about: "Having spent years mastering the dry-cutting DevaCut technique, Aisha cuts curls clump-by-clump to build natural volume that frames the face elegantly. She uses organic, humidity-shielding vegan formulas.",
    certifications: ["DevaCurl Certified Level 3 Coach", "Vapor-Dry-Cutting System Guild License"],
    tags: ["female", "curly", "wavy", "hsr layout"],
    availability: {
      days: ["Wed", "Thu", "Fri", "Sat", "Sun"],
      slots: ["10:00 AM", "12:00 PM", "2:00 PM", "4:30 PM", "6:30 PM"]
    },
    services: [
      { id: "ser_16", name: "Premium Dry DevaCut & Hydration Styling", price: 3200, duration: "90 mins", category: "Haircut" },
      { id: "ser_17", name: "Curly Clarifying Deep Treat & Bounce Lock", price: 2000, duration: "60 mins", category: "Hair Treatment" }
    ],
    reviews: [
      { id: "rev_9", userName: "Simran K.", rating: 5, comment: "I have had bad curly cuts my whole life until Aisha. She understands texture, patterns, and moisture like nobody else.", date: "2026-05-12" }
    ],
    portfolio: [
      { id: "p_9", stylistId: "sty_06", stylistName: "Aisha Khan", image: "https://images.unsplash.com/photo-1577441122178-0d32156828b4?w=600&auto=format&fit=crop&q=80", category: "Haircut", title: "Voluminous Rounded Devacut Transformation", description: "Bespoke structural curl positioning with dynamic custom layered texturizing.", tags: ["curly", "haircut"] }
    ],
    aiAnalysis: {
      matchScore: 95,
      matchExplainer: "Best suited for curly or wavy hair patterns seeking structural dry cutting, intense hydration therapy, and curl restoration layouts.",
      pros: ["DevaCurl elite specialist", "Silicone-free natural treatments only", "Individualized styling instruction provided"],
      cons: ["Dry cut means you must arrive with clean, product-free dry hair"]
    }
  },
  {
    id: "sty_07",
    name: "Vikram Singhania",
    image: IMAGES.stylists[7],
    salonName: "Noir Salon & Spa",
    experience: 18,
    rating: 4.97,
    reviewsCount: 512,
    specialization: ["Balayage", "High-Society Makeovers", "Celebrity Red Carpet Styles"],
    location: "Sadashivanagar",
    priceRange: "₹₹₹₹ (Ultra-Luxury)",
    startingPrice: 6000,
    bio: "Styling Bangalore's political leaders and top film actors, Vikram brings majestic heritage luxury and red carpet glow.",
    about: "Vikram is a pioneer of modern hairdressing in India. Operating from the high-wealth Sadashivanagar area, his studio provides high privacy, personal assistants, and highly customized aesthetic makeovers.",
    certifications: ["Paris Académie de Coiffure Honorary Graduate", "Lifetime Achievement Award, Indian Salon Congress", "Kerastase Celebrity Hair Ambassador"],
    tags: ["male", "color", "bridal", "special", "sadashivanagar", "female", "wavy", "straight"],
    availability: {
      days: ["Tue", "Thu", "Sat", "Sun"],
      slots: ["11:00 AM", "1:30 PM", "3:30 PM", "6:00 PM"]
    },
    services: [
      { id: "ser_18", name: "Red Carpet Makeover & Hair Design", price: 12000, duration: "120 mins", category: "Luxury Styling" },
      { id: "ser_19", name: "Couture Balayage & Gold Dust Therapy", price: 9500, duration: "180 mins", category: "Color" }
    ],
    reviews: [
      { id: "rev_10", userName: "Priya V.", rating: 5, comment: "The booking is private and highly secure. Vikram designed an incredibly artistic style for my high-end event.", date: "2026-05-04" }
    ],
    portfolio: [
      { id: "p_10", stylistId: "sty_07", stylistName: "Vikram Singhania", image: IMAGES.haircuts[2], category: "Haircut", title: "Symmetrical Soft French Layers", description: "Timeless volume layout reflecting classic French opulence.", tags: ["haircut", "layers"] }
    ],
    aiAnalysis: {
      matchScore: 98,
      matchExplainer: "Perfect match if you require absolute celebrity-grade style, extreme privacy, and timeless, refined hair architecture.",
      pros: ["High privacy separate executive styling suites", "Stately, highly respectful hospitality", "Incomparable luxury stature"],
      cons: ["Extremely difficult to reschedule last minute", "Premium luxury pricing structure"]
    }
  },
  {
    id: "sty_08",
    name: "Ananya Deshmukh",
    image: IMAGES.stylists[6],
    salonName: "Elite Face Lab",
    experience: 10,
    rating: 4.91,
    reviewsCount: 198,
    specialization: ["Glass Skin Makeup", "Editorial Fashion Style", "Glamorous Eyelashes"],
    location: "Jayanagar",
    priceRange: "₹₹₹ (Elite/Luxury)",
    startingPrice: 4000,
    bio: "Fashion week makeup director Ananya is famous for her signature glass-skin finishes and dewy, healthy skin highlights.",
    about: "Ananya has designed runways for Lakme Fashion Week. Her style focus is clean, sophisticated, editorial, and photogenic—accentuating rather than masking natural features.",
    certifications: ["London School of Makeup Gold Medalist", "MAC Editorial Lead Consultant", "Mario Dedivanovic MASTER Makeup Award"],
    tags: ["female", "makeup", "wedding", "glam", "jayanagar"],
    availability: {
      days: ["Tue", "Thu", "Fri", "Sat", "Sun"],
      slots: ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM", "7:00 PM"]
    },
    services: [
      { id: "ser_20", name: "Lakme Runway Signature Dewy Glam", price: 6500, duration: "90 mins", category: "Makeup" },
      { id: "ser_21", name: "Premium Soft Eye Focus & Contour Lift", price: 4000, duration: "60 mins", category: "Makeup" }
    ],
    reviews: [],
    portfolio: [
      { id: "p_11", stylistId: "sty_08", stylistName: "Ananya Deshmukh", image: IMAGES.makeup[1], category: "Makeup", title: "Glossy Glass-Skin Editorial Look", description: "Radiant, glass-skin skin texture with nude highlights and custom brown shadows.", tags: ["makeup", "glass-skin"] }
    ],
    aiAnalysis: {
      matchScore: 93,
      matchExplainer: "Outstanding for high-fashion photoshoots, modern engagements, soft glamorous events, and dewy finishes in Jayanagar.",
      pros: ["High fashion week standard cosmetics", "Flawless color-matching for Indian skin tones", "Very artistic contouring"],
      cons: ["Does not offering heavy traditional regional makeup (favors minimalist glam)"]
    }
  },
  {
    id: "sty_09",
    name: "Suresh Pillai",
    image: IMAGES.stylists[9],
    salonName: "Vanguard Grooming Club",
    experience: 15,
    rating: 4.89,
    reviewsCount: 330,
    specialization: ["V-Undercuts", "Traditional Blade Shaving", "Anti-Hairfall Care"],
    location: "MG Road",
    priceRange: "₹₹ (Premium)",
    startingPrice: 2200,
    bio: "Suresh is the master barber who handles several of Bangalore's top corporate CEOs, known for his speed, discretion, and perfection.",
    about: "With 15 years on MG Road, Suresh is a staple of old-school elite corporate grooming, traditional straight-razor shaving with chilled cucumber towels, and healthy hair-growth treatments.",
    certifications: ["Truefitt & Hill UK Barber Masters", "Himalaya Herbal Scalp Specialist Diploma"],
    tags: ["male", "grooming", "executive", "fade", "straight", "thin", "mg road"],
    availability: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      slots: ["8:30 AM", "10:00 AM", "11:30 AM", "1:00 PM", "3:30 PM", "5:00 PM"]
    },
    services: [
      { id: "ser_22", name: "The CEO Signature Royal Haircut & Shave", price: 3000, duration: "75 mins", category: "Grooming" },
      { id: "ser_23", name: "Premium Scalp Therapy & Tonic Injection", price: 2200, duration: "45 mins", category: "Hair Treatment" }
    ],
    reviews: [
      { id: "rev_11", userName: "Rajeev N.", rating: 5, comment: "Suresh is fast, incredibly precise, and knows exactly how to make a classic corporate cut look authoritative.", date: "2026-05-10" }
    ],
    portfolio: [
      { id: "p_12", stylistId: "sty_09", stylistName: "Suresh Pillai", image: IMAGES.grooming[0], category: "Grooming", title: "Classic Corporate Pompadour Fade", description: "Pristine side gradient with structured mid-height corporate volume.", tags: ["fade", "pompadour"] }
    ],
    aiAnalysis: {
      matchScore: 92,
      matchExplainer: "Superb for high-end corporate haircuts, executive profiles, straight hair grooming, and traditional blade shaves.",
      pros: ["Exceptional time management (never runs late)", "Classic straight razor safety mastery", "Highly professional corporate focus"],
      cons: ["Does not keep up with experimental hipster styles (prefers sharp classy profiles)"]
    }
  },
  {
    id: "sty_10",
    name: "Tina George",
    image: IMAGES.stylists[8],
    salonName: "Color Me Wild Boutique",
    experience: 7,
    rating: 4.82,
    reviewsCount: 110,
    specialization: ["Global Hair Coloring", "Pixies & Bob cuts", "Vivid Neon Shades"],
    location: "Indiranagar",
    priceRange: "₹₹ (Premium)",
    startingPrice: 2500,
    bio: "Tina is a fun-loving experimental color artist representing the creative vibe of East Bangalore.",
    about: "Tina is brilliant with playful pastel shades, bold red makeovers, global coppers, and sassy short pixie haircuts for girls.",
    certifications: ["Crazy Color Elite Artist Accreditation", "Pravana Vivids certified specialist"],
    tags: ["female", "color", "straight", "thin", "indiranagar"],
    availability: {
      days: ["Tue", "Wed", "Thu", "Fri", "Sat"],
      slots: ["11:00 AM", "1:30 PM", "4:00 PM", "6:00 PM"]
    },
    services: [
      { id: "ser_24", name: "Global Copper Melting & Pixie Redraw", price: 4800, duration: "120 mins", category: "Color" },
      { id: "ser_25", name: "Pastel Highlights & Luxury Deep Hydrating Mask", price: 3800, duration: "90 mins", category: "Color" }
    ],
    reviews: [],
    portfolio: [
      { id: "p_13", stylistId: "sty_10", stylistName: "Tina George", image: IMAGES.color[2], category: "Color", title: "Aesthetic Golden-Copper Global Bleach", description: "Perfect seamless dye with healthy structural sheen.", tags: ["color", "copper"] }
    ],
    aiAnalysis: {
      matchScore: 90,
      matchExplainer: "Best matching for bright modern colors, ginger/copper global, block highlights, and cute pixie framing.",
      pros: ["Extremely modern experimental style", "Great music and chatty environment", "Outstanding price for vivid styling"],
      cons: ["May not suit highly formal corporate styling expectations"]
    }
  },
  {
    id: "sty_11",
    name: "Arjun Verma",
    image: IMAGES.stylists[11],
    salonName: "Whitefield Royal Craft",
    experience: 11,
    rating: 4.92,
    reviewsCount: 204,
    specialization: ["Modern Fades", "Beard Shaping", "Scalp Detoxing"],
    location: "Whitefield",
    priceRange: "₹₹₹ (Elite/Luxury)",
    startingPrice: 3000,
    bio: "Whitefield's top tech-park barber, Arjun delivers fresh, modern low-maintenance profiles for busy developers and founders.",
    about: "Based in the heart of tech country, Arjun specializes in sharp low fades, executive beard shapes, and stress-busting scalp detox hot oil massages perfect after long hours at the screen.",
    certifications: ["Schwarzkopf Advanced Hair & Scalp Therapist"],
    tags: ["male", "grooming", "executive", "fade", "straight", "wavy", "whitefield"],
    availability: {
      days: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      slots: ["10:00 AM", "11:30 AM", "1:30 PM", "3:00 PM", "5:00 PM", "7:00 PM"]
    },
    services: [
      { id: "ser_26", name: "Premium Low-Fade Craft & Beard Architect", price: 3000, duration: "60 mins", category: "Grooming" },
      { id: "ser_27", name: "Anti-Stress Scalp Detox & Menthol Energizer", price: 1800, duration: "40 mins", category: "Hair Treatment" }
    ],
    reviews: [],
    portfolio: [],
    aiAnalysis: {
      matchScore: 94,
      matchExplainer: "Highly matching for styling tech leaders in Whitefield looking for low-maintenance, sharp modern haircuts.",
      pros: ["Convenient Whitefield tech-hub location", "Incredible stress-relief scalp massages", "Excellent with coarse thick hair"],
      cons: ["Weekend calendars are highly congested"]
    }
  },
  {
    id: "sty_12",
    name: "Zara Lin",
    image: IMAGES.stylists[12],
    salonName: "The Silk Road Studio",
    experience: 13,
    rating: 4.94,
    reviewsCount: 220,
    specialization: ["Korean Glass-Skin Styling", "Luxury Hydrafacials", "Bridal Airbrush"],
    location: "Malleshwaram",
    priceRange: "₹₹₹ (Elite/Luxury)",
    startingPrice: 3800,
    bio: "Combining ancient Asian botanical techniques with top-tier Western cosmeceuticals, Zara is Malleshwaram's hidden luxury.",
    about: "Zara approaches makeup with a clean, skin-first philosophy. She prepares the face with organic luxury facial massages before executing immaculate, poreless bridal and corporate presentation makeup.",
    certifications: ["Seoul Aesthetician & Dermaceutical Academy", "L'Oréal Glow Mastery Expert"],
    tags: ["female", "makeup", "bridal", "wedding", "glam", "malleshwaram"],
    availability: {
      days: ["Wed", "Thu", "Fri", "Sat", "Sun"],
      slots: ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"]
    },
    services: [
      { id: "ser_28", name: "Premium Glow-Enhancing Bridal Sculpt & Veil", price: 12000, duration: "150 mins", category: "Bridal" },
      { id: "ser_29", name: "Luminous Prep Luxury Mini Hydrafacial & Makeup", price: 5000, duration: "90 mins", category: "Makeup" }
    ],
    reviews: [],
    portfolio: [
      { id: "p_14", stylistId: "sty_12", stylistName: "Zara Lin", image: IMAGES.makeup[2], category: "Makeup", title: "Natural Silk-Luminous Wedding Glimmer", description: "Bespoke bridal makeup featuring soft pastel tones and a seamless silk glow finish.", tags: ["makeup", "wedding"] }
    ],
    aiAnalysis: {
      matchScore: 95,
      matchExplainer: "Suited for traditional bride with a desire for soft glow, facial prep, and customized classic finishes.",
      pros: ["High focus on healthy skin prep", "Uses non-comedogenic luxury ingredients", "Quiet, tranquil home-atelier vibe"],
      cons: ["Requires booking 3 weeks ahead for wedding season prep"]
    }
  },
  {
    id: "sty_13",
    name: "Mohit Ranade",
    image: IMAGES.stylists[13],
    salonName: "The Grand Trunk Groomers",
    experience: 10,
    rating: 4.84,
    reviewsCount: 160,
    specialization: ["Royal Wedding Grooming", "Premium Mustache Crafting", "Men's Skin Repair"],
    location: "Jayanagar",
    priceRange: "₹₹₹ (Elite/Luxury)",
    startingPrice: 3200,
    bio: "Mohit is South Bangalore's favorite grooming artist for weddings, engagement portraits, and high-level corporate ceremonies.",
    about: "Specialized in styling South Indian weddings and groom makeovers, Mohit handles everything from traditional hair styling to lightweight corrective facial makeup designed for high fidelity 4K wedding videography.",
    certifications: ["Groom Masters India Gold certification", "International Skin Aesthetic Council Associate"],
    tags: ["male", "grooming", "bridal", "wedding", "jayanagar"],
    availability: {
      days: ["Thu", "Fri", "Sat", "Sun"],
      slots: ["10:30 AM", "1:00 PM", "3:30 PM", "6:00 PM"]
    },
    services: [
      { id: "ser_30", name: "D-Day Ultimate Groom Package & Shave", price: 9000, duration: "120 mins", category: "Bridal" },
      { id: "ser_31", name: "Premium Corrective Groom Makeup & Styling", price: 4500, duration: "70 mins", category: "Grooming" }
    ],
    reviews: [],
    portfolio: [],
    aiAnalysis: {
      matchScore: 91,
      matchExplainer: "Perfect match if you are a groom seeking detailed beard styling, mustache trimming, and flawless corrective skin-matching.",
      pros: ["Expert in photogenic groom makeovers", "Highly skilled with curly/coarse beards", "Calming presence during events"],
      cons: ["Limited week-day availability"]
    }
  },
  {
    id: "sty_14",
    name: "Kavitha Raj",
    image: IMAGES.stylists[14],
    salonName: "Oasis Organic Hair Boutique",
    experience: 15,
    rating: 4.96,
    reviewsCount: 280,
    specialization: ["Scalp Rejuvenation", "Balayage", "Herb-Infused Keratins"],
    location: "Malleshwaram",
    priceRange: "₹₹₹ (Elite/Luxury)",
    startingPrice: 4500,
    bio: "Kavitha is Malleshwaram's leading authority on clean salon practices, using 100% toxic-free, botanical colors.",
    about: "Using organic ingredients imported from Switzerland and Japan, Kavitha designs highly tailored lived-in shades that don't stress sensitive scalps or thin hair structures.",
    certifications: ["Organic Way (OWay) Italy Ambassador Certification", "Tricology Master Society Member"],
    tags: ["female", "color", "balayage", "straight", "thin", "malleshwaram"],
    availability: {
      days: ["Tue", "Wed", "Thu", "Fri", "Sat"],
      slots: ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM"]
    },
    services: [
      { id: "ser_32", name: "Ammonia-Free Luxury Global Balayage", price: 7800, duration: "150 mins", category: "Color" },
      { id: "ser_33", name: "Botanical Hair Spa & Scalp Therapy", price: 4500, duration: "90 mins", category: "Hair Treatment" }
    ],
    reviews: [],
    portfolio: [],
    aiAnalysis: {
      matchScore: 93,
      matchExplainer: "Best matching for people with sensitive scalps or thin hair seeking premium herbal-infused colors and safe luxury highlights.",
      pros: ["100% Ammonia-free, non-toxic environment", "Expert trichology consultations", "Timeless elegant styling"],
      cons: ["Organic pigments might take marginally longer to setting on thick hair"]
    }
  },
  {
    id: "sty_15",
    name: "Siddharth Sen",
    image: IMAGES.stylists[15],
    salonName: "Couturist Salon Studio",
    experience: 9,
    rating: 4.87,
    reviewsCount: 140,
    specialization: ["Vanguard Balayage", "Lived-In Highlights", "Curly Styling"],
    location: "MG Road",
    priceRange: "₹₹₹ (Elite/Luxury)",
    startingPrice: 4000,
    bio: "Siddharth has designed for leading Bollywood fashion editorials, specializing in lively blonde transitions and effortless styling.",
    about: "Siddharth brings editorial runway styling to Central Bangalore, giving hair that dynamic bouncing, sun-kissed look that photographs impeccably from every angle.",
    certifications: ["Schwarzkopf Professional Advanced Stylist Certification", "Tony & Guy Academy Mumbai Graduate"],
    tags: ["male", "color", "balayage", "wavy", "curly", "mg road"],
    availability: {
      days: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      slots: ["11:00 AM", "1:30 PM", "4:00 PM", "6:30 PM"]
    },
    services: [
      { id: "ser_34", name: "Sun-Kissed Golden-Hour Balayage Combo", price: 7500, duration: "160 mins", category: "Color" },
      { id: "ser_35", name: "Signature Dynamic Butterfly Haircut & Blow", price: 4000, duration: "75 mins", category: "Haircut" }
    ],
    reviews: [],
    portfolio: [],
    aiAnalysis: {
      matchScore: 91,
      matchExplainer: "Ideal for clients wanting high-volume Bollywood bounces, lived-in layers, and dramatic highlighting.",
      pros: ["Incredible blowout volume", "Highly creative color layouts", "Fun, high-vibe atmosphere"],
      cons: ["Can be high-energy, may run slightly over scheduled time due to his meticulous double checked finishes"]
    }
  },
  {
    id: "sty_16",
    name: "Natasha DSouza",
    image: IMAGES.stylists[16],
    salonName: "Vogue Face & Hair",
    experience: 11,
    rating: 4.93,
    reviewsCount: 220,
    specialization: ["Bridal Makeover", "Airbrush & HD Glamour", "North Indian Traditional Buns"],
    location: "Whitefield",
    priceRange: "₹₹₹₹ (Ultra-Luxury)",
    startingPrice: 7000,
    bio: "The crown jewel of bridal makeovers in East Bangalore, Natasha is booking-elite for brides seeking flawless, royal looks.",
    about: "Operating from her sleek, high-profile Whitefield villa, Natasha delivers tailored private VIP slots to prepare brides, bridesmaids, and wedding guests with international cosmetics.",
    certifications: ["Mario Dedivanovic NY Masterpiece Award", "Estée Lauder Bridal Premium Guild Member"],
    tags: ["female", "bridal", "makeup", "wedding", "glam", "whitefield"],
    availability: {
      days: ["Thu", "Fri", "Sat", "Sun"],
      slots: ["8:00 AM", "12:00 PM", "3:30 PM", "7:00 PM"]
    },
    services: [
      { id: "ser_36", name: "Signature Platinum HD Airbrush Bridal Makeup", price: 17000, duration: "180 mins", category: "Bridal" },
      { id: "ser_37", name: "Pre-Wedding High-Glam Portrait Styling", price: 7000, duration: "120 mins", category: "Makeup" }
    ],
    reviews: [],
    portfolio: [
      { id: "p_15", stylistId: "sty_16", stylistName: "Natasha DSouza", image: IMAGES.bridal[1], category: "Bridal", title: "Royal Golden Bridal Saree Styling & Crown Glow", description: "Bespoke bridal styling combining a clean gold halo bun with soft airbrushed definition.", tags: ["bridal", "wedding"] }
    ],
    aiAnalysis: {
      matchScore: 96,
      matchExplainer: "Match score highly strong if you want Whitefield location luxury bridal design, flawless camera wear, and absolute VIP pampering.",
      pros: ["Private luxury estate lounge", "Top-tier premium cosmetic selections", "Comes with expert draping assistants"],
      cons: ["Extremely difficult to change weekend bridal slots"]
    }
  },
  {
    id: "sty_17",
    name: "Rishi Kaushik",
    image: IMAGES.stylists[17],
    salonName: "The Grooming Club Manor",
    experience: 13,
    rating: 4.9,
    reviewsCount: 170,
    specialization: ["Taper Fades", "Beard Sculpting", "Scalp Detoxification"],
    location: "Sadashivanagar",
    priceRange: "₹₹₹ (Elite/Luxury)",
    startingPrice: 3200,
    bio: "Rishi styles prominent leaders of South Bangalore, providing absolute razor-sharp classic lines and anti-stress scalp remedies.",
    about: "Nestled in quiet, rich Sadashivanagar, Rishi offers private individual groom grooming appointments utilizing bespoke imported brass tools and tailored hair oils.",
    certifications: ["Truefitt & Hill UK Barber Elite Guild Approved"],
    tags: ["male", "grooming", "executive", "fade", "beard", "sadashivanagar"],
    availability: {
      days: ["Tue", "Wed", "Thu", "Fri", "Sat"],
      slots: ["10:30 AM", "12:30 PM", "2:30 PM", "4:30 PM", "6:30 PM"]
    },
    services: [
      { id: "ser_38", name: "The Sadashivanagar Manor Clean Shave & Trim", price: 3200, duration: "60 mins", category: "Grooming" },
      { id: "ser_39", name: "Premium Beard Alignment & Argan Therapy", price: 2200, duration: "45 mins", category: "Grooming" }
    ],
    reviews: [],
    portfolio: [],
    aiAnalysis: {
      matchScore: 92,
      matchExplainer: "Matches beautifully for premium beard sculpting, classy executive taper cuts, and clean shaves in Sadashivanagar.",
      pros: ["Bespoke calming private estate layout", "Flawless tool sterilization standards", "Perfect scalp stress-relief finishes"],
      cons: ["Strictly closed on Sundays"]
    }
  },
  {
    id: "sty_18",
    name: "Kylie Sen",
    image: IMAGES.stylists[18],
    salonName: "K-Vibe Atelier",
    experience: 8,
    rating: 4.89,
    reviewsCount: 154,
    specialization: ["Korean Glass-Gloss Color", "Fringe layers", "Soft Waves"],
    location: "Koramangala",
    priceRange: "₹₹ (Premium)",
    startingPrice: 2800,
    bio: "A graduate of leading Korean beauty institutes, Kylie is beloved for her feminine soft pastel colors and fluid volume bangs.",
    about: "Using Korean glass-gloss color techniques, Kylie gives flat hair incredible, natural shiny reflections that bounce during movement. She styles beautiful light bangs and curtain layers that perfectly contour round cheeks.",
    certifications: ["Seoul Shiseido Gloss Master", "K-Beauty Academy Seoul Gold Star Graduate"],
    tags: ["female", "korean", "color", "straight", "thin", "wavy", "koramangala"],
    availability: {
      days: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      slots: ["11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"]
    },
    services: [
      { id: "ser_40", name: "Korean Silk-Glass Global Tint & Fringe Cut", price: 5500, duration: "120 mins", category: "Color" },
      { id: "ser_41", name: "Aesthetic Soft Flow Blowout & Fringe Trim", price: 2800, duration: "60 mins", category: "Haircut" }
    ],
    reviews: [],
    portfolio: [],
    aiAnalysis: {
      matchScore: 94,
      matchExplainer: "Best suited for signature soft K-Beauty hair glosses, airy curtain fringes, and youthful, bouncy color melts.",
      pros: ["Authentic K-Gloss color systems", "Superb fringe customization", "Very welcoming youthful vibe"],
      cons: ["Weekend slots book up extremely early"]
    }
  },
  {
    id: "sty_19",
    name: "Ramanathan Iyer",
    image: IMAGES.stylists[19],
    salonName: "The Vintage Grooming Co.",
    experience: 22,
    rating: 4.95,
    reviewsCount: 550,
    specialization: ["Classic Scissor Cuts", "Elite Beard Crafting", "Scalp Conditioning"],
    location: "Malleshwaram",
    priceRange: "₹₹ (Premium)",
    startingPrice: 2000,
    bio: "With over two decades on the scissors, 'Ram' is legendary in Malleshwaram for his highly disciplined haircut craftsmanship.",
    about: "Ram doesn't use clippers unless requested. He is a vintage classicist who sculpts hair beautifully with scissors alone, creating soft, natural growth patterns that maintain shape for up to 8 weeks.",
    certifications: ["Intercoiffure India Veteran Badge", "Classical Hair Architecture Diploma"],
    tags: ["male", "grooming", "executive", "straight", "thick", "malleshwaram"],
    availability: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      slots: ["9:00 AM", "10:30 AM", "12:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"]
    },
    services: [
      { id: "ser_42", name: "Ram's Signature Elite Vintage Scissor Haircut", price: 2000, duration: "50 mins", category: "Haircut" },
      { id: "ser_43", name: "Symmetric Classic Mustache & Beard Grooming", price: 1500, duration: "35 mins", category: "Grooming" }
    ],
    reviews: [],
    portfolio: [],
    aiAnalysis: {
      matchScore: 91,
      matchExplainer: "High-grade match for gentleman cuts, pure scissor hair engineering, and classic low-maintenance structure in Malleshwaram.",
      pros: ["Over 22 years of pure scissor haircut expertise", "Quiet, traditional, highly focus", "Hair grows back beautifully"],
      cons: ["Does not style modern pop designs, hip colors, or perms"]
    }
  },
  {
    id: "sty_20",
    name: "Alia Sengupta",
    image: IMAGES.stylists[2],
    salonName: "Bridal Atelier & Co.",
    experience: 12,
    rating: 4.91,
    reviewsCount: 184,
    specialization: ["Glamour Bridal Makeup", "High-Fashion Hair styling", "Engagement Prep"],
    location: "Indiranagar",
    priceRange: "₹₹₹ (Elite/Luxury)",
    startingPrice: 5000,
    bio: "Alia delivers clean, modern European bridal makeup paired with high-fashion locks that accent the client's signature features.",
    about: "With deep roots in the global fashion scene, Alia prides herself on creating lightweight bridal finishes that look luminous both to the naked eye and under high-megapixel lenses.",
    certifications: ["Milan Fashion Week Bridal Styling Academy Diploma", "Estee Lauder Glamour Certification"],
    tags: ["female", "bridal", "makeup", "wedding", "glam", "indiranagar"],
    availability: {
      days: ["Wed", "Thu", "Fri", "Sat", "Sun"],
      slots: ["9:30 AM", "12:00 PM", "2:30 PM", "5:00 PM", "7:30 PM"]
    },
    services: [
      { id: "ser_44", name: "Vogue Highlight Bridal Makeover package", price: 14000, duration: "180 mins", category: "Bridal" },
      { id: "ser_45", name: "Luxury High-Styling Hair Locks for Portraiture", price: 5000, duration: "90 mins", category: "Luxury Styling" }
    ],
    reviews: [],
    portfolio: [
      { id: "p_16", stylistId: "sty_20", stylistName: "Alia Sengupta", image: IMAGES.bridal[2], category: "Bridal", title: "Milan-Inspired Modern Bridal Flow", description: "Bespoke clean wedding profile prioritizing lightweight cosmetics and wavy romantic layers.", tags: ["bridal", "makeup"] }
    ],
    aiAnalysis: {
      matchScore: 95,
      matchExplainer: "Excellent match for global modern makeovers, sleek European bridal locks, and Indiranagar access.",
      pros: ["Milan runway styling aesthetics", "Very premium high-definition wear", "Excellent customized consulting session"],
      cons: ["Strict weekend booking requirements"]
    }
  }
];

export const TESTIMONIALS = [
  {
    id: "t_1",
    name: "Malini Goel",
    role: "Tech Entrepreneur, Whitefield",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    text: "StylistMatch AI is a godsend! I wanted a custom Korean Layered Cut and Balayage. Instead of wasting hours at generic salons, I was matched with Priya. The experience was truly bespoke and feels like a luxury personal concierge.",
    rating: 5,
    stylistName: "Priya Murthy"
  },
  {
    id: "t_2",
    name: "Rishi Rajgopal",
    role: "Managing Partner, JAF Ventures",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    text: "As a busy venture capitalist, finding a professional who understands geometry and doesn't rush is critical. Rohan Advani's bespoke beard sculpt is outstanding. Booking is seamless and completely stress-free.",
    rating: 5,
    stylistName: "Rohan Advani"
  },
  {
    id: "t_3",
    name: "Sanam Reddy",
    role: "Bride-to-be, Koramangala",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    text: "Meera Nair and her assistant did magic for my engagement! Not only did the dewy look match my lehenga color seamlessly, but the AI Review Insights helped me understand exactly what to expect. Worth every star!",
    rating: 5,
    stylistName: "Meera Nair"
  }
];

export const SAMPLE_CHAT_RESPONSES = [
  {
    keywords: ["engagement", "wedding", "marriage", "bride", "bridal", "saree"],
    answer: "For premium bridal or engagement transformations in Bangalore, we have industry-leading masters. Meera Nair (Koramangala, 16 yrs exp) is an absolute legend for HD Airbrush & complex trad bridal hairdressings. Alia Sengupta (Indiranagar, 12 yrs exp) offers breathtaking Milan-inspired modern lightweight wedding glows. Would you like to check Meera's schedule or book a private suite with Alia?"
  },
  {
    keywords: ["korean", "layered", "two-block", "down perm", "perm"],
    answer: "If you want authentic Korean styles, Jin-Woo Park (Indiranagar) is a native Gangnam expert who styles impeccable Two-Blocks and Side Down Perms using original imported Korean formulas. For women, Priya Murthy (Koramangala) and Kylie Sen (Koramangala) deliver sublime Korean Fluid Layered cuts and Soft Glass Fringes that bounce beautifully."
  },
  {
    keywords: ["haircut", "cut", "scissors", "layers", "bob"],
    answer: "For surgical precision haircuts: Rohan Advani (Indiranagar) styles incredible executive cuts; Aisha Khan (HSR Layout) is a certified DevaCurl specialist who cuts curls clump-by-clump; Ramanathan Iyer (Malleshwaram, 22 yrs exp) styles purely with handcrafted scissors; and Kabir Sen (HSR Layout) excels with modern precision bobs. What style are you looking for today?"
  },
  {
    keywords: ["color", "balayage", "highlights", "copper", "blonde"],
    answer: "For luxury multi-tonal colors and zero-damage coloring: Priya Murthy (Koramangala) is famous for French lived-in balayage; Kabir Sen (HSR Layout) is a certified Wella Master Colorist specializing in stunning platinum and high-contrast highlights; and Kavitha Raj (Malleshwaram) uses 100% ammonia-free botanical ingredients from Italy. I can match you immediately!"
  },
  {
    keywords: ["beard", "grooming", "beard sculpt", "shave", "men", "mens", "undercut"],
    answer: "For high-end men's grooming and beard craftsmanship: Rohan Advani (Indiranagar) provides beautiful geometry sculpts suited for your jawline; Jin-Woo Park (Indiranagar) specializes in Korean Two-Blocks/Down Perms; and Suresh Pillai (MG Road) is the go-to corporate groomer with classic straight-razor cucumber-towel shaves. Shall I book you with Rohan or Suresh?"
  }
];

export const PORTFOLIO_FEED = STYLISTS.flatMap(s => s.portfolio);
