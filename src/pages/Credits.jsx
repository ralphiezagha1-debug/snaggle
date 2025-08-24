import { Button } from "@/components/ui/button";
import { useCredits } from "../state/credits";

export default function Credits() {
  const { credits, setCredits, refresh } = useCredits();

  return (
    <div>
      <h1 className="text-3xl font-bold">Buy Credits</h1>
      <p className="text-xl mt-4">Your current balance is: <span className="font-bold">{credits} credits</span></p>
      <div className="mt-8 space-x-4">
        <Button onClick={() => setCredits(credits + 10)}>+10 test credits</Button>
        <Button onClick={refresh}>Refresh</Button>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold">50 Credits</h2>
          <p className="text-4xl font-bold mt-4">$5</p>
          <Button disabled className="mt-8">Payments coming soon</Button>
        </div>
        <div className="border p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold">100 Credits</h2>
          <p className="text-4xl font-bold mt-4">$10</p>
          <Button disabled className="mt-8">Payments coming soon</Button>
        </div>
        <div className="border p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold">250 Credits</h2>
          <p className="text-4xl font-bold mt-4">$25</p>
          <Button disabled className="mt-8">Payments coming soon</Button>
        </div>
      </div>
    </div>
  );
}
