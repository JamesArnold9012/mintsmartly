
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { MintStatus } from "@/lib/mint";

interface TransactionStatusProps {
  status: MintStatus | "success" | "error" | "preparing" | "minting";
  txId?: string | null;
  error?: string | null;
  className?: string;
}

const TransactionStatus = ({ 
  status, 
  txId, 
  error,
  className 
}: TransactionStatusProps) => {
  const renderContent = () => {
    switch (status) {
      case "success":
        return (
          <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg animate-fade-in">
            <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
            <div className="space-y-1 flex-1 min-w-0">
              <p className="font-medium text-green-800 dark:text-green-300">
                Transaction Successful
              </p>
              {txId && (
                <p className="text-xs text-green-600 dark:text-green-400 truncate">
                  TX: {txId}
                </p>
              )}
            </div>
          </div>
        );
      
      case "error":
        return (
          <div className="flex items-center space-x-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg animate-fade-in">
            <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
            <div className="space-y-1 flex-1 min-w-0">
              <p className="font-medium text-red-800 dark:text-red-300">
                Transaction Failed
              </p>
              {error && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>
          </div>
        );
      
      case "preparing":
        return (
          <div className="flex items-start space-x-3 p-4 bg-primary/5 border border-primary/20 rounded-lg animate-fade-in">
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                Preparing Transaction
              </p>
              <p className="text-xs text-muted-foreground">
                Setting up your mint request...
              </p>
            </div>
          </div>
        );
      
      case "minting":
        return (
          <div className="flex items-start space-x-3 p-4 bg-primary/5 border border-primary/20 rounded-lg animate-fade-in">
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                Minting In Progress
              </p>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary h-full loading-shimmer" style={{ width: '70%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">
                This may take a few moments. Please don't close this window.
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={cn("", className)}>
      {renderContent()}
    </div>
  );
};

export default TransactionStatus;
