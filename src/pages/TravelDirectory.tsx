import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  Phone,
  Mail,
  Star,
  ShieldCheck,
  Info,
  Mountain,
  Users,
  Car,
  Wallet,
  X,
  Award,
  MapPin,
  Sparkles,
} from "lucide-react";
import Footer from "@/components/Footer";
import {
  agencies,
  pricingGuide,
  quickFilterOptions,
  type Agency,
} from "@/data/agencies";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/* ────────────────────────── CONSTANTS ────────────────────────── */
const CARDS_PER_PAGE = 12;

type SortKey = "popularity" | "price_asc" | "luxury";

const sortLabels: Record<SortKey, string> = {
  popularity: "Popularity (Highest Rating)",
  price_asc: "Price (Low → High)",
  luxury: "Luxury (Premium First)",
};

const priceRank: Record<string, number> = { Budget: 1, Standard: 2, Luxury: 3 };

const filterIcons: Record<string, React.ReactNode> = {
  "Adventure/Treks": <Mountain size={14} />,
  "Family Packages": <Users size={14} />,
  "Car Rentals": <Car size={14} />,
  "Budget Friendly": <Wallet size={14} />,
};

const priceBadgeColors: Record<string, string> = {
  Budget: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Standard: "bg-sky-500/15 text-sky-400 border-sky-500/25",
  Luxury: "bg-amber-500/15 text-amber-400 border-amber-500/25",
};

/* ────────────────────────── HERO ────────────────────────── */
const DirectoryHero = () => (
  <section className="relative min-h-[60vh] flex items-center pt-16 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1920&q=80')",
        opacity: 0.18,
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />

    <div className="container mx-auto px-4 relative z-10 py-16">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="eyebrow mb-6"
      >
        — KASHMIR TOUR & TRAVEL DIRECTORY
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-4xl md:text-6xl lg:text-7xl font-[800] uppercase tracking-tight text-foreground leading-[1.05] mb-6 max-w-4xl"
      >
        FIND YOUR
        <br />
        TRUSTED TRAVEL
        <br />
        PARTNER.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed"
      >
        Browse 2,500+ JKTA-registered travel agencies across Kashmir. Every
        listing is officially verified by the J&K Tourism Department.
      </motion.p>
    </div>
  </section>
);

