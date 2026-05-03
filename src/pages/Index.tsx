import { motion, useInView } from "framer-motion";
import { PhoneMockup, BookingScreen, MatchingScreen, EarningsScreen } from "@/components/PhoneMockup";
import Footer from "@/components/Footer";
import { useRef, useEffect, useState } from "react";
import SEO from "@/components/SEO";
import { SEO as SEO_DEFAULTS, absoluteUrl } from "@/lib/seo";

/* ───── HERO ───── */
const heroWords = ["SHARE", "THE", "RIDE."];

const HeroSection = () => (
  <section className="relative min-h-screen flex flex-col bg-background overflow-hidden pt-16">
    {/* Background image overlay */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1920&q=80')",
        opacity: 0.6,
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/55 to-background/85" />

    <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col justify-center">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="mb-6">
            {heroWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="block text-foreground leading-[0.95]"
                style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-base md:text-lg max-w-[480px] mb-8 leading-relaxed"
          >
            Kashmir’s ride-sharing network — find people going your way and split the fare. PVC-verified hosts, upfront pricing, no surge. Built for the hills.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a href="https://tally.so/r/MeJBbA" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-accent text-accent-foreground font-bold text-sm uppercase tracking-wide rounded-sm hover:opacity-90 transition-opacity">
              Get early access →
            </a>
            <a href="#how" className="px-6 py-3 border border-foreground/30 text-foreground font-medium text-sm uppercase tracking-wide rounded-sm hover:bg-foreground/5 transition-colors">
              How it works →
            </a>
          </motion.div>
        </div>

        <div className="flex justify-center items-end gap-3">
          <PhoneMockup className="animate-float hidden sm:block">
            <BookingScreen />
          </PhoneMockup>
          <PhoneMockup className="animate-float-delayed">
            <MatchingScreen />
          </PhoneMockup>
          <PhoneMockup className="animate-float-delayed-2 hidden sm:block">
            <EarningsScreen />
          </PhoneMockup>
        </div>
      </div>
    </div>

    {/* Marquee ticker */}
    <div className="relative z-10 bg-accent py-3 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="text-accent-foreground text-sm font-bold uppercase tracking-widest mx-4">
            SRINAGAR · GULMARG · PAHALGAM · SONAMARG · SHARED FARES · NO SURGE · PVC VERIFIED HOSTS ·&nbsp;
          </span>
        ))}
      </div>
    </div>
  </section>
);

/* ───── STATS ───── */
const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
};

const stats = [
  { value: 3, suffix: " MIN", label: "Target pickup time (~3 min)" },
  { value: 100, suffix: "%", label: "PVC Verified hosts" },
  { value: 0, suffix: "", label: "Surge pricing (₹0)", display: "₹0" },
  { value: 7, suffix: "", label: "Routes launching first" },
];

