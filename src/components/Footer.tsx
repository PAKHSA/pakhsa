import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-navy text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-heading text-xl font-bold">Paksha</p>
          <p className="text-sm text-glacier mt-1">Explore Kashmir, Your Way</p>
        </div>
        <div className="flex gap-6 text-sm text-glacier">
          <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
          <Link to="/explore" className="hover:text-primary-foreground transition-colors">Explore Kashmir</Link>
        </div>
        <p className="text-sm text-glacier">© 2025 Paksha. Made with ❤️ in Kashmir</p>
      </div>
    </div>
  </footer>
);

export default Footer;
