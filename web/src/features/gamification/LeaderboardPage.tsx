import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, TrendingUp, DollarSign, Target, Crown, Medal, Award } from 'lucide-react';
import { useLeaderboard } from '@/lib/api/hooks';


export const LeaderboardPage: React.FC = () => {
  const { data: winsLeaderboard, isLoading: winsLoading } = useLeaderboard('wins', 'weekly');
  const { data: valueLeaderboard, isLoading: valueLoading } = useLeaderboard('value', 'weekly');
  const { data: profitsLeaderboard, isLoading: profitsLoading } = useLeaderboard('profits', 'weekly');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30";
      default:
        return "";
    }
  };

  const LeaderboardList = ({ data, isLoading, scoreLabel, scoreIcon }: any) => {
    if (isLoading) {
      return <div>Loading leaderboard...</div>;
    }

    return (
      <div className="space-y-3">
        {data?.map((entry: any) => (
          <Card key={entry.userId} className={`${getRankColor(entry.rank)} transition-all hover:shadow-md`}>
            <CardContent className="pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  {getRankIcon(entry.rank)}
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={entry.user.avatar} alt={entry.user.displayName} />
                    <AvatarFallback>{entry.user.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{entry.user.displayName}</h3>
                    {entry.user.verified && <Badge variant="default" className="text-xs">Verified</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">@{entry.user.username}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {scoreIcon}
                    <span className="text-lg font-bold text-snaggle-accent">{entry.score}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{scoreLabel}</p>
                  {entry.change > 0 && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      +{entry.change}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Leaderboards</h1>
          <p className="text-muted-foreground">See who's dominating Snaggle this week</p>
        </div>

        {/* Period Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-snaggle-accent" />
              Weekly Champions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
                <CardContent className="pt-4 text-center">
                  <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Most Wins</h3>
                  <p className="text-2xl font-bold text-snaggle-accent">147</p>
                  <p className="text-sm text-muted-foreground">by @AuctionKing</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20">
                <CardContent className="pt-4 text-center">
                  <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Highest Value</h3>
                  <p className="text-2xl font-bold text-snaggle-accent">$45,892</p>
                  <p className="text-sm text-muted-foreground">by @BigSpender</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20">
                <CardContent className="pt-4 text-center">
                  <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Best Profits</h3>
                  <p className="text-2xl font-bold text-snaggle-accent">$12,456</p>
                  <p className="text-sm text-muted-foreground">by @SmartBidder</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="wins" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="wins" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Most Wins
            </TabsTrigger>
            <TabsTrigger value="value" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Highest Value
            </TabsTrigger>
            <TabsTrigger value="profits" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Best Profits
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="wins">
            <LeaderboardList
              data={winsLeaderboard}
              isLoading={winsLoading}
              scoreLabel="wins this week"
              scoreIcon={<Trophy className="w-4 h-4 text-snaggle-accent" />}
            />
          </TabsContent>
          
          <TabsContent value="value">
            <LeaderboardList
              data={valueLeaderboard}
              isLoading={valueLoading}
              scoreLabel="total value"
              scoreIcon={<DollarSign className="w-4 h-4 text-snaggle-accent" />}
            />
          </TabsContent>
          
          <TabsContent value="profits">
            <LeaderboardList
              data={profitsLeaderboard}
              isLoading={profitsLoading}
              scoreLabel="profit this week"
              scoreIcon={<TrendingUp className="w-4 h-4 text-snaggle-accent" />}
            />
          </TabsContent>
        </Tabs>

        {/* Your Rank Card */}
        <Card className="bg-gradient-to-r from-snaggle-primary/5 to-snaggle-accent/5 border-snaggle-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Your Weekly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Wins Rank</p>
                <p className="text-2xl font-bold">#42</p>
                <p className="text-xs text-green-600">↑ 5 from last week</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Value Rank</p>
                <p className="text-2xl font-bold">#28</p>
                <p className="text-xs text-green-600">↑ 12 from last week</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Profit Rank</p>
                <p className="text-2xl font-bold">#15</p>
                <p className="text-xs text-red-600">↓ 3 from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};