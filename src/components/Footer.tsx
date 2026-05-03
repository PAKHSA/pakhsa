import { Link } from "react-router-dom";
import { MapPin, Mail, Instagram, Twitter, Facebook, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 bg-accent text-accent-foreground rounded-full shadow-lg hover:opacity-90 transition-opacity"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="bg-card border-t border-border">
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="text-2xl font-[800] uppercase tracking-tight text-foreground">
                PAKHSA
              </Link>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Share a ride with a local. Pay your part. No surprises.
              </p>
              <div className="flex gap-3 mt-4">
                <a 
                  href="#" 
                  className="p-2 border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="p-2 border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="p-2 border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/explore#itinerary" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Itinerary
                  </Link>
                </li>
                <li>
                  <Link to="/explore#agencies" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Agencies
                  </Link>
                </li>
                <li>
                  <a href="https://tally.so/r/MeJBbA" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Waitlist
                  </a>
                </li>
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-foreground mb-4">Destinations</h4>
              <ul className="space-y-2">
                <li><span className="text-sm text-muted-foreground">Srinagar</span></li>
                <li><span className="text-sm text-muted-foreground">Gulmarg</span></li>
                <li><span className="text-sm text-muted-foreground">Pahalgam</span></li>
                <li><span className="text-sm text-muted-foreground">Sonamarg</span></li>
                <li><span className="text-sm text-muted-foreground">Doodhpathri</span></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-foreground mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                  <span>Srinagar, J{"&"}K</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                  <div className="flex flex-col gap-2 text-muted-foreground">
                    <a href="mailto:hello@pakhsa.in" className="hover:text-accent transition-colors">
                      hello@pakhsa.in
                    </a>
                    <a href="mailto:contact@pakhsa.in" className="hover:text-accent transition-colors">
                      contact@pakhsa.in
                    </a>
                    <a href="mailto:support@pakhsa.in" className="hover:text-accent transition-colors">
                      support@pakhsa.in
                    </a>
                  </div>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                <p className="text-xs text-muted-foreground">Coming soon — drop your email.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-4">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} Pakhsa · Made in Kashmir ❤️
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