/* ────────────────────────── FEATURED PARTNERS ────────────────────────── */
const FeaturedPartners = ({ featured }: { featured: Agency[] }) => (
  <section className="bg-card border-y border-border">
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="flex items-center gap-3 mb-10">
        <Award size={20} className="text-accent" />
        <p className="eyebrow">FEATURED PARTNERS</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {featured.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group relative border border-accent/30 bg-gradient-to-b from-accent/[0.04] to-transparent rounded-sm p-5 hover:border-accent/60 transition-all duration-300"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-sm bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={12} className="text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                    Top Rated
                  </span>
                </div>
                <ShieldCheck size={16} className="text-emerald-400" />
              </div>

              <h3 className="text-base font-bold uppercase text-foreground mb-1 leading-tight">
                {a.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                <MapPin size={10} /> {a.location}
              </p>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star
                    size={13}
                    className="text-amber-400 fill-amber-400"
                  />
                  <span className="text-sm font-bold text-foreground">
                    {a.rating}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  | {a.reviewCount}+ reviews
                </span>
              </div>

              <span className="text-[11px] text-accent font-medium">
                {a.bestFor}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ────────────────────────── SEARCH & FILTER BAR ────────────────────────── */
interface FilterBarProps {
  search: string;
  setSearch: (v: string) => void;
  sortKey: SortKey;
  setSortKey: (v: SortKey) => void;
  activeFilter: string | null;
  setActiveFilter: (v: string | null) => void;
  resultCount: number;
}

const FilterBar = ({
  search,
  setSearch,
  sortKey,
  setSortKey,
  activeFilter,
  setActiveFilter,
  resultCount,
}: FilterBarProps) => {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        {/* Row 1 – Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              id="directory-search"
              type="text"
              placeholder="Search by agency name or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-card border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-sm text-sm text-foreground hover:border-foreground/20 transition-colors w-full sm:w-auto"
            >
              <span className="text-muted-foreground text-xs uppercase tracking-wide">
                Sort:
              </span>
              <span className="font-medium text-xs">{sortLabels[sortKey]}</span>
              <ChevronDown
                size={14}
                className={`ml-auto transition-transform ${sortOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-full mt-1 w-64 bg-card border border-border rounded-sm shadow-xl z-50 overflow-hidden"
                >
                  {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSortKey(key);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sortKey === key
                          ? "bg-accent/10 text-accent"
                          : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      {sortLabels[key]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Row 2 – Quick filters + result count */}
        <div className="flex flex-wrap items-center gap-2">
          {quickFilterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() =>
                setActiveFilter(activeFilter === filter ? null : filter)
              }
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-wide border rounded-sm transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-accent text-accent-foreground border-accent"
                  : "text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {filterIcons[filter]}
              {filter}
            </button>
          ))}

          <span className="ml-auto text-xs text-muted-foreground">
            {resultCount} {resultCount === 1 ? "agency" : "agencies"} found
          </span>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────── AGENCY CARD ────────────────────────── */
const AgencyCard = ({ agency, index }: { agency: Agency; index: number }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
    transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.35 }}
    className="group border border-border bg-card rounded-sm p-5 hover:border-foreground/15 hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
  >
    {/* Top row */}
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-[15px] font-bold uppercase text-foreground leading-tight pr-2">
        {agency.name}
      </h3>
      {agency.jktaVerified && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-sm cursor-help">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span className="text-[9px] font-bold uppercase tracking-wide text-emerald-400">
                JKTA
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Verified by J&K Tourism Authority</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>

    {/* Location */}
    <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
      <MapPin size={10} /> {agency.location}
    </p>

    {/* Rating + Reviews */}
    <div className="flex items-center gap-2 mb-3">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className={
              i < Math.round(agency.rating)
                ? "text-amber-400 fill-amber-400"
                : "text-muted-foreground/30"
            }
          />
        ))}
      </div>
      <span className="text-sm font-bold text-foreground">{agency.rating}</span>
      <span className="text-[11px] text-muted-foreground">
        | {agency.reviewCount}+ reviews
      </span>
    </div>

    {/* Price tag + best-for */}
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 border rounded-sm cursor-help ${priceBadgeColors[agency.priceCategory]}`}
          >
            {agency.priceCategory}
            <Info size={10} className="opacity-60" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs font-medium">
            {agency.priceCategory}:{" "}
            <span className="text-muted-foreground">
              {pricingGuide[agency.priceCategory]}
            </span>
          </p>
        </TooltipContent>
      </Tooltip>

      <span className="text-[11px] text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-sm border border-accent/20">
        {agency.bestFor}
      </span>
    </div>

    {/* Action buttons */}
    <div className="flex gap-2 pt-3 border-t border-border">
      <a
        href={`tel:${agency.phone.replace(/\s/g, "")}`}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[12px] font-bold uppercase tracking-wide bg-accent text-accent-foreground rounded-sm hover:opacity-90 transition-opacity"
      >
        <Phone size={12} />
        Call Now
      </a>
      <a
        href={`mailto:${agency.email}?subject=Travel%20Inquiry`}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[12px] font-bold uppercase tracking-wide border border-foreground/20 text-foreground rounded-sm hover:bg-foreground/5 transition-colors"
      >
        <Mail size={12} />
        Email
      </a>
    </div>
  </motion.div>
);

/* ────────────────────────── VERIFICATION FOOTER ────────────────────────── */
const VerificationNote = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="flex items-start gap-3 border border-emerald-500/20 bg-emerald-500/5 rounded-sm p-5 max-w-3xl mx-auto">
      <ShieldCheck size={20} className="text-emerald-400 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-foreground mb-1">
          Officially Verified Directory
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          All agencies listed in this directory are officially registered and
          verified by the{" "}
          <span className="text-foreground font-medium">
            Jammu & Kashmir Tourism Department (JKTA)
          </span>
          . Registration details are periodically audited to ensure accuracy and
          trustworthiness for travelers.
        </p>
      </div>
    </div>
  </div>
);

/* ────────────────────────── MAIN PAGE ────────────────────────── */
const TravelDirectory = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("popularity");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  // ── Featured: top agencies with 5.0 rating & high reviews ──
  const featured = useMemo(
    () =>
      [...agencies]
        .filter((a) => a.rating === 5.0)
        .sort((a, b) => b.reviewCount - a.reviewCount)
        .slice(0, 4),
    []
  );

  // ── Filter + sort the full list ──
  const filtered = useMemo(() => {
    let list = [...agencies];

    // Search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.phone.replace(/\s/g, "").includes(q.replace(/\s/g, ""))
      );
    }

    // Quick filter
    if (activeFilter) {
      list = list.filter((a) => a.specialization === activeFilter);
    }

    // Sort
    switch (sortKey) {
      case "popularity":
        list.sort(
          (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
        );
        break;
      case "price_asc":
        list.sort(
          (a, b) =>
            priceRank[a.priceCategory] - priceRank[b.priceCategory] ||
            b.rating - a.rating
        );
        break;
      case "luxury":
        list.sort(
          (a, b) =>
            priceRank[b.priceCategory] - priceRank[a.priceCategory] ||
            b.rating - a.rating
        );
        break;
    }

    return list;
  }, [search, sortKey, activeFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div>
      <DirectoryHero />
      <FeaturedPartners featured={featured} />

      <FilterBar
        search={search}
        setSearch={setSearch}
        sortKey={sortKey}
        setSortKey={setSortKey}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        resultCount={filtered.length}
      />

      {/* LISTING GRID */}
      <section className="bg-background">
        <div className="container mx-auto px-4 py-10 md:py-14">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Search size={40} className="mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-lg font-bold text-foreground uppercase mb-2">
                No Agencies Found
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                <AnimatePresence mode="popLayout">
                  {visible.map((agency, i) => (
                    <AgencyCard key={agency.id} agency={agency} index={i} />
                  ))}
                </AnimatePresence>
              </div>

              {hasMore && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() =>
                      setVisibleCount((c) => c + CARDS_PER_PAGE)
                    }
                    className="px-8 py-3 border border-foreground/20 text-foreground text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-foreground/5 transition-colors"
                  >
                    Load More Agencies
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Pricing guide legend */}
        <div className="container mx-auto px-4 pb-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border pt-6">
            <span className="font-medium text-foreground uppercase tracking-wide text-[10px]">
              Pricing Guide:
            </span>
            {Object.entries(pricingGuide).map(([cat, desc]) => (
              <span key={cat} className="flex items-center gap-1.5">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    cat === "Budget"
                      ? "bg-emerald-400"
                      : cat === "Standard"
                        ? "bg-sky-400"
                        : "bg-amber-400"
                  }`}
                />
                <span className="font-medium text-foreground">{cat}</span> ={" "}
                {desc}
              </span>
            ))}
          </div>
        </div>
      </section>

      <VerificationNote />
      <Footer />
    </div>
  );
};

export default TravelDirectory;
