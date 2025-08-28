import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center rounded-md border border-input px-4 py-2 text-sm font-medium
                     bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
