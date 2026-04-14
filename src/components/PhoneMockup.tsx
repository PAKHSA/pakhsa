import { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
}

export const PhoneMockup = ({ children, className = "" }: PhoneMockupProps) => (
  <div className={`w-[200px] md:w-[220px] ${className}`} style={{ perspective: "1000px" }}>
    <div
      className="bg-card rounded-[24px] border border-border overflow-hidden shadow-2xl"
      style={{ transform: "rotateY(-5deg) rotateX(2deg)" }}
    >
      <div className="p-2">
        <div className="rounded-[18px] overflow-hidden bg-background">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export const BookingScreen = () => (
  <div className="h-[380px] p-4 text-foreground text-xs flex flex-col">
    <p className="eyebrow mb-3">BOOK A RIDE</p>
    <div className="flex-1 bg-muted rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted to-background/50" />
      <div className="relative z-10 text-center">
        <p className="text-muted-foreground text-[10px]">SRINAGAR MAP</p>
        <div className="flex gap-4 mt-2 justify-center">
          <span className="text-lg">🛵</span>
          <span className="text-lg">🛵</span>
        </div>
      </div>
    </div>
    <div className="space-y-2 mb-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <span className="text-muted-foreground">Dal Gate</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-foreground" />
        <span className="text-muted-foreground">Lal Chowk</span>
      </div>
    </div>
    <div className="flex items-center justify-between mb-3">
      <span className="text-accent font-bold text-lg">₹54</span>
      <span className="text-muted-foreground text-[10px]">EST. 12 MIN</span>
    </div>
    <button className="w-full py-2.5 rounded bg-accent text-accent-foreground font-bold text-xs uppercase tracking-wide">
      Find My Ride →
    </button>
  </div>
);

export const MatchingScreen = () => (
  <div className="h-[380px] p-4 text-foreground text-xs flex flex-col items-center justify-center">
    <p className="text-lg font-[800] uppercase tracking-tight mb-6 text-center">Finding Your Driver</p>
    <div className="relative w-24 h-24 mb-6">
      <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-pulse-ring" />
      <div className="absolute inset-2 rounded-full border-2 border-accent/50 animate-pulse-ring" style={{ animationDelay: "0.3s" }} />
      <div className="absolute inset-4 rounded-full border-2 border-accent/70 animate-pulse-ring" style={{ animationDelay: "0.6s" }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl">🛵</span>
      </div>
    </div>
    <div className="w-full bg-card rounded-lg border border-border p-3">
      <p className="font-bold text-sm">Riyaz Ahmed</p>
      <p className="text-muted-foreground text-[10px] mt-1">4.9★ · 3 min away</p>
      <p className="text-accent text-[10px] mt-1 font-medium">PVC VERIFIED</p>
    </div>
  </div>
);

export const EarningsScreen = () => (
  <div className="h-[380px] p-4 text-foreground text-xs flex flex-col">
    <p className="eyebrow mb-2">TODAY'S EARNINGS</p>
    <p className="text-3xl font-[800] text-accent mb-1">₹1,240</p>
    <p className="text-muted-foreground text-[10px] mb-4">8 TRIPS COMPLETED</p>
    <div className="grid grid-cols-2 gap-2 mb-4">
      {[
        { label: "ONLINE", value: "6h 20m" },
        { label: "DISTANCE", value: "47 km" },
        { label: "RATING", value: "4.9★" },
        { label: "TIPS", value: "₹180" },
      ].map((s) => (
        <div key={s.label} className="bg-muted rounded p-2">
          <p className="text-[9px] text-muted-foreground">{s.label}</p>
          <p className="font-bold text-sm">{s.value}</p>
        </div>
      ))}
    </div>
    <p className="text-[10px] text-muted-foreground mb-2">THIS WEEK</p>
    <div className="flex items-end gap-1 flex-1">
      {[40, 65, 80, 55, 90, 70, 85].map((h, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-sm bg-accent/80" style={{ height: `${h}%` }} />
          <span className="text-[8px] text-muted-foreground">
            {["M", "T", "W", "T", "F", "S", "S"][i]}
          </span>
        </div>
      ))}
    </div>
  </div>
);
