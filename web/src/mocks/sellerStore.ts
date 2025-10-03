export const mockSeller = {
  username: "retro_rick",
  storeName: "Retro Rick's Finds",
  bannerUrl: null,
  avatarUrl: "/images/avatars/default-2.png",
  rating: 4.7,
  followers: 1280,
  auctionsCompleted: 42,
};

export const mockAuctions = [
  { 
    id: "a1", 
    title: "PS2 Slim Bundle", 
    imageUrl: "/placeholder.svg", 
    currentBid: 23.41, 
    endTime: new Date("2025-10-01T20:00:00Z"), 
    seller: "retro_rick", 
    isLive: true,
    bidCount: 12,
    category: "Gaming"
  },
  { 
    id: "a2", 
    title: "Vintage Pokémon Lot", 
    imageUrl: "/placeholder.svg", 
    currentBid: 5.12, 
    endTime: new Date("2025-10-02T01:00:00Z"), 
    seller: "retro_rick", 
    isLive: false, 
    upcoming: true,
    bidCount: 3,
    category: "Collectibles"
  },
  { 
    id: "a3", 
    title: "Nintendo 64 Console", 
    imageUrl: "/placeholder.svg", 
    currentBid: 89.50, 
    endTime: new Date("2025-09-30T22:30:00Z"), 
    seller: "retro_rick", 
    isLive: true,
    bidCount: 28,
    category: "Gaming"
  },
];

export const mockProducts = [
  { 
    id: "p1", 
    title: "N64 Controller (Gray)", 
    imageUrl: "/placeholder.svg", 
    price: 34.99, 
    seller: "retro_rick",
    description: "Original gray Nintendo 64 controller in excellent condition"
  },
  { 
    id: "p2", 
    title: "Game Boy Color (Teal)", 
    imageUrl: "/placeholder.svg", 
    price: 79.99, 
    seller: "retro_rick",
    description: "Teal Game Boy Color handheld gaming system"
  },
  { 
    id: "p3", 
    title: "SNES Classic Edition", 
    imageUrl: "/placeholder.svg", 
    price: 129.99, 
    seller: "retro_rick",
    description: "Super Nintendo Entertainment System Classic Edition"
  },
];

export const flags = {
  sellerStoresUI: true,
  quickBidUI: true,
  quickBuyUI: true,
};