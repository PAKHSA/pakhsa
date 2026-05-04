import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Search, Star, MapPin, Phone, Mail, X, ChevronDown, Navigation, Mountain, TreePine, Waves, Snowflake, Sun, Coffee, ExternalLink, Globe, Instagram } from "lucide-react";
import Footer from "@/components/Footer";
import PakhsaModal from "@/components/PakhsaModal";
import ItineraryRoadmap from "@/components/ItineraryRoadmap";
import SEO from "@/components/SEO";
import { SEO as SEO_DEFAULTS, absoluteUrl } from "@/lib/seo";
import { trekkingDirectory, type TrekkingOrg } from "@/data/trekking-directory";
import travelDirectory from "@/data/travel-directory.json";

type AgencyRecord = {
  rank: number;
  name: string;
  location: string;
  phone: string;
  email: string;
  owner: string;
  rating?: number;
  reviews?: number;
  website?: string;
  tripadvisor?: string;
  facebook?: string;
  service?: string;
  dataSource?: string;
  appNo?: string;
};

const sectionIds = ["itinerary", "rentals", "trekking", "agencies"];
const sectionLabels = ["Itinerary", "Rentals", "Trekking", "Agencies"];
const sectionIcons = ["🗺️", "🚗", "🥾", "🏢"];

/* ───── AGENCIES DATA ───── */
const agencies: AgencyRecord[] = [
  { rank: 1, name: "Aashish Tour & Travel", rating: 4.6, reviews: 186, owner: "Hamid Abbas Ganie", location: "Alamgari Bazar, near Health centre, Srinagar", phone: "7006016423", email: "travels07@yahoo.com", tripadvisor: "https://tripadvisor.com/Attraction_Review-g297623-d15756833-Reviews-Aashish_Tour_And_Travels-Srinagar_Srinagar_District.html", facebook: "https://facebook.com/AashishTourTravelsKashmir" },
  { rank: 3, name: "Ahlan India Tour & Travels", rating: 4.8, reviews: 159, owner: "Mr.Mohammed Mouzum Bazaz", location: "Upper Sathu Barbarshah, Srinagar", phone: "9797012372", email: "ahlanindiatours@gmail.com" },
  { rank: 31, name: "Poise Travel & Tourism", rating: 4.7, reviews: 238, owner: "Suhail Bhat", location: "Kukar Bazar, Amira Kadal, Srinagar", phone: "9796355555", email: "hello@poisetravels.in", website: "https://poisetravels.in" },
  { rank: 32, name: "R.A. Holidays", rating: 4.6, reviews: 204, owner: "Ms.Shazia Bashir", location: "Nai Sadak, Habba Kadal, Srinagar", phone: "9797449999", email: "raholidays786@gmail.com" },
  { rank: 51, name: "Kashmir Dream Designer", rating: 4.8, reviews: 271, owner: "", location: "Srinagar", phone: "", email: "", website: "https://kashmirdreamdesigner.com/", facebook: "https://facebook.com/kashmirdreamdesigners" },
  { rank: 52, name: "Kashmir Yatra Tours and Travels", rating: 4.7, reviews: 287, owner: "Mr. Adil Qayoom Mir", location: "Rajbagh, Near Hurriyat Office, Srinagar", phone: "9469000081", email: "kashmiryatra@hotmail.com", tripadvisor: "https://tripadvisor.com/TravelAgency_Review-g297623-d4306179-Kashmir_Yatra_Tours_and_Travels-Srinagar_Srinagar_District.html" },
  { rank: 61, name: "Cranberry Tour & Travels", rating: 4.8, reviews: 109, owner: "Mr. Sadiq Khursheed", location: "Ikrajpora, Jawahar Nagar, Srinagar", phone: "9596111155", email: "sadiqbhat3@gmail.com", website: "https://cranberrytours.com/", facebook: "https://facebook.com/CranberryTours", tripadvisor: "https://tripadvisor.com/TravelAgency_Review-g297623-d13484313-Cranberry_Tours_Srinagar-Srinagar_Srinagar_District.html" },
  { rank: 63, name: "Superior Tour & Travels", rating: 5.0, reviews: 102, owner: "Mr. Bilal Ahmad Kambay", location: "Shalimar Garden Road, Tailbal, Srinagar", phone: "7889508253", email: "billukambay098@gmail.com", tripadvisor: "https://tripadvisor.com/TravelAgency_Review-g297623-d13783815-Superior_Tours_Travels-Srinagar_Srinagar_District.html" },
  { rank: 68, name: "Fine Fare Holidays", rating: 4.9, reviews: 205, owner: "", location: "Srinagar", phone: "", email: "", tripadvisor: "https://tripadvisor.com/TravelAgency_Review-g297623-d15786749-Fine_Fare_Holidays-Srinagar_Srinagar_District.html" },
  { rank: 70, name: "A-Star Tour & Travels", rating: 4.7, reviews: 148, owner: "", location: "Srinagar", phone: "", email: "", website: "https://a-startours.business.site/", tripadvisor: "https://tripadvisor.com/TravelAgency_Review-g297623-d15785887-A-Star_Travels-Srinagar_Srinagar_District.html" },
  { rank: 75, name: "Hello Kashmir Tour & Travels", rating: 5.0, reviews: 135, owner: "Ms.Ulfat Ahad", location: "Kohan Khan, Dalgate, near Metor Hotel, Srinagar", phone: "9419009409", email: "HELLOKASHMIR124@GMAIL.COM" },
  { rank: 82, name: "Khidmat-i-Safar", rating: 4.9, reviews: 655, owner: "Mr.Parvaiz Ahmad Wani", location: "Natipora Punjab National Bank Building, Srinagar", phone: "7780954196", email: "KHIDMATISAFAR@GMAIL.COM" },
  { rank: 96, name: "Golden Wheels Tour & Travels", rating: 5.0, reviews: 173, owner: "Mr.Yawar Abbas Malik & Mr.Shabeer Ahmad Rather", location: "Babademb Road near Football Stadium Srinagar", phone: "8715000953", email: "goldentravels262@gmail.com" },
  { rank: 109, name: "Tripmore Tour & Travels", rating: 4.8, reviews: 2331, owner: "Mr. Hashim Ali", location: "2nd floor, Magwheel complex, Kralkhud", phone: "7051909192", email: "hashim.ali.malik94@gmail.com" },
  { rank: 162, name: "Barefoot Holidays", rating: 4.9, reviews: 243, owner: "Faizan Jeelani Mir", location: "Naseem Bagh Habbak Crossing Srinagar", phone: "9096873515", email: "barefootholidays13@yahoo.com" },
  { rank: 170, name: "Chasing Horizons", rating: 4.8, reviews: 221, owner: "Owais Ahmad Mir", location: "Ram Bagh", phone: "7006546817", email: "owais@chasing-horizons.com" },
  { rank: 194, name: "Everystep Travels", rating: 5.0, reviews: 237, owner: "Mr. Aamir Hussain Dar", location: "Alamgaribazar Near Abiyar Masjid Srinagar", phone: "6979587", email: "ABBASD238@GMAIL.COM" },
  { rank: 206, name: "Flying Feet", rating: 5.0, reviews: 113, owner: "Lateef Ahmad Marazi", location: "Srinagar", phone: "7006979152", email: "Mlateef3262@gmail.com" },
  { rank: 214, name: "Godspeed Kashmir Tour & Travels", rating: 4.7, reviews: 115, owner: "Mr. Junaid Bashir", location: "Fair Bank's Colony, Rawalpora, Srinagar", phone: "7006650270", email: "maxjunaid7407@gmail.com" },
  { rank: 225, name: "Hayaan Holidays", rating: 4.6, reviews: 442, owner: "Sumiaya Jan", location: "Munwarabad", phone: "7006352276", email: "hayaanholidays@gmail.com" },
  { rank: 252, name: "Kashmir Fly Tour and Travels", rating: 5.0, reviews: 108, owner: "Mr Shahid Ahmad Khan", location: "Barbar Shah Sriagar Kashmir", phone: "7006578436", email: "info@kashmirfly.in" },
  { rank: 255, name: "Kashmir Story Tour & Travels", rating: 4.9, reviews: 131, owner: "Altaf Ahmad Bhat", location: "Khayam Chowk Dalgate Srinagar", phone: "9797870286", email: "makingmemories525@gmail.com" },
  { rank: 300, name: "M/S Kongdori Tours & Travels", rating: 4.9, reviews: 283, owner: "Farooz Ahmad Bhat", location: "Tangbagh Old Gagribal Road Boulevard, Srinagar", phone: "9596400463", email: "bhatfeirooz1@gmail.com" },
  { rank: 443, name: "Travel Mint Holidays", rating: 4.8, reviews: 207, owner: "Ms. Taiba", location: "Mustafabad, Zainakote, HMT Srinagar", phone: "9419068953", email: "themintholidays@gmail.com" },
  { rank: 448, name: "Travel Shuffle Kashmir", rating: 5.0, reviews: 116, owner: "Tabish Rehman Wani", location: "Hazratbal", phone: "7006954924", email: "tabishwani786786@gmail.com" },
  { rank: 453, name: "Traveligo", rating: 5.0, reviews: 110, owner: "Mr Tahir Hussain", location: "Dalgate Srinagar", phone: "7006933649", email: "info@traveligo.in" },
  { rank: 499, name: "Trips Fever Tour and Travels", rating: 5.0, reviews: 244, owner: "Danish Mushtaq Teli", location: "Rainawari Near JLNM Hospital", phone: "7006745935", email: "danishteli568@gmail.com" },
  { rank: 554, name: "Kashmir Cruise Tour and Travels", rating: 5.0, reviews: 158, owner: "Mohd Abass Kath", location: "Chinar Chowk Shalimar Srinagar", phone: "9796898029", email: "" },
  { rank: 561, name: "M/S Afzaan Tour and Travels", rating: 5.0, reviews: 108, owner: "Nadima", location: "Rajbagh Opposite Libra Guest House Srinagar", phone: "9906647719", email: "" },
  { rank: 584, name: "Peervari Tour and Travels", rating: 4.9, reviews: 101, owner: "Ms Neelofar", location: "Linkroad Hazratbal Zakura", phone: "8082282102", email: "" },
  { rank: 631, name: "Hermosa Trips", rating: 4.8, reviews: 266, owner: "Farah Altaf Mir", location: "Budu Bagh Khanyar Srinagar Kashmir", phone: "6005651530", email: "" },
  { rank: 666, name: "Breath Taking Holidays", rating: 4.8, reviews: 115, owner: "Aqib Javaid Goroo", location: "Jamsheed Colony Habak Hazratbal Srinagar", phone: "7006828853", email: "aqibjavaid58@gmail.com" },
  { rank: 689, name: "Ride to Kashmir", rating: 4.8, reviews: 152, owner: "Mehak Punjabi", location: "Allochi Bagh Srinagar", phone: "9541333404", email: "ridetokashmirtour@gmail.com" },
  { rank: 824, name: "Gods Speed Kashmir", rating: 4.7, reviews: 115, owner: "Mr. Junaid Bashir", location: "Housing Colony, Sanat Nagar, Srinagar", phone: "7006650270", email: "" },
  { rank: 985, name: "Intrip Travels", rating: 4.7, reviews: 188, owner: "Sehrab Hussain", location: "Gousia Market Khanyar Srinagar", phone: "7006433756", email: "kunwarqureshii@gmail.com" },
  { rank: 987, name: "Kasperia Holidays", rating: 5.0, reviews: 174, owner: "Ishfaq Ahmad Reshi", location: "M A Link Road Srinagar", phone: "9018406384", email: "INFO@KASPEIRIAHOLIDAYS.COM" },
  { rank: 1102, name: "Charzan Holidays", rating: 4.9, reviews: 318, owner: "Enayat Ali Khan", location: "Badubagh opposite Hotel City Grace, Khanyar, Srinagar", phone: "7889504310", email: "official.enayat@gmail.com" },
  { rank: 1126, name: "Kashmir Holidays Hub", rating: 5.0, reviews: 186, owner: "", location: "Srinagar", phone: "", email: "" },
  { rank: 1306, name: "Brown Chinar Kashmir Tour and Travels", rating: 5.0, reviews: 114, owner: "Humaiza Hamid", location: "Magwheel Complex, Kralkhud Nai Sadak, Habba Kadal Srinagar", phone: "8899901676", email: "brownchinartourandtravels@gmail.com" },
  { rank: 1336, name: "Kashmir Hidden Wonders", rating: 5.0, reviews: 108, owner: "Javaid Ahmad Sofi", location: "Khan Complex, Batamaloo Srinagar", phone: "9070009922", email: "Kashmirhiddenwonders@gmail.com" },
  { rank: 1695, name: "Honor Tour & Travels", rating: 4.8, reviews: 732, owner: "Mr. Sajid Rasool Gujree", location: "Safa Kadal", phone: "9149876757", email: "sajidrasool12@gmail.com" },
  { rank: 1696, name: "M/S Adorable Tour and Travels", rating: 4.8, reviews: 245, owner: "Tabasum Majeed", location: "M. D Complex, Karan Nagar, Srinagar", phone: "9103000435", email: "traveladorable@gmail.com" },
];

const importedAgencies: AgencyRecord[] = (travelDirectory as Array<{
  appNo?: string;
  name: string;
  phone?: string;
  email?: string;
  website?: string;
  location?: string;
  service?: string;
}>).map((entry, index) => ({
  rank: 5000 + index,
  name: entry.name,
  location: entry.location || "",
  phone: entry.phone || "",
  email: entry.email || "",
  owner: "",
  website: entry.website || "",
  service: entry.service || "Travel Agent",
  dataSource: "J&K Tourism registration list",
  appNo: entry.appNo || "",
}));

const allAgencies: AgencyRecord[] = [
  ...agencies.map((agency) => ({
    ...agency,
    service: "Featured",
    dataSource: "Curated Pakhsa directory",
  })),
  ...importedAgencies,
];

