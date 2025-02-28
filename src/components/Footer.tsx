
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn("border-t", className)}>
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-6 h-6 rounded-lg bg-nft-primary"></span>
              <span className="font-semibold">MintSmartly</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A modern platform for minting NFTs on Solana with optimized costs.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/mint" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mint
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Connect</h3>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Discord"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="12" r="1" />
                  <circle cx="15" cy="12" r="1" />
                  <path d="M7.5 7.2A4.8 4.8 0 0 1 9 7h6a4.8 4.8 0 0 1 1.5.2" />
                  <path d="M15.5 17a4.8 4.8 0 0 1-7 0" />
                  <path d="M16.1 3.7A9 9 0 0 1 19 8v8a9 9 0 0 1-2.9 4.3" />
                  <path d="M7.9 3.7A9 9 0 0 0 5 8v8a9 9 0 0 0 2.9 4.3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} MintSmartly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
