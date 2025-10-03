import { ApiResponse, PaginatedResponse } from '../lib/api/types';
import { 
  mockAuctions, 
  mockUsers, 
  mockBids, 
  mockChatMessages, 
  mockActivityFeed, 
  mockAchievements, 
  mockLeaderboards, 
  mockListings, 
  mockChallenges 
} from './data';

// Mock API response handler
export const mockApiResponse = async (
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<any>> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 100));

  const method = options.method || 'GET';
  const url = new URL(endpoint, 'https://api.snaggle.fun');
  const path = url.pathname;
  const searchParams = url.searchParams;

  console.log(`Mock API ${method} ${path}`, { searchParams: Object.fromEntries(searchParams) });

  try {
    // Route to appropriate mock handler
    if (path.startsWith('/auctions')) {
      return handleAuctionRoutes(path, method, searchParams, options);
    }
    
    if (path.startsWith('/users')) {
      return handleUserRoutes(path, method, searchParams, options);
    }
    
    if (path.startsWith('/chat')) {
      return handleChatRoutes(path, method, searchParams, options);
    }
    
    if (path.startsWith('/feed')) {
      return handleFeedRoutes(path, method, searchParams, options);
    }
    
    if (path.startsWith('/leaderboards')) {
      return handleLeaderboardRoutes(path, method, searchParams, options);
    }
    
    if (path.startsWith('/listings')) {
      return handleListingRoutes(path, method, searchParams, options);
    }
    
    if (path.startsWith('/challenges')) {
      return handleChallengeRoutes(path, method, searchParams, options);
    }
    
    if (path.startsWith('/achievements')) {
      return handleAchievementRoutes(path, method, searchParams, options);
    }

    throw new Error(`Mock endpoint not implemented: ${path}`);
  } catch (error) {
    console.error('Mock API error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      data: null as any,
    };
  }
};

// Auction route handlers
const handleAuctionRoutes = (
  path: string, 
  method: string, 
  params: URLSearchParams,
  options: RequestInit
): ApiResponse<any> => {
  if (path === '/auctions/live') {
    const liveAuctions = mockAuctions.filter(a => a.status === 'live');
    return createPaginatedResponse(liveAuctions, params) as any;
  }
  
  if (path === '/auctions/ending') {
    const endingAuctions = mockAuctions.filter(a => a.status === 'ending_soon');
    return createPaginatedResponse(endingAuctions, params);
  }
  
  if (path === '/auctions/upcoming') {
    const upcomingAuctions = mockAuctions.filter(a => a.status === 'upcoming');
    return createPaginatedResponse(upcomingAuctions, params);
  }
  
  if (path.match(/^\/auctions\/([a-zA-Z0-9-]+)$/)) {
    const id = path.split('/')[2];
    const auction = mockAuctions.find(a => a.id === id);
    if (!auction) {
      throw new Error('Auction not found');
    }
    return { success: true, data: auction };
  }
  
  if (path.match(/^\/auctions\/([a-zA-Z0-9-]+)\/bid$/) && method === 'POST') {
    // Mock bid placement
    const auctionId = path.split('/')[2];
    const mockBid = mockBids.find(b => b.auctionId === auctionId);
    return { success: true, data: mockBid };
  }
  
  if (path.match(/^\/auctions\/([a-zA-Z0-9-]+)\/bids$/)) {
    const auctionId = path.split('/')[2];
    const auctionBids = mockBids.filter(b => b.auctionId === auctionId);
    return createPaginatedResponse(auctionBids, params);
  }
  
  if (path === '/auctions/search' && method === 'POST') {
    // Mock search - return filtered auctions
    const filteredAuctions = mockAuctions.slice(0, 10); // Simple mock
    return createPaginatedResponse(filteredAuctions, params);
  }

  throw new Error(`Auction route not implemented: ${path}`);
};

