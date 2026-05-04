import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPinned } from "lucide-react";
import { PhoneMockup, BookingScreen, MatchingScreen, EarningsScreen } from "@/components/PhoneMockup";
import Footer from "@/components/Footer";
import { useRef, useEffect, useState } from "react";
import SEO from "@/components/SEO";
import { SEO as SEO_DEFAULTS, absoluteUrl } from "@/lib/seo";

/* ───── HERO ───── */
const heroLines = ["PAKHSA", "SHARED RIDES", "IN KASHMIR"];

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
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.45 }}
            className="mb-5"
          >
            <Link
              to="/explore"
              className="group inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.12em] text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-accent hover:bg-card"
            >
              <MapPinned className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                Visiting Kashmir? Full trip guide on
              </span>
              <span className="text-accent underline-offset-2 group-hover:underline">Explore Kashmir</span>
              <span className="text-muted-foreground" aria-hidden>
                →
              </span>
            </Link>
          </motion.div>
          <h1 className="mb-5 font-display font-extrabold normal-case tracking-[-0.04em] [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] [font-feature-settings:'liga'_1,'kern'_1]">
            {heroLines.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="block text-foreground leading-[0.98]"
                style={{ fontSize: "clamp(1.875rem, 5.75vw, 3.75rem)" }}
              >
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-base md:text-lg max-w-[520px] mb-8 leading-relaxed"
          >
            Pakhsa is Kashmir&apos;s ride-sharing and carpool platform for Srinagar and beyond: connect with riders going your way, split the fare, and ride without surge pricing — with locals who know the roads.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a href="https://tally.so/r/MeJBbA" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-accent text-accent-foreground font-bold text-sm uppercase tracking-wide rounded-sm hover:opacity-90 transition-opacity">
              Get Early Access →
            </a>
            <a href="#how" className="px-6 py-3 border border-foreground/30 text-foreground font-medium text-sm uppercase tracking-wide rounded-sm hover:bg-foreground/5 transition-colors">
              See how it works
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
            SRINAGAR · GULMARG · PAHALGAM · SONAMARG · SPLIT THE FARE · NO SURGE ·&nbsp;
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

const stats: { value?: number; suffix?: string; label: string; display?: string }[] = [
  { display: "Local", label: "Kashmir hosts" },
  { value: 0, suffix: "", label: "Surge charge", display: "₹0" },
  { display: "PVC Checked", label: "Every driver" },
  { display: "Srinagar", label: "First city" },
];

const StatsSection = () => (
  <section className="bg-background border-y border-border" aria-labelledby="stats-heading">
    <h2 id="stats-heading" className="sr-only">
      Pakhsa ride sharing in Kashmir — what to expect
    </h2>
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className={`py-12 md:py-16 text-center ${i > 0 ? "border-l border-border" : ""}`}>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[800] text-foreground leading-none mb-2">
              {s.display != null ? s.display : s.value != null ? <CountUp target={s.value} suffix={s.suffix ?? ""} /> : null}
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
            RIDES THAT MAKE SENSE<br />IN KASHMIR.
          </h2>
          <p className="text-muted-foreground text-base mb-10 max-w-lg leading-relaxed">
            See who&apos;s going your way. Pay only for your seat. Your driver lives here — they know the road.
          </p>
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
  { num: "01", title: "WHERE TO?", desc: "Enter your stop." },
  { num: "02", title: "FIND A MATCH", desc: "Someone's already going that way." },
  { num: "03", title: "GO", desc: "Share the ride, split the cost." },
];

const HowItWorks = () => (
  <section id="how" className="section-padding bg-background" aria-labelledby="how-heading">
    <div className="container mx-auto px-4">
      <p className="eyebrow mb-4">— HOW IT WORKS</p>
      <h2 id="how-heading" className="text-3xl md:text-5xl font-[800] uppercase tracking-tight text-foreground mb-4 max-w-3xl leading-[1.1]">
        Share a ride in Kashmir in three steps
      </h2>
      <p className="text-muted-foreground text-base max-w-2xl mb-12 leading-relaxed">
        Whether you&apos;re commuting in Srinagar or heading to Gulmarg or Pahalgam, Pakhsa matches you with riders already going your direction — a simple, cost-effective way to travel Kashmir.
      </p>
      <div className="grid md:grid-cols-3 gap-8 md:gap-0 mt-4">
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
  { title: "YOU ONLY PAY YOUR SHARE", desc: "Not the whole cab. Just your seat." },
  { title: "DRIVERS ARE CHECKED", desc: "PVC verified before they go live." },
  { title: "THE PRICE IS THE PRICE", desc: "No surge. Not ever." },
  { title: "WE KNOW THESE ROADS", desc: "Gulmarg, Pahalgam, Sonamarg — routes that actually matter here." },
];

const WhyPakhsa = () => (
  <section className="section-padding bg-card">
    <div className="container mx-auto px-4">
      <p className="eyebrow mb-4">— WHY PAKHSA</p>
      <h2 className="text-3xl md:text-5xl font-[800] uppercase tracking-tight text-foreground mb-16 max-w-3xl leading-[1.1]">
        FOUR REASONS TO RIDE WITH US.
      </h2>
      <div className="grid md:grid-cols-2 gap-x-16 max-w-4xl">
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

/* ───── DEEP CONTENT / KEYWORDS ───── */
const KashmirRideSharingSection = () => (
  <section
    id="pakhsa-kashmir"
    className="section-padding bg-background border-y border-border"
    aria-labelledby="kashmir-deep-heading"
  >
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 id="kashmir-deep-heading" className="text-3xl md:text-5xl font-[800] uppercase tracking-tight text-foreground mb-6 leading-[1.1]">
        Ride sharing in Srinagar &amp; Kashmir — affordable, safe, surge-free
      </h2>
      <p className="text-muted-foreground text-base mb-12 leading-relaxed">
        Pakhsa is built as a local ride-sharing platform for India&apos;s Kashmir region: everyday commutes in Srinagar, airport and hotel transfers, and longer hops to favourite destinations — with transparent pricing on a no-surge ride hailing model.
      </p>
      <div className="grid md:grid-cols-1 gap-10">
        <div>
          <h3 className="text-xl font-[800] uppercase tracking-tight text-foreground mb-3">Cost-effective travel &amp; carpooling</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You only pay for your seat, not a whole cab. That makes shared rides and carpooling in Kashmir a practical option for students, office commutes, and weekend trips — connect with riders who are already going your way and keep travel affordable.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-[800] uppercase tracking-tight text-foreground mb-3">Safe carpooling &amp; verified drivers</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We take safety seriously: driver checks and verification help you feel confident when you share a ride. Pakhsa is designed for the way people actually move in Srinagar and across the valley — not a one-size-fits-all import from other cities.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-[800] uppercase tracking-tight text-foreground mb-3">No surge pricing on the Pakhsa app</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The price you see is the price you pay — a no-surge ride sharing app for Kashmir, so you&apos;re not punished for rain, rush hour, or high demand. Join the waitlist to be first when the Pakhsa app launches; we&apos;ll keep you posted for download and early access.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ───── WAITLIST CTA ───── */
const WaitlistSection = () => (
  <section id="waitlist" className="section-padding bg-accent">
    <div className="container mx-auto px-4 max-w-2xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent-foreground/70 mb-4">— STARTING IN SRINAGAR</p>
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-[800] uppercase tracking-tight text-accent-foreground leading-[0.95] mb-6">
        BE FIRST WHEN<br />WE LAUNCH.
      </h2>
      <p className="text-accent-foreground/80 text-base mb-8 max-w-md">
        Leave your email. We&apos;ll tell you when we&apos;re live. That&apos;s all.
      </p>
      <a
        href="https://tally.so/r/MeJBbA"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-8 py-4 bg-accent-foreground text-accent font-bold text-sm uppercase tracking-wide rounded-sm hover:opacity-90 transition-opacity"
      >
        Get Early Access →
      </a>
      <p className="text-xs text-accent-foreground/55 mt-6 leading-relaxed">
        Questions?{" "}
        <a href="mailto:contact@pakhsa.in" className="underline-offset-2 hover:underline hover:text-accent-foreground">
          contact@pakhsa.in
        </a>
        {" · "}
        <a href="mailto:support@pakhsa.in" className="underline-offset-2 hover:underline hover:text-accent-foreground">
          support@pakhsa.in
        </a>
      </p>
    </div>
  </section>
);

/* ───── PAGE ───── */
const Index = () => (
  <div>
    <SEO
      description={SEO_DEFAULTS.defaultDescription}
      structuredData={[
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${absoluteUrl("/")}#website`,
          name: SEO_DEFAULTS.siteName,
          url: absoluteUrl("/"),
          description: SEO_DEFAULTS.defaultDescription,
          inLanguage: "en-IN",
          publisher: { "@id": `${absoluteUrl("/")}#organization` },
        },
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${absoluteUrl("/")}#webpage`,
          url: absoluteUrl("/"),
          name: SEO_DEFAULTS.defaultTitle,
          description: SEO_DEFAULTS.defaultDescription,
          inLanguage: "en-IN",
          isPartOf: { "@id": `${absoluteUrl("/")}#website` },
          about: {
            "@type": "Service",
            name: "Pakhsa ride sharing and carpooling",
            serviceType: "Shared rides and carpooling",
            areaServed: { "@type": "Place", name: "Kashmir Valley and Srinagar, India" },
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${absoluteUrl("/")}#organization`,
          name: SEO_DEFAULTS.siteName,
          url: absoluteUrl("/"),
          email: "hello@pakhsa.in",
          slogan: "Share rides in Kashmir — affordable carpooling, no surge pricing.",
          description: SEO_DEFAULTS.defaultDescription,
          knowsAbout: [
            "ride sharing Kashmir",
            "carpool Srinagar",
            "Srinagar ride hailing",
            "no surge pricing",
            "Kashmir carpooling",
          ],
          areaServed: {
            "@type": "Place",
            name: "Kashmir Valley, India",
          },
          foundingLocation: {
            "@type": "Place",
            name: "Srinagar, Jammu and Kashmir, India",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              email: "contact@pakhsa.in",
              contactType: "customer service",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi"],
            },
            {
              "@type": "ContactPoint",
              email: "support@pakhsa.in",
              contactType: "technical support",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi"],
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "TaxiService",
          name: "Pakhsa",
          url: absoluteUrl("/"),
          description: SEO_DEFAULTS.defaultDescription,
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
    <KashmirRideSharingSection />
    <WaitlistSection />
    <Footer />
  </div>
);

export default Index;
