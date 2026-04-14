import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import PakshaModal from "@/components/PakshaModal";
import { useState } from "react";

const sectionIds = ["itinerary", "stay", "bikes", "food"];
const sectionLabels = ["Tour Route", "Where to Stay", "Rent a Bike", "Food Guide"];

const SectionNav = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="sticky top-16 z-40 bg-snow/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex gap-1 overflow-x-auto py-2">
        {sectionIds.map((id, i) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap text-muted-foreground hover:text-navy hover:bg-background transition-colors"
          >
            {sectionLabels[i]}
          </button>
        ))}
      </div>
    </div>
  );
};

const itinerary = [
  { day: "Day 1–2", place: "Srinagar", icon: "🏞️", highlights: ["Dal Lake Shikara ride", "Mughal Gardens (Nishat & Shalimar)", "Old City walk & Hazratbal"] },
  { day: "Day 3", place: "Gulmarg", icon: "🏔️", highlights: ["Gondola ride to Apharwat Peak", "Alpine meadows & pony rides", "Snow activities (Apr–Jun)"] },
  { day: "Day 4", place: "Pahalgam", icon: "🌲", highlights: ["Betaab Valley", "Aru Valley trek", "Lidder River picnic"] },
  { day: "Day 5", place: "Sonamarg", icon: "❄️", highlights: ["Thajiwas Glacier hike", "Zero Point (seasonal)", "Mountain passes"] },
  { day: "Day 6", place: "Doodhpathri / Yusmarg", icon: "🌿", highlights: ["Offbeat meadows", "No crowds, pure nature", "Local shepherd trails"] },
  { day: "Day 7", place: "Return to Srinagar", icon: "🕌", highlights: ["Hazratbal Shrine", "Old City heritage walk", "Shopping at Lal Chowk"] },
];

const stays = [
  { type: "Houseboat", name: "Sukoon Houseboat", loc: "Dal Lake, Srinagar", price: "₹₹₹", rating: 4.8, highlights: ["Luxury houseboat", "Lake views", "Butler service"] },
  { type: "Heritage Hotel", name: "Lalit Grand Palace", loc: "Srinagar", price: "₹₹₹", rating: 4.7, highlights: ["19th century palace", "Mountain views", "Heritage stay"] },
  { type: "Guesthouse", name: "Pine Spring Guest House", loc: "Pahalgam", price: "₹₹", rating: 4.5, highlights: ["Budget-friendly", "River-facing", "Great for trekkers"] },
  { type: "Glamping", name: "Glamping at Sonamarg", loc: "Sonamarg", price: "₹₹₹", rating: 4.6, highlights: ["Luxury tents near glacier", "Best for May–Sep", "Stargazing"] },
  { type: "Houseboat", name: "WelcomHeritage Gurkha Houseboats", loc: "Dal Lake", price: "₹₹", rating: 4.4, highlights: ["Mid-range cluster", "Warm hosts", "Traditional decor"] },
];

const bikeRentals = [
  { name: "Srinagar Bike Rentals", loc: "Lal Chowk area", bikes: "Royal Enfield, Bajaj Pulsar", price: "₹700–1,200/day" },
  { name: "Dal Lake Rides", loc: "Residency Road", bikes: "Scooters, Honda Activa", price: "₹400–600/day" },
  { name: "Gulmarg Bike Hub", loc: "Gulmarg bazaar", bikes: "Mountain bikes and scooters", price: "₹500–800/day" },
  { name: "Pahalgam Riders", loc: "Pahalgam main market", bikes: "Enfield, KTM Duke", price: "₹800–1,500/day" },
];

const restaurants = [
  { name: "Ahdoos Restaurant", loc: "Residency Road, Srinagar", dishes: "Rogan Josh, Yakhni", mustTry: "Classic Wazwan", tagline: "The oldest institution in Srinagar" },
  { name: "Mughal Darbar", loc: "Residency Road", dishes: "Seekh Kebabs, Gushtaba", mustTry: "Mutton Roganjosh", tagline: "Always packed, always worth the wait" },
  { name: "Stream & Greens Café", loc: "Pahalgam", dishes: "Trout fish, Kahwa tea", mustTry: "River trout", tagline: "Scenic river view dining" },
  { name: "Chai Jaai", loc: "Lal Chowk", dishes: "Noon Chai, fresh Kulcha", mustTry: "Kashmiri Pink Chai", tagline: "Best chai stop in the city" },
  { name: "Wazwan House", loc: "Rainawari, Srinagar", dishes: "Full Wazwan thali", mustTry: "36-dish feast", tagline: "Book in advance" },
  { name: "Boulevard Café", loc: "Dal Lake Boulevard", dishes: "Shufta, Phirni", mustTry: "Waterfront Phirni", tagline: "Waterfront dining" },
];

