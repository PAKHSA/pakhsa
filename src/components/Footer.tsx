import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-background border-t border-border">
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-2xl font-[800] uppercase tracking-tight text-foreground">PAKSHA</p>
          <p className="text-sm text-muted-foreground mt-1">Ride the Valley.</p>
        </div>
        <div className="flex gap-8 text-[13px] uppercase tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link to="/explore" className="hover:text-foreground transition-colors">Explore Kashmir</Link>
          <Link to="/directory" className="hover:text-foreground transition-colors">Travel Directory</Link>
        </div>
        <p className="text-sm text-muted-foreground">Made in Kashmir 🏔️</p>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="container mx-auto px-4 py-4">
        <p className="text-xs text-muted-foreground">© 2025 Paksha. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
