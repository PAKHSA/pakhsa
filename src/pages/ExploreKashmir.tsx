import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import PakshaModal from "@/components/PakshaModal";

const sectionIds = ["itinerary", "stay", "bikes", "food"];
const sectionLabels = ["ITINERARY", "STAY", "BIKES", "FOOD"];

const SectionNav = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  return (
    <div className="sticky top-16 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex gap-2 overflow-x-auto py-3">
        {sectionIds.map((id, i) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="px-4 py-2 text-[13px] font-medium uppercase tracking-wide whitespace-nowrap text-muted-foreground hover:text-foreground border border-foreground/20 hover:border-foreground/40 transition-colors rounded-sm"
          >
            {sectionLabels[i]}
          </button>
        ))}
      </div>
    </div>
  );
};

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

/* ───── DATA ───── */
const itinerary = [
  { day: "01–02", place: "SRINAGAR", highlights: ["Dal Lake · Mughal Gardens · Shikara ride · Old City bazaars"] },
  { day: "03", place: "GULMARG", highlights: ["Gondola ride · Khilanmarg meadows · Snow line (Apr–Jun)"] },
  { day: "04", place: "PAHALGAM", highlights: ["Betaab Valley · Aru Valley · Lidder River walk"] },
  { day: "05", place: "SONAMARG", highlights: ["Thajiwas Glacier · Zero Point · Sindh River"] },
  { day: "06", place: "DOODHPATHRI", highlights: ["Offbeat meadows · No crowds · Pure silence"] },
  { day: "07", place: "BACK TO SRINAGAR", highlights: ["Hazratbal · Lal Chowk shopping · Wazwan dinner"] },
];

const stays = [
  { type: "HOUSEBOAT", name: "Sukoon Houseboat", loc: "Dal Lake", price: "₹₹₹", highlights: ["Luxury houseboat", "Lake views", "Butler service"] },
  { type: "HERITAGE", name: "Lalit Grand Palace", loc: "Srinagar", price: "₹₹₹", highlights: ["19th-century palace", "Heritage rooms", "City views"] },
  { type: "GUESTHOUSE", name: "Pine Spring Guesthouse", loc: "Pahalgam", price: "₹₹", highlights: ["River-facing", "Budget-friendly", "Trekker base"] },
  { type: "GLAMPING", name: "Sonamarg Glacier Glamping", loc: "Sonamarg", price: "₹₹₹", highlights: ["Luxury tents", "Near glacier", "May–Sep only"] },
  { type: "HOUSEBOAT", name: "WelcomHeritage Houseboats", loc: "Dal Lake", price: "₹₹", highlights: ["Mid-range", "Warm local hosts", "Great value"] },
];

const bikeRentals = [
  { name: "Srinagar Bike Rentals", loc: "Lal Chowk", bikes: "Royal Enfield, Pulsar", price: "₹700–1,200/day" },
  { name: "Dal Lake Rides", loc: "Residency Road", bikes: "Honda Activa, Scooters", price: "₹400–600/day" },
  { name: "Gulmarg Bike Hub", loc: "Gulmarg Bazaar", bikes: "Mountain bikes, Scooters", price: "₹500–800/day" },
  { name: "Pahalgam Riders", loc: "Pahalgam Market", bikes: "KTM Duke, Enfield", price: "₹800–1,500/day" },
];

const restaurants = [
  { name: "Ahdoos Restaurant", loc: "Residency Road", dishes: "Rogan Josh, Yakhni, Gushtaba", tagline: "The oldest in Srinagar." },
  { name: "Mughal Darbar", loc: "Residency Road", dishes: "Seekh Kebab, Roganjosh", tagline: "Always packed. Always worth it." },
  { name: "Stream & Greens Café", loc: "Pahalgam", dishes: "Trout dishes, Kahwa tea", tagline: "River-view, mountain soul." },
  { name: "Chai Jaai", loc: "Lal Chowk", dishes: "Noon Chai (Pink Tea), Kulcha", tagline: "The best chai stop in the city." },
  { name: "Wazwan House", loc: "Rainawari", dishes: "Full 36-dish Wazwan thali", tagline: "Book 24 hours ahead. Trust us." },
  { name: "Boulevard Café", loc: "Dal Boulevard", dishes: "Shufta, Phirni, waterfront", tagline: "Dinner with the lake." },
];

const glossary = [
  { term: "Rogan Josh", desc: "Tender lamb slow-cooked in aromatic Kashmiri spices" },
  { term: "Yakhni", desc: "Yogurt-based curry with cardamom and fennel" },
  { term: "Gushtaba", desc: "Minced meat balls in rich yogurt gravy" },
  { term: "Wazwan", desc: "Multi-course ceremonial feast" },
  { term: "Noon Chai", desc: "Pink salt tea with milk and baking soda" },
  { term: "Shufta", desc: "Sweet dry fruit dessert with saffron" },
  { term: "Phirni", desc: "Creamy rice pudding with pistachios" },
  { term: "Kehwa", desc: "Green tea with saffron and almonds" },
];

