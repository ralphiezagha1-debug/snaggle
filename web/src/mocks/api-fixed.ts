import { ApiResponse, PaginatedResponse } from '../lib/api/types';
import { mockAuctions, mockUsers, mockBids, mockChatMessages, mockActivityFeed, mockAchievements, mockLeaderboards, mockListings, mockChallenges } from './data';

export const mockApiResponse = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 50));
  
  const method = options.method || 'GET';
  const url = new URL(endpoint, 'https://api.snaggle.fun');
  const path = url.pathname;
  const searchParams = url.searchParams;

  try {
    if (path.startsWith('/auctions')) {
      if (path === '/auctions/live') {
        const liveAuctions = mockAuctions.filter(a => a.status === 'live');
        return createPaginatedResponse(liveAuctions, searchParams);
      }
      if (path === '/auctions/ending') {
        const endingAuctions = mockAuctions.filter(a => a.status === 'ending_soon');
        return createPaginatedResponse(endingAuctions, searchParams);
      }
      if (path === '/auctions/upcoming') {
        const upcomingAuctions = mockAuctions.filter(a => a.status === 'upcoming');
        return createPaginatedResponse(upcomingAuctions, searchParams);
      }
      if (path.match(/^\/auctions\/([a-zA-Z0-9-]+)$/)) {
        const id = path.split('/')[2];
        const auction = mockAuctions.find(a => a.id === id);
        return { success: true, data: auction };
      }
    }
    
    if (path.startsWith('/users')) {
      if (path.match(/^\/users\/([a-zA-Z0-9-]+)\/profile$/)) {
        const id = path.split('/')[2];
        const user = mockUsers.find(u => u.id === id);
        return { success: true, data: user };
      }
    }
    
    if (path.startsWith('/chat')) {
      if (path.match(/^\/chat\/([a-zA-Z0-9-]+)\/messages$/)) {
        const roomId = path.split('/')[2];
        const roomMessages = mockChatMessages.filter(m => m.roomId === roomId);
        return createPaginatedResponse(roomMessages, searchParams);
      }
    }
    
    if (path === '/feed') {
      return createPaginatedResponse(mockActivityFeed, searchParams);
    }
    
    if (path.startsWith('/leaderboards')) {
      if (path.match(/^\/leaderboards\/([a-zA-Z0-9_]+)$/)) {
        const category = path.split('/')[2];
        const leaderboard = mockLeaderboards[category] || mockLeaderboards.wins;
        return createPaginatedResponse(leaderboard, searchParams);
      }
    }

    return { success: true, data: [] };
  } catch (error) {
    return { success: false, message: 'Mock error', data: null };
  }
};

const createPaginatedResponse = (data: any[], params: URLSearchParams): PaginatedResponse<any> => {
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