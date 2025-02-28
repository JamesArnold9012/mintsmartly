
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import WalletConnect from "./WalletConnect";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-lg shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/"
          className="text-2xl font-bold tracking-tight flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <span className="inline-block w-8 h-8 rounded-lg bg-nft-primary"></span>
          <span>MintSmartly</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="/" currentPath={location.pathname}>
            Home
          </NavLink>
          <NavLink href="/mint" currentPath={location.pathname}>
            Mint
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <WalletConnect />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  currentPath: string;
  children: React.ReactNode;
}

const NavLink = ({ href, currentPath, children }: NavLinkProps) => {
  const isActive = currentPath === href;

  return (
    <Link
      to={href}
      className={cn(
        "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
        isActive
          ? "text-foreground bg-accent/10"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
      )}
    </Link>
  );
};

export default Navbar;
