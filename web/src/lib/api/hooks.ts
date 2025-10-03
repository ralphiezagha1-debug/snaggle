import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from './client';
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
  BidRequest,
  SearchQuery,
  AuctionFilters
} from './types';

// Query Keys
export const queryKeys = {
  auctions: {
    all: ['auctions'] as const,
    live: () => [...queryKeys.auctions.all, 'live'] as const,
    ending: () => [...queryKeys.auctions.all, 'ending'] as const,
    upcoming: () => [...queryKeys.auctions.all, 'upcoming'] as const,
    detail: (id: string) => [...queryKeys.auctions.all, 'detail', id] as const,
    bids: (id: string) => [...queryKeys.auctions.all, 'bids', id] as const,
    search: (query: SearchQuery) => [...queryKeys.auctions.all, 'search', query] as const,
  },
  users: {
    all: ['users'] as const,
    profile: (id: string) => [...queryKeys.users.all, 'profile', id] as const,
    achievements: (id: string) => [...queryKeys.users.all, 'achievements', id] as const,
    bids: (id: string) => [...queryKeys.users.all, 'bids', id] as const,
    followers: (id: string) => [...queryKeys.users.all, 'followers', id] as const,
    following: (id: string) => [...queryKeys.users.all, 'following', id] as const,
  },
  chat: {
    all: ['chat'] as const,
    messages: (roomId: string) => [...queryKeys.chat.all, 'messages', roomId] as const,
  },
  social: {
    all: ['social'] as const,
    feed: () => [...queryKeys.social.all, 'feed'] as const,
  },
  leaderboards: {
    all: ['leaderboards'] as const,
    category: (category: string, period: string) => [...queryKeys.leaderboards.all, category, period] as const,
  },
  marketplace: {
    all: ['marketplace'] as const,
    listings: (filters?: any) => [...queryKeys.marketplace.all, 'listings', filters] as const,
  },
  challenges: {
    all: ['challenges'] as const,
  },
  achievements: {
    all: ['achievements'] as const,
  },
};

// Live Auction Hooks
export const useLiveAuctions = (
  filters?: AuctionFilters,
  options?: UseQueryOptions<any, Error, Auction[]>
) => {
  return useQuery({
    queryKey: queryKeys.auctions.live(),
    queryFn: () => apiClient.getLiveAuctions(filters).then(res => res.data),
    refetchInterval: 5000, // Refresh every 5 seconds for live data
    ...options,
  });
};

export const useEndingSoonAuctions = (options?: UseQueryOptions<any, Error, Auction[]>) => {
  return useQuery({
    queryKey: queryKeys.auctions.ending(),
    queryFn: () => apiClient.getEndingSoonAuctions().then(res => res.data),
    refetchInterval: 10000,
    ...options,
  });
};

export const useUpcomingAuctions = (options?: UseQueryOptions<any, Error, Auction[]>) => {
  return useQuery({
    queryKey: queryKeys.auctions.upcoming(),
    queryFn: () => apiClient.getUpcomingAuctions().then(res => res.data),
    refetchInterval: 30000,
    ...options,
  });
};

export const useAuction = (
  id: string,
  options?: UseQueryOptions<any, Error, Auction>
) => {
  return useQuery({
    queryKey: queryKeys.auctions.detail(id),
    queryFn: () => apiClient.getAuction(id).then(res => res.data),
    refetchInterval: 2000, // Frequent updates for active auctions
    enabled: !!id,
    ...options,
  });
};

export const useSearchAuctions = (
  query: SearchQuery,
  options?: UseQueryOptions<any, Error, Auction[]>
) => {
  return useQuery({
    queryKey: queryKeys.auctions.search(query),
    queryFn: () => apiClient.searchAuctions(query).then(res => res.data),
    enabled: !!(query.query || query.filters),
    ...options,
  });
};

// Bidding Hooks
export const usePlaceBid = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bidRequest: BidRequest) => apiClient.placeBid(bidRequest),
    onSuccess: (data, variables) => {
      // Invalidate auction data to refresh bids and current price
      queryClient.invalidateQueries({ queryKey: queryKeys.auctions.detail(variables.auctionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.auctions.bids(variables.auctionId) });
    },
  });
};

export const useBidHistory = (
  auctionId: string,
  options?: UseQueryOptions<any, Error, Bid[]>
) => {
  return useQuery({
    queryKey: queryKeys.auctions.bids(auctionId),
    queryFn: () => apiClient.getBidHistory(auctionId).then(res => res.data),
    enabled: !!auctionId,
    refetchInterval: 3000,
    ...options,
  });
};

