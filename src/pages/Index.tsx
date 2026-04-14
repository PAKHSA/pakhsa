import { motion } from "framer-motion";
import { PhoneMockup, BookingScreen, MatchingScreen, EarningsScreen } from "@/components/PhoneMockup";
import MountainSilhouette from "@/components/MountainSilhouette";
import Footer from "@/components/Footer";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
};

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-navy via-river to-glacier overflow-hidden pt-16">
    <MountainSilhouette />
    <div className="container mx-auto px-4 relative z-10 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="visible" className="text-center lg:text-left">
          <motion.h1
            variants={fadeUp} custom={0}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Ride Through the Valley of Heaven
          </motion.h1>
          <motion.p variants={fadeUp} custom={1} className="text-glacier text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0">
            Paksha connects Kashmir's travelers with trusted local bike taxi drivers — safe, affordable, and built for the mountains.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button className="px-6 py-3 rounded-full border-2 border-primary-foreground/40 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10 transition-colors">
              Download on App Store
            </button>
            <button className="px-6 py-3 rounded-full bg-snow text-navy font-medium text-sm hover:bg-snow/90 transition-colors">
              Get on Google Play
            </button>
          </motion.div>
        </motion.div>

        <div className="flex justify-center items-end gap-4">
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

const steps = [
  { icon: "📍", title: "Set Your Destination", desc: "Enter where you're going anywhere in Srinagar or surrounding valleys" },
  { icon: "🛵", title: "Match With a Driver", desc: "Get connected to a PVC-verified local driver in under 3 minutes" },
  { icon: "🏔️", title: "Ride & Explore", desc: "Travel safely through Kashmir's most stunning routes" },
];

const HowItWorks = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="font-heading text-3xl md:text-4xl font-bold text-navy text-center mb-14"
      >
        How It Works
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            className="text-center p-6"
          >
            <div className="text-5xl mb-4">{s.icon}</div>
            <h3 className="font-heading text-xl font-semibold text-navy mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const features = [
  { icon: "🛡️", title: "PVC Verified Drivers", desc: "Every driver verified with J&K Police Verification Certificate" },
  { icon: "💰", title: "Transparent Fares", desc: "No surge pricing. Fixed, affordable rates for every route" },
  { icon: "🗺️", title: "Local Knowledge", desc: "Drivers know every shortcut, chai stop, and hidden viewpoint" },
  { icon: "📱", title: "Built for Kashmir", desc: "Works on low connectivity. Designed for mountain terrain" },
];

const WhyPaksha = () => (
  <section className="py-20 bg-snow">
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="font-heading text-3xl md:text-4xl font-bold text-navy text-center mb-14"
      >
        Why Paksha
      </motion.h2>
      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="bg-background rounded-xl p-6 border border-border hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-heading text-lg font-semibold text-navy mb-1">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const WaitlistBanner = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="waitlist" className="py-20 bg-gradient-to-r from-navy to-river">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Paksha is launching soon in Srinagar
          </h2>
          {submitted ? (
            <p className="text-glacier text-lg">🎉 You're on the list! We'll notify you on launch.</p>
          ) : (
            <>
              <p className="text-glacier mb-8">Be the first to ride. We'll notify you on launch.</p>
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-sm bg-snow text-navy focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Join Waitlist
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Index = () => (
  <div>
    <HeroSection />
    <HowItWorks />
    <WhyPaksha />
    <WaitlistBanner />
    <Footer />
  </div>
);

export default Index;