const StatsSection = () => (
  <section className="bg-background border-y border-border">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className={`py-12 md:py-16 text-center ${i > 0 ? "border-l border-border" : ""}`}>
            <p className="text-5xl md:text-7xl font-[800] text-foreground leading-none mb-2">
              {s.display || <CountUp target={s.value} suffix={s.suffix} />}
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───── APP SCREENS ───── */
const AppSection = () => (
  <section className="section-padding bg-card">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="eyebrow mb-4">— SHARE A SEAT</p>
          <h2 className="text-3xl md:text-5xl font-[800] uppercase tracking-tight text-foreground mb-6">
            RIDE SHARING,<br />BUILT FOR KASHMIR.
          </h2>
          <p className="text-muted-foreground text-base mb-10 max-w-lg leading-relaxed">
            No more expensive solo rides. Find someone already heading your way, split the fare, and ride together — even in low network areas. Built for real Kashmir roads.
          </p>
          <div className="space-y-0">
            {[
              "See rides going your direction",
              "Split fare before you book",
              "Live tracking + PVC-verified host",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-t border-border">
                <span className="text-accent font-bold text-lg">0{i + 1}</span>
                <span className="text-foreground text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-end gap-3">
          <PhoneMockup className="animate-float hidden sm:block">
            <BookingScreen />
          </PhoneMockup>
          <PhoneMockup className="animate-float-delayed">
            <MatchingScreen />
          </PhoneMockup>
          <PhoneMockup className="animate-float-delayed-2 hidden sm:block">
            <EarningsScreen />
          </PhoneMockup>
        </div>
      </div>
    </div>
  </section>
);

/* ───── HOW IT WORKS ───── */
const howSteps = [
  { num: "01", title: "WHERE ARE YOU HEADED?", desc: "Enter your destination — we show rides going your direction." },
  { num: "02", title: "MATCH & SPLIT THE RIDE", desc: "Choose a PVC-verified host — see name, vehicle, rating, and exact shared fare." },
  { num: "03", title: "RIDE TOGETHER", desc: "Travel together, save money, and avoid surge pricing." },
];

const HowItWorks = () => (
  <section id="how" className="section-padding bg-background">
    <div className="container mx-auto px-4">
      <p className="eyebrow mb-4">— HOW IT WORKS</p>
      <div className="grid md:grid-cols-3 gap-8 md:gap-0 mt-12">
        {howSteps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`${i > 0 ? "md:border-l md:border-border md:pl-8" : ""}`}
          >
            <p className="text-6xl md:text-7xl font-[800] text-accent leading-none mb-4">{s.num}</p>
            <h3 className="text-xl md:text-2xl font-[800] uppercase tracking-tight text-foreground mb-3">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ───── WHY PAKHSA ───── */
const features = [
  { title: "UPFRONT SHARED FARES", desc: "Know your share before booking — no hidden pricing." },
  { title: "LOCAL HOSTS", desc: "People who drive these roads daily." },
  { title: "PVC VERIFIED", desc: "Verified identity for safety and trust." },
  { title: "WORKS ON LOW NETWORK", desc: "Designed for patchy connectivity." },
  { title: "FAIR FOR HOSTS", desc: "Earn on empty seats, not full trips." },
  { title: "SAFETY FIRST", desc: "Women safety features + verified rides." },
];

const WhyPakhsa = () => (
  <section className="section-padding bg-card">
    <div className="container mx-auto px-4">
      <p className="eyebrow mb-4">— WHY PAKHSA</p>
      <h2 className="text-3xl md:text-5xl font-[800] uppercase tracking-tight text-foreground mb-16 max-w-3xl leading-[1.1]">
        WE BUILT RIDE SHARING FOR KASHMIR.<br />NOT ANOTHER SURGE APP.
      </h2>
      <div className="grid md:grid-cols-2 gap-x-16">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="border-t border-border py-6"
          >
            <h3 className="text-base font-bold uppercase tracking-wide text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ───── WAITLIST CTA ───── */
const WaitlistSection = () => (
  <section id="waitlist" className="section-padding bg-accent">
    <div className="container mx-auto px-4 max-w-2xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent-foreground/70 mb-4">— RIDE SHARING — SRINAGAR FIRST</p>
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-[800] uppercase tracking-tight text-accent-foreground leading-[0.95] mb-6">
        JOIN THE FIRST<br />RIDE-SHARING NETWORK<br />IN KASHMIR.
      </h2>
      <p className="text-accent-foreground/80 text-base mb-8 max-w-md">
        Get early access when shared rides go live. Limited spots for first users.
      </p>
      <a
        href="https://tally.so/r/MeJBbA"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-8 py-4 bg-accent-foreground text-accent font-bold text-sm uppercase tracking-wide rounded-sm hover:opacity-90 transition-opacity"
      >
        Get early access →
      </a>
      <p className="text-xs text-accent-foreground/60 mt-4">No spam. Just one message when we launch.</p>
    </div>
  </section>
);

/* ───── PAGE ───── */
const Index = () => (
  <div>
    <SEO structuredData={[
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SEO_DEFAULTS.siteName,
          url: absoluteUrl("/"),
          description: SEO_DEFAULTS.defaultDescription,
        },
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SEO_DEFAULTS.siteName,
          url: absoluteUrl("/"),
          description:
            "Kashmir ride-sharing platform connecting riders with PVC-verified local hosts.",
          areaServed: {
            "@type": "Place",
            name: "Kashmir Valley, India",
          },
          foundingLocation: {
            "@type": "Place",
            name: "Srinagar, Jammu and Kashmir, India",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "TaxiService",
          name: "Pakhsa",
          url: absoluteUrl("/"),
          description:
            "Shared rides with PVC-verified local hosts across Srinagar, Gulmarg, Pahalgam, Sonamarg, and nearby areas in Kashmir.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Srinagar",
            addressRegion: "Jammu and Kashmir",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 34.0837,
            longitude: 74.7973,
          },
          areaServed: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg", "Dal Lake", "Doodhpathri"],
          priceRange: "INR",
        },
      ]}
    />
    <HeroSection />
    <StatsSection />
    <AppSection />
    <HowItWorks />
    <WhyPakhsa />
    <WaitlistSection />
    <Footer />
  </div>
);

export default Index;
