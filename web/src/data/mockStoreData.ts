// Mock data for Store, Drops, and Products

export interface Product {
  id: string;
  title: string;
  brand: string;
  priceUsd: number;
  creditsAllowedMax: number;
  isExclusive: boolean;
  isDailyDeal: boolean;
  isLowStock: boolean;
  inventory: number;
  images: string[];
  description: string;
  specs: Record<string, string>;
  tags: string[];
  category: string;
}

export interface Drop {
  id: string;
  title: string;
  partner: string;
  status: 'upcoming' | 'live' | 'past';
  startAt: number;
  endAt: number;
  type: 'store' | 'auction' | 'hybrid';
  storeProductIds: string[];
  auctionIds: string[];
  heroImage: string;
  partnerLogo?: string;
  story: string;
  unitsRemaining?: number;
  totalUnits?: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'p-snaggle-hoodie',
    title: 'Snaggle Glow Hoodie',
    brand: 'Snaggle',
    priceUsd: 59.99,
    creditsAllowedMax: 30,
    isExclusive: true,
    isDailyDeal: false,
    isLowStock: false,
    inventory: 120,
    images: ['/placeholder.svg', '/placeholder.svg'],
    description: 'Premium heavyweight hoodie with embroidered Snaggle logo and neon green accents. Made from sustainable cotton blend.',
    specs: {
      'Material': '80% Cotton, 20% Polyester',
      'Weight': '12oz heavyweight',
      'Features': 'Embroidered logo, kangaroo pocket',
      'Care': 'Machine wash cold'
    },
    tags: ['apparel', 'exclusive', 'sustainable'],
    category: 'Apparel'
  },
  {
    id: 'p-collab-headphones',
    title: 'Snaggle x Waveform Headphones',
    brand: 'Snaggle x Waveform',
    priceUsd: 199.00,
    creditsAllowedMax: 80,
    isExclusive: true,
    isDailyDeal: true,
    isLowStock: true,
    inventory: 15,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    description: 'Limited edition wireless headphones co-designed with Waveform. Premium tuned drivers with neon accent lighting.',
    specs: {
      'Driver': '40mm dynamic drivers',
      'Battery': '30 hours playback',
      'Features': 'ANC, Transparency mode, Neon LED accents',
      'Connectivity': 'Bluetooth 5.3'
    },
    tags: ['audio', 'collab', 'wireless'],
    category: 'Electronics'
  },
  {
    id: 'p-mechanical-keyboard',
    title: 'Snaggle RGB Mechanical Keyboard',
    brand: 'Snaggle',
    priceUsd: 149.99,
    creditsAllowedMax: 60,
    isExclusive: false,
    isDailyDeal: false,
    isLowStock: false,
    inventory: 85,
    images: ['/placeholder.svg', '/placeholder.svg'],
    description: 'Full-size mechanical keyboard with hot-swappable switches and custom Snaggle green RGB lighting.',
    specs: {
      'Switches': 'Hot-swappable mechanical',
      'Layout': 'Full-size (104 keys)',
      'Lighting': 'Per-key RGB with green accent mode',
      'Connection': 'USB-C detachable cable'
    },
    tags: ['gaming', 'peripherals'],
    category: 'Electronics'
  },
  {
    id: 'p-water-bottle',
    title: 'Insulated Steel Bottle',
    brand: 'Snaggle',
    priceUsd: 34.99,
    creditsAllowedMax: 15,
    isExclusive: false,
    isDailyDeal: true,
    isLowStock: false,
    inventory: 200,
    images: ['/placeholder.svg'],
    description: 'Double-wall vacuum insulated stainless steel bottle. Keeps drinks cold for 24 hours, hot for 12 hours.',
    specs: {
      'Capacity': '32oz (946ml)',
      'Material': 'Stainless steel',
      'Features': 'Leak-proof lid, wide mouth',
      'Care': 'Hand wash recommended'
    },
    tags: ['lifestyle', 'sustainable'],
    category: 'Lifestyle'
  },
  {
    id: 'p-backpack',
    title: 'Tech Commuter Backpack',
    brand: 'Snaggle',
    priceUsd: 89.99,
    creditsAllowedMax: 40,
    isExclusive: false,
    isDailyDeal: false,
    isLowStock: false,
    inventory: 60,
    images: ['/placeholder.svg', '/placeholder.svg'],
    description: 'Weather-resistant backpack with padded laptop compartment and USB charging port. Perfect for daily commute.',
    specs: {
      'Laptop': 'Fits up to 15.6"',
      'Material': 'Water-resistant nylon',
      'Features': 'USB port, hidden pockets, reflective strips',
      'Capacity': '25L'
    },
    tags: ['bags', 'tech'],
    category: 'Accessories'
  },
  {
    id: 'p-mousepad',
    title: 'Extended Gaming Mousepad',
    brand: 'Snaggle',
    priceUsd: 24.99,
    creditsAllowedMax: 10,
    isExclusive: false,
    isDailyDeal: false,
    isLowStock: false,
    inventory: 150,
    images: ['/placeholder.svg'],
    description: 'XXL desk mat with stitched edges and non-slip rubber base. Features subtle Snaggle branding.',
    specs: {
      'Size': '36" x 18"',
      'Thickness': '3mm',
      'Surface': 'Smooth cloth',
      'Base': 'Anti-slip rubber'
    },
    tags: ['gaming', 'peripherals'],
    category: 'Accessories'
  },
  {
    id: 'p-t-shirt',
    title: 'Snaggle Logo Tee',
    brand: 'Snaggle',
    priceUsd: 29.99,
    creditsAllowedMax: 12,
    isExclusive: false,
    isDailyDeal: false,
    isLowStock: false,
    inventory: 180,
    images: ['/placeholder.svg'],
    description: 'Soft cotton t-shirt with screen-printed Snaggle logo in neon green. Unisex fit.',
    specs: {
      'Material': '100% ringspun cotton',
      'Fit': 'Unisex, true to size',
      'Print': 'Screen-printed front logo',
      'Care': 'Machine wash cold'
    },
    tags: ['apparel'],
    category: 'Apparel'
  },
  {
    id: 'p-phone-case',
    title: 'Snaggle Phone Case',
    brand: 'Snaggle',
    priceUsd: 19.99,
    creditsAllowedMax: 8,
    isExclusive: false,
    isDailyDeal: false,
    isLowStock: true,
    inventory: 25,
    images: ['/placeholder.svg'],
    description: 'Slim protective case with raised edges and neon green Snaggle accent. Available for multiple phone models.',
    specs: {
      'Protection': 'Shock-absorbent TPU',
      'Features': 'Raised bezels, precise cutouts',
      'Compatibility': 'iPhone & Samsung models',
      'Thickness': '1.5mm'
    },
    tags: ['accessories', 'tech'],
    category: 'Accessories'
  }
];

