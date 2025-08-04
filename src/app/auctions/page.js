export const metadata = {
  title: "Auctions - Snaggle",
  description: "Browse live penny auctions and start bidding on Snaggle.",
};

export default function AuctionsPage() {
  return (
    <div className="py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Auctions</h1>
      <p className="text-gray-600 mb-6">Browse live auctions and place your bids!</p>
      {/* Auction list will go here */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border rounded p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Sample Item</h2>
          <p className="text-gray-500 mb-2">Ends in: 00:00:00</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Bid</button>
        </div>
      </div>
    </div>
  );
}
