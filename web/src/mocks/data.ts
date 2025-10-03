import {
  Auction,
  User,
  Bid,
  ChatMessage,
  ActivityFeedItem,
  Achievement,
  LeaderboardEntry,
  Listing,
  Challenge,
  AuctionHost,
} from '../lib/api/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'collector_pro',
    displayName: 'Alex Thompson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    verified: true,
    createdAt: new Date('2023-01-15'),
    lastActive: new Date(),
    stats: {
      totalWins: 47,
      totalSpent: 12750,
      totalEarned: 8900,
      winRate: 0.72,
      stakingBalance: 5000,
      creditBalance: 1250,
      followerCount: 1840,
      followingCount: 234,
    },
    preferences: {
      showBalance: true,
      showWins: true,
      allowFollows: true,
      notifications: {
        email: true,
        push: true,
        auctionReminders: true,
        socialActivity: true,
        winUpdates: true,
      },
    },
  },
  {
    id: 'user-2',
    username: 'vintage_hunter',
    displayName: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2137adb?w=150&h=150&fit=crop&crop=face',
    verified: true,
    createdAt: new Date('2023-03-20'),
    lastActive: new Date(Date.now() - 300000),
    stats: {
      totalWins: 89,
      totalSpent: 24500,
      totalEarned: 31200,
      winRate: 0.68,
      stakingBalance: 12000,
      creditBalance: 850,
      followerCount: 3200,
      followingCount: 456,
    },
    preferences: {
      showBalance: false,
      showWins: true,
      allowFollows: true,
      notifications: {
        email: true,
        push: false,
        auctionReminders: true,
        socialActivity: false,
        winUpdates: true,
      },
    },
  },
  {
    id: 'user-3',
    username: 'rookie_bidder',
    displayName: 'Mike Rodriguez',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verified: false,
    createdAt: new Date('2024-01-10'),
    lastActive: new Date(Date.now() - 600000),
    stats: {
      totalWins: 12,
      totalSpent: 2340,
      totalEarned: 450,
      winRate: 0.34,
      stakingBalance: 500,
      creditBalance: 320,
      followerCount: 89,
      followingCount: 145,
    },
    preferences: {
      showBalance: true,
      showWins: true,
      allowFollows: true,
      notifications: {
        email: true,
        push: true,
        auctionReminders: true,
        socialActivity: true,
        winUpdates: true,
      },
    },
  },
];

// Mock Auction Hosts
export const mockHosts: AuctionHost[] = [
  {
    id: 'host-1',
    username: 'premium_auctions',
    displayName: 'Premium Auctions',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
    verified: true,
    rating: 4.9,
    totalAuctions: 234,
  },
  {
    id: 'host-2',
    username: 'collectibles_corner',
    displayName: 'Collectibles Corner',
    avatar: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=150&h=150&fit=crop',
    verified: true,
    rating: 4.7,
    totalAuctions: 189,
  },
];

