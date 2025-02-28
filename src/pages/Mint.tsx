
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NFTPreview from "@/components/NFTPreview";
import MintButton from "@/components/MintButton";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";
import { getNFTMintInfo, NFTCollection } from "@/lib/mint";

const Mint = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [mintInfo, setMintInfo] = useState({
    price: 0,
    totalSupply: 0,
    maxSupply: 0,
    minted: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Get the wallet address from localStorage
  useEffect(() => {
    const savedWallet = localStorage.getItem("connectedWallet");
    if (savedWallet) {
      try {
        const parsedWallet = JSON.parse(savedWallet);
        setWalletAddress(parsedWallet.address);
      } catch (e) {
        console.error("Error parsing wallet", e);
      }
    }

    // Listen for wallet changes
    const handleStorageChange = () => {
      const updatedWallet = localStorage.getItem("connectedWallet");
      if (updatedWallet) {
        try {
          const parsedWallet = JSON.parse(updatedWallet);
          setWalletAddress(parsedWallet.address);
        } catch (e) {
          console.error("Error parsing wallet", e);
        }
      } else {
        setWalletAddress("");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Fetch mint info
  useEffect(() => {
    const fetchMintInfo = async () => {
      try {
        const info = await getNFTMintInfo();
        setMintInfo(info);
      } catch (error) {
        console.error("Error fetching mint info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMintInfo();
  }, []);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 10) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 pt-28 md:pt-40">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Mint Your NFT
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join the {NFTCollection.name} collection on Solana with optimized minting costs.
              </p>
              
              <NFTPreview className="lg:hidden mb-8" />
              
              <div className="grid gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="grid gap-1.5">
                        <h3 className="text-xl font-semibold">Collection Info</h3>
                        <p className="text-sm text-muted-foreground">
                          {NFTCollection.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Price</p>
                          {isLoading ? (
                            <Skeleton className="h-6 w-20" />
                          ) : (
                            <p className="font-medium">{mintInfo.price} SOL</p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Supply</p>
                          {isLoading ? (
                            <Skeleton className="h-6 w-20" />
                          ) : (
                            <p className="font-medium">
                              {mintInfo.minted} / {mintInfo.maxSupply}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                          {isLoading ? (
                            <div className="h-full bg-primary/30 animate-pulse" style={{ width: "30%" }}></div>
                          ) : (
                            <div 
                              className="h-full bg-primary transition-all duration-500 ease-out" 
                              style={{ 
                                width: `${(mintInfo.minted / mintInfo.maxSupply) * 100}%` 
                              }}
                            ></div>
                          )}
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                          {isLoading 
                            ? "Loading mint status..." 
                            : `${mintInfo.maxSupply - mintInfo.minted} NFTs remaining`
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="grid gap-1.5">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          max="10"
                          value={quantity}
                          onChange={handleQuantityChange}
                          className="w-full"
                        />
                        <p className="text-xs text-muted-foreground">
                          Max 10 NFTs per transaction
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="font-medium">Total</p>
                        <p className="text-2xl font-bold">
                          {isLoading ? (
                            <Skeleton className="h-8 w-24" />
                          ) : (
                            `${(mintInfo.price * quantity).toFixed(2)} SOL`
                          )}
                        </p>
                      </div>
                      
                      {!walletAddress && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Please connect your wallet to mint NFTs
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      <MintButton
                        walletAddress={walletAddress}
                        price={mintInfo.price}
                        quantity={quantity}
                        className="mt-4"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Mint transactions are processed on the Solana blockchain and may take a few moments to complete.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center justify-center animate-fade-up">
              <NFTPreview className="max-w-md shadow-xl" />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Mint;
