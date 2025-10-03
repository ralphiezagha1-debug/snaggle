import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Menu, Gavel, User, Wallet, Search } from "lucide-react";
import { CreditsBadge } from "@/components/store/CreditsBadge";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const navLinks = [{
    href: "/home",
    label: "Home"
  }, {
    href: "/live",
    label: "Live"
  }, {
    href: "/auctions",
    label: "Auctions"
  }, {
    href: "/store",
    label: "Store"
  }, {
    href: "/drops",
    label: "Drops"
  }, {
    href: "/categories",
    label: "Categories"
  }];
  const accountLinks = [{
    href: "/profile",
    label: "Profile",
    icon: User
  }, {
    href: "/orders",
    label: "Orders"
  }, {
    href: "/wallet",
    label: "Wallet",
    icon: Wallet
  }];
  return <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Gavel className="h-6 w-6 text-[#00FF80]" />
            <span className="font-bold text-lg text-[#00FF80] logo-glow">Snaggle</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 ml-6">
            {navLinks.map(link => <Link key={link.href} to={link.href} className={`text-sm transition-colors ${isActive(link.href) ? "text-white" : "text-white/70 hover:text-white"}`}>
                {link.label}
              </Link>)}
          </div>

          {/* Search Bar & Actions */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Search Bar */}
            <div className="hidden lg:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input placeholder="Search auctions..." className="pl-10 w-64 bg-white/5 border-white/10 text-white placeholder:text-white/50" />
            </div>

            {/* Credits Badge with precise spacing */}
            <div className="pl-2 px-0">
              <CreditsBadge />
            </div>

            {/* Account Actions */}
            <Button variant="ghost" asChild className="text-white/70 hover:text-white hover:bg-white/10">
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button variant="ghost" asChild className="text-white/70 hover:text-white hover:bg-white/10">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex flex-col space-y-4">
                  {navLinks.map(link => <Link key={link.href} to={link.href} onClick={() => setIsOpen(false)} className={`text-lg font-medium transition-colors hover:text-primary ${isActive(link.href) ? "text-primary" : "text-foreground"}`}>
                      {link.label}
                    </Link>)}
                </div>
                
                <div className="border-t border-border pt-6">
                  <div className="flex flex-col space-y-4">
                    {accountLinks.map(link => {
                    const Icon = link.icon;
                    return <Link key={link.href} to={link.href} onClick={() => setIsOpen(false)} className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary transition-colors">
                          {Icon && <Icon className="h-5 w-5" />}
                          <span>{link.label}</span>
                        </Link>;
                  })}
                  </div>
                </div>

                <div className="border-t border-border pt-6 flex flex-col space-y-3">
                  <Button variant="ghost" asChild>
                    <Link to="/signin" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>;
};
export default Navbar;