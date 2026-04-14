import { motion, useInView } from "framer-motion";
import { PhoneMockup, BookingScreen, MatchingScreen, EarningsScreen } from "@/components/PhoneMockup";
import Footer from "@/components/Footer";
import { useState, useRef, useEffect } from "react";

/* ───── HERO ───── */
const heroWords = ["RIDE", "THE", "VALLEY."];

const HeroSection = () => (
  <section className="relative min-h-screen flex flex-col bg-background overflow-hidden pt-16">
    {/* Background image overlay */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1920&q=80')",
        opacity: 0.25,
      }}
    />
    <div className="absolute inset-0 bg-background/75" />

    <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col justify-center">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="eyebrow mb-6">— KASHMIR'S FIRST BIKE TAXI APP</p>
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
            Paksha connects you with trusted local drivers across Srinagar and Kashmir. Built for mountain terrain. Launching soon.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#waitlist" className="px-6 py-3 bg-accent text-accent-foreground font-bold text-sm uppercase tracking-wide rounded-sm hover:opacity-90 transition-opacity">
              Join Waitlist →
            </a>
            <a href="#how" className="px-6 py-3 border border-foreground/30 text-foreground font-medium text-sm uppercase tracking-wide rounded-sm hover:bg-foreground/5 transition-colors">
              See How It Works
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
            SRINAGAR · GULMARG · PAHALGAM · SONAMARG · DAL LAKE · DOODHPATHRI · LAL CHOWK · PVC VERIFIED DRIVERS ·&nbsp;
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
  { value: 3, suffix: " MIN", label: "Average pickup time" },
  { value: 100, suffix: "%", label: "PVC Verified drivers" },
  { value: 0, suffix: "", label: "Surge pricing ever", display: "₹0" },
  { value: 7, suffix: "", label: "Valleys we operate in" },
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
          <p className="eyebrow mb-4">— THE APP</p>
          <h2 className="text-3xl md:text-5xl font-[800] uppercase tracking-tight text-foreground mb-6">
            DESIGNED FOR<br />KASHMIR.
          </h2>
          <p className="text-muted-foreground text-base mb-10 max-w-lg leading-relaxed">
            No confusing UX. No unnecessary features. Just open the app, set your destination, and a local driver comes to you in minutes.
          </p>
          <div className="space-y-0">
            {[
              "Book a ride in 30 seconds",
              "Track your driver live on map",
              "Pay fixed fares, no surprises",
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
  { num: "01", title: "SET YOUR DESTINATION", desc: "Enter pickup & drop anywhere in Kashmir. The app shows drivers near you in real time." },
  { num: "02", title: "MATCH WITH A LOCAL", desc: "Every Paksha driver is PVC-verified by J&K Police. You see their name, bike, and rating before confirming." },
  { num: "03", title: "RIDE & EXPLORE", desc: "Your driver knows every shortcut, viewpoint, and chai dhaba. Travel like a local." },
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

/* ───── WHY PAKSHA ───── */
const features = [
  { title: "PVC VERIFIED DRIVERS", desc: "Every driver background-checked by J&K Police Verification Certificate before joining." },
  { title: "FIXED FARES ONLY", desc: "No surge pricing. Ever. You see the price before you book." },
  { title: "LOCAL KNOWLEDGE", desc: "Our drivers know Kashmir — the routes, the weather, the best stops." },
  { title: "LOW CONNECTIVITY MODE", desc: "Works on 2G. Built for mountain terrain where signal drops." },
  { title: "DRIVER-FIRST EARNINGS", desc: "Drivers keep the majority. We take the minimum. Fairness is in our DNA." },
  { title: "WOMEN SAFETY FEATURE", desc: "Option to request a female driver. Emergency SOS one tap away." },
];

const WhyPaksha = () => (
  <section className="section-padding bg-card">
    <div className="container mx-auto px-4">
      <p className="eyebrow mb-4">— WHY PAKSHA</p>
      <h2 className="text-3xl md:text-5xl font-[800] uppercase tracking-tight text-foreground mb-16 max-w-3xl leading-[1.1]">
        WE BUILT THIS FOR KASHMIR.<br />NOT A COPY-PASTE APP.
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
const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="waitlist" className="section-padding bg-accent">
      <div className="container mx-auto px-4 max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent-foreground/70 mb-4">— LAUNCHING SOON IN SRINAGAR</p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-[800] uppercase tracking-tight text-accent-foreground leading-[0.95] mb-6">
          BE FIRST<br />TO RIDE.
        </h2>
        {submitted ? (
          <p className="text-accent-foreground text-lg font-medium">🎉 You're on the list. We'll be in touch.</p>
        ) : (
          <>
            <p className="text-accent-foreground/80 text-base mb-8 max-w-md">
              Drop your email. We'll tell you the day Paksha goes live. Nothing else.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="flex flex-col sm:flex-row gap-3 max-w-lg"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border-2 border-accent-foreground text-accent-foreground bg-transparent placeholder:text-accent-foreground/50 text-base focus:outline-none rounded-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent-foreground text-accent font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity rounded-sm whitespace-nowrap"
              >
                Notify Me →
              </button>
            </form>
            <p className="text-xs text-accent-foreground/60 mt-4">No spam. Just one message when we launch.</p>
          </>
        )}
      </div>
    </section>
  );
};

/* ───── PAGE ───── */
const Index = () => (
  <div>
    <HeroSection />
    <StatsSection />
    <AppSection />
    <HowItWorks />
    <WhyPaksha />
    <WaitlistSection />
    <Footer />
  </div>
);

export default Index;
