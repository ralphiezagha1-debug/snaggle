import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '@/platforms/firebase/app';
import { loadBidApi } from '@/api';
import type { Auction } from '@/models/Auction';
import { Link } from 'react-router-dom';

const MyAuctions = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [wonAuctions, setWonAuctions] = useState<Auction[]>([]);
  const [participatedAuctions, setParticipatedAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const bidApi = await loadBidApi();
        const closedAuctions = await bidApi.getAuctions({ status: 'closed' });

        const myWonAuctions = closedAuctions.filter(a => a.lastBidderId === user.uid);
        // This is a simplification. A real implementation would need to query bids.
        const myParticipatedAuctions = closedAuctions.filter(a => a.lastBidderId !== user.uid);

        setWonAuctions(myWonAuctions);
        setParticipatedAuctions(myParticipatedAuctions);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header userName={currentUser?.displayName || 'Guest'} isAuthenticated={!!currentUser} />
      <div className="container mx-auto p-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Auctions</h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Won Auctions</h2>
            {wonAuctions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wonAuctions.map(auction => (
                  <Card key={auction.id}>
                    <CardHeader>
                      <CardTitle>{auction.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>You won this auction for ${auction.currentPrice.toFixed(2)}</p>
                      <Link to={`/auctions/${auction.id}`} className="text-primary hover:underline mt-4 inline-block">
                        View Auction
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted">You haven't won any auctions yet.</p>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Participated Auctions</h2>
            {participatedAuctions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {participatedAuctions.map(auction => (
                  <Card key={auction.id}>
                    <CardHeader>
                      <CardTitle>{auction.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>This auction was won by {auction.lastBidder}.</p>
                      <Link to={`/auctions/${auction.id}`} className="text-primary hover:underline mt-4 inline-block">
                        View Auction
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted">You haven't participated in any other closed auctions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAuctions;



