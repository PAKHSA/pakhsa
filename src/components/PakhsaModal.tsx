import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const PakhsaModal = () => {
  const [show, setShow] = useState(false);

  const dismiss = useCallback(() => {
    setShow(false);
    sessionStorage.setItem("pakhsa_modal_shown", "true");
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("pakhsa_modal_shown")) return;

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.4) {
        setShow(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem("pakhsa_modal_shown")) {
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-card border border-border rounded-md max-w-[520px] w-full p-10 md:p-12 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-muted-foreground/40 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div>
              <p className="eyebrow mb-4">🛵 LAUNCHING SOON</p>
              <h3 className="text-3xl md:text-[42px] font-[800] uppercase tracking-tight leading-[1.1] text-foreground mb-4">
                YOUR HOST
                <br />
                AWAITS.
              </h3>
              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Pakhsa is Kashmir&apos;s ride-sharing network — split fares with PVC-verified locals, no surge. Get early access when we launch in Srinagar.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {["PVC VERIFIED", "SHARED FARE", "NO SURGE"].map((chip) => (
                  <span key={chip} className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide bg-muted border-l-2 border-accent text-foreground">
                    {chip}
                  </span>
                ))}
              </div>

              <form onSubmit={(e) => { e.preventDefault(); dismiss(); }} className="space-y-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-muted border border-border text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent rounded-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-accent text-accent-foreground font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity rounded-sm"
                >
                  Get Early Access →
                </button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">One email. When we launch. Nothing more.</p>
              <p className="text-xs text-muted-foreground/80 mt-4 leading-relaxed">
                <a href="mailto:support@pakhsa.in" className="underline-offset-2 hover:text-foreground hover:underline">
                  support@pakhsa.in
                </a>
                {" · "}
                <a href="mailto:contact@pakhsa.in" className="underline-offset-2 hover:text-foreground hover:underline">
                  contact@pakhsa.in
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PakhsaModal;
