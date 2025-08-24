import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-slate-600">We couldn’t find that page.</p>
      <div className="mt-6">
        <Link to="/"><Button size="lg" className="rounded-2xl">Back to Home</Button></Link>
      </div>
    </div>
  );
}
