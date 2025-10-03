# Snaggle Live + Social Features

## Overview
Snaggle Live + Social combines Whatnot-style live auction streaming with Public.com-style social networking to create an engaging auction marketplace experience.

## Features

### 🎥 Live Auctions
- **Live Streaming Rooms**: Video-based auction environments with real-time interaction
- **Smart Bidding**: 1-click bid increments with countdown extensions on last-second bids
- **Auction Types**: Standard penny, high-ticket VIP, flash drops
- **Interactive Elements**: Live chat, emojis, @mentions, host shoutouts, polls/trivia
- **Winner Experience**: Confetti celebrations with social sharing capabilities
- **Discovery**: Now Live, Ending Soon, Upcoming carousels with search/filters

### 👥 Social Layer
- **Rich Profiles**: Portfolio showcasing past wins, resale listings, achievements
- **Follow System**: User-to-user following with personalized activity feeds
- **Achievements**: Badges for Top Bidder, High Roller, Flipper, Win Streaks
- **Social Sharing**: Auto-generated win clips with Snaggle branding

### 🎮 Gamification
- **Leaderboards**: Daily/weekly/monthly rankings by wins, value, profits
- **Challenges**: Streak competitions and seasonal events
- **Referral Program**: Bonus credits and staking boosts for invites
- **Highlight Reels**: Featured wins and top moments

## Routes
- `/live` - Live auctions discovery page
- `/live/:id` - Individual auction room
- `/live/schedule` - Upcoming auctions calendar
- `/feed` - Personalized social activity feed
- `/profiles/:id` - User profile pages
- `/leaderboards` - Ranking and achievements
- `/store` - Resale marketplace

## Component Map

### Live Features (`src/features/live/`)
- `AuctionRoom/` - Main streaming interface
- `BidPanel/` - Bidding controls and history
- `LiveChat/` - Real-time chat system
- `Discovery/` - Auction browsing and filters
- `WinnerOverlay/` - Celebration and sharing modal

### Social Features (`src/features/social/`)
- `Profile/` - User profile components
- `Feed/` - Activity stream
- `Follow/` - Following/followers management
- `Badges/` - Achievement system
- `Leaderboards/` - Ranking displays

### Common Components (`src/components/common/`)
- `Timer/` - Countdown displays
- `Avatar/` - User avatars with status
- `Badge/` - Achievement badges
- `ShareSheet/` - Social sharing modal
- `StreamPlayer/` - Video streaming component

## API Integration

### Data Contracts
All API clients are typed and located in `src/lib/api/`:

```typescript
// Live Auctions
GET /auctions/live|ending|upcoming
GET /auctions/:id
POST /auctions/:id/bid
POST /auctions/:id/chat
POST /auctions/:id/shareWin

// Social
GET /users/:id/profile
POST /users/:id/follow
DELETE /users/:id/follow
GET /feed
POST /listings/relist

// Gamification
GET /leaderboards
GET /challenges
GET /achievements
```

### Mock System
Toggle between mock and live data via environment variable:
```typescript
const API_MODE = process.env.VITE_API_MODE || 'mock';
```

Mock data factories in `src/mocks/` provide realistic test data for all features.

## Design System Updates

### Glow Adjustments
- Reduced glow intensity for optimal text readability (AA contrast compliance)
- Replaced white center glow with subtle green variant
- Maintained Snaggle brand aesthetic while improving accessibility

### Responsive Design
- Mobile-first approach with progressive enhancement
- Optimized layouts for portrait/landscape orientations
- Touch-friendly interaction targets (44px minimum)

## Performance Optimizations
- Lazy loading for video streams and user lists
- Skeleton loading states for all async content
- Image optimization with WebP/AVIF support
- React Query caching for API responses

## Accessibility Features
- Keyboard navigation support
- Screen reader optimized markup
- High contrast focus indicators
- Semantic HTML structure
- ARIA labels for interactive elements

## Known Gaps & Next Steps

### Phase 1 (Current - Frontend Only)
- ✅ UI/UX implementation with mock data
- ✅ Component architecture and routing
- ✅ API client interfaces and type definitions

### Phase 2 (Backend Integration)
- 🔄 Firebase Functions v2 endpoints
- 🔄 Real-time WebSocket connections
- 🔄 Stripe payment integration
- 🔄 SendGrid email notifications

### Phase 3 (Advanced Features)
- 🔄 Video streaming infrastructure
- 🔄 Advanced analytics and insights
- 🔄 AI-powered recommendations
- 🔄 Mobile app development

## Development Guidelines

### File Organization
```
src/
├── features/
│   ├── live/          # Live auction components
│   ├── social/        # Social networking features
│   └── common/        # Shared feature components
├── lib/
│   ├── api/          # API clients and hooks
│   └── utils/        # Utility functions
├── mocks/            # Mock data and factories
└── components/       # Global UI components
```

### TypeScript Standards
- Strict mode enabled
- No `any` types without justification
- Comprehensive interface definitions
- Generic type utilization where appropriate

### Testing Strategy
- Unit tests for utility functions
- Component testing with React Testing Library
- Mock API integration tests
- E2E testing for critical user flows

## Getting Started

1. **Install Dependencies**: All required packages are already included
2. **Environment Setup**: Copy `.env.example` to `.env.local`
3. **Start Development**: `npm run dev`
4. **Switch API Mode**: Set `VITE_API_MODE=live` when backend is ready

## Support & Documentation

For questions or contributions, refer to:
- Component Storybook (coming soon)
- API documentation in `src/lib/api/README.md`
- Design system guide in Figma
- Slack #snaggle-dev channel