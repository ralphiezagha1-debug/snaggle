import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, ExternalLink } from "lucide-react";
import { useSEO } from "@/lib/seo";
import { analytics } from "@/lib/analytics";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  useSEO({
    title: "Privacy Policy - Snaggle",
    description: "Learn how Snaggle collects, uses, and protects your personal information and data.",
    canonical: `${window.location.origin}/legal/privacy`
  });

  useEffect(() => {
    analytics.page('Privacy Policy');
  }, []);

  const sections = [
    {
      id: "overview",
      title: "1. Overview",
      content: "This Privacy Policy describes how Snaggle collects, uses, and protects your personal information when you use our auction platform."
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
      content: "We collect information you provide directly, information collected automatically, and information from third parties."
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      content: "We use your information to provide our services, communicate with you, and improve our platform."
    },
    {
      id: "information-sharing",
      title: "4. Information Sharing",
      content: "We do not sell your personal information. We may share information in limited circumstances as outlined below."
    },
    {
      id: "data-security",
      title: "5. Data Security",
      content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
    },
    {
      id: "cookies",
      title: "6. Cookies and Tracking",
      content: "We use cookies and similar technologies to enhance your experience and collect usage information."
    },
    {
      id: "data-retention",
      title: "7. Data Retention",
      content: "We retain your information for as long as necessary to provide our services and comply with legal obligations."
    },
    {
      id: "your-rights",
      title: "8. Your Rights",
      content: "You have certain rights regarding your personal information, including access, correction, and deletion rights."
    },
    {
      id: "children",
      title: "9. Children's Privacy",
      content: "Our service is not directed to children under 13, and we do not knowingly collect personal information from children."
    },
    {
      id: "international",
      title: "10. International Transfers",
      content: "Your information may be transferred to and processed in countries other than your own."
    },
    {
      id: "changes",
      title: "11. Changes to Policy",
      content: "We may update this Privacy Policy from time to time. We will notify you of significant changes."
    },
    {
      id: "contact",
      title: "12. Contact Us",
      content: "If you have questions about this Privacy Policy, please contact us using the information below."
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
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
                  onClick={() => analytics.track('Privacy Section Click', { section: section.title })}
                >
                  {section.title}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Content */}
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
                    
                    {section.id === "information-collected" && (
                      <div className="mt-4 space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-medium mb-2">Information You Provide:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Account registration details (name, email, password)</li>
                            <li>Profile information and preferences</li>
                            <li>Payment and billing information</li>
                            <li>Communications and support requests</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-medium mb-2">Automatically Collected:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Device and browser information</li>
                            <li>Usage patterns and interactions</li>
                            <li>IP address and location data</li>
                            <li>Cookies and tracking technologies</li>
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    {section.id === "data-security" && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Security Measures:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>SSL encryption for data transmission</li>
                          <li>Secure data storage with encryption at rest</li>
                          <li>Regular security audits and monitoring</li>
                          <li>Access controls and authentication protocols</li>
                          <li>Incident response and breach notification procedures</li>
                        </ul>
                      </div>
                    )}

                    {section.id === "your-rights" && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Your Data Rights:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Access: Request a copy of your personal data</li>
                          <li>Correction: Update or correct inaccurate information</li>
                          <li>Deletion: Request deletion of your personal data</li>
                          <li>Portability: Receive your data in a portable format</li>
                          <li>Objection: Object to certain processing activities</li>
                        </ul>
                      </div>
                    )}

                    {section.id === "contact" && (
                      <div className="mt-4">
                        <div className="p-4 bg-muted rounded-lg mb-4">
                          <h4 className="font-medium mb-2">Data Protection Officer:</h4>
                          <p className="text-sm">privacy@snaggle.com</p>
                        </div>
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
              We are committed to protecting your privacy and being transparent about our data practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/legal/terms">View Terms of Service</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">Privacy Questions</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;