/* ───── STICKY NAV WITH ACTIVE TRACKING ───── */
const SectionNav = () => {
  const [activeSection, setActiveSection] = useState("itinerary");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      const sections = sectionIds.map(id => document.getElementById(id));
      const scrollPos = window.scrollY + 150;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.div 
      className="sticky top-16 z-40 bg-background/95 backdrop-blur-xl border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-1 py-2 overflow-x-auto scrollbar-hide">
          {sectionIds.map((id, i) => (
            <motion.button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative px-4 py-2.5 text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-300 rounded-full flex items-center gap-2 ${
                activeSection === id
                  ? "text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeSection === id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 hidden sm:inline">{sectionIcons[i]}</span>
              <span className="relative z-10">{sectionLabels[i]}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ───── AGENCY SEARCH MODAL ───── */
const agencyFilters = ["All", "Featured", "Travel Agent", "Excursion Agent"] as const;

const TrekkingModal = ({
  isOpen,
  onClose,
  trekOrg,
}: {
  isOpen: boolean;
  onClose: () => void;
  trekOrg: TrekkingOrg | null;
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && trekOrg ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[8vh] px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-5">
              <div>
                <p className="eyebrow mb-2">— TREKKING DETAILS</p>
                <h3 className="text-2xl font-[800] uppercase tracking-tight text-foreground">{trekOrg.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {trekOrg.location}
                </p>
              </div>
              <button onClick={onClose} className="rounded-md p-2 hover:bg-muted transition-colors" aria-label="Close trekking details">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto px-5 py-5">
              <div className="flex flex-wrap gap-2">
                {trekOrg.treks.map((trek) => (
                  <span key={trek} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    {trek}
                  </span>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-border bg-background/70 p-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-foreground">
                    {trekOrg.rating ? `${trekOrg.rating}${trekOrg.reviewsCount ? "" : "+"}` : "Public review note"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {trekOrg.reviewsCount
                      ? `(${trekOrg.reviewsCount.toLocaleString()} reviews${trekOrg.reviewSource ? ` • ${trekOrg.reviewSource}` : ""})`
                      : trekOrg.reviewSource || "No public aggregate listed"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{trekOrg.reviewSummary}</p>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Contact</p>
                  <div className="mt-3 space-y-2">
                    {trekOrg.phones.map((phone) => (
                      <a key={phone} href={`tel:${phone}`} className="flex items-center gap-2 text-foreground hover:text-accent transition-colors">
                        <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span>+91 {phone}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Email</p>
                  <div className="mt-3 space-y-2">
                    {trekOrg.emails.length ? (
                      trekOrg.emails.map((email) => (
                        <a key={email} href={`mailto:${email}`} className="flex items-center gap-2 text-foreground hover:text-accent transition-colors break-all">
                          <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <span>{email}</span>
                        </a>
                      ))
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4 shrink-0" />
                        <span>Not publicly listed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <a
                  href={trekOrg.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground hover:border-accent/50 transition-colors"
                >
                  <span className="flex items-center gap-2"><Globe className="h-4 w-4 text-muted-foreground" />Website</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={trekOrg.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground hover:border-accent/50 transition-colors"
                >
                  <span className="flex items-center gap-2"><ExternalLink className="h-4 w-4 text-muted-foreground" />Source</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-3">
                {trekOrg.instagram ? (
                  <a
                    href={trekOrg.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground hover:border-accent/50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-muted-foreground" />
                      {trekOrg.instagram.replace("https://www.instagram.com/", "@").replace(/\/$/, "")}
                    </span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
                    <Instagram className="h-4 w-4" />
                    <span>Instagram not publicly listed</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

const AgencySearchModal = ({ isOpen, onClose, initialAgency = null }: { isOpen: boolean; onClose: () => void; initialAgency?: AgencyRecord | null }) => {
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState<(typeof agencyFilters)[number]>("All");
  const [selectedAgency, setSelectedAgency] = useState<AgencyRecord | null>(initialAgency);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedAgency(initialAgency);
      if (!initialAgency && inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      setSearch("");
      setServiceFilter("All");
      setSelectedAgency(null);
    }
  }, [isOpen, initialAgency]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const filteredAgencies = useMemo(() => {
    const term = search.toLowerCase();
    const base = allAgencies.filter((agency) => serviceFilter === "All" || agency.service === serviceFilter);
    if (!search.trim()) return base.slice(0, 12);
    return base.filter(
      (agency) =>
        agency.name.toLowerCase().includes(term) ||
        agency.location.toLowerCase().includes(term) ||
        agency.owner.toLowerCase().includes(term) ||
        agency.phone.includes(term) ||
        agency.email.toLowerCase().includes(term) ||
        (agency.service || "").toLowerCase().includes(term) ||
        (agency.appNo || "").toLowerCase().includes(term)
    );
  }, [search, serviceFilter]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search by name or place…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
              />
              <button onClick={onClose} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-border bg-background/70">
              {agencyFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setServiceFilter(filter)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    serviceFilter === filter
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {selectedAgency ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
                  <button onClick={() => setSelectedAgency(null)} className="text-sm text-accent mb-4 hover:underline">
                    ← Back to results
                  </button>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{selectedAgency.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        {selectedAgency.rating ? (
                          <>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                              <span className="font-medium">{selectedAgency.rating}</span>
                            </div>
                            {selectedAgency.reviews ? <span className="text-muted-foreground">({selectedAgency.reviews} reviews)</span> : null}
                          </>
                        ) : null}
                        {selectedAgency.service ? (
                          <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded">
                            {selectedAgency.service}
                          </span>
                        ) : null}
                        {selectedAgency.dataSource ? (
                          <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs font-medium rounded">
                            {selectedAgency.dataSource}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    {selectedAgency.owner ? (
                      <div className="flex items-start gap-3 text-sm">
                        <span className="text-muted-foreground">Owner:</span>
                        <span className="text-foreground">{selectedAgency.owner}</span>
                      </div>
                    ) : null}
                    {selectedAgency.appNo ? (
                      <div className="flex items-start gap-3 text-sm">
                        <span className="text-muted-foreground">Application No:</span>
                        <span className="text-foreground">{selectedAgency.appNo}</span>
                      </div>
                    ) : null}
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span className="text-foreground">{selectedAgency.location || "Location not listed"}</span>
                    </div>
                    {selectedAgency.phone ? (
                      <a href={`tel:${selectedAgency.phone}`} className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">+91 {selectedAgency.phone}</span>
                      </a>
                    ) : null}
                    {selectedAgency.email ? (
                      <a href={`mailto:${selectedAgency.email}`} className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{selectedAgency.email.toLowerCase()}</span>
                      </a>
                    ) : null}

                    {(selectedAgency.website || selectedAgency.tripadvisor || selectedAgency.facebook) ? (
                      <div className="pt-3 mt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">External Links</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedAgency.website ? (
                            <a href={selectedAgency.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent text-sm rounded-full hover:bg-accent/20 transition-colors">
                              <Globe className="w-3.5 h-3.5" />
                              Website
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : null}
                          {selectedAgency.tripadvisor ? (
                            <a href={selectedAgency.tripadvisor} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-600 text-sm rounded-full hover:bg-green-500/20 transition-colors">
                              <Star className="w-3.5 h-3.5" />
                              TripAdvisor
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : null}
                          {selectedAgency.facebook ? (
                            <a href={selectedAgency.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-600 text-sm rounded-full hover:bg-blue-500/20 transition-colors">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                              Facebook
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              ) : (
                <div className="py-2">
                  {filteredAgencies.length === 0 ? (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      No results. Try something else.
                    </div>
                  ) : (
                    filteredAgencies.map((agency, i) => (
                      <motion.button
                        key={agency.rank}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => setSelectedAgency(agency)}
                        className="w-full px-4 py-3 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <span className="text-accent font-bold text-xs">
                            {agency.rating ? agency.rating : agency.service?.[0] || "T"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{agency.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{agency.location || "Location not listed"}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground shrink-0">
                          {agency.service ? <span>{agency.service}</span> : null}
                          {agency.reviews ? (
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                              {agency.reviews} reviews
                            </span>
                          ) : null}
                        </div>
                      </motion.button>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-border bg-muted/30">
              <p className="text-xs text-muted-foreground text-center">
                {allAgencies.length} Kashmir tour & travel entries • Search by name, location, service, phone, or application no.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

/* ───── DATA WITH RATINGS & IMAGES ───── */
const itinerary = [
  { 
    day: "01–02", 
    place: "SRINAGAR", 
    subtitle: "The Heart of Kashmir",
    highlights: ["Dal Lake", "Mughal Gardens", "Shikara ride", "Old City bazaars"],
    icon: Waves,
    rating: 4.8,
    reviews: 12840,
    distance: "Start",
    color: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800&q=80"
  },
  { 
    day: "03", 
    place: "GULMARG", 
    subtitle: "Meadow of Flowers",
    highlights: ["Gondola ride", "Khilanmarg meadows", "Snow activities"],
    icon: Snowflake,
    rating: 4.9,
    reviews: 8920,
    distance: "51 km",
    color: "from-sky-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80"
  },
  { 
    day: "04", 
    place: "PAHALGAM", 
    subtitle: "Valley of Shepherds",
    highlights: ["Betaab Valley", "Aru Valley", "Lidder River"],
    icon: TreePine,
    rating: 4.7,
    reviews: 7650,
    distance: "140 km",
    color: "from-green-500 to-emerald-500",
    image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSNcc1RVoI9eNO-5FZzLIqlzzlxUSWhBctqmuFIaPzvdfBbVz-3dPzzsR0aWK8FeF3a4QrjUqUeTcC2LKMwMrGaDwc&s=19"
  },
  { 
    day: "05", 
    place: "SONAMARG", 
    subtitle: "Meadow of Gold",
    highlights: ["Thajiwas Glacier", "Zero Point", "Sindh River"],
    icon: Mountain,
    rating: 4.8,
    reviews: 5430,
    distance: "87 km",
    color: "from-amber-500 to-yellow-500",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80"
  },
  { 
    day: "06", 
    place: "DOODHPATHRI", 
    subtitle: "Valley of Milk",
    highlights: ["Pristine meadows", "No crowds", "Pure serenity"],
    icon: Sun,
    rating: 4.9,
    reviews: 2180,
    distance: "42 km",
    color: "from-purple-500 to-pink-500",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIASgCJAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQAGB//EAEMQAAIBAgQEAwUHAgUDAwQDAAECAwARBBIhMQUTQVEiYXEGMoGRoRQjQrHB0fAV4TNSYnLxJEOSFlOCBzSiwmODsv/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EADARAAICAQMEAAUEAgIDAQAAAAABAhEDEiExBBNBURQVIlJhBTJCgSORYqFxsdFD/9oADAMBAAIRAxEAPwD6gDVr0K9SDXWZhK6qZq4NQAQG1WFDvVr2oGEvU3oWapzVNAEqaHmqb0UBe5rs1V0711Idl76VINUvXA2oCwlSDpVL1INABQasGoNSDakwDZq7NQr1N9KVAFvXZqEGqc1FAXzGuzGq3rr0wLXqKqTUBqVBYYNapD0INerixGtKh2Wza1BauCjpXMKQAn3qoYDUUTIzV32WQ6i1VaEQr60W+YUL7NINtaqeYpsVNLYYwNKsDalObbep5wooLGdDuKkldrUrzqgyE0UFhyFvvUgL3pcHzqwbzooQxr3vV1JpdXq4kpNDGATUigiSp5p61NAFuK64oPMrs9FAGuKm9L56kPRQB71VmtQ89QXFFAEzmo5lUziqlhRQBeZXZx3oJYd6oW86elAM8zzqQ9Jl/Oo5tqekVj2YVGcd6R53nXCXzo0DsezCoLGlRKO9TzhS0hYzeoIBoIkHeu5l/dN6KAIwsNKodN6yeM+0WC4PHmxLlpAR90h8Zv277GvnPtJ7V4/jSpGP+kw4JbKre+wPhN/ltW2PDKbIlkUT6PxLjnC+HOY8XjIkl/8AbuC3Tp8a8xxf28wkKAcMgM7smrObKpNrDz3Pyr52qhgJJQBn/Fve1ClxShboQRa4rqh08U9zB5Wzb4h7U8UxucPiWRHTK8cfhUjf6/kKxWmLEurEE+8W6/8ANICVigXqdSe1W5pPh3vXQopcEPfkdOKkTQFvga6khKTug+dq6npJ0n3apFDDVOavPOssa69VzCuvQMJepzUO9cDQAUGuvrVM1dekAS9WBoV67NQAXNU5qDerZqQwwapDa0IGuvRQBr1N6FepzUgC5qkGh3qb0h2Eq1CDVYNrrQBcV1ReupAWFSDVakb0Ay1RlqanagRCiiCoWrW0qWUcDarDWotpUqKQFhRAbVUCuNJjCVOlqqtSakCjqraECl5IIzsKYYEUM3J0qkIWaBQNDVcnnTJU1BVSNjVWKhe1SKLkv0qDHTsAd6sDXWrqBEg1a9Uqb0DsvU1QGuvSoZep0od67NRQFr1Bqt6i9OgstepPrVDUX0oFZY1Qqe9deoJN6KDkgqaoVNA4lxLCcMgWfHTrDGXChm6n+fSvnftL7dTTycjhDSQRxuQZRa8o6eg3PyrSGOU+CZNI+kNpvpVb18THEpsS6LiZ5nQgqwLm5vcX+VemX2xxqJHh0yPy8ouq2Nh5/wBq1lgcTPuo+jBzewNA4hxCHhuFfFYt8kS9T1PYedeGk9tpMVFEMOhjkRhzB/n8J0Hy+lea41xDHYwtLiJzNHmAW50WwIvYW11Pzojh33G8qR7fiX/1AwkeGjPDkaad7aOLKgN9/OvMYv2h4rjMZBisVi5IuU2aJYRoCAN/51rJiaE8sTXGcAEKPM/tTR5MOZmJzJ4STf6CtKhHwYyyMpjlVY2djLMxFxnfbW/6ms37SkdzIhLE3Vb2y970fF8QS45eZiRqGG+mnyrJllaVibXYm5t3rWHG5KVh5MY7ArupvoKXYlvF0Gp7VAHLvmUGiTsxSJRrywQwFOTKWxQXIsmg3NR2PfWua9s4sFOhA/X51EjHNl6Dc1djL5wNAobzIrqEVF/AdPOupa0I+85hXBqpepri2Nky+apzVS9TekxhAa69DBqb0gsLeuvQs1WzUBYS9dQ71N6B2EvpUih5q7NSCwtdmqgapvSGFVqnNQr1N6BhQakNQwasDQAQGrA0OrKakAgqwNUvVgaQy9SDVAakHWgAlTVAda4E3tSYIIKIDcUGrAm1SMMBVgKXlnjgQvNIsarqSxtauGKhOX76PxbeIa0UwsZqQaCsqXAzrdttd6DieJ4PCpzJsRGqgXOt9O9KmMf0qaRXiGFZmVcTESlswzjS4v8AlUrj8MzhUxETMRcAOD/NxS0sWpDhFwaoIx1vQ+emfJnXP/lvrV8521vS4CzioG1DIsTalOKcXwXDVU4zELGXByruWt2Fef4l7Z4eHBiXCKzSZrZH6C53q4wlLgTnFcnqWYKLlviTQVxmHkkeNJoy6GzDNsbX/LWvmON9ocaf+8t5JTJkyjTc/mayouITozMruNSy+I7kWv8AKumPSyasxedXsfaLjp8aqa+Z4X2v4lFA8ZmjdgukrrqLXsTt5fKm8T7cYxkZYo4Fy28Sg9D5/Go+HyXRXdifQDUV8/wft3i4wgxsMcozAM6DLpcXsO+9ex4fxXBcSjD4PELJf8OzD1FEscocoanGXA/XUMvakOLcZwnCoVfFuwLe4ii5aoSb4Kbo0r12YV5iX2xwiC8cEr3YhSbAEDrRcL7WcOmypIXhkZstn23F9fjVduS8E64noS1RmpeHExYhc0MiSKNLqwNXVw5IUgkbgdP5apKtBM1deh3rG477S4Lgi2nZ5pW2hhsWGnXt0+dNJvZCbSNpnCqWdgoG5JsK8tx7254fw1ZYsJ/1eKTQBf8ADB03b9q+fcb9ouJcYmc4mYpC+2HjYhANrEdTp1rFJ0FdUOn8yM3k9GjxnjWM41jDisbJ4tkjX3UHYCs1jdt73/OuLBdSdajOQ1yFvuF711bJUjN7l5ZCXJBtpa1WwsojJLlgp/y96AzeG1TBrMg0KkgEVLJYd4Ghs0El77KD4tR+1aXDIrYZkxALg+JhpoNqUCxqqmZgAnuj/N2FCxGMZY2ihJWN7Z/Ig9KzlclQJWjSxcsETM8gyuQBkYXNulu1ZGJxzyXXRb7XN9KBeSWQ3Jkc1d8Nyos8mrE29BRGKXI6SBWY7/tXFgLA/Oqsyj3dQD1oTHKb9Sa0bANGnMkZSbBRf170SWYLCscViT+KlSxtZSR/NajMbDbXtUV5AsCAhVuoqGcnau5YKgq/iJ0DV2QKAwa4vb0p6holW01Nq6htlJuQTXUBZ961trpXFhbcV8qb2u4lmseIPpswUa/T0qU9p+JMxccTfpfUafSo7X5K1H1YGuzDvXyr/wBQcUkIvxCY21FntVm4/wAVb3sdNtb3qfYfsWuj6qD/AHrr18li4pjonLxYydWO/jOulqY/rvEyNcdMRly+90/hpfDP2Gs+pX0qQfn2r5h/6m4uVC/bXGt9FH7VeL2k4slv+sc+HL4gDR8NIO4fTb6VN6+df+reLG/3sIuekQ09P70wfbHiPLCiPDhxuxU6/WpfTzHrR729SDXhG9ssbyrCCAPr4rE+mlBb2s4qScrwqD0EW1Hw8w7iPoQNWBFq+ff+reKaC+HFhqeWbn61WP2r4qGuZY230ZBYfKn8NMfdifRb1INeAi9sOJBfvEw7N5IfLz9fnR19ssaAA2Hw2b4/vU/DzDuxPc3qwNeF/wDWOOOW0OHXw9VOp771C+1nEEC804cge8Slr/X1pfDzDuxPehquDXhF9tpeZ/h4XLrpnN/zqz+2WNCG0OFUjrqfpepeCY+7E92DUhq8TD7bqLfaMPGSeqOf1rpfboZiYcNHlH+ZySflS7E/Q+7E9xehT4vD4ZkXETxxF/dDta9fP8b7bYuZMsBhhBHvKpLD0JNefkxZmYtLK0hOpJN6uPTN/udEvNXB9Fxftjw+CcpCJJwvvOosvTQd6zMb7cM1xg8PkB2Mm+3UeteHadD+LwiuWeM65iRWy6fEjJ5Zs9Fi/aTiGKY2xEiLnMgym3QWHoLfWkv6pjDa+Km0IJOfqNqzubZdD9aqJYxcsxsBWqhBLYm5Dz4qWVhz5ndSMty19N6LmiRlcubjb6ftWUJ0/wAxtfe1SZ0NgW6aedKoi3NMY7ENIZEldNLXVje38A+VVMjpzHdjfLlBOt6z1mRSCTcWq6YlUzEre40oaj4Ddjodo5Moc3ZrkiiY3EK5AsMyAWZV3rN+1W13v07VX7Swu1qTSEa6YgGJnNgwHhJJFtelTP7RcQkwwgGJlCjqJDc2rJecO4ZwSt72/npXDGIHusa5TuD/ADvU6Y+rKthDLPi5ELySSMdma5I69fOjrCyYVnU3kC3vfQA/rSzcSAzLHGsakW0Nzt39aBNjHckAlVI93y0otvbhCpsLNMpkuANOvU0JM0rgZwPOhqodvG2VbHp1q0SnmBVXQML69L1WpVQUaT4XDKjXJXLdQy65tL3pbEI8Mhzaxk+FgPeBqxxaQ5TmVgykunUm5v8AtSmJx3giRCSIxa/x/wCKyhJ2MKDmZbNt1+VGgxEsMv2jD6MAC/Y+VZomW17DQd6tDiijh1JW1vMaVo2vIJHsIfajFDDPkxbh9gsguRvWHxDFyYmd5ZZWldmuS530/tWTiOIAuwCZiT7wFh/NaEMZc+Jbed6iPbi7Dc2UmCQsHJdCLAdRVGljveHMCe59KzFxcJIMhYL5a60WPFwFrq+n+UjrWilC7CjRbEAD3VBv1FzR4uImFkeJnVra20+flWWiTTW5URkudSdAtXZosFMokfMWS+1wuu1TKUEBocR4xjGgMkU01gdbuRY6DQdTXnZpWdzIXPjJZmO5brWjjcSskUDI+hBdtNgO3nWbFG0oCheYL3BOgBB2qYNVdDBM1uuvWpjhllXMiEr/AJulMHAxiMlnLOQSPP0oS4gJkhXMELWY31I/n51Wu+B2BkRojZrXIv3oZfcnVhUyq5zOLWubG9qohIJCgP5WppjOJzHQ1yPyyCN9qLNhjDhuaWJYtYKBsLUtcDUm/lSUk+ALtdm3BtUxZOcvMU5OuWqKp36VU+EXtfWgBuXFrYCCIRBt7bk0uzyMxPvHbWqr4joLjepzGMsWIubbbAUuAOJWE3U5mcWvbQXFVhEhVrOUXe9tdKZw4hZlVrMxYDXtbpUYqWLkyCLo9sg8+tQ5O6ATLBASDdu9VJZj4dQNNqgMXYWXXemUwuIeNDGh8WpHanKSQC5fJfX3TY1UMyA6efoaeXBHDPzMSyG5AyDXeqviYELFIyzAmxfYedqnX6ABnZbgqb372rquMbIBqqMSb3YXrqdsLM0XAAva4veoXLmGU2Lfy9DaQ51z+psKh5RG2aPr0rnLoaDMW0exFqIuIlAsJiba0jzWWwuLg323qOcLKeu9qdvwKjSixsyMbSZjtY9qOvE3QCyq19qxBiM8YUmxt0q/O8RUjtYdqaySXkKN9OIxFAQjX70RMZEVBzb+VeeEgZgM1jbQja9Q0rKDm1UjS3ftVfESFpPRLj47X8Vq449b2Vb3rBE+bxZyPK+tcuJQObnQG1wKPiZBpNw49rkWA+FV+2OxIV+nSsgTFXKhrgC/nXfajmCZbg9ulT8Q/YtJrHFODfOSSe9W+3SC3jI1tWQMV4QrFd7EDtUNiXVnNl8tPlS74UbQx0psc5A/02qDjZSCucjz/asiOSQGPKVygeK1UkxEme4HgANxv1/vT77CjWfEyDNaTU71V3sPfIGtza16zBiXEZCnToSb386ocVI1grXzWAuOtT3WFGm0mQEr2rs8mtrLbQGs/wC05STe5va/lU88+K4JI0udaXeYUagmZXsHuTvrVxOxWwcnrl+dZDzlVLqbjQir/aDlJkuuUDUHWjvMKNVpmyXzbdzcVyTva1/+Ky1lZow6D3h/PpVo2BXOBa+pBpd5hRpriXI94a6b1K4oj3zsL1mrIND4wb6k1JJzWv4stxrR3Wwo1PtW/iB0vaoGLGW5uBboKylkDsSNe48q4Sk3JcgjQ2FPusKNX7Yg799RvXDGL+DPa3lWQJHjVgT4c17XorTBsoY3BG3en3mhUaZxqgZma3a43oYxrs1gLG9rjpWes22ayk7+YqHlJ0JPhFrijvMKHmxcjdSPPa9cJ5fcDm2+/WkROGuoJsotc62qskhsSW1XTTqOtS8ox/mNp4tr6g/P9atzHze+Sb/M1n80KCVJ0G1txepdvEobRhvbTU0u4A+mInzauoA+u1Q2IkKhDIbEbZ/53NK5hot79gDUs4zBQCTbUncU9bAKHspvJuOhqwxJjlBEjA9B07b0k8ljbIxVt/ntRcxBVkHhB69KNYUHEtz4Db4b1BlU31BO1CEqFCTmtVS6WsF9O1qFMKCAruL2/OoR7+FVNl70JHQAAXG520+FWEqD8QC2vbpT1hQXmvdSdfK9Q0wGltCdD/OtBZo2VbliAL761RXh0tmBA0N6NSChrmoblibEWH/FVZja+p0vpQTlv4bXUWudDtUKQLjQAHLYttelqQUMx4qaFrrIQp0969/7U3h+LRq6s8CXOhbqLVlr44lViLna+lWAN7uDe9wR/PWq1oKPQJjMC9wZFQK2gGm/ntvTEk0YVbSxLmFlsSemm168mpTmJ4rm2mu1Tz2iAZhZRrb40td+RUbj5VRediFsUv4RqQTt610ggdWXC5Q5I8R01v0rHSckAKbg9RTnCnVsbAG0XmXbMOl796rX5HQ3Hw9pmIabx6WIubetFODOEu4Ri2WwvpetaPF8MIw8ucKJmyRhT7zb28tCK0PtGEPMj5AITLmLuoALGw+ulYS6ppiPJzJK8GV2vIBtvSpwGKRQzQsDbMLi169JxLjHD+HxMYkgklYC0SNe/wARpVcZxbhuGhid8SjCQrdIEuy3F9bmmuqfhDPMCCdny8p9ddqZi4c8jZ5SNfw9a2E45wQTyJIZWCkWYgEPca2t22p6PiXDsRgVxcLwrGBdua4DIdRa1vKqfWP0B5ybAzKqrhoiw2a1zajngmIfDBljMblbtm16V6iKXDywriIWRo2XMDlW3z+B+VBxLRh1DyRg2uxFrnrbz2JrJ9VLhIVmDgeBSZg+IkyZSGUKpNNrwXCxAF2Lgm5LED6U1iMdBEpz4mPKt75W1sN/+KzoON4eaYxhjGBqrsd/+Kh5sj3Fb8DIw0McjcqANcaMiCx+N6Wl5kV2uA2oBB93Toah+MYQ3CHXmBNhY3JAP0rP4vxGMGVEfxQlla67G2tvgTrRGTb3F9TZmz4hpWBkYk5V/n1oKnUDrf5UniMXlRWTU5vlRZMUmT/UNQB0rsWWK2NaGCxUnK2h1qKSbFO5uhIFrWOtdS+IiOgbSA5Gygi+9utdKAWYByGIqvOscurAbXoRZhIcrAaHXesXN+B0HMYAy5xYm6mrTCOJ7Shrjp5UHNZcx32I8qHLiTMyXU3tYnuKNbGkNQsiLkCaHuL1dCBmJbxdupH6bUsr5ybDxNoKhZnR20WxPTtUWwGHdI4UKnMuoNxoK4OSq6DXX0oDSKwCoDuOtS7gMtj4T17UWBZmV2zhgLG1wd6IztlblgKSLgW0al1jRICWOVvyqSTKV5ZUBSALnegBm/gu4tcZde1TF4FzOwDk6LuKWkUvHmuDYWuT9ao0mcrvpqQO1AqGkcH7xmAYbXF655ri5Qhhrr0pQ6J7xvf6UVFZ7ISSTcG/nQFDEcyZXIAvvbzqRIiML+mmwNIxKxYDUFnAF6IyNr4uhYCiwoZiytrZiHNlF9jvUzRoGDAlVG/X1/OlIZGVVVfeO1HMyo7KpJ0Fr9aBNEMpzvJ+BTpbrVlBcoUBKsdh0oDylQ6rddb2/nlXJITKpJINr3oChqQAuA1wwPhtr5VeUqAzoQCFtfvSn2jRvLQ+f80rnk0J/Ax27UCoPHIDKTqACDbrRI3AZkkzA7qB0FLRSC7XOumvnXM5ADk33tboDTGMCQBQrE6tYkVYFwgAIz270qWVUOXc3F/hUQyE2O/i3oQUNs+xC2J0uKHFdbpf3vPvS/Mc6i4sTrROaGCeEhi2pt01qrHQYzMdeouDRCpsy2II1BvSLsyyk9Lkmic5rE310t9aGhUMx5slm1boOh1qxYqZXcqVvsvShBmCIL2VywB9KizFeXn0ddfWpsTQWPMoVwLBrXY61N3WINlszAWJ9daDh5rIxUnQ5XsK5ZiWRdLFjr2F6bChhc7Wa9hcajterOozFQxD23agyYgMFKXVBr9P586pJKDMoXRbfWlYUGytnzFgR/p1sOlTkPMsDqPyoRKKQuuYixAqiko7A5slvCV/WlYUMuVsqhrWNhr51zhyWyMxN9uxpd5eWEfLdidSRtUPOXaMILMygmhyY0hlpCtwbZlAvfe/QVwlZZJCSWUWIA0+FZ8sx5zee/wo0MzyRlraAXNx1N6VsdDgltZiDZiL2NLYnGZELRgZr9Rt/NaozMoMXXoaDNIpiQhR4bW0+PzpphQyMVcXRR4VAYnzowdnSSxHQDXb+WpNHXKCgOZtTrt0ooUIvLZhlfXTpRYaS2eXM8ZU+EXvpSiStmbMrEE/HSrF82JREJ1sDrTMljIUyb2Nj570rDSLxM0mYEkBbEEfzyoiswa6vZN7b3GmlKpKSGGu9j5UQTKxC5ABTGGMgSJmBsbXINKPMQBZzVnciJk03sOtUXwMQWvdbXHnvQFDMM5hFwQxbc/GoxOIkvdSwFyQVOo0/vS7tZmsb22obP4Av+brTQUOxFjlP+Q3U9v5amxxOZcLLh84CyyK8gJ1JUn9TWWsrZQAbC9dzM7S31uCL/rS0iobklQDpbUiqKWdmVCApW/xpIqc6ZyQGNWSTlOwJtY21ptDoYjlNmDe9mv8aIrqWYi5alQ6nUgk3vvUAAyFVYhRuTRsKjTWdhAUzEobZhfQ2vbT4mgzYuR5jndj11+QFLPPlXKq2F6kyc1b6CwtSvcKDLLcEkkZWvvQ8RMdFBF91FutDGILFrgbWVSf52oUr5lRtNNKNQ6IMrJlj90qb1ZsS2oJBJOpIvr8aA5JW41NQHtrrc7CpLoMtyyjciqzyG4Btb86iD72dFOuoFj2qsUQllO6ga3oCiwlKiwKD1FdQZYykjKPEO/euoHpGWXJHmvoW+NUzAEgbH51TxZQqm96kRXiZ7kaaUxUXjcZmJPShSWWa2pAOlEjQxLdrHN8aHMjpICwOuxp2NchgRG2hvpVZFY2cEWPzoV7va/9qYXVzfZV0PlSYqIRjyspHmRVsOt1zEeFTQmIGnXWrwsI1ADeZoE0EnFgGy2uD6UNCQAb3zXAAFWjdQtyoyDS1HgAiAAALLqbdb9KG6EUkkXMpGo2AqiShWN9j20qkwMIK/iDj4VSWyhDcm427mmmOhhAhOdgSA23cVMTOMRp7xWhykBBrqBYg12HOaQ2NmuQDekKiWxGYLqbqxtUiUmRiT5UqW39dqJD4nbQaKSL96Y6CuSmUlbALof1qiv98o32q+JYtGp02pdTeYdqBIM72l9RXA5H06aVVkJe4tYL1qBc26ltqAo7NfPc0Q3YKo61WCMuwNwF6k1dw2jjVTcggaU7QUcoKylWte9WRtV9NvnQUBLmx1o+EgklLeElFUm46ad6TaQqLZGkLJGpZix0G+1dHh5o1XMCMxyqOteo4Bw/C8y5Cu4G5U6fHpWrHgEkxDGOSMtB0j1+d9DvXLPq1F1Q6PEphJZoSRG11uLgE3INqYiwM2KY8pDaK4NhrftavbQ4ZklzGJRG1wbtqfhfUUPhOElwMDlsPYDEyMgMJN0JuLHpsah9ZsJnjpcIYkeZ7ZDGBoetLvhWU/4bbkiw6V7X2m5LcNlth3inYrdJLZ3HzoMDYL7VhzijCmbCgkqpIDaWuf8ANYelVHqvp1UJHkI2Iw8ZKC+Y661DXRC3ZOp8+n871s8flggxythWEnMsWAFgNANPlVuHNLieGSiGFiOYQSCAoBsQD32Fad646iqMNVAjsSc7eL8qsoESrIA3XSicURv6q8ZhyFQLon+ldfyv3pTEG7K2pBOnStb2Qg0c4uyEXLghj0sKq2IzJdgPCb6d7UrciXue16qD9zvrft0qgoYV85Lm+g3H87UVpSFa99F0W17GlI/8J+hvYab96i9nYA6NQFBc4JUE2UXNqnmXmjzG2hO9yKArFQhzDW+/XapKlsQuaxspufhSKo6VznS/a31o+GJWMWHUn4WpKQvdQfSmU0cAkaEdKAotM+Uv4vDcbn0ocrBUsb3AvVZGP3gvqSOtVlH3Za+9rigKL5rRpfy0ptHvkDA5QaRfVE6aijLoRYai4100/wCaGKiYGIxTZbNZzYjaiPP97JqTbS4/mtVSG0qyXFnbQLuNba9qE988zZ7gEkE9daC2tiWe0slrhSOo62qiEmaw7gCukAUltbEfW1VVQcx/D1HX1pkBbSSqyop0zOxHQAXv8BUx2Iu21rAir4I2aRxIykK1zbcHcfKhqtliLEWPbpSsGUluQba61VlPgAIJtqLbV0lhIwFwL/Org5AvZh8t6oZCXsNba1Ckl2y6k71CsFW511qEbxkDzoAM/gaK+VgNqrMVYs4FswGlqHK+gGW3XerhYxArFSzObLZ7X8rWpWNIqMztZbX37W9a5nCLYG57+VWmcRDJoGA0Uagevc0HKFUNKct9bdTTBI5XJBHTv2ohksqLsF1A/egGTNtYAbCrILhrdBe1qQ6OL+Ik+8DerM+WM9L7UFjYgb311rnI5a3vUsKL5iVYDyquYZRue9VLLZgOtWiIuNBcUDG8IFE8SjQ5wTbpXQW5Ibqw1oWEcrMDe3nV8GMxPSwsPW9CY0BnAL+IAm29dQ3mu5JuDfpXVQUFha2uo7VLuBY6Zr9qCtrHQUR7DboN6kkaikuouGIGtwetBP8A1C5WO9yCaCpKa39KvDcqzD60gL5Y7q1iuUaiw1q/uxtb3Sb3oJUktcDTXarRyEAKNu1MQNmBYny71e/3AYAg6/Kqsis+YDQsKtiCDpYajShsZCODHbv+9MYKUiTNc3A0PnS2i4cG3i7+VWwxuWt8qORNDEiCVnMjZdBbXrQsao5iCOwvt5URLEkWGp3HrVsVEHkD3soW4peQQvJtY3venUSOOLOpBfRs19delZ8v+HmGutOFESI2a7gXuKGxPg7BxK74m6jKARdtSCf1oESGPOHPi22p77P/ANM8qNmzNqvehT4fLErqQWd7WI7ikmr3GLyhnRSupv0GwqDhJkdLr7zWArV4TFIYZfD4Vfxk7LYd63hw+RAgzQuTr4zt9Kznn0OgTMDC4N5sGVtd3GmlzTr8LjGUrcAHxAmx22rYjwrEplbJmtq6DKPSxNeh4fhDDmzTc4kXICWtXJl6txexN0fOeI8OGDhjk5ckYcnLcGtngPDGxHC45gqkszAAi17G1aft1BEvCo3aM5o5AVIU2AOhF9h0rV9iYQfZnCSR2UPnzZpAL+Igmnlzy7Op7MLZjr7OSySqZIYctwd721+BrT/oWAw6HnSEW1yE7fLWt5sKhNziVA6qJNO34QaEcJwwfeSSnxKVvlOvxuK4u9lmL6mIR/0cISACuzER2t5aj6U1hsXgZE/6VbqSVvGBp6227aimI8PgIrqIJ5EtawN9fkaLDKkK/c8P8K2AJzsf/Im1ZtJ+QcPyDjYITIkLAtoXca6eZqZ8U8SZjlAzWYswX86McbNcAwGJ2tbKACB66flSmNgXFNfFSvKEBsZJswv2Gu9Q8UU92GgiThMUyt9owyCFRdeYwsxPXU7VWLDcPwt+U2FiA3zSKSD8LmlsZEz4d0inRbrpCUXKfI7+dKGLBLI2fBwgsNArsR8jb6WrRKNbselIxP8A6i4iOR8KsVpAouZVvlvY6agetT7ExJHw2czsyRTto6oCLj1Pr0pX2mEOPRIsDhlhbDMc4C23tsPWjcBbmcHiw7syBCcy8rMb33tfzrv46dRQ1QlxePhy+0MseGmkKNh/CVhzZZbaXHQX3Irz0qtezAqRpbsa9+cG8T5pJ2ZrWWwyn46nT5V5binCMa+MlkCH7zxZj6baX7Vvhyp/SxtGCzDNpc6UXeGUkAjLud73G1MycLxURP3atfQ5dbGjYTBPPhikilWLdtflXQ8kUrsXBmKDY2YjxW30ohtlkBAtYitRODSTZoohdicxIPr8vjT0Hsni3RQcuTsWsd/IGol1GNcsVo86bMFAWwUWFuutMRYeTnSjIWyoV0GgPn/O1ex4d7JRxESYxS7D3VzWUa9T8unwr2ns9/Q8I3/VwoHDBhIQSgue3r1NZrq4SdJmiVny3CezfEcbCnKwkzLmvmSLS3mx0rJmjEWNmjI8SuVI6jWvt3tVhsRxNy+ExC4nh7KBy4HBKdyUvr9a+Y432dxK4qYoWLDM9mHTX41WPOnJpg16PNTMwZge9j8qZwpwpwmKWaOVpWQCDK1lU31LdTptbrTsnCWlK5GAa2qlt/EdR8KYi4QUTRWuB229at5oJcipnnitzp0Nz5VcFgb/AFFaL8Imivcq3lfWqQcLxDzmIqQRrmvofL8qrXF7iaYGKERupuSQbg/GgRoOXNm1sANut635OGSt4oV0UeLqV9azZ+H4iGKbwnxOvXfRz+n1qYZYyHvW4lJIxjy3upOmlcik2VVuWNNYPDyzyMJIyCo0GW30p+HhqpIjGJ9dR1pyyxRAoMMYldQLBlsepvak4RnkVLEjMABXpsW0OGw6mRSFdst7bH9KzOEYIiSR8TGCqaC4OW99wazWX6XIGJScNmDE/gJuCRQJsPIkojFict/SvYcsyQplivGdFNrA/GgzcLEUvNmVFJ0BaUbWFvzqI9U/5BZ4wg6ITY7HWrxqVkN9hpc+le1wnB4sWzCaLlKutyl7n+eddivZqAqOXDJMpbK7Qxi4+v0q11UG6KPHkmGWOZDdl2BrQxsqYjh+DihdgueV3ulrqcugtudCK38H7Pwc1kxMb4eQAGHNlN99/ECPka1uIcCw8PB+HKypGYzNmLJbQsNrHralLqIoqMqs+dSl+YQiZU2BygUrOhDef1r6GnBIBIVAkjjte9lIbTp9aHiOGYOFgHdkA1BkVdaz+Px2RqPnpjYWVxa+tutFVTHcMNW0FzXt0w+DbSOUtrrmjAB9KzcfwUtimnDosRNlVug/WtY9VGToq7PMNGDGxvqCfoP70N/dA7VujgmH1VsaEYXHuk3pb+mYdmIOKZgOojter7sX5KMkbjzqVJViAK05sDCAywK18ujM3h9aUnwzQpdyAL23vTU0wBRs19CNDppTOAa5lJ/CAfTr+lJhTfTMe1aOCicQz2AzFbAfz1qnsBlHzrq0VhkQZWjF/wDYDXVOodiSg27VMg1AtY2FaWC4eHAeQ2TUANr8PWjy8MiYOYzIzL2F+go1pMlMyG0sD9KuDYC99da54ZSQOW+a17W6dTUSI6WV1YNa4BFjaqsKLA6M3lag38R9KYiweKeMSpBIyE+8qk0b+lY4Xc4Z8vc2pao+wSADSIAWqsupO+g+NNYvDSxJFnjyg6DbWhx4ZppVS6ouxLbDzoT8iSAA+C3lR8NGq4Z2kJFyAtjvXYnDDDHwSGVRu4Sw+tUYCVwsKMNNFvc0WhsPh7WNi3vaEbkDvTceHeaKQRLmNiAo3O37UJMNNJgsPkiJEjaOqknXoa1MIuOSJo4nxQygBRHE297dtdzWbmhIyuF8Ln4grOigRRWzuWygX2GvWuJBlkjBUKPCCB12rZ4ZgvsaTPNBjXmc2VUgOQjuTv328qTfhOIXEKeRPGA17CMg76gH5UnkV7iasdwyYY4HlqyKTHfxhiQbaA6W386egwXDzhFEkmJk7iHC5v8A8gaMWMAUQLBDb35eXlOb46fWj4bFYqaE5cTEb/8AdY2VBfsL3rllN8oYPB8OwLThXMqBjlKs+WT/AMTby+Vejw+D4Thoy7QzLlt4nxCC3poTXn1xuB+1xqwEaDUzuLufPY216UvxifEDFMqzh4LZo3VycwPXXz+orKWqTouj3EPEOGQwZ4oYZS1x4pXf1vt9KXm9pJMx8fJHQqqA28rX/OvCLiWZcv4AbAx6G/6/Gm0eR2dGdCgGl9CNO1qiWNpEtne2/G5+MYJMMJ5ZlhlEjFmzW0IuPnS/srxjE4PhyYfJnTOzAddfhQ+RLNl5MBEZNlCxlie+vWnIMFKiq32ediDreO1/lWrcFi0Mk1jxd544yInJYhvE5Fh2Ov0oy8XEjMkaRBksCoSx+NZM+Exs6hYsNMiKf8p8XbpTmB4bj1iytG5PXSxA+FczUIq0xUNji+UgWHi0JWO9h8KocfjZossWLVpMhPhBXXpaqz8KxRjyJhH11usfWiQ8JxSvm5LC9vCxHh+VZuUFGxMQxEk+KccyMxlhlPMLXPn0Hx/tV8Jw2bDzK6Yh7G4/a/TpW3BgsUFZZIgQNAOtv1oy4aUWtAwrOXUNKkhaxExSl2N4cv4RZvr+4pZuH4uQgpiAupJFtB9K2zE9iGja/UV0cZB90KTteso5ZLgVsyP6U7JmxEiyEdEAqI8GolBEhKEeINY6fK/1rZYkA2Iv1ve1UOJdbANEBY33LD0rSOZ+RqVCi4ezfcowHS4vaum4dz1PNRTfrpcHvTiS3BJIYdCBVWeMkajep+rJO7FvJicXBsPfQM5O5Ot/M9Kbg4aFIOHgJ8gNj8KaSWQa/aIwttOZ/arSNiibNiIwbXyi4NdWjbds1jjiLvBiUUmTDyAA7hbClZJioFw177Dc1oMFkYx4jFYiwtdVW9MjD8Lw6cwLM/cs9j+lqxeBN2mJ41ZiF5LjproKrbOt5Be2hAJrdXG8KKlYsLFKcxGZ5Tbfv1qfupYyh4UiI2meOYhh2Iv8KXZfiQaH4Z56TCwuhKJl0y6aWH861SISYe0UE8qBbkXlNh52FgK9AvCkykySINNmF7fK1qE+EwkSgSs0hFrBgLG3rW0MOSt5FLHIx2xczeGXELI22VgO2+opE4czuGvA+v4lDWPyr0ssuHHhjilUdcqj6WFIMzy+5DJYaDOLkftSm3j/AJEy28mQuEl5hDxIbX0KBfqRRII5YX0QEbZLJax6aqK0kgmC5VgX1Ka/lR1XGAavl8r2pfGNIlTZnKsyOMkGHYa2DKNR5nLVxGJjm/pmEJdx4Y4CdPgR+tacSS3vJiFIttm/tRIMbi8M2bCYwBgNrEj0qY9Z7HqbOw3s/PKfuuDRqvS4kX/96pJwjkgifBRRSKTdRiF213Gp+daA9osdyynEIYMTGwswRmQn47fSksTNwbFxACLG4e2gZQGy77E2Nvia6O9jcfol/suLjXJnzez3CpCCV5LEFmIe637DKt/pUz8P4HhyoXik8d8y5FhY73/FcW0703HgMJKVEXF4Te9lxEbxE/HUVYezuPOaTDR4aYHTNBJzLj5g/SojPM1SVipszGbAROMuLhG1mkS7aW1veoDYeOQtLJCb6KRGAfiaJjsC8Ay47h2UbhjG2X67fzWhoYn5aRrAzC4UKtyDWDU+GiNNOmgoxMIBs0gZdLZaMvKmS+W/+phteqcqYW8Nri9ilv0ri5Bs0ep2UAm/x2FYxySUuRJ7gcTg8MYs8gzqds2Yj5XrO47FDJgMCIIpGCB+WsYsPeHvA/GtZ0UX8OVj5A3q+PFoMLlFiEObXuxrox5/3NsdnmhNiXwrRQ4QMIxYqgJtb5/lVuH4fGxE4gibM9/ABYa0TF4HGT5kXkqjCxa5uKph+EyYeNBHJy5Ev7osCT+mlV3IaOeSdWw1Iss5tNh7noXb3f2pGfhcTMWaMZjuRiXF/rRHhxyM8pRmB0yhtB8O9L/ZcTO93LqdgNQSaUZVupAUl4UGNoVitl8Jadt/lQRwWRnvLKijrYlwfytTT4bFmJVEjXUX0AOb5UGEMbJKxEpOp8VvnatVlnWzDXJIrJwZUWyzRhewjIP1rA4xhcOuEvHIDubaBgf1rdxsOPjP3UfMjPvDNrWRJg5ypX7PKqDdCt7el66Onm/3ORcZWuTG4dZZi2RZGXVQXy61piVpEb7hVI6BRr3rvsLZ7rA4666CoVI2YjKMv4lOpFdncjJ2i074O/q6JpJhow3nGBXVr4VpRAogLInQLtXVFxFpRvz+ymDkAEGIdD2C3/QVEfsrBCmVcTM19DoBf4WraVnI1bMfWpF+xHwrxviZ1VkKRmD2ew1xd5mt/wDyAW+lWT2fwCFbYZmK7M0zMfnetIAfH0qfD+LNb5VLzz9j1GVjODQTIUjw7oQNGSSwHlvWCvD+LJipFGGkCAeFiQ169kWQbvp5i9WWWM28an5inDqZQ/IKTTPn+J4W2LkH2zCzq4OUMIiL+f8ADTcPA8DhwIYmxLSGxbMAfoBpXtwwN/E3l1qMt/8AKV63FaPrZNUgc7PKT8KeXL9mOHwq9Tux9bXNbODR8MgjM4JtqyRBb+taXLQ6kBu+4rhh4ztGPhWMuolNUydVg451CgyO7kf6v2q/9TULpnUDS7HSuOFQm4UX/wBoqWw4OgZlNreEAVm2BMfEZDqHuO4JNGOKmKhnkyxk6Em1KDAOTczzN22FvjVocK+0iAaXBa+u/e99qajcW74Jc0nQwcSjOUa8jDWype9Q0EGI1mwMbaW8ai9GiiKKAMuUdtKsNNbi3e16yWR+GVZkTezvD8SADhuWFvYRyFRr5WoGI9lcFMIlyyIsYsuRl0H67mt1mA0DEmoBYC2YfCr+Iy+xWzIg9n8LhbciBpDcHNI+oPew0rRwuFMPuIkV9fAii/yo/iYXzL8RQ7Tg3Z1C9kUA/M/tTU55XTYBxm6Pbv51YE7tKx9KCQoF5JcSvnmW30pWZJTZsPNi9urrr861l09czX+wpD+gsosb673NSGv3PrWQPtyqVzuQdBoun1osUPEy/ilVE3Pi39AKzeOvJVGiWsL5TpVRMq6E2HauUMAFaVWIHTepANtTr5ism6FZUSX2f5VJka3iufSpKLa5vr2rljtoO/bWk3ImihlY9viLVDSsxylo8p3Gt6KUAOtRyQx1I18qTbQrKhiqkq7f+V/zrjIslhIBJ6rb5VYxW0uPS1qoyBRdUYnuKWuQnIWkjiL6JKqjdgFP0Iv8qJHBh+WeWvMtrcWv8bCiaX1Lj6VbDRxR4hJWiD2N7MbX9K2hkbdMpMEkjKdIXHc7VYctly5JEbpY+G/yr0cOP4XcCSEQHvJGCL+taeHTBzrmi5EidcgU/lXpQ6XWvpmjRR/J4fEKQLoL9BdzZfrSE+Bnmb710VOiZjcG2+1e6xWExfNvhsHw5o+zlg1/lak5IcYl83BID/sc/oTWU+nnje7/AOmJwZ4tuEzIAI8txqCGsSfX+9Ew0PEIZSyRtouW4W7Eb2869PJPhoyBPwkxkDXxsNenSq/aOGtHlPD3Kncc02/Ksdk/3L/v/wCCow34i0ULloJTIpsLxEMex2HTuKovEHeJWVV+8FwhUfU1vNi8DlC/01zYWAM5NvpS7/01jc8NdDfpPb9KHKPiX/sP7MqPiMzSBBhSEA1IWw32Ao8WKmbPmTljTKC2vytTnJ4ezN/0+KUH/wDlBt9BVvsnDfeEs8X+6HMPoxrN2+GgQg+LW7RkHMbAHp87/pS4ne9jA5PUnYVriLAm+TiEIA3Dwuv6VAgw8g8HEOGlvNmX9KahN8ILkZ0MgZAXw7qxO2hG+9WZswH3RA8zTsvDNCDj8CumawnO3fa9qGOHyyuYcLi8BNKq5soxIOnelLBle+kTjJ+BIR6nwha4R3Ny1jtcmmp+D8UWK0vJj8xMv71ROE42Z7PygB2kSxHoDUfD5K4J0SA5B7zFbHS7GqFYM97or9CptR8R7OY6Mc1soJ6iRNvnSOI4QrMBi5YDkJZbyDKp76bU1hcXuGmRpRY/GQi8WNxKg7fekj61WXGzSPmmeKTKc5JhQkfEisiDHYIzCEs+UnoLktsNK0JMDxDNkiwGMU6jM8Ol9tq0xxz8o0ipLklnijzA4XCvHmOUhMo//Ei1dzOHiFefg51BY35OLkBuOviJ70svDeJhmM6yOSt2BhItYC5vb1pPE8QwsE+EwcsjZmDHMpGlzb56Vr/ljJlNNM1x/RnBUYzieHJU/wCIqSg9emtXxEMU6QJh+J4McqPIOeHgMmpNxcefWsTFEc8PBi1ihTxZXQN8zRZMdhysPOeLmyRqQ1iqkE2B0BsNjTi04v6V/WxUY6ots0/6JxHL9xAuKT/Nh50f163oUnDMeLlsBiAALnPGw0FKzyQYXCtipxKyKBkWNgQderbj1t1r2PDeN8Gw7iFOISK7xiQ82XMF8r9CK1xdLiyK+P7BQi/B4kuSt1jPyroy7uAiSLm2YRs1zbTQd9K9hxjH8K41h3hXEyRvcZZRFYkA/hfpevGcf4NiMLOJYsacZDKS0U8hQmMmxIYAjW1u17+tNdDj512R2lfIOSPG5nPLCqu6vGyknte1vnQWglYi4YnpRZcbxDhuDjmlllmidTFdHGttwVA9f3rIg4vMhCOCsA2Um7KvTffSpn07r/GN4nwjTEExBDlfME/pVThTbUqLbb/tQ14vAjAoyzKU3I8vTQ0pj+PCGEtHCuhtfLesFgyt8GfbY4+HRdZHU36WP9qUxXCcK7B+U5Yf5IyfyoWA9oExkvLWR1a4FsoG/wCVHx+NmhXKT4iSAcwYi3oa1jiywkHbmjHxeCSKQCCAlSt/EzKfkams+QYjO2RZrX/AwI/Kur0EnXJpofs+oeHZUUEHXUGrELbt6CtD+j8UOpwxPqVH61K8C4mx1iVf/mK8T4TNfDJ0MzlKdc3xqfD0X6Vqf0HiRIAEKju0n7CiD2ex5Hikw4P+4n9KpdFnfgNDMcG2yn4V2Zdir/8AlWwPZrFt788A9AT+lFT2Zk/FikP/AMar5fn9D0P0YE75cPIUQBgpt4utZ3EOPYTAcXTB4qWOJMpLu6MArdBfbbX4V7BvZcsLNilAzA6J2N+9ZMv/ANNcPiEl+08Vxc7yFTmkANrEbXvbr8zXZ0v6e/8A9UUoMzsPxjA4iSNMPjI5We2VIlLG3c22+NaBDqpNxpe+nzqYP/pbweFv/vMaRYgKQlge40/lq9L/AOn8IVKtJOQRbcD9KM36a9u1/wBg4Hm1ZSoIIIIve29dm6KfSvTL7P4BABefQW1cftRRwLAW/wAOQ+ZkIrBfpeZvwLtyPJAvfxWBozMGEI5hJMRIBN/xNXqV4PgAABBm9WJ/Wi/0zBABThl0FgDetF+mZKatB22eSG9i1vSrFVtqxPrXrF4bgh7uEj1/01f7FhV2w0Nv9ooX6TPzIXafs8dlA/Eo86gg7B1+Ne0GGgv/AIEX/gKvyIx/2UH/AMRV/Kn9w+y/Z4gC4sXXX0rlitrzmPlmGle0Z8PDq7Qp6kCo+14Uf9+IfGj5X/zH2vyeM5SnUeL4XqkOEhjJMahD3y2r3K4iBtpk1/1UQSIdc62va9+van8sX3h2Tw/iXS7MP9NSyyMDYAX7mvcg7WtroLGrZWGuUj4UfLF94uz+TwqxFdXCkdSbVNgosNB5V7jS9swv61Bt1Ipv9MX3h2fyeGNiPeYfKosu2ZW/3GvdeG9tL1OVT0Bqfli+8Oz+Twy3JyjT41BVj+BWHk1q9yYYzpylPllob4OBh4oI7HulHyx/cT2fyeJs+gOcdvxCrAvqGLfIivYHh2EOhw0YPku9VPC8Ix0hAPkSKXyufhoOyzyWUEWY3HnUBVB8OXz03r1Z4NhCAOWw9JCKGeB4S97zegk/tUP9Ny+0HaZ5jLlvZSD3FxUbsLgq3cjX4EV6Y8Dw3R5Fv3INUbgUf4ZiPUVHwGdcC7cjHixmLiFo8TLp0Zr/AJ0ePi/EEtmkib/fEP0tTp4E493Ei3+paEeASq10kiPqpFVHD1kOGx1kRdOO4gAAwxEdbEir/wBWgdfvMErHzF/0pZuA4pdFaEj/AHEfpQ/6FjR0iI8pNfypuXWLlX/SD/IFOOwbaNw5CPI2/KuSTgzWDQyR+jnT60P+j48ahY/i9VHCMfqWiQnpaQVnfUcyx3/Qvr8ob+ycHtf7SY/WS35ipXheAf8Aw8dmvtd1NvlSA4TjmJzwMNP/AHRb5XqDwHFk3EEB/wBzAGtFqfOEpJ/aPPwAOPu8SD2zJ+1Ck4BigPDNE2mlyR+lAT2bxAN8uHX0kP7UVeB8QjU8mSFD0tM4/Sn2YvnC/wDYafwY/G+B8eK5eHywpmiZb+8c+lvQV5/hXAePjjgnZI1Di80jRl2mC5BZrjQkX1HW/avd/wBL42pYJjowv+qRj8Nqbgw3Gktzcdh28jGSP0rtxQ0x0aHX9Gq4MPiuExP9LxMUOFk55Q5Puz4+4vbQkVk8EkxX9KjGOzwyhmJQtsL6elfRIuaqDmlc/eMECr5n76edOXQpw0p0DX00fPZYWk2mBPbrSGNwOIyMovIpHiFtfh/zX014IZ9JoY39VBoEnB8BIDfCxi/+XSuX5bJO07I7bPj+E9mJoJOfBi2AVwwW9mU/zrXoY8TxuJmK8UmOc3ylybEV6zF+zcLC+GlZT/qa4FeI43Fj+F40iRVZFHvJ4rjpv5VOeGeG9jcZLc0cdi8ZjoRHisS9soDornK9u4rP+z4UFedlOVbKAfdFJYbi0OPIglzItiSCMv8ABThigz585ym1juD0rknKd/VYN7WxfFpgJUaGSCR4juwcr8jXScLw0uGhkeJ5VjSwIlJKKL2za9utGMUZN0IYDqSKNI5SSJ4750UWK9KlZWojxv8AxS/oz444FIKKykb/AHlr102Gw+IdXdnUrbqPrpWnmWfXKI5DurAWY+XY/T0pZimb/DXMu9ulT3ZRdozcmgGFiiw2YR4mQhgBraw9LWq8gkdWVcVe4sSV379aIyWGoT/5NQgsDXGdfMAk0u5e7J1FI4VVbKyE3uxkUk39elAxHCsHidZYIT/qRyp+lPCGE6hh5bilcSwgdQASTsVNaRyyv6RqTYk3s/h1QCIPmA0IlJt63paHghy5h9oia3ukq1PDGwMzrmJCmxbSnApFtGuToGNul61fUZorcbnNCfD8OMLh8THLDJI0osrLZSm/7i3pXnZ8LjyzCaGVmUmzqwJ/vXrizKRdLHuakzSXJABjOqlhrTj1Ulu1YPNJng2GJRiORm1vdtDXV7sya6xD/wAa6tPjP+Iu6z6kcZhxqZ47f7hVPt+FtcTx282rwoVi9xKw76k3oj5mNyx9Lmuh/qsPCK7yPaNxDDAX5oI8gTQ24rhI7FnNj1y14oxqxNx6liD+tdkaLVNO2Xel81i/4h3onr5OP4BN3c+SoTULx/Ct7kUr3OhAFeTu7gGR3uPPUVOe+jsz/wC4m4qJ/qn2oXeXo9U/tDhEkEbWDkXylhe1Vf2kwiycvdr2trf8q8yMlgAr26jN+lcMi6pEfUsNKy+Z5fQnn9I9EfaaE5liiZraXJAFAk9pcTmtFhBlJ0LHpWKZLrplv/uqqsWUZwlh2rN/qWf2Lvs319ocRoGSAjuL6UKb2knJbJCUtopIUk/WsYMt7ggX0GtBecqbmQDSo+YZ/Yu/I3v69jLDqOoKAWFSOO4g75rEe6o/5rzhnLWtIxFt1H96JFdzcsWPQi50p/HZ/Yd6ZrtxnGmbRl5dvdcX/K1VfiGNd1bnsgB90PoaQEGxA9bkirKiRm4RAx0vfr8axfU5pcsXcn7HZMRiZHucRMNLWEhtfvS7rKx1lmP/APZQy52uh+AqxnAW5Oo/Da1LvZPbFrl7K/ZranMr9wzC/wAqvlZ0KO8gW++dqCZ5HH3cA9SL0dObqHAUjSxW3rU92fsWuXslFcABGdgAVuzBrA+vWl58FFPEIpQCovYMbi9MraQFSqi3aoEKqQfCvwqXkm/IOcn5LYeJ4oViVwyKuVUOqqPIGoAcjI8r2C2BEjLb5elWZAV11tU5TpZpACO9PuZPYdyXsrk0/wAWa23+M/71R0W4d5pQ1subOSfrRVzgnr8KlSzE5lAFu96fcl7DXICMPmjKDEYizAXOfX+aVbkFbDnT22vmF/yojasR72mxqVQW9xaFln7HrkB5Dg2OMxWU65eYfzoo5yKAMdiEIH+YG59LVxQKNIlPxqcyoRmt/wCVPvT9hrkWWbiGQcriEi//AAUf/rRIZ+JgAHiU19b6Ag/Sl+coJAsx9Kgy9ChprqMn3B3JD4x3E0Wxx7m3VlX9qKvFseo/+6zeqLas0sCNSy+lcgG7FpB0JtpVrqsv3MpTn7NP+t8RH/cht5w/sasOPY4EX+ysO3LYH/8A1WajICeVCAet6sZjsEGu2wqo9V1H3D1yXk009osUH8ceGK/6XIt86MntCWP/ANtGw7iX+1YudW0MbWPQa0DE4iLDRZuW7C/Y3/4raPW5/ZUZzZ6Q+0Mae9hTrsFkW5+dqSl9tcAj5Pss+YasGsNNQbEX1BFeM4zxKBFEyKzRgKHBIuwJN9Ou3yoMeK+04b7lkhdHARmUGw663N/PTWuqHVZmrZ0RTrc+k4f2m4ZOoKGW5/CYyCPUdN6MvHuGMgcTgC9rkWHzr5hh5pObIHQySlsxdrKGA9dNANu1OS453cuVaMlsvhUWe40Nuw2PoK3j1UvJelH0I+0HC7kCe5AvYKbkVye0XCGjD/aCFOxZCAa+eYURLw2TVFhVcxXObHS+lwev/NJ4biUUaIMMhJdAsro1wFtfUDbtp2PlQs8rIaakfSx7UcEZ2VMYCVNj4Ta+++1HbjvDRGJBISP52r5ueLfZ4h9ilIdWBP3jWI3IIA0Ov82AcRx/GSQ2bELJJlLRxDdT1B03ol1Mktiq2s+h4j2nwsY+6wmIm/2rb86qfaK4QjAzLnPV1NvgK8bw7Hy4xVWRo4mUAsVFyfLyrVJjax03tt1rhyddnTowlJxNPEe0OKVvuMMCvfNQE4/xdyb4aJR08YpITG3UeoqvPUggsBbc1j8dmb5M+7Kx9uN8VDW5K+eXr9as3HsZyneSJ42UbZQSb9tdx260gkpCeFjv/mvUiQb2OvUVcerzeWaLI/Jp8SxWJijWeCaR0y3cBf01vXnOITtiir4pmV2F42UsRr0y9PhTsqBo25KK3UhqzXjyzA4phFp7yAtk8/4KWTJr2ZTak6M3iWAndOdHGptbmZSLN2v/AHoPDZ8iNHLEw8XvvqNexHpaqe0MHEXkik4G/wBrAzCXlyBSdrdRVsXLxJnwow/D5D4Bz3CZhm6i3/N6faenmyHEdmjhdlDJdjuR0q2JDxgy5GIVASQL/rQB96oISWI5Ccsq5fhY0bDoZsOrSrmUgZ472+FZwxr+aKjWhqvKFHxcl7oCw3JjUG3601HNG4yyLM56lY2Uj42pWPCrhJLi8nkz/Xzplca6bR5bdRr9ac+3HaEbJ+nwir4KZnvE7gH/ANwC/wBKEOG4hiRJPh0N/wATN+Vv1rm4iyyGx8Laak3vTDYksQQAWfQZKlbbuI6rehV8C8KNnlZ3t4SiAA+mv0rFxWLLxKATzBLlJK7DvevSLh8cj5lYKuxD7H4UJMDFJNMWMcUgttqmv1FaRnj5JdSd8HncVE2EcSG5STUllI1v69b9KmGTiTzcsAK6i7Bja6n9a3Z+EK9rmBh2Ovy0pF/Z9RO0quWkcWYmXQjsR22q1nxtUw1+BPF8QkVCq5gwOxPzof8AWpYEjRhqdfFvTU/A8fMVWOZIo1JtlXT5Xq8XAhGS7zuWPUpbfeqTwKO49UUuAB4jLL4hilT/AEk2rqYbhouLcogD/wBta6hZMPoXcXo9UuXLqRr3NDEvjIVyttPetUqzPfKWsemSuZ8lvG2ululeZRzFCjMfFcejGrhHA8Ox7i9/nVSDYtmXfzqviLX0W+2lKgLsrqoynXrZKkLMALu48st6oCynwAk9bm1WaV1GoRP9xvRQ6DB2AIYkr/qUVQgG5UZ6oksjixdT/tT96uYcwsxdvWimuREiPso+BqM0amzZQfW9ScOjDxX9C1SkEEY90X6m9AwYKG2VB8BvXFVLXOGX1vajgot8oTzrg6gaLck0cADE2S4tGPU3qVdpdFck/Cr5gTqijzYVV8UiGzMunYG1O2G5IgJOpIvparvh8jlJVIZdLN0+FdzAy/h/t86q8vKjW2TKb2C9P2o8FUSsQBssQbz1q2Q2zMoB8+lLtjwujg69jv51ZcUxIKaW90g9qSEMBSwOZENtjmogJvsL7+GkzPJsFAO5PnVY8RiCfvE07BhSJbHOa2Ygj61YM1iNielUWR8t137X/KoLzbKrUUiqJaNmuoJPzFQImtYXHxq2aa4DoN+rWqGMoBvlHa3SlQmjikuWwa3kFvUFHtcyMfgKhgzAZpt/LerCNTvIxbpfShtoCqkg2a9gfL96vkR/FzDl6jNpXGFG0NvW5vVxDHl0b/8ALWqW4/BIMQU2Zs5G5IPxqpjEnvDUCrgAAZS1+5NVCMG97xEasdabjZWmwP2VQBYtc6jXaiAEWsMx2JO9G1UZywax6A1L53Xwm1/O1VoCqKARgkEHTsf71F11uxNupNWMQ2J6X2FCyqGQuGt9PyqlAai2FjBb3GY9tdKFZC+Vi5YWA00qcgZQSrWqkqmKK+RzbMQq7/XQ1pp8FxghLjGJWCAph3OYjx21str6eelefg4rJic8M687lAWMTa3J09RfWj43Fc2SdhCsoEZylGK5Rpdhrrp+dZXM0yksoibbMTlvoT5DX1ruxY0kdUUooeMWLxOXkIqiR/CZFABIG3yHXa9VWQ8kvM0wjhSx2DEm5BOmmoGnagYd5IsW0SthEQxkK0pOVgb2tYHc3/etbH4OUFMUs2HISEPMI2JEi6eNTb8JINu2ovrWkopbF1YtHC0cZaRHZGG2U5TYgaEbi2+v6V0gTEIwCOXRyuYMwN7sbG3Xsd7VVExJjlEuJiluM7MoJCWBa51Hn8SLUuZ4pZIzFeaISFMwIDNdh18idyddNqcFvYUykkjtiWzzq2HjQSanKWN7kG3x8qphC0kmWNUIUEPrqvW2ny2o885wqSgLGFnjsHjfMNL9TYjb12tSuExEB5eHSILbwqzEAxtb6jra1XSJaYXEgS4eVEJ0NmYMFLG5tp8/kDTOEkgaN0GYtF/2jHlN9bgm/nSpPLiX7FMzFlzSsi3U3162vr+tLyYlFmdVaRQL2BuGy2IA3/nWocdqGka8U0KoVaOXOLLvZiPI9+3kNaejxU0OGBzm5t4JAbrm2N/gfrXn1aZeRNIq+LVY2UeGxuRb4/GteI4OWcYjif3kfLOYxNa9h10166VhkwpkyhZoJxRkB58ZV0sCL3Og10o0HEIsQxVJPEb2DXU0thJOG4mZEMyxYolhaSM2Pa1tSSPLpT8/Almg568uZALs0L5tO1t645YWnwc8sdMsrHICYySR0tVWnkVtCRprdKz3w7Ye8WHlkjdVF0Y6eQt6VRsfJDmEhVmXQAEi/wAammnSJpp7Gos8l9HHxFXzykguyNbr1FZH9TWRAckqG4u+4Av3puPEF1Dq+hFgbWv50265Gn7Ly4RJiG0zf5kOVvnvS6LjcF94kwmS9rSjKw9GAsfjR5HCjK0iZipO9DjxF7hMrqOh2NVa5KVEDGwyKRiMM6X3GW9vO63qYIeHyi+HkifWx8Wv88qsXSU6yZL9Ol6Sx+Bhka80YcgaSLo3zpqg3RrLCVylAxAPunxD5Upi1cxPeFsrC5IjNv1rJAx+ENsLOZozsko1HoaZg44vMEeJjfDy6eF9bk9qrTtceBUeT4hjJMDiAFScKNBmWxI9aFw7iMs+KSKAyB3YZUt2tX0M4iLEoBIIpVOo2a/zpOXg/B53VzhEjcG4eLw2PpXRHPDTTQ1JmZNPNFF4ndsQwB8X4hcC49K6HHKZ8lySGALINOxPp60xxfgM2KyHBYlFdPdSVbX9awF4ZxPh7Ttio9GBBeLxLtf8xSjihKO4WvJ6YS39+Q5eo/tUnFYce9m9BXnIuJQLHG0r5GYah1sT6/G9GwcqOFV5VylvDe5bXyrF9NSsShfBujFwEgWOverieFtmPp2rKmZIQOaVF75AdMxokU6uoKr06d6xeNLdIlo1Oan/ALrfFq6s4ySfhBA8hXVAjWSLDyEhpjKw0Nhp86IIYVN8gFtst655QhII1B62/epEocOwuwS17MF32661LTfBiWAQXyx7/wA1qfFuF+RtehJzZQSBlHfNvVuXIreJhY+Z+tGn2VRa5Jv4bdcoqLa6jxeVVlLEEcyPKNzlroxCxALMWPZN6FEVF2s92LsSdyDarZQq5b77Am9SSI2zhSLaC1Sk63Jyi9ug1p1HyPYGzixAdaqzX8Be9tbKKuk7Fj0O1GLO5Abxeh0oqI9gCW31N+jNYmiWPhGa3XerWIu40HpvUO7ZbKmUnvWdEnMgU5s4v3OtVa1wwFjbfa9QWcIRzFD9Af7WqqG+szKzE9rA/U0w3CMzNe4BAPQ7Vyx5Qddd79a5mUFWsbbaLa/rrVGKPcZ2/tTaY6YUZQLADQXsKhlQn3NT3W9UsqWRpXN+hXarB0vZQxY+W9TpYqLxN0Md+t7VYSISRazb28qE5Cklw9thrsaGJliuL+G19Lb09KChnnhT4b2AvqCdaGJToGZlUjTw206n50NZo3uGRtewH61Mc4ZsskZWIf4ZZ7g/Dp1p6b3Ci93Xw3GmtwP1roSJJRZgARdnVSbfADWrrDCLsuXfodapMyK1vEzWudr27XpDoIpUx2yAjyF6sqBTa7DS5HlS7yGQKFjZWGoJIsPI1bMyqCbodTbNe3nvr/aqUClCxnLYFwGYHqRXPK6OY1uzAaja3xoMeIb3eZrvcroaokpf/D0c66jTztbeqo0aQyrzH3gSp6Ag29dauXABIZs977UC9kJZioI0F6qstmNycve9/wCGrirJ0t8BeaO7XvY2Ogq1mGe4Nhtre5qwgzaMrCTLdcp3HlrTuEgaJgxUlNApW7Zb9K1UPZqsPsz2zXso3Gl13o/LxBa+VbW94dvOtSTEQQeEgJl2YggEfDSs/E4vmIXjkUBB7qudfjetKimaKEULzRsgDZkDX91NCLVnYzFxcllDlUYlfCNTp013/ljTDyqxzpEVLDa+4rA4tjDLO+H5LyxTDMGvoguFN/j5fiqoU5bCtXsIKy4qFpJQLvMpZWtcrc3I6k2PlroKM+CPEAU4dEMQqEFo0axUjqGvYnXbW9+lKYpHeWXCKCwyEYZwwJ0FvOwtm9LVWfh/Jw0eJjAlxKyBhy7sIymqurDS+999r12LTRpZpPh4IZ4ZcE0iyI6oWYK2Rsp2HW1yL23HrQ5cSYYJInQpi0fmDEm+zAmxUmxvqNu2xFZmIxsoU4cvNol+VnOVDo2wOn1IvRxiocsOMmdVaQFfChBQ26gbgevQVLvlhYyi3WKeSVkkmW8oJChSH8PmdATSpTDNEmJiRmHOByJmKg6kZuwuv17U7i1lxEBnwkVo5oxJIpChEW4108VtMxrIxGUXd3yxzoWXmLqG7nT6jSqgrVgmOSTIj4bEQ4bmyxFXhjzHKjaMWIGpvv6UDjc0Ul58Lh1EjEywz3PMyk7EDw9za3W1SyycPupVJyqqfC11I0ub2GvTTXp0pRgcjRTxqlsvKtc2vrqb6aW9L9KtLext7E4eTFYgpBzLlXMdwnxu3e2vpRMSsqEZihUTeOSxHz2v+RvQzhS+HkkleRZkswAsA0QvfXy6eXwq80qrGyszNIykHL4gLdR82tf6U9KXAlwWUov/AErIJGSTmLI43IsRZhvp08tKbQwlFsArbuoa+vX69POs88qDD+IyGN3u2Ybjtvv/AHpzhvJxRn+1GSzRuW1GVQFOQfMDvoKitwXA9AiYfFIYmkvKGALBQAdMwGmguQfIbVp4mfCLiFDEKwIvlYeEefffp61nupOImd5suIddFW+oAGXpqQOlVig5SBA8Uj7e7ra+th3JBrmyY1epkv2aB43NysQkUkjLHEzKJBmBsCLDMNPd6Vg/1TFT4qTESQLEHbKCiWBI6DvrqRr2pniDS4bG4dsPHE5zC7SaAECw/L6/Iiq+Jw6YfEN9nnctoh1DXBsRbrfT9KuKTV+xL2VIfkO00rwISGkjRtD1Hod/4KTw+PWRVBuVB8LkX6aD+djTEhMSgXDpYeEsPGQL3A3BvWDLN9txbSygmV2CjKtw57n8qO0pKqHsbUuJdpgGnLxxAKrg5sl+l/z/ALVoYfmYXDR5o2eIi6Em7Adz3vff0rGSVIIv+imTN/3GkWzXFiMp6EG4PoK1+FYuK5ixE5Ed7K7EWC3Pa5On6Vllx/TQtO1BP6ph1tzFkFtyCLUfC4yGVc2FlDBveF73oj8OlnkC4GaMsQWDIRqO2W9Z8nCuWzNyyJJgbDPYG22vkdflXMsK/wDBk4OJorJE2uIgVQTqYqDJh0xMTZbTxhbgSCxGnY/pWEMJj4Fc4aZ0UHW6hhfrrUrjMajhsQIrA6uxIuKrtv2Tb8j7YB0YjDTyQld1AuBVXxuOwwJniM8YP+JFqF+G9Wg4sk11y5wot40uLdr0zCkMwYRyLGw2zG4PlfcetRb4kibVkYXjEUqKI2W3W/8Ac0/DiomKOFIPVkJrKxvCwy58RFYHeSNv/wBhp86SEE8C3wsxmW1wr6N89jVaPMX/ALKprg9BicFhMbEwnijlUHTTf41iN7LRROzQYjEJm91GI8Pppt61EPFXgkAnV4ZOh6kVq4THRt/iIZIlGmU9/LaqU5xVPYL97HnvaHh/EJsPAIIVcRAgyXFye/5VThuJeJcLDiHKkG2QHU/CvYNyJAr4ebKSwUI5sbntS2M4bhpJb4mGIzX0YrY6diKtZvpqStBbX5MR+JQobSWvXVs/YEa3utbS7oGPzqax1w+0mxlMJaMqkSZb3u3iajpG1tLW6Da3wqjXvqFPS/p8Ksrk6ldTqTa3965JOTMdwmRh77htL+KuEKMNdW30qh8RAzXLWt0NUUotvvDruwW1CTsZdBGrsUY9umlQUXTwBj0JNQ8sKlVzMT6fOrpPEENowpI2B1N6qnQ6JWIeJRHe/S+1FVGFl5YUjcA/3pd3mMhWJdPM7VF3jBEkoB/0ikoiDmBiSWNhUmFVBGdj0tehB49bSB9Optb9qvE5gdZI5Sj/AObUEDyIptAWKnZgc1rWJ6VURLlYAAAjUVUSP4shzG+rW2+PWhTSSFbZkuBfW9J0DCCOCNgbqTa2liavnW3vG3e/Wlg8xjVlVnIOhjQkXoLMHk+85gJ3uTr8KaT5GOZlB8Da99KKHRlIzAEi2tze1ItPkF0BZj2W59K5WDn7yJrk3Gug9apS/JSsYZxGGORD3J0qGkLAuuS24udD8KrYIASFANtrk1BkS4EhlspvlVjcfy9PSwot9oYR3HiI0ui6fnUriMxyqTr0ygfWqZ0zqsTEA+HPJe1ut9dhXSMjNry8o0Btp662qdLFaCK6rlHgUblrA1dTlKsvitcjQnWhCSTmJHFFI72sABcn0tVZcQ+JktIzOxGS7DVR2113qknQ0MGRcniK3tckNUI2VRymUsxtZVNx5amhyQzaplyjcA2v9KgwtcHOoBa9gLkfzWr7fvk1US0rxkWWQAX3C2uOpBPnVzzI2OZCitazdPXc1Qzx2CIzyM58QHi8t+u/WrLIJ/BFLIQurD00OnT1tVKOxSVoHIzXLEosQO5N9Ou3neixCYlZNCoACEEeI0eKN8rMgQMT4sm7dNLjtT0UaKyhklUkiy3vlv0rVYkaLGuRJcCTIVCyqers9799ritGHAKFzFTlAtYH3df71cQnDlVhgyIVuTpZdTvreiSxBIcxVmci7yB7DrvetYpeDRRS4IjKQoVaZBY3yhTcH0tQUmaVmCEz5NXERPhHntTUzyoivCnhBAaMy+G3ypHiWJblsBCLg+J2Oa3axvsPgKJKkDdCuJa8IABMfvBbqSOlrDpWdLNkvG6LfcDcsumvTvtVMZK6wkK6lmUsAdQTcW0t596wMZjJIEu8ro8qhDzTmObWxHRdhtWWPG5vcz82aXFMauHJjR7yPayC5fKSLkgXsLH9qTaV5A8qhmxQfmKki5QyDS5a1h0FupPlSOAmd2lkMUkl1sVQg+I7Efr01q00gaeMYiEJywLqdW02a/a1/wCa10xxRgLayJsRhltLh4IziHZbFQ1trWIBJBvYee2l9L4aPFYjCjE/amjkVWYIqkWsDr9QO970KKy4hYJU951YT4clmKb3A7+7btceRqcViOc2IeFXV0dkzStcsoB6f5rAknyrZR2pIvZiOLjhQ8mB5hjJYh92TmV5PeOoOl9tbi9+m1BiMRLh8NIpdA+ouoQanv60riMJJZ5ImjsRYl2JzMdBl0tvpr+164niH21EwkqK00epaw1Xex9N9+tbqOyFsNpPJh8O0Gfl5CCVRACW23Gm9+nWncFhpJ0USQRuVcG7pfKq76j1+dZ2GaaPExwqiffWtlPu2JsQLfW4pnA4yHJaI59CUtcohtYE+f71MlpBOg+BkidQuRndiGP3misOuux16d+lE4lhFjwycljBiCTaEsOWlrZiSfFdt/juaXLNHkjUEKFYZlSxkF/dAsDa35+VGw+IxEeJVopUwofSRyxB0uMrA6Wt5HcelZ8boYCLDNHG5xkZEcisLKxu2Vb2XvfYVXiOJjxODX/BwznLy/F7yi+n+6/XfTar5oftCRTExyCL/Df8OlrW+AF9NKPNh48PEiRqHnNmVkGpvYqcwttmGnnetFIdGTPiXE0cUcYkVytiRqDpqD62+VaK4qeMlzmDTPqWsF11YbXvp0rsUjxO8LcnltJleQG7GQNqbHUWGnnSMOLjDSYdV5md1CFmDZRfp5+dS79C4NnCY2IlcQshbN/jSSrdlIJLZT16HvrRHnQFjCziPS3ZGI0HpoKRwbRjOXSTKgZujAWIIGvofPbemXJhWRliJZmV41Y2YnW9+1rj61jKN7WJjWNc4mIWkzAk+PMBlHmfjcUpjoUknzx8oQxlTlW4awUanS1tPh1qrBmYoUQMouEVhd2PT6/lVY8I0eIMsrLEyJneFVtksbZQOuhG3aiEajQ9gfEsIsgwzIqIrAsyrc27EC/qfh2paThqPOjwRHkxlfEzZc9tSw7/APGlarDEPhQYjnEK5Y1TVwu+Ui9xc61my4xYZlRJPvdSyK2pW3b5dacdX8R7UMS4XlFXxeFRlvdnMdsxb0sLak76Wq3D2DYiRZFCpcJZj7pvqfOlPt80yEYZme+ksWW4Fj3Pr59asiNhyGhkmExZiUC636W9OtqU02vqJr0aWJE2GmWPDkKjsc3iN1Otjfzt9BQ+fJDLGMSWikvdQWB1J1HwuPlvWe+MdZDFyxey3Dabi/X+fGm8EcVKl51ujAt4jot/58qz06Y7ieyHmx2EELwfZ8hCZVcOfHvqwNwfO1jTEcOA4m3LjxEYmy25c1kv5A6jtobUgwjw8iNeSwOVb99rjy1NFxsUSxuwzRuwuhP4x3PWsZ6W+CJV6FeK8AxOEkBEfLdb5VvkDefnSdsbHGBLIqG9yovWzw/GcRwcSpg8QxiC+5It0PwP7U23FuGzxleJYEwE+9JhSLP/APBjaqUrVcmNRMLDcYxeFdOVzTc6OgsB3zCnf6rhZmDyQozg+J8N4W+PQ/Knl4NgMdHfhuORtT92WEcgPbK36H4UrjOATQKwnYpmNhzEy1L0rlDe3BOXCYhT9nx0ZDD/AAcSuX4Bh4fyoEnB8Thwkn2XEQR9JIAJEbvYjalZeCTM3/abLtY9PnTvDcXxTgjN9nARfxLrY29DVRlB7WEZR8gI8Rio2PKP2oLvdvF8VFq0cDxx2BimjEkSGzrKLEeQPSncDxTC8UBk4zDhrof8TVD52ub/AFplOBRcViaTA4hp4FOiuczRdgD/AM1Twp7o20Re8WUSfhzqGGKkgH+RluR8b1NZ6cH4jCDH9mxhyk6hVf66flXVl8O/tDQyJcQwkgBYBSxDk+8w7HsNaYWTm/dSEsp0LBstvqKyxgY2cPOyiViEDfhUfKpxGKkwy3KoWsbKx1tbvteq0xdJGdRao0XZst0sY2sI2IN/Ujzq8DAk8tM5vYFDvSuA4k+JJeRDiGzBmUggqLbZSD8x0rVWXBzlEtIudTcIFszabmpeONj7aYCVliykqcrXykro1t6nD4sLJclQ3Yi4PY21qYQ8uIaKDBx2ubkjK9vL086Ykw8uHAM8RTOTYlBZgfM7GplgvgTweRZ8UiszEi97XVbA1UYjxDPpc2vceGijD3iJxEYjc3YXcj42/m9ByxclWsl8xDBXDFd9wNflWbwyM5YZHGxa6qrHNcXvcfGmYcQqMTZRY6C19O1LZ0jiaQRzlW1UW09dvMX9aUw2LE/haJg1rZQ9tf03qHinRLjJGkZUZc5vpfwgbD52ocmJQsbIyoBp1tQUiyoJCYvED93mbMLdxtr6n86A8xLBfsul76KR171GloaTGUxcqNII8VicOZBayTFc22pqowy4fwR2UZvxH+E1QSIzLEmYEnRbbeutFjKk+BlBI2zX03ptuga33LK4W8buSpW1ghOvreqB1jKqIjnPi0bp33qzrzgoYFib6E6rUn3TDdlB6Aa9qez5LvwVVl8bSMb2C5s97en7132gQq1iCc1hbWx8/nVOTGym5dxv4tAO+xpnIoyvmUNmBUhrD+aVSBWAjlllR2KuoXUEKCe1ciSMUzsdTsATc+f9qJbqzEAe6Li3wvRGWRbBpHt/uFz56bU6saiChZFxAIkmgKD/ALRyEfLXv1pnDYXNGxw0LMSxJzksdPL9apFJmssodwdlUg2o4UmSwjYWNywfr+VNJFximNRYHFXTwRiS2w0JG/71cGJQ+deQya3kUWPUW13uL1TDYuETuFbEKyn8ZU3+dPRcPkxKtIVly62aU/Ha21ar8cmyQlg48SrSMpLyquZwkNj/APG250+FNYbBq2HDTqHYjQtv5W6bd6umE5paJwqKoBIiJtYjqdrVoCKIKCTOHT7snXQDsNjWsIlxjQlhBlQJKtiW3JBPpcedMyy7lAy5iAABa/8APWoxeHxRJGFSBibqTOSB9Br6aVEbcpXixAAe3jKubfppWmk0olMFzsIGBxLqLXVth5flvUS4WVpiUeMC3+Gx2P66UMYfHQP9qwuI5c7WFpYs91F+p239TUthmigRJWE86/4pybggjTt6VeiKVolIpjZS2GEU0aZm8LEDX56VgYmTkkRqsQRHC52exa41ym+tjYb96Z4i0yM/KlsUW2VBYC3cXry8k87S3eUEWDshYADoL+WvXtpWX7nZlJ2aGMSKbmqw+8KWCg66301Oumtq87xDIZVVNRIl1OXQW3XyHXvTeMidZ4y1jmu6jw3Ujr6bj+WqZY1xXD5SsiO3Kd0O4yt4TYjcnb5VvihGKBIyYoziIEjhWCLLJ7+wUjW479fl8avPjFRzFniUYe/jyAHQ6m+vU/DSrx3iBcogYEtcOewtYHXyrNkkgieVjDijlQEBYwLDctfsD9KtRtkjmHaN8xXEO7MAwVX3trf3dhduvWk8QqSSKo5bsSzKXYKco/CD1Ou1dD9pUviMPj7SOnjZjdguhsT2IIFHSWeXBGFpo5cOMkbqkuUggZrhbXIsOv7VrFbjXG4WOdkiQRLJEzqRHISbNaxK67kD9N96VxXD0QYeWIKAXZZAjXK3UhbADb49u4o+IGIiV47xp9nIZMpDXsAXLG2lwQwuNge9ThuIyYjCyAOIkVOZC1/dAIumm/8Aa9aJeQFoS+K4fzllN4lPNI6Lltf/AMch+far4BLpFjcNiYud7hiZfDIb9bmxFht5DahYSOOIS4V4kWOZgwndgERb7gbHQnTzYUXhuDbCoYC0dueA4JGq3KsR2NjfWlMQfBicu0bs5MQYvLAw002Nt99PjVuHRDGcQwpjilZXk929w+XVvnl/PypGNUGFTDplJaS7P+FQALX9L01gHgMiNLMyo3+JiAuot1tvY6VGy3C9ylocEmGgxUhklZrMUU81TsxsdDqPpU4CcLnUG0saMwsMumUjQ7k36drkHvfiGSd8RG2OuGcNHc3DC1iW10a3Sq4bDx46aQTBEWMNlLtlDKDqBbqflRalEE9xfGYWZXSWLOsiPyyF1yknMM3rvQPvYUdVAVVa6qnn/wA03iQzkrgxLGbkcu3iyAaX6dzfbzoTRw4PFiIkOwAE930J6kG3Q/OlboV2wmGHEMUgKK0hsSyoPElv4a0IpJWkEamylFKOjEg9Ouwve/rQJcDI4AgmgwwRiHleRg9wARov6+VDl4liI5IXEbxkZiTLoSNja1+ulZuOrdBwNl1wsymFoxIGJVre7tc2qkE8kcksyyIp90SG3hBG1KYaUoZJpZIxKdU1HxO1hoNvSmcWy5AElVwxOewCm+vXr+lGgaOUqzor3AR87eHUAi2bt6etFMcYkaV8pdhYKxXY6Enrfz0+FU4e/MbnyRO6rKqZfwkbEHzPeon5MM7ty5crMHz6eAC5Dbm+lZpPVQ6HuGYTgr4ESTSzxYhGYALCXFgb389/yq+Jwc+IkTEYJYJI0jMisRZ1S9rletvyJPWs6Fw2WUKQAcwBbNmOwY/nf+1N/b/s0kggkguQFaSaHe9hYE2sLeu3wqnB8od7CUwlidYpkJ5RZCpQrYE5vWxzA0fC8QVXw4iYHI17Wvdr3Hy/SqzNNLhpWxN3VZQWIftprpe2/pUHBHFplxDOqooXLpY36DzANZzSq5ESa8jc5VpTmEnMdiQpFw3W9u2v0prBqgkV7sbJp4gdLWv37Vnrhpw6l1DAdtlttanYkIJYhbkWvauTNOOmkznnkTVIczRNbQo1/CRpSuIwzSyXVlkJ3W+WjB7m0q7/AC/OrqqjwxtlJ/C1rfC9csZOPBHgx5uHAM3MU7Dwsw/grQ4fxPinDrIsrPh8uschzqR6UwA2W1la3/41LrMEujle6ubg/GtV1EgTa4G4uKcMxQP2vCzYOb/3MKQyepU7fCjS8MSZIzh8Tg5w48ClsjfInesTmkveQKW6DJrUqmHc2UBWOpA703KL5RpdrcYxXC5I7pNBLG52JOh9O9VwBfh83MjndWLXAbxfOiYLiGL4epWKQyRkjMkniU+VibVXiHFsPi8jS4MQzxElMh8Ltba3nVwV/tY4xj/F7m0ntFBKubFQHmdeUfCR8a6vF4nioinZY1jlXcExkEX6HxbiurqS6j2PVmN0cOw8uJeOJ8QZVj1Vwx8Q3XQfy9UEKBeWkK5iLtZtdPM7CjYiSCBXX7QxATRGQjMbXsbn60GNJnw5cKpUn3lGiC+mtcrUrCMbYaJHhkLfZ1UAAkRuo/M3FdI08SlLZ/DZlR1Ock7WtofpYdzQnkdSGFj0VES5v3a9zTmFw2EdG5ULrPK12dFuSOw00Gm+lXCrstRTYtHxKXDOj4MyxyFsplWM6AW01vpv1G3TroYHi+JnjA4xMxT8TFbr8m/vWUs+Gwycxobxuvgld81++2n0t8avFjsLdZY4csmbMC2Y/MetjTlPwkQnplRuvjEuQqqkZvaTDgnXbMw/m21ZXEsPiY4o2w0fNRlzrLE1rWGulrjvf00oKzxJIZExHLz3ZjYZbnp6k+daacU+z4XO8EUiWKl/D4+3h72/W9VCd8nTCUZ8iEoxMsMEmLzyw4hipOcNlPW9tuu/nWTJwrEcNxPNiiM+HLlSqG5B7kX26V6L+p4duIIj4c5C+Uuh94dhc73v62NaUSHE4oMMCiRLdRzUBv1vptVxNe3FoxIop3w2d+YttXXllzb5drVbh+Iw/EJI4vtZRyhaJHC2kA7Abn9q9GmFijxFsUIViRQSqDRQNhc6+dKGbgsMhbB4cBnYEyoQBft/BUduBHZgjOXl/drC2FlQnXwFi48iDb4/CiSYOQIx5arYbiTYdabx+HWWTPhuViGI8efQ2166d7UzwiaPM8sgMkhOqsARpr4ahxjJ0RLDGT2MpsEXylMPKSNTmXU3ocIiKyEW3JJQnf8ATat3EcS4WuJIjjCSHQ5ntm+F/L+aVkcQxEMeUiNXQPmV4/cC2PhzKBt/L0nhiiHgivIPMURQqBAw0BFr3Pa31roQjGzTB3vYZb2t5moTE4MRFIgShB+8bxE+uvkPWogm5suQraTlZkULcvrYDr18qjSjLQi80UqF0KhbeIAsddKXXKUBWwBNhqPmTVmnEThJWUSMQCjDRzvoRodbaUSI4g3MpmgykgNoFv1Go8709AaV4AJeQlGEroNQwGg1rRw8ocF8SNPdZV0UkeZsSb0kyiRA7tKyqCWyJe37U/BEuIzLFI7SIARe9gvoOuvQURgaQiwuFcKFMGIKsx8KFfEwG+1FTE4hZ5ImxqqBY55myKrd/ENBSsPPLHDYU3y3zCJbOO/h+NUweKmkR4maRcct2urAArsNBqOl61jHSa00bhxMsqQth5IsTCpH3sSqUcd1111uN+lOZJioOZj1ubG/S3YVm8M9ouHwq0PGMJiBjQffRiykEb3uAu5Ft9KYwXFTixK+FgvEpYoWJBA13vXRSSNEw7mWPqrZbWtckjTSqxPKziUJcXGbwkECx6Ghs80kUckwALDYaa3Nv+a4sOZzHNidbMbjzt9KL3NAss+JOHzRIgvvnQsPzGlIYl5MubKZGVciKmgBtvb40/EqTRFkdARc5x4gbdLjvWfJinilfOCqsCLfzyvT3BGBinlV2neNLhtXBAOawFxYdO1eexEZXENIxTKwOYKAo110+IHzJrY406wzSCCxZr3ZbAdwLWFu/WsKX7SzkZspQ5WfRiCRsT2NxpWMXUnZyTdN2Exc/KczFUJXIwdVsQbdba7H027UujjJIqmQJLM5PhJs1g1x5Em5t2B6UCOVXxAj5fgQG7jSx6WYW9K7FyK8YE0KgkXOa51vobeQ610RmouiNfsvj8QVdlLBHVfdTSynU28xp86TELrjfFKxlQqQX106E7+WlEjmElueQWtkU9r7X8r2NBxM7NNI2ZU5ZLEPoQbC+2t6u/QnOKC82GNmshMUigOzKL6+9fzvfrpSUPOGNX7IhZYTnYou5Guvlvsdq6PEK7GRhdhcGwG+4v8A2pmCOOXFxMLIGk1Md/ARc321N+luoqltuWpqXAaHFKIuZkYwyNkB3y5tfC34rbjyNIJGIsW2aNeWsl7Rg3ym4uDe2xtt+VGxs8ayxSCNTGGKHLcWSwva+u3ztVeIyH7ZLHOiuY5TmVdLg6i3S2o08xVqQnJJnYdca+JTDFJGaNWEbBQWsLj0Nx9aOuNzTRmULzEuBJlFzuTmsNfW3WlsTyUyZZg6hbhlsG0GgJG39qAEMiKCy80gtk6k327g7VMvqKTDTYl+ZiFnLlzLYZz4ibDSw9NK5pHWOPMqKGytcm4sPrvWW02SSVihVz+BgSRrr8acjaOfDlEIRgLoG2YW11705RSJZrYMfa8NIYRZnW8jBRmUA66nQf3pFcOMVdI2iUyTqVRtOYS1rAnS23zocI5cU8IQsxQyRudRoNb2oGEiZ1YSrd3N9FGm/wA6nhWEmktzY4XhcQmZMUXEqy3RM2ZhkPu699P/ABpaRk4YJHnxKviJgNAblNNGPyFh03q7pG6IzYUZwb2IsSfMk3J0+NVHDS1i8ri+Y5mW+XQWF7WOopxnG9xWvAoohgVpZASJLExh812sLC/mNb1VpFhtI8bEyXysCb6a/SlsQw5mV/unLEMxBFr7X7/Km8HgDi5I4vtEeGlViS0gOXcbnt207d6pxXLGnfAaRPtLtiGcF2ILPcam2o9NulEw0ruYkChwSNvezG2l7d6nEfZ2wUs5BUKBhwpPusd7eVvM7ULxcvD8q6r1DDYa/L+a1HgLRpwhIQ6xuiRg3kV7G9yfpTbhpozF9ndHkkvFymKmJrggDsOvoaxlSKyoG+9zh0LAgd7HW5BBNX4fOOdy5wZlNrxtqF02AvsLj5day0PlM1TNN3MU6QYwoSGN1STMDoACx28+2vlWdi5uWUGGPgErtYkaXIAF/QHrVMRFHIDi84RS10jLZi5voTpoP3pxbSrhSoRI8lwFANyT4iV6nfart8kuqomAth4vtsckDxhypiyi6X2uL337edBwsymJY3jZMm4fXWjnDquGMUCSNGQbs1gbjf06/wBqXjjMZdXzuBoFFtfrpWGSnsYZjawqxcs/eMhVbrZSQ3YG23WiJIqqAxBsNQTrSOFl5vhjQAIGdgosdDv9a6ZZDOszeBI7MAupkN+u3YVxvFrlRCSm9jTjlsAqhSCOo6VCuWF1AYHcHY0tCQ2RlK5l0cAabGms/gNrkkn3RcEetYThpewpRoo0WIBCKoHi/wAx1HoLGrZzlUqGBJO5Px+FWvIArNlZQxyr510s8YVpJQuUWBzEG3Ya1bV0khv0S7cy3OQsR33qkmD5guCwI6Nv86tGkEMoaWOSNGAZ2Goync6ntVkljOIeHBuzQouYSvaxubW8utKWOSWpBovcXjjkTKCzXJIUaWP0qmOmhjw5eUSKE/Fa3wNFnxcmFxESztaJWOo00IsQ3QHt3+FUxGFGMwLRS4lWjOYrYarrsddD5itY4qqTGobWZbLgMbafmSRkizIGHhPbWuqknD8Yhyvic1hobqTbzza11dTrxIv6vZ6r2el4Y0qkYMNMwzrZDvsPWvSYyObi6DDCVoQRYxhgPCPhXnJ8ZjeDYp8JOFLodCgubdDr3rY4XxMzYf7xwkQ8XKJFwPK1utWlapnRBpqjNxWHTASsv2KWVxZkspYkdyR0pebGMsUSMZVSxbIh79NK9RNLi8U7GfEo2GcHwqxW3x3rFODw8PNjwBjkW4LCUkAEWvqt/rrWEsLb2ZXbdnnsRw841z/T+InO5F1lGp8qVfgfEuGRrHiAnizfeSNfTTbuenx1ok8kuFxMiBS8abnVgb/5u/TWtvDTcZiwLJC6vhSCow8icxQDa9/zvW0XKKpgsbvc88FgggZBjOWyqc91Dab2y2+lDx2Pw78LbC5Ew8MykK0Vtdb33/nWtyeXEIxjlQ4kvopksVzbX1G/7UJ8BxOUGRDhQzXEjyOpJJ6ZBv8AA73qlRWlJ1Qpj8Zh4sFCsgzwIwcMVHOW4Fr2+FuoPyr02MwWKw0OHx8PElYmMBsPKxsBuMxUHvtbrWHgOFYHCTBEjyNICDDKLqV/MG9v1qTwmQxlfHGyNZrr4bHbbWplvwXpo1ofbGaeNTIkUQbUFY1AVu4+GtUl4iMWWkYKXtqyRlM3kbGxNh9fM0i3DsWj25fLUkRNLqwI36jQ9KT4rh1iURhAufQMJBdj0uNbfX4VFbmTjPUdnnyGf7bzQoIs4uGAGnT12rS4bjMW045DCTDID4JSQ0a9PO9tqxk4bigomfnSymP7sJENdgOu30/RmOHFxQwytHeFV5bLItwR5W9e9/yp6aEoNOzZxE8uHgWLBwgxyAlldczMTuc3f96RAxeHid5Y5FV/CyqrKb9f5860eHRw+LDriBMtyGjZgSL620FyNQelWkjw+JLO2KxK5lsblo+WNvBUNMJw1O0eXmthsVHmCJHYmSRQSVHTQfTT1pmLF4edbqZskYVTNMPG1yRYAa9LfDpRF4fAryQ4XFzTqtsySQgdbXFv4axpMCcNiJMQmIIiNuXG/wB2c2tzcCwt59xWkYp7My7UkezwfJmxEcEc6mWHUhFBvrm1ttb9aBxGbERQPLhElxIYkOGF7f5bE3I36VHBsX9vwmGDRKs6ABnhOuW3veo7a71rNNFw+KOOWdwWB5YMZBy379fWhJ2dUY7UzzmEn4rlLYjh2Kw0bgGSRsxVjfQ36Dp1rZhflSwieNUlMahnWNgyG1r9j+R086InGMQOXDHBbDKLI0WKzyWG9xpbXS4J+tH/AKqMWRGQ7RlSwzBWAFrep01/lqGlYaUtw68QW5iiZTlPjK2uunU7UZMXhsRbDqkcym9ygs3mNDe19/5fIwWGhwZabD+NMwDMVy37i52+Qo64nD4kSphgs4JzSK5y2Fzt5/mL0XtuO15K4MqxGHh4glmf7uBgjZB0UDp21rTwOFjgxOYwrNOFKZo7A+QHYaDrb0rIj4ysKcnlRM6jL94SQB6X19fStBcdxB8Mv2WaCYCMM4SMKU19b9aSyRZn3YvgvNjMVHi3jR8M8gVmfDXBK23F+psfrT6PDMrC/wB7IPErnKfMafrrWFwjibYwSQ4hFCLdoyALXHS4F1+vrTS8S4bDheRC0eIQOQBoxFvPfShOik9jReCKG9lObW+TS2nehupycuMEsjWux1W9/wBxQI8RLPEZMyMl7nw3Demva3yosjxeBwpVl8IJF737GtGWmee4xg/vY+cDlXYqw1Nhbr8awnDo9iwaKxCs1z11O2mte0EOaJopGisdjlIU/vWPPwNcQTkVHu/hU6DYC9/5aplFMUsSkeZxAwwCSZkFxZSNyD/xSTYDOwcPck+6BsOt+/WvStwnDwQksfvBdiLAhj3PQetUl4RJNho2KrmJOsYGtjsQdRrU6HH9rMJ9N6MEcLJWQkX0AUBQCdRe3pSeL4eI8rywyBTq1jYbV64cHnSVImlFt8wBI2ufiKAsEpLLEjKRmIzXs4BG3pS1TW5zS6eR5ObCRRynIWVb9bE62sKm/wBmnWWwKJe+Ug3JFvED516WWEyeHEYdXuL2K2J06bGpTC4KOLllcticqEE5eljbcULNW7M1GUDyMk02JRDi2c4gnRmN+lvyAo3JV5Y+a0oYplbJYkMoK/oteknwCOjuqg3I8EeyEjXck2tSn2RE/wAZMiKtszb71XxCfBMpb2zzuHTLKpmVnAJYBDa5A0FRxCXNBE0QKMAy2H4QWzaHevQHBRyxmXKpBPe6jp+lLS8PiIDOgYg6Wax0Pyqo9Qk7Yllo8tIs7vzphM9nBdybmtF5OdhoWjQRBWuB0sev59a2f6Zh8ljHYaZsp1GnU/y1dFw+GNZOUHcWNgGsoO1/l061b6mDH3DBi5kOU9b5l01U2o+EWWKa5aUXFidDa/X0rXjgBZjIgJtoSu9jV0wMKu0kSuMy79Bf9Kh9RETzN7COGALZXUC3hIK2y2Fv0pqSJzBZbeJhdidTre/6UzIqlgwXMcoFlW+S3XzoQilMiKBmR9Tc2vWPctiU2hXEQYbEKXkiIynxXNjSjYZUiEmH8KZLFt9ev6VsYnDjFwWDMmhF11pGDD4nDx5QAwB8IU61UMm3I9e2wsr5mgw7o3gGZ3VbksdSfoo+HnTeMxMk0kStqM6qssrEk+R2vtobfrTEuHBYgRFARckL3quKGIVEYTSOvLCFD/k/IitFlTZcJ+y4w7kytiFVC8iplOu5OoHW2lz/AKqQTDOwOTNKt8nibVWO2v70eR+aI1bl2AuectyltPkdNNqh3eMSrG6+K4SM6DQDS3QfvWqb4R0r2hQystmkMUayHUPYrlHn9PjWkhgMy4WK8kdlZHUD0NvkD8KTw2IL4fDTrugdmVhoA1rHT4/Kg4/EyRxiLDzEEaG62bWxt23vVtb0VsbEs2GhYpzwQrFUZib5jbNpbtbU0OHEwtiHwyIDyzrYaqT0t8D+lZ0TTO6zNETHKmQMqWYHp9bf3pvhU4ggkimJiK+6mTa9jdR6kW/Osp49iZxTQ4bDNE7RgOAsZPvBiSLjtY2oYwvKd+XnFmU2KXBOn0P6GpxM6ShXEqKqgl030HbTv8767UVsZDKs6aooHvgtYm/X11tpWCi1XoiMaNLheBweNw8Jj4gi4tsynDspBKj8XYG5070C8yqqkk5wzKCL5crWP1/MUphnjiilZXd+Yrsy390Lbe/e5+XarJIkCNkkLTxG0oI3OW9r+Q6VWSMZRqtypJJDkbm5Z9ci6Fje/wDP1qrZjh35ajMwtYICSe48/jSjy+FWFix/Hf8ACfO2mx3oqvaEyZhfZlzDe19utcemSpoyasUKYhIMpmUkkI0uwBPRl1sdKLwjFTYgvAmISKcXsoAsxv3PTftSUsmImEjkJy1IVg8QDXN7bm//ABUxvJHlEOFjLQowLZyFK29Nd9vKu9RTjTNUthuTFmGRMPMzWxBPMtIFFxezgWuT60EYgxsWnlLON1XSx6WH6fKs9eITO64Z1GZzbOumbtca266i1MvFyF+9mkVFUFgCLlgbHbzub1bxqtx2kP4R8bFCFwTOY7m+RBa/yrqzG4tOhCjESKABYZbbi/bzqansxDW/Z6Lh/EJcRiUTERRylipLNqdDe5JvW7NiDiHdsUiTIPcTlqQB8NfrXV1KJrDhE4eRXiBOFMYZvDkUqe2g0/4o+FxcATNFJIuQhMrKQFPkbWbaurqaRqivNjlDNAA/MIOUsoBINraj96lY8cCXjwpBK+I80MGJO1j03+FdXUOKKCQwuxAxEHKUkGwOZdO1OJyysaZVY5ms/KNha/vHU+W9dXVmUS/DhiJGaZ0kIuAQAMo36dSdd65eHlLIrxRKnuhWANib9uvnXV1MmxbFrJhIjnUzFiC1vvAAT17DzpA4OGaRRyfs07AMqGxJP59BXV1NLYoO+FZVEay4hbkAMgBKkdz2GnSkDhTIbTYvM0jXIeKxv0+OtTXUqAewuGWBpnXHMmIksGZYwmdR/m0386Hy5IFkSNYpQ7f4rvc7DXbtpXV1NkydCj4bGcuEfaMLFEGvmy/eJ63vob9qtG0UcZWSQc0kLzLBFB6ncggaeVdXVnKbszlNpF4Z8JiQ0MbQHFOrDJkFj16/t6UZ441ni+7HJQ5ZCS11vqQB0rq6tv42Dk9IuYMLIzrG68jNljkjU+HyA2qskXCsM7OjuzEGzBy7dr5dv5tU11cTyPVRgpOXJnxtCrZ8NMwkUWuz3zddvj+VHh4liEjPLnMKFLFhEpJ7fLW1dXVMpNSMt09hWQoHbK2eQ291DlOg1BofIxDFBBJMhibOrrqtr+K58/zFdXVUZUJcjUGK4lg1KvilkV1JcFtdz18+vrTpx032ZIDDAysLgwkgga6etdXU1LY0xydMfwyiI3SI8ghcgAzMNACCb201N6cjWZ0XKixSE5EF/EdM3psK6ursXCOtbIjC4fiEmLzPJEYFFwqqdTffN1osvOAbMHVr3LKdrHeurqDSG4n9imupUDlnWRmaxt5Ad6IuFiS+aSOwW5CtY79v3rq6okwvcq0EsUyvE73IuyqBbb+C1MLhMJHC+dHdza9gQCfnXV1OwYviMJBKtohNfN95rvpe2m3rWTiuB4xc3KULEZSbNqSoFhXV1Q4qXJE8cWLYnByxQmWbDzGIqMpC2A63067ik8PPHOxUZgVXTmqRf09POurqwnBJWjkzYorgpJASeYoQHTW2p10sP0pRlMQNkvroSbWO2t66urKMnRxTVIu90tliFwL5job2Gl9ugqqy8t80gI21DC3p866uq1ujNcnLLd2BkAPQWDHXt5VYL4ggAKk6DbT+flU11TNUxvkkR+G0WVjoLDZtrXoZw7h75CTckkkaeQNdXVlqdilwBdC0maMeJegNxVAZXLBoiLeLcX8vzrq6t09gx7orFBMzhUWTxnwqNCd6pjQ3geKflA3sN9+4rq6tcb3NYy5FMTjoC7oIF5keudr3XbbWxB/SlxPzg7EcuNRYqGuHNjawPxqK6u1KlsdUXyi8UuHeKNUHMRFJaQjYA6A28tLUxi8NA8EdypaVEbU2ABANvWzEeVjXV1Oao05QgJThnnzSM8jEBeW/lsR+IWA7WtRIcbIMRIylFdAc7FT4x2Pb/murqp7h4LScSGIhLtFlkXQeD3t9j/B61IEZaQ4iQmRPC8qswVdhr56E/CurqpxSWxLYRmdMNAVliYoCMynQr0Nr679a0eHthMubEtOHYFYZkbMWIGhNzboLadx0rq6sJcBIPBA+KznDuJHQKeXIMpc3OYA7Ejt52pOAyuzRyWRVBdWJBvYH9uldXVl+CWwkMLNG7hRZlGit4tx4fhpvRsdhZ18UTJNEwYZhZTqCdR07etTXUR/cKzDih+1PCxxSwSweMJcguLm4v5frXSATzZme6Rg6qbAgm+56711dXVVj8CE2GkmldkxSooNgGjubV1dXVWpoR//Z"
  },
  { 
    day: "07", 
    place: "SRINAGAR", 
    subtitle: "Final Day",
    highlights: ["Hazratbal Shrine", "Lal Chowk shopping", "Wazwan feast"],
    icon: Coffee,
    rating: 4.8,
    reviews: 12840,
    distance: "Return",
    color: "from-orange-500 to-red-500",
    image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQU1QBb9SXj-PGiBR-udjTdpoVE5TvbnasdOPO22HrT848OPN_HOZliSLdvFEP_6huif_moIJlGjzzPIJTS13oWeJE&s=19"
  },
];

const overallRentals = [
  {
    type: "CABS",
    name: "Indeed Holidays (Cabs)",
    loc: "Srinagar",
    fleet: "Innova, Etios, Tempo Traveller",
    price: "₹2,200–4,000/day",
    rating: 4.8,
    reviews: 562,
    verified: true,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80",
    highlights: ["Innova & Etios fleet", "Tempo Traveller groups", "Airport & day tours"],
  },
  {
    type: "CARS",
    name: "Srinagar Car Rentals",
    loc: "Residency Road",
    fleet: "Self-drive & Chauffeur cars",
    price: "₹2,500–5,000/day",
    rating: 4.7,
    reviews: 428,
    verified: true,
    image: "https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?w=600&q=80",
    highlights: ["Self-drive options", "Chauffeur sedans & SUVs", "City & outstation"],
  },
  {
    type: "BIKES",
    name: "Kashmir Royal Brothers (Bikes)",
    loc: "Lal Chowk",
    fleet: "Royal Enfield, Himalayan, Scooters",
    price: "₹900–2,500/day",
    rating: 4.9,
    reviews: 845,
    verified: true,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    highlights: ["Royal Enfield & Himalayan", "Scooters for city", "Helmets & permits help"],
  },
  {
    type: "MIXED",
    name: "Kash Bike & Car Rentals",
    loc: "Dalgate",
    fleet: "Bikes, Scooters, Sedans",
    price: "₹800–3,500/day",
    rating: 4.6,
    reviews: 295,
    verified: true,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80",
    highlights: ["Bikes & scooters", "Sedans for family trips", "Near Dal Gate pickup"],
  },
  {
    type: "BIKES",
    name: "Kashmir Adventure Bikers",
    loc: "Rajbagh",
    fleet: "Off-road & Touring Bikes",
    price: "₹1,200–2,800/day",
    rating: 4.8,
    reviews: 367,
    verified: true,
    image: "/unnamed.webp",
    highlights: ["Off-road ready fleet", "Touring bikes", "Mountain route advice"],
  },
  {
    type: "SELF-DRIVE",
    name: "Indeed Holidays Self-Drive",
    loc: "Srinagar",
    fleet: "Scorpio, Swift, Thar",
    price: "₹3,000–5,500/day",
    rating: 4.7,
    reviews: 189,
    verified: true,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    highlights: ["Thar & Scorpio", "Swift for mileage runs", "Paperwork assistance"],
  },
];

/* ───── PAGE ───── */
const ExploreKashmir = () => {
  const [agencyModalOpen, setAgencyModalOpen] = useState(false);
  const [selectedAgencyForModal, setSelectedAgencyForModal] = useState<AgencyRecord | null>(null);
  const [selectedTrekOrg, setSelectedTrekOrg] = useState<TrekkingOrg | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          const offset = 140;
          const y = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSelectedAgencyForModal(null);
        setAgencyModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
  <div className="overflow-x-hidden">
    <SEO
      title="Explore Kashmir"
      description="Itinerary, rentals, trekking operators, and tour & travel agencies registered with J&K Tourism."
      path="/explore"
      keywords={[
        ...SEO_DEFAULTS.defaultKeywords,
        "Kashmir itinerary",
        "kashmir itenirary",
        "Kashmire Tours",
        "Kashmir Travels",
        "Kashmir Tours and travels",
        "Kashmir Bike rentals",
        "Kashmir trekking operators",
        "Kashmir Great Lakes trek organizers",
        "Jammu and Kashmir trek companies",
        "Kashmir cab",
        "Kashmir taxi",
        "Srinagar travel agencies",
        "Kashmir bike rental",
      ]}
      structuredData={[
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Explore Kashmir",
          url: absoluteUrl("/explore"),
          description:
            "Itinerary, rentals, trekking operators, and J&K Tourism–registered agencies in one place.",
          isPartOf: {
            "@type": "WebSite",
            name: SEO_DEFAULTS.siteName,
            url: absoluteUrl("/"),
          },
          about: {
            "@type": "Place",
            name: "Kashmir, India",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: absoluteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Explore Kashmir",
              item: absoluteUrl("/explore"),
            },
          ],
        },
      ]}
    />
    <PakhsaModal />
    <AgencySearchModal isOpen={agencyModalOpen} onClose={() => setAgencyModalOpen(false)} initialAgency={selectedAgencyForModal} />
    <TrekkingModal isOpen={!!selectedTrekOrg} onClose={() => setSelectedTrekOrg(null)} trekOrg={selectedTrekOrg} />

    {/* Hero - Compact with quick actions */}
    <section className="relative min-h-[60vh] flex items-center pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pahalgam_Valley.jpg/3840px-Pahalgam_Valley.jpg')",
          opacity: 0.55,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background/85" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">— PLAN YOUR TRIP</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[800] uppercase tracking-tight text-foreground leading-[1.05] mb-4 max-w-3xl">
            EVERYTHING YOU NEED<br />IN ONE PLACE.
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-6 leading-relaxed">
            Itinerary, rentals, trekking contacts, and people who can take you there.
          </p>
          
          {/* Quick scroll hint */}
          <motion.div 
            className="flex items-center gap-2 text-muted-foreground text-sm"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-4 h-4" />
            <span>Scroll to explore or use the navigation</span>
          </motion.div>
        </motion.div>
      </div>
    </section>

    <SectionNav />

    {/* ITINERARY - ROADMAP WITH REAL IMAGES */}
    <section id="itinerary" className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-4">— 7 DAYS</p>
          <h2 className="text-3xl md:text-4xl font-[800] uppercase tracking-tight text-foreground mb-4 leading-[1.1]">
            THE ROUTE THAT COVERS IT ALL.
          </h2>
        </motion.div>

        {/* Tablet & Desktop: Parallax roadmap scene */}
        <div className="hidden md:block">
          <ItineraryRoadmap stops={itinerary} />
        </div>

        {/* Mobile: Vertical timeline with images */}
        <div className="md:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-accent" />
          
          <div className="space-y-4">
            {itinerary.map((stop, i) => {
              const Icon = stop.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-4"
                >
                  {/* Timeline marker with image */}
                  <div className="relative z-10 shrink-0">
                    <div className={`w-14 h-14 rounded-full overflow-hidden border-4 border-background shadow-lg ring-2 ring-accent/30`}>
                      <img 
                        src={stop.image} 
                        alt={stop.place}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <Icon className="w-3 h-3 text-accent-foreground" />
                    </div>
                  </div>
                  
                  {/* Content card */}
                  <div className="flex-1 pb-4">
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                      {/* Small image strip */}
                      <div className="relative h-24 overflow-hidden">
                        <img 
                          src={stop.image} 
                          alt={stop.place}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                          <div>
                            <span className={`px-2 py-0.5 bg-gradient-to-r ${stop.color} text-white text-[10px] font-bold rounded-full`}>
                              Day {stop.day}
                            </span>
                          </div>
                          <span className="text-xs text-white/80 flex items-center gap-1">
                            <Navigation className="w-3 h-3" />{stop.distance}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <h3 className="text-lg font-[800] uppercase tracking-tight text-foreground mb-0.5">{stop.place}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{stop.subtitle}</p>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="font-bold text-foreground">{stop.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">({stop.reviews.toLocaleString()})</span>
                          <span className="px-1.5 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-medium rounded">VERIFIED</span>
                        </div>
                        
                        {/* Highlights */}
                        <div className="flex flex-wrap gap-1">
                          {stop.highlights.map((h, j) => (
                            <span key={j} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div 
          className="mt-10 p-4 bg-accent/5 border border-accent/20 rounded-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-center text-foreground">
            <span className="font-bold">PAKHSA TIP:</span> All these stops have Pakhsa hosts. Share the ride, not the full cab cost.
          </p>
        </motion.div>
      </div>
    </section>

    {/* RENTALS */}
    <section id="rentals" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow mb-4">— GETTING AROUND</p>
          <h2 className="text-3xl md:text-4xl font-[800] uppercase tracking-tight text-foreground mb-4 leading-[1.1]">
            YOUR OWN CAB OR A SHARED ONE.
          </h2>
          <p className="text-muted-foreground text-base mb-10 max-w-lg">
            These are starting rates. Call to confirm before you book.
          </p>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {overallRentals.map((r, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="border border-border bg-card/50 hover:border-accent/50 transition-colors rounded-xl overflow-hidden group"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                  <span className="px-2 py-1 bg-accent text-accent-foreground text-[10px] font-bold uppercase rounded">{r.type}</span>
                  {r.verified ? (
                    <span className="px-2 py-1 bg-green-500/90 text-white text-[10px] font-medium rounded">VERIFIED</span>
                  ) : null}
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-2 py-1 bg-white/90 text-black text-xs font-bold rounded">{r.price}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold uppercase text-foreground mb-1 group-hover:text-accent transition-colors">{r.name}</h3>
                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {r.loc}
                </p>
                <div className="flex items-center gap-2 mb-3 py-2 border-y border-border">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-bold text-foreground">{r.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({r.reviews.toLocaleString()} reviews)</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{r.fleet}</p>
                <ul className="space-y-1">
                  {r.highlights.map((h, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 bg-accent rounded-full" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 rounded-2xl border border-border bg-card/60 p-5 md:p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-foreground">
            <span className="font-bold">PAKHSA TIP:</span> Sharing a ride is almost always cheaper. Check Pakhsa first.
          </p>
        </motion.div>
      </div>
    </section>

    {/* TREKKING */}
    <section id="trekking" className="section-padding bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="eyebrow mb-4">— TREKKING</p>
          <h2 className="text-3xl md:text-4xl font-[800] uppercase tracking-tight text-foreground mb-3 leading-[1.1]">
            WHO TAKES PEOPLE TO KGL AND BEYOND.
          </h2>
          <p className="text-muted-foreground text-base max-w-xl">
            Minimal shortlist. Tap any card for contact, reviews, Instagram, and source links.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {trekkingDirectory.map((org) => (
            <motion.div
              key={org.name}
              variants={fadeIn}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => setSelectedTrekOrg(org)}
              className="rounded-2xl border border-border bg-background/60 p-5 cursor-pointer transition-colors hover:border-accent/50 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold uppercase text-foreground group-hover:text-accent transition-colors">{org.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {org.location}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-medium uppercase text-accent">
                  Trek
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {org.treks.slice(0, 2).map((trek) => (
                  <span key={trek} className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
                    {trek}
                  </span>
                ))}
                {org.treks.length > 2 ? (
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
                    +{org.treks.length - 2} more
                  </span>
                ) : null}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 py-3 border-y border-border">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-foreground">
                    {org.rating ? org.rating : "Verified"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {org.reviewsCount
                      ? `${org.reviewsCount.toLocaleString()} reviews`
                      : org.reviewSource || "Details inside"}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">
                  View details
                </span>
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {org.phones[0]}
                </span>
                <span className="flex items-center gap-1">
                  <Instagram className="h-3.5 w-3.5" />
                  {org.instagram ? "Available" : "Limited"}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* AGENCIES */}
    <section id="agencies" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow mb-4">— TOUR & TRAVELS</p>
          <h2 className="text-3xl md:text-4xl font-[800] uppercase tracking-tight text-foreground mb-3 leading-[1.1]">
            FIND SOMEONE WHO KNOWS THE VALLEY.
          </h2>
          <p className="text-muted-foreground text-base mb-8 max-w-lg">
            Everyone listed here is registered with J&K Tourism.
          </p>
        </motion.div>

        {/* Quick search button */}
        <motion.button
          onClick={() => { setSelectedAgencyForModal(null); setAgencyModalOpen(true); }}
          className="w-full max-w-xl flex items-center gap-3 px-4 py-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-all group mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Search className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
          <span className="text-muted-foreground group-hover:text-foreground transition-colors">Search by name or place…</span>
          <kbd className="hidden sm:inline-flex ml-auto items-center gap-1 px-2 py-1 text-xs bg-muted rounded text-muted-foreground font-mono">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        </motion.button>

        {/* Featured agencies grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {agencies.slice(0, 6).map((agency, i) => (
            <motion.div
              key={agency.rank}
              variants={fadeIn}
              whileHover={{ y: -4 }}
              onClick={() => { setSelectedAgencyForModal(agency); setAgencyModalOpen(true); }}
              className="p-5 border border-border rounded-lg hover:border-accent/50 bg-card/50 cursor-pointer transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-bold text-foreground">{agency.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({agency.reviews})</span>
                </div>
                <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-medium rounded">✓ J{"&"}K Registered</span>
              </div>
              <h3 className="font-bold text-foreground mb-1 group-hover:text-accent transition-colors line-clamp-1">{agency.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                {agency.location}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => { setSelectedAgencyForModal(null); setAgencyModalOpen(true); }}
            className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/30 text-foreground font-medium text-sm uppercase tracking-wide rounded-sm hover:bg-foreground/5 transition-colors"
          >
            View all {allAgencies.length} agencies
          </button>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);
};

export default ExploreKashmir;
