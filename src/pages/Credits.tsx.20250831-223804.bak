import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { loadStripe } from '@stripe/stripe-js';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '@/platforms/firebase/app';
import { useToast } from "@/hooks/use-toast";

// Make sure to add VITE_STRIPE_PUBLIC_KEY to your .env file
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const creditPacks = [
  { id: 'price_1Hh1v5FqH6X5Yqj5J6X5Yqj5', credits: 50, price: 500, priceString: '$5.00' },
  { id: 'price_1Hh1v5FqH6X5Yqj5J6X5Yqj6', credits: 100, price: 900, priceString: '$9.00' },
  { id: 'price_1Hh1v5FqH6X5Yqj5J6X5Yqj7', credits: 250, price: 2000, priceString: '$20.00' },
];

const functions = getFunctions(app);
const createCheckoutSession = httpsCallable(functions, 'createCheckoutSession');

const Credits = () => {
  const { toast } = useToast();

  const handleBuyCredits = async (priceId: string) => {
    try {
      const successUrl = `${window.location.origin}/wallet?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = window.location.href;

      const result = await createCheckoutSession({ priceId, successUrl, cancelUrl });
      const { sessionId } = result.data as { sessionId: string };

      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          toast({ title: "Stripe Error", description: error.message, variant: "destructive" });
        }
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "An unknown error occurred.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Buy Credits</h1>
          <p className="text-muted mt-2">Purchase credits to participate in auctions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {creditPacks.map((pack) => (
            <Card key={pack.id} className="flex flex-col">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">{pack.credits} Credits</CardTitle>
                <CardDescription>Bidding Power!</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <p className="text-4xl font-bold">{pack.priceString}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleBuyCredits(pack.id)}>
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Credits;


