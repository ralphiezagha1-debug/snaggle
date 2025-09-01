import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '@/platforms/firebase/app';
import { loadBidApi } from '@/api';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import type { Purchase } from '@/models/Purchase';
import type { UserCredits } from '@/models/UserCredits';

const Wallet = () => {
  const { toast } = useToast();
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const bidApi = await loadBidApi();
        try {
          const creditsData = await bidApi.getCredits(user.uid);
          setUserCredits(creditsData);
          const purchaseHistory = await bidApi.getPurchaseHistory(user.uid);
          setPurchases((purchaseHistory as Purchase[]) ?? []);
        } catch (error: any) {
          toast({ title: "Error", description: "Could not fetch wallet data.", variant: "destructive" });
        }
      } else {
        setUserCredits(null);
        setPurchases([]);
      }
    });
    return unsubscribe;
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header userCredits={userCredits?.balance ?? 0} userName={currentUser?.displayName || 'Guest'} isAuthenticated={!!currentUser} />
      <div className="container mx-auto p-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Wallet</h1>
          <Button asChild>
            <Link to="/credits">Buy More Credits</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Current Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold text-primary">{userCredits?.balance ?? 0}</p>
                <p className="text-muted">credits available</p>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Purchase History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(purchases ?? []).map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell>{format(new Date(purchase.createdAt), 'PPP')}</TableCell>
                        <TableCell>{purchase.credits}</TableCell>
                        <TableCell className="text-right">${(purchase.amount / 100).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;

