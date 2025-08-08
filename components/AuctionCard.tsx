import Image from "next/image";

/**
 * A card component for displaying an auction summary.
 *
 * @param props.auction The auction data to display. At minimum this should
 * include an `id`, `title`, `image`, `currentBid` and `endTime`. The image
 * field may be null/undefined in which case a fallback image will be used.
 */
export default function AuctionCard({ auction }: { auction: any }) {
  // Use a fallback image if one isn't provided on the auction object.  The
  // template literal below is intentionally not escaped – backticks are used
  // directly so that the compiler correctly recognizes it as a template
  // literal. Escaping backticks (e.g. \`\`) introduces invalid characters
  // which causes the TypeScript parser to throw `Invalid character` errors.
  const imageSrc = `/${auction.image || "iphone.png"}`;

  return (
    <div className="border border-neon-green rounded-lg p-4 text-center">
      {/* Next.js' Image component requires a valid string for the `src` prop */}
      <Image
        src={imageSrc}
        alt={auction.title || "Auction image"}
        width={200}
        height={200}
        className="mx-auto mb-2"
      />
      <h3 className="text-xl font-semibold">{auction.title}</h3>
      {/* Display the current bid. Use a template literal so the dollar sign is
          treated as static text rather than opening a new template expression. */}
      <p>Current Bid: ${""}{auction.currentBid}</p>
      {/* Convert Firestore Timestamp or Date to a locale string if possible */}
      <p>
        Ends:{" "}
        {typeof auction.endTime?.toDate === "function"
          ? new Date(auction.endTime.toDate()).toLocaleString()
          : new Date(auction.endTime).toLocaleString()}
      </p>
    </div>
  );
}