// User route handlers
const handleUserRoutes = (
  path: string, 
  method: string, 
  params: URLSearchParams,
  options: RequestInit
): ApiResponse<any> => {
  if (path.match(/^\/users\/([a-zA-Z0-9-]+)$/)) {
    const id = path.split('/')[2];
    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return { success: true, data: user };
  }
  
  if (path.match(/^\/users\/([a-zA-Z0-9-]+)\/profile$/)) {
    const id = path.split('/')[2];
    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return { success: true, data: user };
  }
  
  if (path.match(/^\/users\/([a-zA-Z0-9-]+)\/achievements$/)) {
    const userId = path.split('/')[2];
    const userAchievements = mockAchievements.filter(a => a.id.includes(userId));
    return createPaginatedResponse(userAchievements, params) as any;
  }
  
  if (path.match(/^\/users\/([a-zA-Z0-9-]+)\/followers$/)) {
    const followers = mockUsers.slice(0, 5); // Mock followers
    return createPaginatedResponse(followers, params) as any;
  }
  
  if (path.match(/^\/users\/([a-zA-Z0-9-]+)\/following$/)) {
    const following = mockUsers.slice(2, 7); // Mock following
    return createPaginatedResponse(following, params) as any;
  }
  
  if (path.match(/^\/users\/([a-zA-Z0-9-]+)\/follow$/) && method === 'POST') {
    return { success: true, data: true };
  }
  
  if (path.match(/^\/users\/([a-zA-Z0-9-]+)\/follow$/) && method === 'DELETE') {
    return { success: true, data: true };
  }

  throw new Error(`User route not implemented: ${path}`);
};

// Chat route handlers
const handleChatRoutes = (
  path: string, 
  method: string, 
  params: URLSearchParams,
  options: RequestInit
): ApiResponse<any> => {
  if (path.match(/^\/chat\/([a-zA-Z0-9-]+)\/messages$/)) {
    const roomId = path.split('/')[2];
    const roomMessages = mockChatMessages.filter(m => m.roomId === roomId);
    return createPaginatedResponse(roomMessages, params) as any;
  }
  
  if (path.match(/^\/chat\/([a-zA-Z0-9-]+)\/messages$/) && method === 'POST') {
    // Mock message sending
    const roomId = path.split('/')[2];
    const mockMessage = mockChatMessages[0];
    return { success: true, data: { ...mockMessage, roomId } };
  }

  throw new Error(`Chat route not implemented: ${path}`);
};

// Feed route handlers
const handleFeedRoutes = (
  path: string, 
  method: string, 
  params: URLSearchParams,
  options: RequestInit
): ApiResponse<any> => {
  if (path === '/feed') {
    return createPaginatedResponse(mockActivityFeed, params) as any;
  }

  throw new Error(`Feed route not implemented: ${path}`);
};

// Leaderboard route handlers
const handleLeaderboardRoutes = (
  path: string, 
  method: string, 
  params: URLSearchParams,
  options: RequestInit
): ApiResponse<any> => {
  if (path.match(/^\/leaderboards\/([a-zA-Z0-9_]+)$/)) {
    const category = path.split('/')[2];
    const period = params.get('period') || 'weekly';
    const leaderboard = mockLeaderboards[category] || mockLeaderboards.wins;
    return createPaginatedResponse(leaderboard, params) as any;
  }

  throw new Error(`Leaderboard route not implemented: ${path}`);
};

// Listing route handlers
const handleListingRoutes = (
  path: string, 
  method: string, 
  params: URLSearchParams,
  options: RequestInit
): ApiResponse<any> => {
  if (path === '/listings') {
    return createPaginatedResponse(mockListings, params) as any;
  }
  
  if (path === '/listings' && method === 'POST') {
    const mockListing = mockListings[0];
    return { success: true, data: mockListing };
  }
  
  if (path === '/listings/relist' && method === 'POST') {
    const mockListing = mockListings[0];
    return { success: true, data: mockListing };
  }

  throw new Error(`Listing route not implemented: ${path}`);
};

// Challenge route handlers
const handleChallengeRoutes = (
  path: string, 
  method: string, 
  params: URLSearchParams,
  options: RequestInit
): ApiResponse<any> => {
  if (path === '/challenges') {
    return createPaginatedResponse(mockChallenges, params) as any;
  }
  
  if (path.match(/^\/challenges\/([a-zA-Z0-9-]+)\/join$/) && method === 'POST') {
    return { success: true, data: true };
  }

  throw new Error(`Challenge route not implemented: ${path}`);
};

// Achievement route handlers
const handleAchievementRoutes = (
  path: string, 
  method: string, 
  params: URLSearchParams,
  options: RequestInit
): ApiResponse<any> => {
  if (path === '/achievements') {
    return createPaginatedResponse(mockAchievements, params) as any;
  }

  throw new Error(`Achievement route not implemented: ${path}`);
};

// Helper function to create paginated responses
const createPaginatedResponse = <T>(
  data: T[], 
  params: URLSearchParams
): PaginatedResponse<T> => {
  const page = parseInt(params.get('page') || '1');
  const limit = parseInt(params.get('limit') || '20');
  const offset = (page - 1) * limit;
  
  const paginatedData = data.slice(offset, offset + limit);
  
  return {
    success: true,
    data: paginatedData,
    meta: {
      page,
      limit,
      total: data.length,
      hasMore: offset + limit < data.length,
    },
  };
};