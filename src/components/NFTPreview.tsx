
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { NFTMetadata, sampleNFTs } from "@/lib/mint";

interface NFTPreviewProps {
  className?: string;
}

const NFTPreview = ({ className }: NFTPreviewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % sampleNFTs.length);
        setIsLoaded(false);
        setIsChanging(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentNFT = sampleNFTs[currentIndex];

  return (
    <Card className={cn("overflow-hidden border-2 border-border", className)}>
      <CardContent className="p-3">
        <div className="relative overflow-hidden rounded-lg">
          <AspectRatio ratio={1} className="bg-muted animate-pulse">
            <div className={cn(
              "absolute inset-0 transition-opacity duration-300",
              isChanging ? "opacity-0" : "opacity-100"
            )}>
              <img
                src={currentNFT.image}
                alt={currentNFT.name}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-700",
                  isLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setIsLoaded(true)}
              />
            </div>
          </AspectRatio>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-white font-medium truncate">{currentNFT.name}</h3>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex flex-wrap gap-2">
            {currentNFT.attributes.map((attr, i) => (
              <div 
                key={i} 
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-nft-primary/10 text-nft-primary"
              >
                {attr.trait_type}: {attr.value}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {currentNFT.description}
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="flex gap-1.5">
            {sampleNFTs.map((_, i) => (
              <button
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentIndex === i 
                    ? "bg-primary w-4" 
                    : "bg-primary/30 hover:bg-primary/50"
                )}
                onClick={() => {
                  setIsChanging(true);
                  setTimeout(() => {
                    setCurrentIndex(i);
                    setIsLoaded(false);
                    setIsChanging(false);
                  }, 300);
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NFTPreview;