/* ───── PAGE ───── */
const ExploreKashmir = () => (
  <div>
    <PakshaModal />

    {/* Hero */}
    <section className="relative min-h-[70vh] flex items-center pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1920&q=80')",
          opacity: 0.2,
        }}
      />
      <div className="absolute inset-0 bg-background/80" />
      <div className="container mx-auto px-4 relative z-10">
        <p className="eyebrow mb-6">— YOUR GUIDE TO KASHMIR</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-[800] uppercase tracking-tight text-foreground leading-[1.05] mb-6 max-w-4xl">
          EXPLORE THE<br />MOST BEAUTIFUL<br />PLACE ON EARTH.
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-8 leading-relaxed">
          We built this guide so you spend less time planning and more time riding. From optimal routes to the best wazwan in Srinagar.
        </p>
        <div className="flex flex-wrap gap-3">
          {sectionLabels.map((label, i) => (
            <button
              key={i}
              onClick={() => {
                const el = document.getElementById(sectionIds[i]);
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="px-5 py-2.5 border border-foreground/30 text-foreground text-[13px] font-medium uppercase tracking-wide rounded-sm hover:bg-foreground/5 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>

    <SectionNav />

    {/* ITINERARY */}
    <section id="itinerary" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <p className="eyebrow mb-4">— OPTIMAL TOUR ROUTE</p>
        <h2 className="text-3xl md:text-5xl font-[800] uppercase tracking-tight text-foreground mb-16 leading-[1.1]">
          7 DAYS.<br />ONE PERFECT LOOP.
        </h2>
        <div className="max-w-3xl space-y-0">
          {itinerary.map((day, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 py-6 border-t border-border"
            >
              <span className="text-4xl md:text-5xl font-[800] text-accent leading-none shrink-0 w-20">
                {day.day}
              </span>
              <div>
                <h3 className="text-xl font-[800] uppercase tracking-tight text-foreground mb-2">{day.place}</h3>
                <p className="text-sm text-muted-foreground">{day.highlights[0]}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 border-l-2 border-accent pl-6 py-4 max-w-2xl">
          <p className="text-sm text-muted-foreground">
            <span className="text-accent font-bold">🛵 PAKSHA TIP:</span> All these routes are covered by Paksha drivers. Book one for the day — they double as your guide.
          </p>
        </div>
      </div>
    </section>

    {/* STAY */}
    <section id="stay" className="section-padding bg-card">
      <div className="container mx-auto px-4">
        <p className="eyebrow mb-4">— STAY</p>
        <h2 className="text-3xl md:text-5xl font-[800] uppercase tracking-tight text-foreground mb-16 leading-[1.1]">
          SLEEP ON THE LAKE.<br />WAKE TO THE MOUNTAINS.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stays.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border border-border p-6"
            >
              <span className="text-[10px] font-medium uppercase tracking-widest text-accent mb-3 block">{s.type}</span>
              <h3 className="text-lg font-bold uppercase text-foreground mb-1">{s.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{s.loc} · {s.price}</p>
              <ul className="space-y-1">
                {s.highlights.map((h, j) => (
                  <li key={j} className="text-sm text-muted-foreground">· {h}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* BIKES */}
    <section id="bikes" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <p className="eyebrow mb-4">— RENT A BIKE</p>
        <h2 className="text-3xl md:text-5xl font-[800] uppercase tracking-tight text-foreground mb-4 leading-[1.1]">
          RIDE IT<br />YOURSELF.
        </h2>
        <p className="text-muted-foreground text-base mb-12 max-w-lg">
          For those who want the handlebars in their own hands.
        </p>
        <div className="max-w-3xl">
          {bikeRentals.map((b, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-5 border-t border-border"
            >
              <div>
                <h3 className="text-base font-bold uppercase text-foreground">{b.name}</h3>
                <p className="text-accent text-xs font-medium uppercase tracking-wide">{b.loc}</p>
              </div>
              <div className="text-right sm:text-right">
                <p className="text-sm text-muted-foreground">{b.bikes}</p>
                <p className="text-sm font-bold text-foreground">{b.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 border-l-2 border-accent pl-6 py-4 max-w-2xl">
          <p className="text-sm text-muted-foreground">
            Prefer someone else drives while you take in the view? That's what Paksha is for.
          </p>
        </div>
      </div>
    </section>

    {/* FOOD */}
    <section id="food" className="section-padding bg-card">
      <div className="container mx-auto px-4">
        <p className="eyebrow mb-4">— KASHMIRI FOOD</p>
        <h2 className="text-3xl md:text-5xl font-[800] uppercase tracking-tight text-foreground mb-4 leading-[1.1]">
          EAT LIKE<br />IT'S A CEREMONY.
        </h2>
        <p className="text-muted-foreground text-base mb-12 max-w-lg">
          Kashmiri Wazwan is not a meal. It's a ritual. Here's where to find the real thing.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          {restaurants.map((r, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border-t border-border pt-6"
            >
              <h3 className="text-lg font-bold uppercase text-foreground mb-1">{r.name}</h3>
              <p className="text-accent text-xs font-medium uppercase tracking-wide mb-2">{r.loc}</p>
              <p className="text-sm text-muted-foreground mb-2">{r.dishes}</p>
              <p className="text-sm text-muted-foreground italic">"{r.tagline}"</p>
            </motion.div>
          ))}
        </div>

        {/* Glossary */}
        <div className="mt-16 max-w-3xl border border-border p-8">
          <p className="eyebrow mb-6">— KASHMIR FOOD GLOSSARY</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {glossary.map((g, i) => (
              <div key={i}>
                <span className="text-sm font-bold text-foreground">{g.term}</span>
                <span className="text-sm text-muted-foreground"> — {g.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default ExploreKashmir;
