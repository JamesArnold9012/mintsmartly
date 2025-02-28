
import { toast } from "sonner";

export type MintStatus = "idle" | "preparing" | "minting" | "success" | "error";

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string }>;
}

// Sample NFT collection data
export const NFTCollection = {
  name: "Minimalist Masterpieces",
  description: "A collection of elegant, minimalist digital art NFTs on Solana.",
  symbol: "MMS",
  image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&ixlib=rb-4.0.3",
  maxSupply: 100,
  mintPrice: 0.5, // SOL
  royaltyFee: 5.0, // 5%
  creators: [
    {
      address: "8ZjS1sAxyzejFVYQeYXZhxEoy5gWbrNftqLbM7NnKHZN",
      share: 100,
    },
  ],
};

// Sample NFT data
export const sampleNFTs: NFTMetadata[] = [
  {
    name: "Geometric Harmony #1",
    description: "A harmonious blend of geometric shapes in a minimal design.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=600&ixlib=rb-4.0.3",
    attributes: [
      { trait_type: "Shape", value: "Circle" },
      { trait_type: "Color", value: "Green" },
      { trait_type: "Rarity", value: "Common" },
    ],
  },
  {
    name: "Digital Waves #7",
    description: "Flowing digital waves in a serene composition.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&ixlib=rb-4.0.3",
    attributes: [
      { trait_type: "Pattern", value: "Wave" },
      { trait_type: "Color", value: "Blue" },
      { trait_type: "Rarity", value: "Uncommon" },
    ],
  },
  {
    name: "Minimal Tech #12",
    description: "A minimalist interpretation of modern technology.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600&ixlib=rb-4.0.3",
    attributes: [
      { trait_type: "Theme", value: "Technology" },
      { trait_type: "Color", value: "Gray" },
      { trait_type: "Rarity", value: "Rare" },
    ],
  },
];

// Simulate minting an NFT
export const mintNFT = async (
  walletAddress: string,
  quantity: number = 1
): Promise<{ success: boolean; txId?: string; error?: string }> => {
  return new Promise((resolve) => {
    const randomDelay = Math.floor(2000 + Math.random() * 3000);
    
    setTimeout(() => {
      // 90% success rate for simulation
      if (Math.random() > 0.1) {
        const txId = `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        resolve({ 
          success: true, 
          txId 
        });
      } else {
        resolve({
          success: false,
          error: "Transaction failed. Please try again.",
        });
      }
    }, randomDelay);
  });
};

// Get NFT mint info
export const getNFTMintInfo = async (): Promise<{
  price: number;
  totalSupply: number;
  maxSupply: number;
  minted: number;
}> => {
  // Simulate fetching mint info
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        price: NFTCollection.mintPrice,
        totalSupply: NFTCollection.maxSupply,
        maxSupply: NFTCollection.maxSupply,
        minted: Math.floor(Math.random() * 60), // Random number of already minted NFTs
      });
    }, 800);
  });
};

// Parse Solana transaction error
export const parseTransactionError = (error: any): string => {
  if (typeof error === 'string') {
    if (error.includes("insufficient funds")) {
      return "Insufficient funds for transaction.";
    }
    return error;
  }
  
  return "An unexpected error occurred during the transaction.";
};
