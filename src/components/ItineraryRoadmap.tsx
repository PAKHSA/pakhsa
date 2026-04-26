import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, type ComponentType } from "react";
import { Star, Navigation } from "lucide-react";

type Stop = {
  day: string;
  place: string;
  subtitle: string;
  highlights: string[];
  icon: ComponentType<{ className?: string }>;
  rating: number;
  reviews: number;
  distance: string;
  color: string;
  image: string;
};

type Props = {
  stops: Stop[];
};

const ItineraryRoadmap = ({ stops }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [markers, setMarkers] = useState<{ x: number; y: number }[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const VB_W = 1600;
  const VB_H = 320;
  const ROAD_D =
    "M 0 200 Q 200 80 400 180 Q 600 280 800 180 Q 1000 80 1200 180 Q 1400 280 1600 180";

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const n = stops.length;
    const sampled = stops.map((_, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const safeT = 0.07 + t * 0.86;
      const p = path.getPointAtLength(total * safeT);
      return { x: p.x, y: p.y };
    });
    setMarkers(sampled);
  }, [stops]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280px] md:h-[340px] lg:h-[400px] px-10 md:px-16 lg:px-20"
    >
      <div className="relative w-full h-full">
      {/* Road (animated, the focus) */}
      <svg
        className="absolute inset-0 w-full h-full z-[2] pointer-events-none"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="roadGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="roadGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(37 85% 56%)" stopOpacity="0.7" />
            <stop offset="50%" stopColor="hsl(37 95% 62%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(37 85% 56%)" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Underglow */}
        <motion.path
          d={ROAD_D}
          stroke="hsl(37 95% 62%)"
          strokeOpacity="0.4"
          strokeWidth="30"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#roadGlow)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        {/* Road body */}
        <motion.path
          ref={pathRef}
          d={ROAD_D}
          stroke="url(#roadGradient)"
          strokeWidth="15"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        {/* Center dashed line */}
        <motion.path
          d={ROAD_D}
          stroke="white"
          strokeOpacity="0.9"
          strokeWidth="3"
          strokeDasharray="22 18"
          fill="none"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>

      {/* Markers (share the same box as the road SVG) */}
      <div className="absolute inset-0 z-[3]">
        {markers.map((m, i) => {
          const stop = stops[i];
          const Icon = stop.icon;
          const leftPct = (m.x / VB_W) * 100;
          const topPct = (m.y / VB_H) * 100;
          const isOpen = openIdx === i;
          const flipUp = topPct > 60;
          const alignLeft = leftPct < 18;
          const alignRight = leftPct > 82;

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${leftPct}%`, top: `${topPct}%`, transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, y: 12, scale: 0.6 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 1.6 + i * 0.12, type: "spring", stiffness: 280, damping: 22 }}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                onMouseEnter={() => setOpenIdx(i)}
                onMouseLeave={() => setOpenIdx(null)}
                className="group relative block focus:outline-none"
                aria-label={`${stop.place}, day ${stop.day}`}
              >
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping opacity-60" />
                  <div className={`relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${stop.color} p-[2px] shadow-[0_8px_24px_rgba(0,0,0,0.55)] ring-2 ring-white/30`}>
                    <div className="w-full h-full rounded-full overflow-hidden bg-background">
                      <img src={stop.image} alt={stop.place} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <span className={`absolute -top-2 -right-2 px-2 py-0.5 text-[10px] md:text-xs font-bold rounded-md bg-gradient-to-r ${stop.color} text-white shadow-md whitespace-nowrap`}>
                    Day {stop.day}
                  </span>
                  <span className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-accent" />
                  </span>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 mt-2 text-center whitespace-nowrap">
                  <p className="text-xs md:text-sm font-[800] uppercase tracking-tight text-foreground drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                    {stop.place}
                  </p>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: flipUp ? 10 : -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: flipUp ? 10 : -10, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className={`absolute w-56 md:w-64 z-50 ${flipUp ? "bottom-full mb-3" : "top-full mt-10"} ${
                        alignLeft
                          ? "left-0"
                          : alignRight
                          ? "right-0"
                          : "left-1/2 -translate-x-1/2"
                      }`}
                    >
                      <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden text-left">
                        <div className="relative h-24 overflow-hidden">
                          <img src={stop.image} alt={stop.place} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-2 left-3 right-3">
                            <p className={`inline-block px-2 py-0.5 bg-gradient-to-r ${stop.color} text-white text-[10px] font-bold rounded-full mb-1`}>
                              Day {stop.day}
                            </p>
                            <h4 className="text-base font-[800] uppercase text-white leading-tight">{stop.place}</h4>
                          </div>
                        </div>
                        <div className="p-3 space-y-2">
                          <p className="text-xs text-muted-foreground">{stop.subtitle}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                            <span className="font-bold text-foreground">{stop.rating}</span>
                            <span className="text-muted-foreground">({stop.reviews.toLocaleString()})</span>
                            <span className="ml-auto px-1.5 py-0.5 bg-green-500/10 text-green-500 text-[9px] font-medium rounded">VERIFIED</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {stop.highlights.slice(0, 3).map((h, j) => (
                              <span key={j} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                                {h}
                              </span>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-border flex items-center gap-1 text-xs text-muted-foreground">
                            <Navigation className="w-3 h-3" />
                            <span>{stop.distance}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>
      </div>
    </div>
  );
};

export default ItineraryRoadmap;
