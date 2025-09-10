const Terms = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-invert max-w-none text-muted-foreground">
            <p>Last updated: January 2024</p>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By using Snaggle, you agree to these Terms of Service...</p>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Auction Rules</h2>
            <p>All bids are binding. When you place a bid, you're committing to purchase if you win...</p>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Payment Terms</h2>
            <p>Payment is due within 24 hours of winning an auction...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;