export const DROPS: Drop[] = [
  {
    id: 'd-waveform',
    title: 'Snaggle × Waveform Limited',
    partner: 'Waveform',
    status: 'live',
    startAt: Date.now() - 3600000,
    endAt: Date.now() + 172800000, // 48 hours
    type: 'hybrid',
    storeProductIds: ['p-collab-headphones'],
    auctionIds: ['auction-1'],
    heroImage: '/placeholder.svg',
    partnerLogo: '/placeholder.svg',
    story: "In collaboration with Waveform, we've created the ultimate wireless headphones for audiophiles and style enthusiasts. Premium tuned drivers meet neon aesthetics in this limited drop. Only 100 units available across store and auction.",
    unitsRemaining: 15,
    totalUnits: 100
  },
  {
    id: 'd-snaggle-hoodie',
    title: 'Snaggle Glow Apparel Drop',
    partner: 'Snaggle',
    status: 'upcoming',
    startAt: Date.now() + 86400000, // 24 hours
    endAt: Date.now() + 259200000, // 72 hours
    type: 'store',
    storeProductIds: ['p-snaggle-hoodie', 'p-t-shirt'],
    auctionIds: [],
    heroImage: '/placeholder.svg',
    story: 'Limited apparel drop featuring our signature neon green glow. Premium sustainable materials meet street style. First access for early supporters.',
    unitsRemaining: 120,
    totalUnits: 150
  },
  {
    id: 'd-gaming-bundle',
    title: 'Ultimate Gaming Setup',
    partner: 'Snaggle Gaming',
    status: 'live',
    startAt: Date.now() - 7200000,
    endAt: Date.now() + 86400000, // 24 hours
    type: 'auction',
    storeProductIds: [],
    auctionIds: ['auction-2', 'auction-3'],
    heroImage: '/placeholder.svg',
    story: 'Complete gaming setup including mechanical keyboard, extended mousepad, and premium peripherals. Bid now for exclusive bundle pricing.',
    totalUnits: 10
  },
  {
    id: 'd-summer-lifestyle',
    title: 'Summer Lifestyle Collection',
    partner: 'Snaggle',
    status: 'past',
    startAt: Date.now() - 604800000, // 7 days ago
    endAt: Date.now() - 86400000, // ended yesterday
    type: 'store',
    storeProductIds: ['p-water-bottle', 'p-backpack'],
    auctionIds: [],
    heroImage: '/placeholder.svg',
    story: 'Our most popular summer essentials in one exclusive drop. Sustainable water bottle and tech backpack designed for adventure.',
    unitsRemaining: 0,
    totalUnits: 260
  }
];

export const USER_CREDITS = 1240; // Mock user credits balance

// Helper to compute credits applied
export function computeCreditsApplied(params: {
  priceUsd: number;
  userCredits: number;
  maxCreditsAllowed: number;
  creditsChosen: number;
}) {
  const { priceUsd, userCredits, maxCreditsAllowed, creditsChosen } = params;
  const CREDIT_VALUE = 0.60; // 1 credit ≈ $0.60
  const usable = Math.min(creditsChosen, userCredits, maxCreditsAllowed);
  const discount = usable * CREDIT_VALUE;
  const total = Math.max(0, priceUsd - discount);
  
  return { usable, discount, total };
}
