
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NFTPreview from "@/components/NFTPreview";
import { NFTCollection, getNFTMintInfo } from "@/lib/mint";

const Index = () => {
  const [mintInfo, setMintInfo] = useState({
    minted: 0,
    maxSupply: 100,
    price: 0.5,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMintInfo = async () => {
      try {
        const info = await getNFTMintInfo();
        setMintInfo({
          minted: info.minted,
          maxSupply: info.maxSupply,
          price: info.price,
        });
      } catch (error) {
        console.error("Error fetching mint info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMintInfo();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-nft-primary/10 text-nft-primary">
                Mint Now Live
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Optimized NFT Minting on Solana
              </h1>
              <p className="text-xl text-muted-foreground max-w-md">
                A cost-effective approach to creating and deploying NFTs on the Solana blockchain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="group relative overflow-hidden">
                  <Link to="/mint">
                    <span className="relative z-10 flex items-center gap-2">
                      Mint Your NFT
                      <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-accent transition-transform duration-300 origin-left group-hover:scale-x-0"></span>
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end animate-fade-up">
              <NFTPreview className="w-full max-w-xs md:max-w-sm shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-lg bg-background border">
              <div className="text-3xl font-bold text-primary mb-2">
                {isLoading ? (
                  <span className="inline-block w-16 h-8 bg-primary/10 animate-pulse rounded"></span>
                ) : (
                  `${mintInfo.minted}/${mintInfo.maxSupply}`
                )}
              </div>
              <p className="text-muted-foreground">NFTs Minted</p>
            </div>
            <div className="p-6 rounded-lg bg-background border">
              <div className="text-3xl font-bold text-primary mb-2">
                {isLoading ? (
                  <span className="inline-block w-16 h-8 bg-primary/10 animate-pulse rounded"></span>
                ) : (
                  `${mintInfo.price} SOL`
                )}
              </div>
              <p className="text-muted-foreground">Mint Price</p>
            </div>
            <div className="p-6 rounded-lg bg-background border">
              <div className="text-3xl font-bold text-primary mb-2">
                {isLoading ? (
                  <span className="inline-block w-16 h-8 bg-primary/10 animate-pulse rounded"></span>
                ) : (
                  `${NFTCollection.royaltyFee}%`
                )}
              </div>
              <p className="text-muted-foreground">Royalty Fee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose MintSmartly?
            </h2>
            <p className="text-muted-foreground text-lg">
              Our platform offers the most efficient way to create and deploy NFTs on Solana.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-xl border">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
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
                >
                  <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a1.94 1.94 0 0 0-.09 3.31l12.35 6.61c.47.25 1.04.25 1.5 0l3.65-1.9a1.93 1.93 0 0 0 .4-3.31z" />
                  <path d="M3.09 8.84v7.21a1.92 1.92 0 0 0 1.14 1.78l3.55 1.81a1.94 1.94 0 0 0 1.78 0l3.55-1.81a1.92 1.92 0 0 0 1.14-1.78V8.84" />
                  <path d="M21 16.5V8.84" />
                  <path d="M21 16.5a1.5 1.5 0 0 1-3 0" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cost Optimization</h3>
              <p className="text-muted-foreground">
                Save on transaction fees with batched minting and optimized metadata storage.
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
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
                >
                  <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
                  <path d="M9.6 4.6A2.5 2.5 0 1 1 11.3 9H2" />
                  <path d="M12.6 19.4A2.5 2.5 0 1 0 14.3 15H2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Simplified Process</h3>
              <p className="text-muted-foreground">
                User-friendly interface that makes minting NFTs accessible to everyone.
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
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
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Deployment</h3>
              <p className="text-muted-foreground">
                Built on Metaplex Candy Machine v3 for reliable and secure NFT minting.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Mint Your NFTs?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get started today and join the growing community of creators on Solana.
            </p>
            <Button asChild size="lg" className="group relative overflow-hidden">
              <Link to="/mint">
                <span className="relative z-10 flex items-center gap-2">
                  Start Minting
                  <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-accent transition-transform duration-300 origin-left group-hover:scale-x-0"></span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