// Chat Hooks
export const useChatMessages = (
  roomId: string,
  options?: UseQueryOptions<any, Error, ChatMessage[]>
) => {
  return useQuery({
    queryKey: queryKeys.chat.messages(roomId),
    queryFn: () => apiClient.getChatMessages(roomId).then(res => res.data),
    enabled: !!roomId,
    refetchInterval: 1000, // Real-time feel
    ...options,
  });
};

export const useSendChatMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ roomId, message }: { roomId: string; message: string }) => 
      apiClient.sendChatMessage(roomId, message),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.messages(variables.roomId) });
    },
  });
};

// User & Profile Hooks
export const useUserProfile = (
  userId: string,
  options?: UseQueryOptions<any, Error, User>
) => {
  return useQuery({
    queryKey: queryKeys.users.profile(userId),
    queryFn: () => apiClient.getUserProfile(userId).then(res => res.data),
    enabled: !!userId,
    ...options,
  });
};

export const useUserAchievements = (
  userId: string,
  options?: UseQueryOptions<any, Error, Achievement[]>
) => {
  return useQuery({
    queryKey: queryKeys.users.achievements(userId),
    queryFn: () => apiClient.getUserAchievements(userId).then(res => res.data),
    enabled: !!userId,
    ...options,
  });
};

// Social Hooks
export const useFollowUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => apiClient.followUser(userId),
    onSuccess: (data, userId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.profile(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.social.feed() });
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => apiClient.unfollowUser(userId),
    onSuccess: (data, userId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.profile(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.social.feed() });
    },
  });
};

export const useActivityFeed = (
  page = 1,
  limit = 20,
  options?: UseQueryOptions<any, Error, ActivityFeedItem[]>
) => {
  return useQuery({
    queryKey: [...queryKeys.social.feed(), page, limit],
    queryFn: () => apiClient.getActivityFeed(page, limit).then(res => res.data),
    ...options,
  });
};

export const useFollowers = (
  userId: string,
  options?: UseQueryOptions<any, Error, User[]>
) => {
  return useQuery({
    queryKey: queryKeys.users.followers(userId),
    queryFn: () => apiClient.getFollowers(userId).then(res => res.data),
    enabled: !!userId,
    ...options,
  });
};

export const useFollowing = (
  userId: string,
  options?: UseQueryOptions<any, Error, User[]>
) => {
  return useQuery({
    queryKey: queryKeys.users.following(userId),
    queryFn: () => apiClient.getFollowing(userId).then(res => res.data),
    enabled: !!userId,
    ...options,
  });
};

// Leaderboard Hooks
export const useLeaderboard = (
  category: string,
  period: string,
  limit = 100,
  options?: UseQueryOptions<any, Error, LeaderboardEntry[]>
) => {
  return useQuery({
    queryKey: queryKeys.leaderboards.category(category, period),
    queryFn: () => apiClient.getLeaderboard(category, period, limit).then(res => res.data),
    refetchInterval: 60000, // Refresh every minute
    ...options,
  });
};

// Marketplace Hooks
export const useListings = (
  filters?: any,
  options?: UseQueryOptions<any, Error, Listing[]>
) => {
  return useQuery({
    queryKey: queryKeys.marketplace.listings(filters),
    queryFn: () => apiClient.getListings(filters).then(res => res.data),
    ...options,
  });
};

export const useCreateListing = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (listing: Partial<Listing>) => apiClient.createListing(listing),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.marketplace.all });
    },
  });
};

export const useRelistItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ itemId, price }: { itemId: string; price: number }) => 
      apiClient.relistItem(itemId, price),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.marketplace.all });
    },
  });
};

// Challenge Hooks
export const useChallenges = (options?: UseQueryOptions<any, Error, Challenge[]>) => {
  return useQuery({
    queryKey: queryKeys.challenges.all,
    queryFn: () => apiClient.getChallenges().then(res => res.data),
    ...options,
  });
};

export const useJoinChallenge = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (challengeId: string) => apiClient.joinChallenge(challengeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.challenges.all });
    },
  });
};

// Achievement Hooks
export const useAllAchievements = (options?: UseQueryOptions<any, Error, Achievement[]>) => {
  return useQuery({
    queryKey: queryKeys.achievements.all,
    queryFn: () => apiClient.getAllAchievements().then(res => res.data),
    ...options,
  });
};

// Sharing Hooks
export const useShareWin = () => {
  return useMutation({
    mutationFn: (auctionId: string) => apiClient.shareWin(auctionId),
  });
};