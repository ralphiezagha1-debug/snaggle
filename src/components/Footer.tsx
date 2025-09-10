import { Link } from "react-router-dom";
import { Gavel } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { href: "/auctions", label: "Browse Auctions" },
        { href: "/how-it-works", label: "How It Works" },
        { href: "/credits", label: "Credits & Pricing" },
        { href: "/faq", label: "FAQ" },
      ],
    },
    {
      title: "Account",
      links: [
        { href: "/signup", label: "Create Account" },
        { href: "/signin", label: "Sign In" },
        { href: "/profile", label: "Profile" },
        { href: "/wallet", label: "Wallet" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
        { href: "/waitlist", label: "Join Waitlist" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/terms", label: "Terms of Service" },
        { href: "/privacy", label: "Privacy Policy" },
      ],
    },
  ];

  return (
    <footer className="border-t border-card-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Gavel className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-snaggle-green-light bg-clip-text text-transparent">
                Snaggle
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The premium live auction platform where every bid counts and every win feels extraordinary.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-card-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Snaggle. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ for auction enthusiasts
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;