import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { UserPlus, MessageCircle, Trophy, DollarSign, Target, Star } from 'lucide-react';
import { useUserProfile, useUserAchievements } from '@/lib/api/hooks';

interface ProfilePageProps {
  userId: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  const { data: user, isLoading: userLoading } = useUserProfile(userId);
  const { data: achievements, isLoading: achievementsLoading } = useUserAchievements(userId);

  if (userLoading) {
    return <div className="container mx-auto px-4 py-6">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center py-8">User not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-24 h-24 mx-auto md:mx-0">
              <AvatarImage src={user.avatar} alt={user.displayName} />
              <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{user.displayName}</h1>
                {user.verified && <Badge variant="default">Verified</Badge>}
              </div>
              <p className="text-muted-foreground mb-4">@{user.username}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <div className="text-center">
                  <div className="font-bold text-lg">{user.stats.followerCount}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{user.stats.followingCount}</div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{user.stats.totalWins}</div>
                  <div className="text-sm text-muted-foreground">Wins</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{(user.stats.winRate * 100).toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                </div>
              </div>
              
              <div className="flex gap-2 justify-center md:justify-start">
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Follow
                </Button>
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-snaggle-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Total Wins</p>
                <p className="text-2xl font-bold">{user.stats.totalWins}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-snaggle-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">${user.stats.totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-snaggle-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-2xl font-bold">{(user.stats.winRate * 100).toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-snaggle-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Credit Balance</p>
                <p className="text-2xl font-bold">{user.stats.creditBalance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Tabs */}
      <Tabs defaultValue="wins" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="wins">Recent Wins</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="wins" className="space-y-4">
          <div className="grid gap-4">
            {/* Mock recent wins */}
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-snaggle-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Premium Electronics Auction #{i}</h3>
                      <p className="text-muted-foreground">Won 2 days ago</p>
                      <p className="text-snaggle-accent font-semibold">Final bid: $45.67</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          {achievementsLoading ? (
            <div>Loading achievements...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements?.map((achievement) => (
                <Card key={achievement.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-semibold">{achievement.name}</h3>
                        <p className="text-muted-foreground text-sm">{achievement.description}</p>
                        <Badge variant="secondary" className="mt-1">
                          {achievement.tier}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="listings" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            No active listings
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};