const glossary = [
  { term: "Rogan Josh", desc: "Tender lamb slow-cooked in aromatic Kashmiri spices and red chili" },
  { term: "Yakhni", desc: "Yogurt-based curry with tender meat, cardamom and fennel" },
  { term: "Gushtaba", desc: "Minced meat balls in rich yogurt gravy — the royal dish" },
  { term: "Wazwan", desc: "A multi-course ceremonial feast, the pride of Kashmiri cuisine" },
  { term: "Noon Chai", desc: "Pink salt tea made with milk, baking soda, and special tea leaves" },
  { term: "Shufta", desc: "Sweet dry fruit dessert with saffron and ghee" },
  { term: "Phirni", desc: "Creamy rice pudding with pistachios, served chilled in clay bowls" },
];

const card = "bg-background rounded-xl border border-border p-5 hover:shadow-md transition-shadow";
const sectionTitle = "font-heading text-3xl md:text-4xl font-bold text-navy mb-8";
const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const ExploreKashmir = () => {
  return (
    <div>
      <PakshaModal />

      {/* Hero */}
      <section className="relative pt-16">
        <div className="h-72 md:h-96 bg-gradient-to-br from-navy via-river to-glacier flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-3">
              Your Complete Kashmir Travel Guide
            </h1>
            <p className="text-glacier text-lg">Everything you need to explore the Valley of Heaven</p>
          </div>
        </div>
      </section>

      <SectionNav />

      {/* Itinerary */}
      <section id="itinerary" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className={sectionTitle}>The Perfect Kashmir Itinerary</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {itinerary.map((day, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`${card} flex gap-4`}
              >
                <div className="text-4xl">{day.icon}</div>
                <div>
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-navy text-primary-foreground mb-1">
                    {day.day}
                  </span>
                  <h3 className="font-heading text-xl font-semibold text-navy">{day.place}</h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {day.highlights.map((h, j) => <li key={j}>• {h}</li>)}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to Stay */}
      <section id="stay" className="py-16 bg-snow">
        <div className="container mx-auto px-4">
          <h2 className={sectionTitle}>Best Places to Stay in Kashmir</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stays.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={card}
              >
                <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-earth text-earth-foreground mb-2">
                  {s.type}
                </span>
                <h3 className="font-heading text-lg font-semibold text-navy">{s.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{s.loc} · {s.price} · ⭐ {s.rating}</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {s.highlights.map((h, j) => <li key={j}>• {h}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-accent/10 border border-accent/30 rounded-xl p-5 max-w-2xl mx-auto text-center">
            <p className="text-sm text-navy">
              💡 <strong>Pro Tip:</strong> Book houseboats directly with owners to get 20–30% off. Paksha drivers can take you on a free houseboat scouting tour.
            </p>
          </div>
        </div>
      </section>

      {/* Rent a Bike */}
      <section id="bikes" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className={sectionTitle}>Explore on Two Wheels</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-center">
            For the adventurous traveler, renting a bike in Kashmir is pure freedom. Here are the most trusted rental spots:
          </p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {bikeRentals.map((b, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={card}
              >
                <h3 className="font-heading text-lg font-semibold text-navy">{b.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">📍 {b.loc}</p>
                <p className="text-sm text-foreground">{b.bikes}</p>
                <p className="text-sm font-medium text-navy mt-1">{b.price}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-accent/10 border border-accent/30 rounded-xl p-5 max-w-2xl mx-auto text-center">
            <p className="text-sm text-navy">
              🛵 <strong>Prefer not to ride yourself?</strong> Book a Paksha driver — they know every road, and you can sit back and enjoy the scenery.
            </p>
          </div>
        </div>
      </section>

      {/* Food */}
      <section id="food" className="py-16 bg-snow">
        <div className="container mx-auto px-4">
          <h2 className={sectionTitle}>Taste the Real Kashmir</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-center">
            Kashmiri cuisine (Wazwan) is a ceremonial feast. Here's where to eat like a local:
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {restaurants.map((r, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={card}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-heading text-lg font-semibold text-navy">{r.name}</h3>
                  <span className="inline-block px-2 py-0.5 text-[10px] font-medium rounded bg-accent text-accent-foreground shrink-0">
                    Must Try
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">📍 {r.loc}</p>
                <p className="text-sm text-foreground mb-1">🍽️ {r.dishes}</p>
                <p className="text-sm text-navy font-medium">⭐ {r.mustTry}</p>
                <p className="text-xs text-muted-foreground mt-2 italic">"{r.tagline}"</p>
              </motion.div>
            ))}
          </div>

          {/* Glossary */}
          <div className="mt-12 max-w-3xl mx-auto bg-background rounded-xl border border-border p-6">
            <h3 className="font-heading text-xl font-semibold text-navy mb-4">📖 Kashmir Food Glossary</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {glossary.map((g, i) => (
                <div key={i}>
                  <span className="font-medium text-navy text-sm">{g.term}</span>
                  <span className="text-muted-foreground text-sm"> — {g.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExploreKashmir;
