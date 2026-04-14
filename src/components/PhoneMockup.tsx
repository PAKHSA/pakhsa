const BookingScreen = () => (
  <div className="bg-snow rounded-2xl p-4 w-full h-full flex flex-col text-xs">
    <div className="text-navy font-medium text-sm mb-2">Book a Ride</div>
    <div className="flex-1 bg-glacier/20 rounded-lg relative mb-3 flex items-center justify-center">
      <div className="text-center">
        <div className="text-[10px] text-muted-foreground mb-1">📍 Dal Gate → Lal Chowk</div>
        <div className="flex justify-center gap-4 mt-2">
          <span className="text-lg">🛵</span>
          <span className="text-lg">🛵</span>
        </div>
      </div>
    </div>
    <div className="bg-navy text-primary-foreground rounded-lg py-2 text-center font-medium">
      Ride · ₹54
    </div>
  </div>
);

const MatchingScreen = () => (
  <div className="bg-snow rounded-2xl p-4 w-full h-full flex flex-col items-center justify-center text-xs">
    <div className="relative w-20 h-20 mb-4">
      <div className="absolute inset-0 rounded-full border-2 border-accent animate-pulse-ring" />
      <div className="absolute inset-2 rounded-full border-2 border-accent/60 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
      <div className="absolute inset-4 rounded-full border-2 border-accent/30 animate-pulse-ring" style={{ animationDelay: "1s" }} />
      <div className="absolute inset-0 flex items-center justify-center text-2xl">🛵</div>
    </div>
    <p className="text-navy font-medium text-sm mb-3">Finding your driver...</p>
    <div className="bg-background rounded-lg p-3 w-full border border-border">
      <p className="font-medium text-navy">Riyaz Ahmed</p>
      <p className="text-muted-foreground">⭐ 4.9 · 3 min away</p>
    </div>
  </div>
);

const EarningsScreen = () => (
  <div className="bg-snow rounded-2xl p-4 w-full h-full flex flex-col text-xs">
    <div className="text-navy font-medium text-sm mb-3">Today's Earnings</div>
    <div className="text-3xl font-bold text-navy mb-1">₹1,240</div>
    <div className="text-muted-foreground mb-4">8 trips completed</div>
    <div className="flex-1 flex items-end gap-1">
      {[40, 65, 80, 55, 90, 70, 100].map((h, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t bg-gradient-to-t from-navy to-river" style={{ height: `${h}%` }} />
          <span className="text-[8px] text-muted-foreground">
            {["M", "T", "W", "T", "F", "S", "S"][i]}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const PhoneMockup = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-44 h-80 rounded-[2rem] border-4 border-navy/20 bg-navy/5 p-1 shadow-lg ${className}`}>
    <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-snow">
      {children}
    </div>
  </div>
);

export { PhoneMockup, BookingScreen, MatchingScreen, EarningsScreen };
