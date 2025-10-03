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
    <footer className="bg-transparent">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Gavel className="h-8 w-8 text-[#00FF80]" />
              <span className="text-2xl font-bold text-[#00FF80]">
                Snaggle
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              The premium live auction platform where every bid counts and every win feels extraordinary.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white/90 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-[#00FF80] transition-colors"
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
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex justify-center items-center">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} Snaggle. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;