// Mock Auctions
export const mockAuctions: Auction[] = [
  {
    id: 'auction-1',
    title: 'Vintage Rolex Submariner 1965',
    description: 'Rare vintage Rolex Submariner in excellent condition with original box and papers.',
    category: 'Watches',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop',
    ],
    hostId: 'host-1',
    host: mockHosts[0],
    type: 'vip',
    status: 'live',
    currentPrice: 15750,
    minIncrement: 250,
    startTime: new Date(Date.now() - 3600000),
    endTime: new Date(Date.now() + 1800000),
    estimatedEndTime: new Date(Date.now() + 1800000),
    bidCount: 47,
    viewerCount: 234,
    streamUrl: 'https://stream.snaggle.fun/auction-1',
    chatRoomId: 'chat-auction-1',
    tags: ['vintage', 'luxury', 'rolex', 'swiss'],
    isSponsored: false,
    metadata: {
      retailValue: 25000,
      condition: 'Excellent',
      brand: 'Rolex',
      model: 'Submariner',
      year: 1965,
      authentication: 'Certified by Hodinkee',
    },
  },
  {
    id: 'auction-2',
    title: 'Nike Air Jordan 1 Chicago (1985)',
    description: 'Original 1985 Nike Air Jordan 1 in Chicago colorway, size 10, with original box.',
    category: 'Sneakers',
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop',
    ],
    hostId: 'host-2',
    host: mockHosts[1],
    type: 'penny',
    status: 'ending_soon',
    currentPrice: 8900,
    minIncrement: 100,
    startTime: new Date(Date.now() - 7200000),
    endTime: new Date(Date.now() + 300000),
    estimatedEndTime: new Date(Date.now() + 300000),
    bidCount: 156,
    viewerCount: 789,
    streamUrl: 'https://stream.snaggle.fun/auction-2',
    chatRoomId: 'chat-auction-2',
    tags: ['sneakers', 'jordan', 'vintage', 'basketball'],
    isSponsored: true,
    metadata: {
      retailValue: 15000,
      condition: 'Very Good',
      brand: 'Nike',
      model: 'Air Jordan 1',
      year: 1985,
    },
  },
  {
    id: 'auction-3',
    title: 'Pokémon Base Set Booster Box (1998)',
    description: 'Sealed Pokémon Base Set booster box from 1998, never opened.',
    category: 'Trading Cards',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=400&fit=crop',
    ],
    hostId: 'host-1',
    host: mockHosts[0],
    type: 'flash',
    status: 'upcoming',
    currentPrice: 0,
    minIncrement: 500,
    startTime: new Date(Date.now() + 3600000),
    endTime: new Date(Date.now() + 7200000),
    estimatedEndTime: new Date(Date.now() + 7200000),
    bidCount: 0,
    viewerCount: 0,
    chatRoomId: 'chat-auction-3',
    tags: ['pokemon', 'trading-cards', 'sealed', 'vintage'],
    isSponsored: false,
    metadata: {
      retailValue: 50000,
      condition: 'Mint/Sealed',
      brand: 'Pokémon',
      year: 1998,
    },
  },
];

// Mock Bids
export const mockBids: Bid[] = [
  {
    id: 'bid-1',
    auctionId: 'auction-1',
    userId: 'user-1',
    user: mockUsers[0],
    amount: 15750,
    timestamp: new Date(Date.now() - 60000),
    isWinning: true,
    isAutomatic: false,
  },
  {
    id: 'bid-2',
    auctionId: 'auction-1',
    userId: 'user-2',
    user: mockUsers[1],
    amount: 15500,
    timestamp: new Date(Date.now() - 120000),
    isWinning: false,
    isAutomatic: true,
  },
  {
    id: 'bid-3',
    auctionId: 'auction-2',
    userId: 'user-2',
    user: mockUsers[1],
    amount: 8900,
    timestamp: new Date(Date.now() - 30000),
    isWinning: true,
    isAutomatic: false,
  },
];

// Mock Chat Messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    roomId: 'chat-auction-1',
    userId: 'user-1',
    user: mockUsers[0],
    message: 'Beautiful piece! The condition looks amazing 🔥',
    timestamp: new Date(Date.now() - 180000),
    type: 'text',
  },
  {
    id: 'msg-2',
    roomId: 'chat-auction-1',
    userId: 'user-2',
    user: mockUsers[1],
    message: 'I need this for my collection! Going all in 💪',
    timestamp: new Date(Date.now() - 120000),
    type: 'text',
  },
  {
    id: 'msg-3',
    roomId: 'chat-auction-1',
    userId: 'user-3',
    user: mockUsers[2],
    message: '@collector_pro good luck! That bid was smooth',
    timestamp: new Date(Date.now() - 60000),
    type: 'mention',
    metadata: {
      mentionedUsers: ['user-1'],
    },
  },
];

// Mock Activity Feed
export const mockActivityFeed: ActivityFeedItem[] = [
  {
    id: 'activity-1',
    userId: 'user-1',
    user: mockUsers[0],
    type: 'auction_won',
    timestamp: new Date(Date.now() - 3600000),
    data: {
      auctionId: 'auction-1',
      auctionTitle: 'Vintage Rolex Submariner 1965',
      winAmount: 15750,
    },
    privacy: 'public',
  },
  {
    id: 'activity-2',
    userId: 'user-2',
    user: mockUsers[1],
    type: 'item_listed',
    timestamp: new Date(Date.now() - 7200000),
    data: {
      listingId: 'listing-1',
    },
    privacy: 'followers',
  },
  {
    id: 'activity-3',
    userId: 'user-3',
    user: mockUsers[2],
    type: 'achievement_earned',
    timestamp: new Date(Date.now() - 86400000),
    data: {
      achievementId: 'achievement-1',
    },
    privacy: 'public',
  },
];

