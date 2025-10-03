import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ServerCrash, Home, RefreshCw } from "lucide-react";
import { useSEO } from "@/lib/seo";
import { analytics } from "@/lib/analytics";
import { useEffect } from "react";

const Error500 = () => {
  useSEO({
    title: "Server Error - Snaggle",
    description: "We're experiencing technical difficulties. Please try again later.",
  });

  useEffect(() => {
    analytics.page('Error 500');
  }, []);

  const handleRefresh = () => {
    analytics.track('Error 500 Refresh');
    window.location.reload();
  };

  const handleGoHome = () => {
    analytics.track('Error 500 Go Home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <ServerCrash className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">500</h1>
            <h2 className="text-xl font-semibold mb-2">Server Error</h2>
            <p className="text-muted-foreground">
              We're experiencing technical difficulties. Our team has been notified and is working to fix the issue.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button onClick={handleRefresh} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button variant="outline" asChild className="w-full" onClick={handleGoHome}>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              If the problem persists, please{" "}
              <Link to="/contact" className="text-primary hover:underline">
                contact support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Error500;