
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import {
  WalletStatus,
  WalletInfo,
  connectWallet,
  disconnectWallet,
  availableWallets,
  shortAddress,
} from "@/lib/wallet";

const WalletConnect = () => {
  const [status, setStatus] = useState<WalletStatus>("disconnected");
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [open, setOpen] = useState(false);

  // Check if wallet was previously connected
  useEffect(() => {
    const savedWallet = localStorage.getItem("connectedWallet");
    if (savedWallet) {
      try {
        const parsedWallet = JSON.parse(savedWallet);
        setWallet(parsedWallet);
        setStatus("connected");
      } catch (e) {
        localStorage.removeItem("connectedWallet");
      }
    }
  }, []);

  const handleConnect = async (walletName: string) => {
    setStatus("connecting");
    
    try {
      const result = await connectWallet(walletName);
      if (result.success && result.address) {
        const walletInfo = {
          name: walletName,
          address: result.address,
          icon: availableWallets.find(w => w.name === walletName)?.icon || "",
        };
        
        setWallet(walletInfo);
        setStatus("connected");
        setOpen(false);
        
        // Save to localStorage
        localStorage.setItem("connectedWallet", JSON.stringify(walletInfo));
        
        toast.success(`Connected to ${walletName}`);
      } else {
        setStatus("disconnected");
        toast.error(result.error || "Failed to connect wallet");
      }
    } catch (error) {
      setStatus("disconnected");
      toast.error("Error connecting wallet");
      console.error(error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      setWallet(null);
      setStatus("disconnected");
      localStorage.removeItem("connectedWallet");
      toast.success("Wallet disconnected");
    } catch (error) {
      toast.error("Error disconnecting wallet");
      console.error(error);
    }
  };

  if (status === "connected" && wallet) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <img
              src={wallet.icon}
              alt={wallet.name}
              className="w-5 h-5 rounded-full"
            />
            <span className="font-medium">{shortAddress(wallet.address)}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3">
          <div className="space-y-3">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <img
                src={wallet.icon}
                alt={wallet.name}
                className="w-10 h-10 mb-1 rounded-full"
              />
              <p className="font-semibold">{wallet.name}</p>
              <p className="text-xs text-muted-foreground break-all">
                {wallet.address}
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="w-full"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline"
          disabled={status === "connecting"}
          className="relative overflow-hidden group"
        >
          {status === "connecting" ? (
            <>
              <span className="animate-pulse">Connecting...</span>
              <span className="absolute inset-0 w-full h-full bg-primary/10 animate-pulse"></span>
            </>
          ) : (
            <>
              <span>Connect Wallet</span>
              <span className="absolute -bottom-full left-0 w-full h-0.5 bg-primary group-hover:bottom-0 transition-all duration-300"></span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="grid gap-3">
          <h3 className="font-medium text-center text-sm">Select Wallet</h3>
          {availableWallets.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className="flex items-center justify-start gap-3 h-12"
              onClick={() => handleConnect(wallet.name)}
            >
              <img 
                src={wallet.icon} 
                alt={wallet.name} 
                className="w-6 h-6 rounded-full" 
              />
              <span>{wallet.name}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WalletConnect;