// Mock Achievements
export const mockAchievements: Achievement[] = [
  {
    id: 'achievement-1',
    name: 'First Win',
    description: 'Win your first auction',
    icon: '🏆',
    category: 'winning',
    tier: 'bronze',
    requirements: [
      { type: 'auctions_won', value: 1 },
    ],
    reward: {
      credits: 100,
      badge: 'first-winner',
    },
  },
  {
    id: 'achievement-2',
    name: 'Big Spender',
    description: 'Spend over $10,000 in auctions',
    icon: '💎',
    category: 'bidding',
    tier: 'gold',
    requirements: [
      { type: 'total_spent', value: 10000 },
    ],
    reward: {
      credits: 1000,
      stakingBonus: 500,
    },
  },
  {
    id: 'achievement-3',
    name: 'Social Butterfly',
    description: 'Follow 100 other users',
    icon: '🦋',
    category: 'social',
    tier: 'silver',
    requirements: [
      { type: 'following_count', value: 100 },
    ],
    reward: {
      credits: 250,
    },
  },
];

// Mock Leaderboards
export const mockLeaderboards: Record<string, LeaderboardEntry[]> = {
  wins: [
    {
      rank: 1,
      userId: 'user-2',
      user: mockUsers[1],
      score: 89,
      change: 2,
      period: 'weekly',
      category: 'wins',
    },
    {
      rank: 2,
      userId: 'user-1',
      user: mockUsers[0],
      score: 47,
      change: -1,
      period: 'weekly',
      category: 'wins',
    },
    {
      rank: 3,
      userId: 'user-3',
      user: mockUsers[2],
      score: 12,
      change: 0,
      period: 'weekly',
      category: 'wins',
    },
  ],
  value: [
    {
      rank: 1,
      userId: 'user-2',
      user: mockUsers[1],
      score: 31200,
      change: 1,
      period: 'weekly',
      category: 'value',
    },
    {
      rank: 2,
      userId: 'user-1',
      user: mockUsers[0],
      score: 8900,
      change: -1,
      period: 'weekly',
      category: 'value',
    },
    {
      rank: 3,
      userId: 'user-3',
      user: mockUsers[2],
      score: 450,
      change: 0,
      period: 'weekly',
      category: 'value',
    },
  ],
};

// Mock Listings
export const mockListings: Listing[] = [
  {
    id: 'listing-1',
    sellerId: 'user-2',
    seller: mockUsers[1],
    title: 'Apple iPhone 14 Pro - Space Black',
    description: 'Like new iPhone 14 Pro, won from Snaggle auction last month.',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop',
    ],
    price: 950,
    originalWinPrice: 750,
    condition: 'Like New',
    category: 'Electronics',
    status: 'active',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
    tags: ['iphone', 'apple', 'smartphone'],
  },
];

// Mock Challenges
export const mockChallenges: Challenge[] = [
  {
    id: 'challenge-1',
    name: 'Win Streak Master',
    description: 'Win 5 auctions in a row',
    type: 'streak',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    requirements: [
      { description: 'Win 5 consecutive auctions', target: 5, current: 2 },
    ],
    rewards: [
      { tier: 1, description: '1000 bonus credits', credits: 1000 },
      { tier: 2, description: 'Streak Master badge', achievement: 'streak-master' },
    ],
    participants: 1247,
    status: 'active',
  },
  {
    id: 'challenge-2',
    name: 'January Collector',
    description: 'Win auctions worth $5000+ in January',
    type: 'volume',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    requirements: [
      { description: 'Win auctions totaling $5000+', target: 5000, current: 2340 },
    ],
    rewards: [
      { tier: 1, description: '2000 bonus credits', credits: 2000 },
      { tier: 2, description: 'VIP auction access', achievement: 'vip-collector' },
    ],
    participants: 856,
    status: 'active',
  },
];

// Export organized mock data for easy access
export const mockData = {
  users: mockUsers,
  auctions: mockAuctions,
  hosts: mockHosts,
  bids: mockBids,
  chatMessages: mockChatMessages,
  activityFeed: mockActivityFeed,
  achievements: mockAchievements,
  leaderboards: mockLeaderboards,
  listings: mockListings,
  challenges: mockChallenges,
};