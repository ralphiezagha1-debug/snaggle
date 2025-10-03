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
  ApiResponse,
  PaginatedResponse,
  BidRequest,
  SearchQuery,
  AuctionFilters
} from './types';

// API Client Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.snaggle.fun';
const API_MODE = import.meta.env.VITE_API_MODE || 'mock';

class ApiClient {
  private baseUrl: string;
  private mode: 'mock' | 'live';

  constructor(baseUrl: string = API_BASE_URL, mode: 'mock' | 'live' = API_MODE as any) {
    this.baseUrl = baseUrl;
    this.mode = mode;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    if (this.mode === 'mock') {
      // Import and use mock data
      const { mockApiResponse } = await import('../../mocks/api');
      return mockApiResponse(endpoint, options) as Promise<ApiResponse<T>>;
    }

    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Live Auctions API
  async getLiveAuctions(filters?: AuctionFilters): Promise<PaginatedResponse<Auction>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, Array.isArray(value) ? value.join(',') : String(value));
        }
      });
    }
    const response = await this.request<Auction[]>(`/auctions/live?${params}`);
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 20, total: 0, hasMore: false }
    } as PaginatedResponse<Auction>;
  }

  async getEndingSoonAuctions(): Promise<PaginatedResponse<Auction>> {
    const response = await this.request<Auction[]>('/auctions/ending');
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 20, total: 0, hasMore: false }
    } as PaginatedResponse<Auction>;
  }

  async getUpcomingAuctions(): Promise<PaginatedResponse<Auction>> {
    const response = await this.request<Auction[]>('/auctions/upcoming');
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 20, total: 0, hasMore: false }
    } as PaginatedResponse<Auction>;
  }

  async getAuction(id: string): Promise<ApiResponse<Auction>> {
    return this.request<Auction>(`/auctions/${id}`);
  }

  async searchAuctions(query: SearchQuery): Promise<PaginatedResponse<Auction>> {
    const response = await this.request<Auction[]>('/auctions/search', {
      method: 'POST',
      body: JSON.stringify(query),
    });
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 20, total: 0, hasMore: false }
    } as PaginatedResponse<Auction>;
  }

  // Bidding API
  async placeBid(bidRequest: BidRequest): Promise<ApiResponse<Bid>> {
    return this.request<Bid>(`/auctions/${bidRequest.auctionId}/bid`, {
      method: 'POST',
      body: JSON.stringify(bidRequest),
    });
  }

  async getBidHistory(auctionId: string): Promise<PaginatedResponse<Bid>> {
    const response = await this.request<Bid[]>(`/auctions/${auctionId}/bids`);
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 20, total: 0, hasMore: false }
    } as PaginatedResponse<Bid>;
  }

  async getUserBids(userId: string): Promise<PaginatedResponse<Bid>> {
    const response = await this.request<Bid[]>(`/users/${userId}/bids`);
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 20, total: 0, hasMore: false }
    } as PaginatedResponse<Bid>;
  }

  // Chat API
  async getChatMessages(roomId: string, limit = 50): Promise<PaginatedResponse<ChatMessage>> {
    const response = await this.request<ChatMessage[]>(`/chat/${roomId}/messages?limit=${limit}`);
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 20, total: 0, hasMore: false }
    } as PaginatedResponse<ChatMessage>;
  }

  async sendChatMessage(roomId: string, message: string): Promise<ApiResponse<ChatMessage>> {
    return this.request<ChatMessage>(`/chat/${roomId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // User & Profile API
  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`);
  }

  async getUserProfile(id: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}/profile`);
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>('/users/me/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Social Features API
  async followUser(userId: string): Promise<ApiResponse<boolean>> {
    return this.request<boolean>(`/users/${userId}/follow`, {
      method: 'POST',
    });
  }

  async unfollowUser(userId: string): Promise<ApiResponse<boolean>> {
    return this.request<boolean>(`/users/${userId}/follow`, {
      method: 'DELETE',
    });
  }

  async getFollowers(userId: string): Promise<PaginatedResponse<User>> {
    const response = await this.request<User[]>(`/users/${userId}/followers`);
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 20, total: 0, hasMore: false }
    } as PaginatedResponse<User>;
  }

  async getFollowing(userId: string): Promise<PaginatedResponse<User>> {
    const response = await this.request<User[]>(`/users/${userId}/following`);
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 20, total: 0, hasMore: false }
    } as PaginatedResponse<User>;
  }

  async getActivityFeed(page = 1, limit = 20): Promise<PaginatedResponse<ActivityFeedItem>> {
    const response = await this.request<ActivityFeedItem[]>(`/feed?page=${page}&limit=${limit}`);
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 20, total: 0, hasMore: false }
    } as PaginatedResponse<ActivityFeedItem>;
  }

  // Achievements API
  async getUserAchievements(userId: string): Promise<PaginatedResponse<Achievement>> {
    const response = await this.request<Achievement[]>(`/users/${userId}/achievements`);
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 20, total: 0, hasMore: false }
    } as PaginatedResponse<Achievement>;
  }

  async getAllAchievements(): Promise<PaginatedResponse<Achievement>> {
    const response = await this.request<Achievement[]>('/achievements');
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 20, total: 0, hasMore: false }
    } as PaginatedResponse<Achievement>;
  }

  // Leaderboards API
  async getLeaderboard(
    category: string, 
    period: string, 
    limit = 100
  ): Promise<PaginatedResponse<LeaderboardEntry>> {
    const response = await this.request<LeaderboardEntry[]>(
      `/leaderboards/${category}?period=${period}&limit=${limit}`
    );
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 100, total: 0, hasMore: false }
    } as PaginatedResponse<LeaderboardEntry>;
  }

  // Marketplace API
  async getListings(filters?: any): Promise<PaginatedResponse<Listing>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }
    const response = await this.request<Listing[]>(`/listings?${params}`);
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 20, total: 0, hasMore: false }
    } as PaginatedResponse<Listing>;
  }

  async createListing(listing: Partial<Listing>): Promise<ApiResponse<Listing>> {
    return this.request<Listing>('/listings', {
      method: 'POST',
      body: JSON.stringify(listing),
    });
  }

  async relistItem(itemId: string, price: number): Promise<ApiResponse<Listing>> {
    return this.request<Listing>('/listings/relist', {
      method: 'POST',
      body: JSON.stringify({ itemId, price }),
    });
  }

  // Challenges API
  async getChallenges(): Promise<PaginatedResponse<Challenge>> {
    const response = await this.request<Challenge[]>('/challenges');
    return {
      ...response,
      meta: response.meta || { page: 1, limit: 20, total: 0, hasMore: false }
    } as PaginatedResponse<Challenge>;
  }

  async joinChallenge(challengeId: string): Promise<ApiResponse<boolean>> {
    return this.request<boolean>(`/challenges/${challengeId}/join`, {
      method: 'POST',
    });
  }

  // Sharing API
  async shareWin(auctionId: string): Promise<ApiResponse<{ shareUrl: string; clipUrl?: string }>> {
    return this.request<{ shareUrl: string; clipUrl?: string }>(`/auctions/${auctionId}/share`, {
      method: 'POST',
    });
  }

  // Analytics & Insights API
  async getUserInsights(userId: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/users/${userId}/insights`);
  }

  async getAuctionInsights(auctionId: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/auctions/${auctionId}/insights`);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for testing/customization
export { ApiClient };