import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, ExternalLink } from "lucide-react";
import { useSEO } from "@/lib/seo";
import { analytics } from "@/lib/analytics";
import { useEffect } from "react";

const TermsOfService = () => {
  useSEO({
    title: "Terms of Service - Snaggle",
    description: "Read our terms of service and user agreement for using the Snaggle auction platform.",
    canonical: `${window.location.origin}/legal/terms`
  });

  useEffect(() => {
    analytics.page('Terms of Service');
  }, []);

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: "By accessing and using Snaggle, you accept and agree to be bound by the terms and provision of this agreement."
    },
    {
      id: "description",
      title: "2. Description of Service",
      content: "Snaggle is an online auction platform that allows users to buy and sell items through a bidding process."
    },
    {
      id: "registration",
      title: "3. User Registration",
      content: "To use our services, you must register for an account and provide accurate, current, and complete information."
    },
    {
      id: "bidding",
      title: "4. Bidding and Auctions",
      content: "All bids are legally binding. By placing a bid, you agree to purchase the item if you are the winning bidder."
    },
    {
      id: "payments",
      title: "5. Payments and Credits",
      content: "Users must purchase credits to participate in auctions. Credits are charged only when you win an auction."
    },
    {
      id: "prohibited",
      title: "6. Prohibited Uses",
      content: "Users may not use our service for any unlawful purpose or in any way that could damage our platform."
    },
    {
      id: "intellectual",
      title: "7. Intellectual Property",
      content: "All content on Snaggle is protected by copyright and other intellectual property laws."
    },
    {
      id: "disclaimer",
      title: "8. Disclaimer of Warranties",
      content: "Our service is provided 'as is' without any warranties, expressed or implied."
    },
    {
      id: "limitation",
      title: "9. Limitation of Liability",
      content: "Snaggle shall not be liable for any indirect, incidental, special, or consequential damages."
    },
    {
      id: "termination",
      title: "10. Termination",
      content: "We reserve the right to terminate or suspend accounts that violate these terms."
    },
    {
      id: "changes",
      title: "11. Changes to Terms",
      content: "We reserve the right to modify these terms at any time. Users will be notified of significant changes."
    },
    {
      id: "contact",
      title: "12. Contact Information",
      content: "For questions about these terms, please contact us through our support channels."
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: December 1, 2024
          </p>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-primary hover:underline p-2 rounded hover:bg-muted transition-colors"
                  onClick={() => analytics.track('ToS Section Click', { section: section.title })}
                >
                  {section.title}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Terms Content */}
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                  <div className="prose max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                    
                    {section.id === "bidding" && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Important Bidding Rules:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>All bids are final and cannot be retracted</li>
                          <li>You must have sufficient credits to cover your bid</li>
                          <li>Winning bidders must complete payment within 24 hours</li>
                          <li>Sniping (last-second bidding) is allowed and encouraged</li>
                        </ul>
                      </div>
                    )}
                    
                    {section.id === "payments" && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Credit System:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Credits are purchased in advance and stored in your wallet</li>
                          <li>Credits are only charged when you win an auction</li>
                          <li>Unused credits never expire</li>
                          <li>Refunds are processed as credits, not cash</li>
                        </ul>
                      </div>
                    )}

                    {section.id === "contact" && (
                      <div className="mt-4">
                        <Button asChild>
                          <Link to="/contact">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Contact Support
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>
          ))}
        </div>

        {/* Footer */}
        <Card className="mt-12">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">
              By using Snaggle, you acknowledge that you have read and agree to these Terms of Service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/legal/privacy">View Privacy Policy</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">Ask a Question</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;