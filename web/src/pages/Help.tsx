import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  FileText, 
  Shield, 
  CreditCard,
  Gavel,
  User,
  Settings
} from "lucide-react";
import { useSEO } from "@/lib/seo";
import { analytics } from "@/lib/analytics";
import { useEffect, useState } from "react";

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  articleCount: number;
  href: string;
}

const helpCategories: HelpCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "New to Snaggle? Learn the basics of bidding and winning auctions",
    icon: HelpCircle,
    articleCount: 8,
    href: "/faq#getting-started"
  },
  {
    id: "bidding-guide",
    title: "Bidding Guide",
    description: "How to place bids, auto-bidding, and winning strategies",
    icon: Gavel,
    articleCount: 12,
    href: "/faq#bidding"
  },
  {
    id: "payments-billing",
    title: "Payments & Billing",
    description: "Credits, payment methods, refunds, and billing questions",
    icon: CreditCard,
    articleCount: 10,
    href: "/faq#payments"
  },
  {
    id: "account-settings",
    title: "Account Settings",
    description: "Profile management, notifications, and security settings",
    icon: User,
    articleCount: 6,
    href: "/faq#account"
  },
  {
    id: "safety-security",
    title: "Safety & Security",
    description: "Protecting your account and safe trading practices",
    icon: Shield,
    articleCount: 9,
    href: "/faq#security"
  },
  {
    id: "technical-support",
    title: "Technical Support",
    description: "App issues, troubleshooting, and technical questions",
    icon: Settings,
    articleCount: 7,
    href: "/faq#technical"
  }
];

const popularArticles = [
  { title: "How do I place my first bid?", href: "/faq#first-bid" },
  { title: "When are credits charged?", href: "/faq#credits-charged" },
  { title: "What happens if I win an auction?", href: "/faq#winning-auction" },
  { title: "How do refunds work?", href: "/faq#refunds" },
  { title: "Can I cancel a bid?", href: "/faq#cancel-bid" }
];

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  useSEO({
    title: "Help Center - Snaggle",
    description: "Get help with bidding, payments, account settings, and more. Find answers to common questions and contact support.",
    canonical: `${window.location.origin}/help`
  });

  useEffect(() => {
    analytics.page('Help Center');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      analytics.track('Help Search', { query: searchQuery });
      // Navigate to FAQ with search query
      window.location.href = `/faq?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Search our knowledge base or browse categories to find the answers you need
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
              <Button 
                type="submit" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                size="sm"
              >
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Help Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  to={category.href}
                  onClick={() => analytics.track('Help Category Click', { category: category.title })}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="h-8 w-8 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {category.articleCount} articles
                        </span>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Popular Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <Link
                    key={index}
                    to={article.href}
                    onClick={() => analytics.track('Popular Article Click', { article: article.title })}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="group-hover:text-primary transition-colors">
                        {article.title}
                      </span>
                    </div>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Support */}
        <section>
          <Card className="bg-gradient-hero border-primary/20">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Can't find what you're looking for? Our support team is here to help you get back on track.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/faq">View All FAQs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Help;