// ──────────────────────────────────────────────────────────
// Agency data types & sample data
// Replace the `agencies` array with your real CSV/JSON import.
// ──────────────────────────────────────────────────────────

export interface Agency {
  id: number;
  name: string;
  owner: string;
  location: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  priceCategory: "Budget" | "Standard" | "Luxury";
  specialization: string;
  /** Computed tag shown on card, e.g. "Best for Honeymoons" */
  bestFor: string;
  /** Whether agency holds JKTA registration */
  jktaVerified: boolean;
}

// ── Sample data (will be replaced by user's 2,500+ dataset) ──
export const agencies: Agency[] = [
  { id: 1, name: "Kashmir Valley Tours", owner: "Irfan Malik", location: "Srinagar", phone: "+91 94191 00001", email: "info@kashmirvalley.com", rating: 5.0, reviewCount: 482, priceCategory: "Standard", specialization: "Family Packages", bestFor: "Best for Families", jktaVerified: true },
  { id: 2, name: "Snow Leopard Adventures", owner: "Tariq Bhat", location: "Pahalgam", phone: "+91 94191 00002", email: "trek@snowleopard.in", rating: 5.0, reviewCount: 391, priceCategory: "Standard", specialization: "Adventure/Treks", bestFor: "Expert Trekking", jktaVerified: true },
  { id: 3, name: "DAL Luxury Holidays", owner: "Aisha Parray", location: "Srinagar", phone: "+91 94191 00003", email: "book@dalluxury.com", rating: 5.0, reviewCount: 356, priceCategory: "Luxury", specialization: "Family Packages", bestFor: "Best for Honeymoons", jktaVerified: true },
  { id: 4, name: "Pahalgam Explorers", owner: "Riyaz Lone", location: "Pahalgam", phone: "+91 94191 00004", email: "explore@pahalgam.in", rating: 4.9, reviewCount: 278, priceCategory: "Budget", specialization: "Adventure/Treks", bestFor: "Best for Solo Travelers", jktaVerified: true },
  { id: 5, name: "Gulmarg Wheels", owner: "Bilal Ahmad", location: "Gulmarg", phone: "+91 94191 00005", email: "ride@gulmargwheels.com", rating: 4.9, reviewCount: 312, priceCategory: "Budget", specialization: "Car Rentals", bestFor: "Self-Drive Experts", jktaVerified: true },
  { id: 6, name: "Heaven on Earth Travels", owner: "Sameer Wani", location: "Srinagar", phone: "+91 94191 00006", email: "info@heavenearth.com", rating: 4.8, reviewCount: 505, priceCategory: "Standard", specialization: "Family Packages", bestFor: "Best for Groups", jktaVerified: true },
  { id: 7, name: "Alpine Kashmir Tours", owner: "Nadia Shah", location: "Sonamarg", phone: "+91 94191 00007", email: "book@alpinekashmir.in", rating: 4.8, reviewCount: 187, priceCategory: "Standard", specialization: "Adventure/Treks", bestFor: "Expert Trekking", jktaVerified: true },
  { id: 8, name: "Shikara Luxe Holidays", owner: "Faizan Dar", location: "Srinagar", phone: "+91 94191 00008", email: "stay@shikaraluxe.com", rating: 4.7, reviewCount: 264, priceCategory: "Luxury", specialization: "Family Packages", bestFor: "Best for Honeymoons", jktaVerified: true },
  { id: 9, name: "Budget Kashmir Co.", owner: "Mukhtar Ganie", location: "Srinagar", phone: "+91 94191 00009", email: "deals@budgetkashmir.com", rating: 4.7, reviewCount: 620, priceCategory: "Budget", specialization: "Budget Friendly", bestFor: "Most Affordable", jktaVerified: true },
  { id: 10, name: "Doodhpathri Road Trips", owner: "Iqbal Rather", location: "Budgam", phone: "+91 94191 00010", email: "trip@doodhpathri.in", rating: 4.6, reviewCount: 154, priceCategory: "Budget", specialization: "Car Rentals", bestFor: "Off-Road Specialist", jktaVerified: true },
  { id: 11, name: "Royal Mughal Travels", owner: "Showkat Mir", location: "Srinagar", phone: "+91 94191 00011", email: "royal@mughaltravels.com", rating: 4.9, reviewCount: 445, priceCategory: "Luxury", specialization: "Family Packages", bestFor: "Best for Luxury Stays", jktaVerified: true },
  { id: 12, name: "Kashmir Backpackers", owner: "Zahra Qadri", location: "Srinagar", phone: "+91 94191 00012", email: "hello@kashmirbackpack.com", rating: 4.8, reviewCount: 338, priceCategory: "Budget", specialization: "Budget Friendly", bestFor: "Best for Backpackers", jktaVerified: true },
  { id: 13, name: "Sonamarg Summit Tours", owner: "Adil Naik", location: "Sonamarg", phone: "+91 94191 00013", email: "summit@sonamarg.in", rating: 4.6, reviewCount: 201, priceCategory: "Standard", specialization: "Adventure/Treks", bestFor: "Glacier Treks", jktaVerified: true },
  { id: 14, name: "Valley Car Rentals", owner: "Javid Khanday", location: "Srinagar", phone: "+91 94191 00014", email: "cars@valleyrentals.com", rating: 4.5, reviewCount: 172, priceCategory: "Standard", specialization: "Car Rentals", bestFor: "Airport Transfers", jktaVerified: true },
  { id: 15, name: "Chinar Heritage Tours", owner: "Mehreen Kaul", location: "Srinagar", phone: "+91 94191 00015", email: "heritage@chinartours.com", rating: 5.0, reviewCount: 290, priceCategory: "Luxury", specialization: "Family Packages", bestFor: "Heritage & Culture", jktaVerified: true },
  { id: 16, name: "Wanderlust Kashmir", owner: "Owais Peerzada", location: "Srinagar", phone: "+91 94191 00016", email: "wander@wlkashmir.com", rating: 4.7, reviewCount: 410, priceCategory: "Standard", specialization: "Adventure/Treks", bestFor: "Photography Tours", jktaVerified: true },
];

// ── Pricing guide data for tooltip ──
export const pricingGuide: Record<string, string> = {
  Budget: "Under ₹10,000 per person",
  Standard: "₹10,000 – ₹25,000 per person",
  Luxury: "₹25,000+ per person",
};

// ── Quick filter categories ──
export const quickFilterOptions = [
  "Adventure/Treks",
  "Family Packages",
  "Car Rentals",
  "Budget Friendly",
] as const;
