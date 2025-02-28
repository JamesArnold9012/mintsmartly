
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { MintStatus, mintNFT, parseTransactionError } from "@/lib/mint";
import TransactionStatus from "./TransactionStatus";

interface MintButtonProps {
  walletAddress: string;
  price: number;
  quantity?: number;
  onSuccess?: (txId: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

const MintButton = ({ 
  walletAddress, 
  price, 
  quantity = 1, 
  onSuccess,
  onError,
  className 
}: MintButtonProps) => {
  const [status, setStatus] = useState<MintStatus>("idle");
  const [txId, setTxId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMint = async () => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    setStatus("preparing");
    setTimeout(() => setStatus("minting"), 1500);

    try {
      const result = await mintNFT(walletAddress, quantity);
      
      if (result.success && result.txId) {
        setTxId(result.txId);
        setStatus("success");
        onSuccess?.(result.txId);
        toast.success("Successfully minted NFT!");
      } else {
        setError(result.error || "Transaction failed");
        setStatus("error");
        onError?.(result.error || "Transaction failed");
        toast.error(result.error || "Failed to mint NFT");
      }
    } catch (err: any) {
      const errorMessage = parseTransactionError(err);
      setError(errorMessage);
      setStatus("error");
      onError?.(errorMessage);
      toast.error(errorMessage);
    }
  };

  const resetState = () => {
    setStatus("idle");
    setTxId(null);
    setError(null);
  };

  if (status === "success" && txId) {
    return (
      <div className="space-y-4">
        <TransactionStatus status="success" txId={txId} />
        <Button 
          variant="outline" 
          onClick={resetState}
          className="w-full"
        >
          Mint Another
        </Button>
      </div>
    );
  }

  if (status === "error" && error) {
    return (
      <div className="space-y-4">
        <TransactionStatus status="error" error={error} />
        <Button 
          variant="outline" 
          onClick={resetState}
          className="w-full"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {(status === "preparing" || status === "minting") && (
        <TransactionStatus status={status} />
      )}
      
      <Button
        onClick={handleMint}
        disabled={status !== "idle"}
        className={`relative w-full h-12 overflow-hidden group ${className}`}
      >
        {status === "idle" ? (
          <>
            <span className="relative z-10 flex items-center gap-2">
              Mint Now
              <span className="text-xs opacity-70">({price} SOL)</span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0 bg-accent transition-all duration-300 group-hover:h-full -z-10"></span>
          </>
        ) : (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin h-4 w-4" />
            {status === "preparing" ? "Preparing..." : "Minting..."}
          </span>
        )}
      </Button>
    </div>
  );
};

export default MintButton;
