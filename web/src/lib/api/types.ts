// Core API Types for Snaggle Live + Social

// User & Authentication
export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar?: string;
  verified: boolean;
  createdAt: Date;
  lastActive: Date;
  stats: UserStats;
  preferences: UserPreferences;
}

export interface UserStats {
  totalWins: number;
  totalSpent: number;
  totalEarned: number;
  winRate: number;
  stakingBalance: number;
  creditBalance: number;
  followerCount: number;
  followingCount: number;
}

export interface UserPreferences {
  showBalance: boolean;
  showWins: boolean;
  allowFollows: boolean;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  auctionReminders: boolean;
  socialActivity: boolean;
  winUpdates: boolean;
}

// Live Auctions
export interface Auction {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  hostId: string;
  host: AuctionHost;
  type: AuctionType;
  status: AuctionStatus;
  currentPrice: number;
  minIncrement: number;
  startTime: Date;
  endTime: Date;
  estimatedEndTime: Date;
  bidCount: number;
  viewerCount: number;
  winnerPrize?: string;
  streamUrl?: string;
  chatRoomId: string;
  tags: string[];
  isSponsored: boolean;
  metadata: AuctionMetadata;
}

export type AuctionType = 'penny' | 'vip' | 'flash' | 'mystery';
export type AuctionStatus = 'upcoming' | 'live' | 'ending_soon' | 'ended' | 'cancelled';

export interface AuctionHost {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified: boolean;
  rating: number;
  totalAuctions: number;
}

export interface AuctionMetadata {
  retailValue?: number;
  condition?: string;
  brand?: string;
  model?: string;
  year?: number;
  authentication?: string;
}

// Bidding
export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  user: User;
  amount: number;
  timestamp: Date;
  isWinning: boolean;
  isAutomatic: boolean;
}

export interface BidRequest {
  auctionId: string;
  userId: string;
  increment?: number;
  maxAmount?: number;
}

// Chat & Interaction
export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  user: User;
  message: string;
  timestamp: Date;
  type: MessageType;
  metadata?: MessageMetadata;
}

export type MessageType = 'text' | 'emoji' | 'mention' | 'system' | 'celebration';

export interface MessageMetadata {
  mentionedUsers?: string[];
  emojiId?: string;
  systemEvent?: string;
}

export interface ChatEmoji {
  id: string;
  name: string;
  url: string;
  category: string;
  premium: boolean;
}

// Social Features
export interface Follow {
  id: string;
  followerId: string;
  followeeId: string;
  createdAt: Date;
}

export interface ActivityFeedItem {
  id: string;
  userId: string;
  user: User;
  type: ActivityType;
  timestamp: Date;
  data: ActivityData;
  privacy: PrivacyLevel;
}

export type ActivityType = 
  | 'auction_won' 
  | 'auction_lost' 
  | 'auction_joined' 
  | 'item_listed' 
  | 'item_sold' 
  | 'achievement_earned' 
  | 'follow_user';

export type PrivacyLevel = 'public' | 'followers' | 'private';

export interface ActivityData {
  auctionId?: string;
  auctionTitle?: string;
  winAmount?: number;
  listingId?: string;
  achievementId?: string;
  targetUserId?: string;
}

// Achievements & Gamification
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  tier: AchievementTier;
  requirements: AchievementRequirement[];
  reward?: AchievementReward;
}

export type AchievementCategory = 'bidding' | 'winning' | 'social' | 'trading' | 'special';
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary';

export interface AchievementRequirement {
  type: string;
  value: number;
  timeframe?: string;
}

export interface AchievementReward {
  credits?: number;
  stakingBonus?: number;
  badge?: string;
}

export interface UserAchievement {
  achievementId: string;
  achievement: Achievement;
  earnedAt: Date;
  progress?: number;
}

// Leaderboards
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  user: User;
  score: number;
  change: number;
  period: LeaderboardPeriod;
  category: LeaderboardCategory;
}

export type LeaderboardPeriod = 'daily' | 'weekly' | 'monthly' | 'all_time';
export type LeaderboardCategory = 'wins' | 'value' | 'profits' | 'streaks';

// Marketplace & Resale
export interface Listing {
  id: string;
  sellerId: string;
  seller: User;
  itemId?: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  originalWinPrice?: number;
  condition: string;
  category: string;
  status: ListingStatus;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export type ListingStatus = 'active' | 'sold' | 'removed' | 'expired';

// Challenges & Events
export interface Challenge {
  id: string;
  name: string;
  description: string;
  type: ChallengeType;
  startDate: Date;
  endDate: Date;
  requirements: ChallengeRequirement[];
  rewards: ChallengeReward[];
  participants: number;
  status: ChallengeStatus;
}

export type ChallengeType = 'streak' | 'volume' | 'social' | 'seasonal';
export type ChallengeStatus = 'upcoming' | 'active' | 'ended';

export interface ChallengeRequirement {
  description: string;
  target: number;
  current?: number;
}

export interface ChallengeReward {
  tier: number;
  description: string;
  credits?: number;
  achievement?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  meta?: ResponseMetadata;
}

export interface ResponseMetadata {
  page?: number;
  limit?: number;
  total?: number;
  hasMore?: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: ResponseMetadata;
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Filter & Search Types
export interface AuctionFilters {
  categories?: string[];
  types?: AuctionType[];
  priceRange?: [number, number];
  status?: AuctionStatus[];
  hostIds?: string[];
  tags?: string[];
  sortBy?: AuctionSortBy;
  sortOrder?: 'asc' | 'desc';
}

export type AuctionSortBy = 'ending_soon' | 'most_watched' | 'price_low' | 'price_high' | 'newest';

export interface SearchQuery {
  query?: string;
  filters?: AuctionFilters;
  page?: number;
  limit?: number;
}

// Real-time Event Types
export interface RealtimeEvent {
  type: EventType;
  timestamp: Date;
  data: any;
}

export type EventType = 
  | 'bid_placed' 
  | 'auction_ended' 
  | 'chat_message' 
  | 'user_joined' 
  | 'user_left' 
  | 'timer_extended'
  | 'winner_announced';