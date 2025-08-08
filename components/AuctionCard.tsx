import Image from "next/image";

export default function AuctionCard({ auction }: { auction: any }) {
  return (
    <div className="border border-neon-green rounded-lg p-4 text-center">
      <Image src={\`/\${auction.image || "iphone.png"}\`} alt={auction.title} width={200} height={200} className="mx-auto mb-2" />
      <h3 className="text-xl font-semibold">{auction.title}</h3>
      <p>Current Bid: $\{auction.currentBid}</p>
      <p>Ends: {new Date(auction.endTime?.toDate?.()).toLocaleString()}</p>
    </div>
  );
}