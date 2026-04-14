import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const PakshaModal = () => {
  const [show, setShow] = useState(false);

  const dismiss = useCallback(() => {
    setShow(false);
    sessionStorage.setItem("paksha_modal_shown", "true");
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("paksha_modal_shown")) return;

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.4) {
        setShow(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem("paksha_modal_shown")) {
        setShow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-snow rounded-2xl shadow-xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-muted-foreground hover:text-navy transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <div className="text-5xl mb-4">🛵⛰️</div>
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground mb-4">
                🚀 Coming Soon to Srinagar
              </span>
              <h3 className="font-heading text-2xl font-bold text-navy mb-3">
                Getting Around Kashmir Just Got Easier
              </h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                Paksha is Kashmir's first dedicated bike taxi app. Book a local driver, explore at your own pace, and travel with confidence. Launching soon.
              </p>

              <div className="flex justify-center gap-6 mb-6 text-sm text-navy">
                <span>🛵 Local Drivers</span>
                <span>🛡️ PVC Verified</span>
                <span>💰 Fixed Fares</span>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); dismiss(); }} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email to join the waitlist"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-river"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-navy to-river text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Notify Me on Launch
                </button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">No spam. We'll only write when Paksha is live.</p>
              <p className="text-xs text-river mt-2 cursor-pointer hover:underline">Already joined? Share with a friend</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PakshaModal;
