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
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.snaggle.fun';
const API_MODE = process.env.VITE_API_MODE || 'mock';

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
  ): Promise<ApiResponse<T> | PaginatedResponse<T>> {
    if (this.mode === 'mock') {
      const { mockApiResponse } = await import('../../mocks/api');
      return mockApiResponse(endpoint, options);
    }

    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

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
    return this.request<Auction>(`/auctions/live?${params}`) as Promise<PaginatedResponse<Auction>>;
  }

  async getEndingSoonAuctions(): Promise<PaginatedResponse<Auction>> {
    return this.request<Auction>('/auctions/ending') as Promise<PaginatedResponse<Auction>>;
  }

  async getUpcomingAuctions(): Promise<PaginatedResponse<Auction>> {
    return this.request<Auction>('/auctions/upcoming') as Promise<PaginatedResponse<Auction>>;
  }

  async getAuction(id: string): Promise<ApiResponse<Auction>> {
    return this.request<Auction>(`/auctions/${id}`) as Promise<ApiResponse<Auction>>;
  }

  async searchAuctions(query: SearchQuery): Promise<PaginatedResponse<Auction>> {
    return this.request<Auction>('/auctions/search', {
      method: 'POST',
      body: JSON.stringify(query),
    }) as Promise<PaginatedResponse<Auction>>;
  }

  // Bidding API
  async placeBid(bidRequest: BidRequest): Promise<ApiResponse<Bid>> {
    return this.request<Bid>(`/auctions/${bidRequest.auctionId}/bid`, {
      method: 'POST',
      body: JSON.stringify(bidRequest),
    }) as Promise<ApiResponse<Bid>>;
  }

  async getBidHistory(auctionId: string): Promise<PaginatedResponse<Bid>> {
    return this.request<Bid>(`/auctions/${auctionId}/bids`) as Promise<PaginatedResponse<Bid>>;
  }

  async getChatMessages(roomId: string, limit = 50): Promise<PaginatedResponse<ChatMessage>> {
    return this.request<ChatMessage>(`/chat/${roomId}/messages?limit=${limit}`) as Promise<PaginatedResponse<ChatMessage>>;
  }

  async sendChatMessage(roomId: string, message: string): Promise<ApiResponse<ChatMessage>> {
    return this.request<ChatMessage>(`/chat/${roomId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    }) as Promise<ApiResponse<ChatMessage>>;
  }

  async getUserProfile(id: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}/profile`) as Promise<ApiResponse<User>>;
  }

  async followUser(userId: string): Promise<ApiResponse<boolean>> {
    return this.request<boolean>(`/users/${userId}/follow`, {
      method: 'POST',
    }) as Promise<ApiResponse<boolean>>;
  }

  async getActivityFeed(page = 1, limit = 20): Promise<PaginatedResponse<ActivityFeedItem>> {
    return this.request<ActivityFeedItem>(`/feed?page=${page}&limit=${limit}`) as Promise<PaginatedResponse<ActivityFeedItem>>;
  }

  async getLeaderboard(category: string, period: string, limit = 100): Promise<PaginatedResponse<LeaderboardEntry>> {
    return this.request<LeaderboardEntry>(`/leaderboards/${category}?period=${period}&limit=${limit}`) as Promise<PaginatedResponse<LeaderboardEntry>>;
  }

  async shareWin(auctionId: string): Promise<ApiResponse<{ shareUrl: string; clipUrl?: string }>> {
    return this.request<{ shareUrl: string; clipUrl?: string }>(`/auctions/${auctionId}/share`, {
      method: 'POST',
    }) as Promise<ApiResponse<{ shareUrl: string; clipUrl?: string }>>;
  }
}

export const apiClient = new ApiClient();
export { ApiClient };