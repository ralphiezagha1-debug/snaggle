import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Edit, Save, X, Shield, Trophy, Clock } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA 94107",
    bio: "Passionate collector of vintage guitars and modern art pieces.",
  });

  // Mock user stats
  const stats = {
    totalBids: 157,
    itemsWon: 23,
    successRate: 85,
    memberSince: "March 2023",
    totalSpent: 45670,
    currentWatching: 12,
  };

  // Mock recent activity
  const recentActivity = [
    { type: "won", item: "Vintage Gibson Les Paul", amount: 8750, date: "2 days ago" },
    { type: "bid", item: "Original Banksy Art", amount: 15420, date: "3 days ago" },
    { type: "watched", item: "Rolex Submariner", date: "5 days ago" },
    { type: "bid", item: "First Edition Harry Potter", amount: 3200, date: "1 week ago" },
  ];

  const handleSave = () => {
    // TODO: Save profile changes
    setIsEditing(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "won":
        return <Trophy className="h-4 w-4 text-primary" />;
      case "bid":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "watched":
        return <User className="h-4 w-4 text-muted-foreground" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "won":
        return "text-primary";
      case "bid":
        return "text-blue-500";
      case "watched":
        return "text-muted-foreground";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your account and view your auction activity</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-gradient-card border-card-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Your personal details and account information</CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                  >
                    {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-6 mb-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder-avatar.png" />
                      <AvatarFallback className="text-lg bg-primary/10">
                        {profile.firstName[0]}{profile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <Shield className="h-3 w-3" />
                          <span>Verified</span>
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Member since {stats.memberSince}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          value={profile.address}
                          onChange={(e) => setProfile({...profile, address: e.target.value})}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        disabled={!isEditing}
                        placeholder="Tell us about your collecting interests..."
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={handleSave} className="glow-green-hover">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Activity Tabs */}
              <Card className="bg-gradient-card border-card-border">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest bidding activity and wins</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="recent" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="recent">Recent</TabsTrigger>
                      <TabsTrigger value="wins">Wins</TabsTrigger>
                      <TabsTrigger value="bids">Active Bids</TabsTrigger>
                    </TabsList>
                    <TabsContent value="recent" className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getActivityIcon(activity.type)}
                            <div>
                              <p className="font-medium">{activity.item}</p>
                              <p className="text-sm text-muted-foreground">{activity.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {activity.amount && (
                              <p className={`font-semibold ${getActivityColor(activity.type)}`}>
                                ${activity.amount.toLocaleString()}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground capitalize">{activity.type}</p>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="wins">
                      <p className="text-muted-foreground text-center py-8">
                        Your auction wins will appear here
                      </p>
                    </TabsContent>
                    <TabsContent value="bids">
                      <p className="text-muted-foreground text-center py-8">
                        Your active bids will appear here
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-6">
              {/* Account Stats */}
              <Card className="bg-gradient-card border-card-border">
                <CardHeader>
                  <CardTitle>Account Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Bids</span>
                    <span className="font-semibold">{stats.totalBids}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items Won</span>
                    <span className="font-semibold text-primary">{stats.itemsWon}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="font-semibold">{stats.successRate}%</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Spent</span>
                    <span className="font-semibold">${stats.totalSpent.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Watching</span>
                    <span className="font-semibold">{stats.currentWatching}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-card border-card-border">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    View Public Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Notification Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Security Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="bg-gradient-hero border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary">🥇</Badge>
                    <div>
                      <p className="font-medium text-sm">First Win</p>
                      <p className="text-xs text-muted-foreground">Won your first auction</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary">🔥</Badge>
                    <div>
                      <p className="font-medium text-sm">Hot Bidder</p>
                      <p className="text-xs text-muted-foreground">Placed 100+ bids</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary">⭐</Badge>
                    <div>
                      <p className="font-medium text-sm">Verified Member</p>
                      <p className="text-xs text-muted-foreground">Account verified</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;