import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, ArrowRight, Trophy, Users, Zap, Gift, Crown, Award, Gavel } from "lucide-react";
import { toast } from "@/hooks/use-toast";
const WaitlistLanding = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const [position, setPosition] = useState(0);
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const referralLink = `https://snaggle.fun/ref/${Math.random().toString(36).substring(7)}`;

  // Check localStorage and URL params on mount
  useEffect(() => {
    const joined = localStorage.getItem("snaggle_waitlist_joined");
    const storedPosition = localStorage.getItem("snaggle_waitlist_position");
    const storedReferrals = localStorage.getItem("snaggle_referral_count");
    if (joined === "1" || searchParams.get("joined") === "1") {
      setHasJoined(true);
      if (storedPosition) setPosition(parseInt(storedPosition));
      if (storedReferrals) setReferralCount(parseInt(storedReferrals));
    }
  }, [searchParams]);
  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    // Mock signup - generate random position
    const mockPosition = Math.floor(Math.random() * 1000) + 1;
    setPosition(mockPosition);
    setHasJoined(true);

    // Store in localStorage
    localStorage.setItem("snaggle_waitlist_joined", "1");
    localStorage.setItem("snaggle_waitlist_position", mockPosition.toString());
    localStorage.setItem("snaggle_referral_count", "0");

    // Reload with query param
    window.location.href = "/?joined=1";
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Share with friends to move up in line"
    });
    setTimeout(() => setCopied(false), 2000);
  };
  const handleShare = (platform: string) => {
    const text = encodeURIComponent("Join me on Snaggle - The Penny Auction Reinvented! 🎯");
    const url = encodeURIComponent(referralLink);
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      tiktok: `https://www.tiktok.com/upload?text=${text}`,
      instagram: `https://www.instagram.com/`
    };
    window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
  };
  const rewardTiers = [{
    referrals: 1,
    icon: Users,
    reward: "+5 credits for you",
    subReward: "+3 credits for friend",
    color: "text-emerald-400"
  }, {
    referrals: 3,
    icon: Zap,
    reward: "+15 credits",
    subReward: "Total bonus",
    color: "text-emerald-400"
  }, {
    referrals: 5,
    icon: Award,
    reward: "+25 credits",
    subReward: "Early Access badge",
    color: "text-emerald-300"
  }, {
    referrals: 10,
    icon: Crown,
    reward: "Founding Bidder frame",
    subReward: "Guaranteed Premiere Auction slot",
    color: "text-yellow-400"
  }, {
    referrals: 25,
    icon: Trophy,
    reward: "$25 win reimbursement",
    subReward: "VIP Discord role",
    color: "text-yellow-300"
  }];
  const mockLeaderboard = [{
    rank: 1,
    name: "Alex M.",
    referrals: 47
  }, {
    rank: 2,
    name: "Sarah K.",
    referrals: 38
  }, {
    rank: 3,
    name: "Mike D.",
    referrals: 32
  }, {
    rank: 4,
    name: "Emma L.",
    referrals: 28
  }, {
    rank: 5,
    name: "Chris P.",
    referrals: 24
  }, {
    rank: 6,
    name: "Jordan T.",
    referrals: 21
  }, {
    rank: 7,
    name: "Taylor R.",
    referrals: 19
  }, {
    rank: 8,
    name: "Morgan S.",
    referrals: 16
  }];
  return <div className="min-h-screen bg-snag-gradient">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-3xl font-black text-[#00FF80] logo-glow">
              <Gavel className="h-8 w-8" /> Snaggle
            </div>
            <div className="hidden sm:block text-sm text-white/60">
              The Penny Auction Reinvented
            </div>
          </Link>
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex border-white/20 text-white hover:bg-white/10">
            
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-[#00FF80] hero-glow animate-fade-in">
            Snaggle — The Penny Auction Reinvented
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 animate-fade-in">
            Join the waitlist and be first to win.
          </p>

          {!hasJoined ? <>
              <form onSubmit={handleJoinWaitlist} className="max-w-xl mx-auto space-y-6 animate-scale-in mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 h-14 bg-neutral-900 border-white/20 text-white placeholder:text-white/40 text-lg" />
                  <Button type="submit" size="lg" className="h-14 px-8 text-lg font-bold bg-[#00FF80] hover:bg-[#00FF80]/90 text-black cta-pulse shadow-[0_0_20px_rgba(0,255,128,0.4)]">
                    Join Waitlist
                  </Button>
                </div>
                <p className="text-sm text-white/50">
                  No spam. Early access for the first 1,000 members.
                </p>
              </form>
              
              {/* Primary CTA - Default State */}
              <Button asChild size="lg" variant="outline" className="text-base font-semibold border-[#00FF80]/30 hover:bg-[#00FF80]/10 text-white">
                <Link to="/home">
                  Explore Auctions <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </> : <div className="max-w-2xl mx-auto space-y-8 animate-scale-in">
              {/* Position Card */}
              <Card className="bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 border border-[#00FF80]/30 shadow-[0_0_30px_rgba(0,255,128,0.3)]">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl font-black text-[#00FF80] mb-2 hero-glow">
                    #{position}
                  </div>
                  <p className="text-xl text-white/80 mb-2">
                    You're in line!
                  </p>
                  <p className="text-sm text-white/60 mb-6">
                    {referralCount} referral{referralCount !== 1 ? 's' : ''} so far
                  </p>
                  <Button asChild size="lg" className="bg-[#00FF80] hover:bg-[#00FF80]/90 text-black font-bold shadow-[0_0_20px_rgba(0,255,128,0.4)]">
                    <Link to="/home">
                      Go to Auctions <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Referral Dashboard */}
              <Card className="bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 border border-white/10">
                <CardHeader>
                  <CardTitle className="text-center text-[#00FF80] flex items-center justify-center gap-2">
                    <Gift className="h-6 w-6" />
                    Invite friends to move up and earn rewards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input value={referralLink} readOnly className="flex-1 bg-neutral-800 border-white/20 text-white/60" />
                    <Button onClick={handleCopyLink} variant="outline" size="icon" className="shrink-0 border-[#00FF80]/30 hover:bg-[#00FF80]/10">
                      {copied ? <Check className="h-4 w-4 text-[#00FF80]" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Share Buttons */}
                  <div className="space-y-2">
                    <p className="text-sm text-white/60 text-center">Share on:</p>
                    <div className="flex justify-center gap-3">
                      <Button onClick={() => handleShare("twitter")} variant="outline" size="sm" className="flex items-center gap-2">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        X
                      </Button>
                      <Button onClick={() => handleShare("tiktok")} variant="outline" size="sm" className="flex items-center gap-2">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                        TikTok
                      </Button>
                      <Button onClick={() => handleShare("instagram")} variant="outline" size="sm" className="flex items-center gap-2">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        Instagram
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>}
        </div>
      </section>

      {/* Reward Tiers Section */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Referral Reward Tiers
            </h2>
            <p className="text-lg text-white/70">
              Unlock exclusive rewards as you invite friends
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewardTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            const isUnlocked = referralCount >= tier.referrals;
            return <Card key={tier.referrals} className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${isUnlocked ? "bg-gradient-to-br from-[#00FF80]/20 to-[#00FF80]/5 border-[#00FF80]/50 shadow-[0_0_20px_rgba(0,255,128,0.3)]" : "bg-neutral-900/80 border-white/10 hover:border-[#00FF80]/30"}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${isUnlocked ? "bg-[#00FF80]/20" : "bg-neutral-800"}`}>
                        <IconComponent className={`h-6 w-6 ${isUnlocked ? tier.color : "text-white/40"}`} />
                      </div>
                      <span className={`text-2xl font-bold ${isUnlocked ? "text-[#00FF80]" : "text-white/40"}`}>
                        {tier.referrals}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${isUnlocked ? "text-[#00FF80]" : "text-white"}`}>
                      {tier.reward}
                    </h3>
                    <p className="text-sm text-white/60">
                      {tier.subReward}
                    </p>
                    {isUnlocked && <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#00FF80]">
                        <Check className="h-4 w-4" />
                        Unlocked!
                      </div>}
                  </CardContent>
                  {index === rewardTiers.length - 1 && <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                      GRAND PRIZE
                    </div>}
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Monthly Winners' Giveaway Section */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-yellow-500/10 via-neutral-900 to-[#00FF80]/10 border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center p-4 bg-yellow-500/20 rounded-full mb-6">
                <Trophy className="h-12 w-12 text-yellow-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Monthly Winners' Giveaway
              </h2>
              <p className="text-lg text-white/70 mb-8">
                Every auction win = 1 entry. The more you win, the better your odds. Prize changes monthly!
              </p>
              
              {/* Placeholder Prize Box */}
              <div className="relative bg-gradient-to-br from-neutral-950 to-neutral-800 rounded-xl border-2 border-dashed border-yellow-500/30 p-12 mb-6">
                <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  THIS MONTH
                </div>
                <Gift className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <p className="text-xl font-semibold text-white mb-2">
                  Featured Prize Coming Soon
                </p>
                <p className="text-sm text-white/60">
                  High-value items updated monthly
                </p>
              </div>
              
              <p className="text-sm text-white/60">
                Winners announced live at the end of each month
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Top Referrers Leaderboard
            </h2>
            <p className="text-lg text-[#00FF80] font-semibold">
              Top 100 referrers get early access
            </p>
          </div>

          <Card className="bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 border border-white/10 overflow-hidden">
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-white/60">Rank</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-white/60">Name</th>
                      <th className="text-right py-4 px-4 text-sm font-semibold text-white/60">Referrals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLeaderboard.map(entry => <tr key={entry.rank} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {entry.rank <= 3 && <Trophy className={`h-5 w-5 ${entry.rank === 1 ? "text-yellow-400" : entry.rank === 2 ? "text-gray-400" : "text-amber-600"}`} />}
                            <span className={`text-lg font-bold ${entry.rank === 1 ? "text-yellow-400" : entry.rank === 2 ? "text-gray-400" : entry.rank === 3 ? "text-amber-600" : "text-white/60"}`}>
                              #{entry.rank}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-white font-medium">{entry.name}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-[#00FF80] font-semibold text-lg">
                            {entry.referrals}
                          </span>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 text-center text-sm text-white/50">
                Leaderboard updates in real-time
              </div>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Sticky Mobile CTA */}
      {!hasJoined && <div className="fixed bottom-0 left-0 right-0 p-4 bg-neutral-950/95 backdrop-blur-sm border-t border-white/10 md:hidden z-50">
          <Button asChild size="lg" className="w-full bg-[#00FF80] hover:bg-[#00FF80]/90 text-black font-bold shadow-[0_0_20px_rgba(0,255,128,0.4)]">
            <Link to="/home">
              Explore Auctions <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>}
    </div>;
};
export default WaitlistLanding;