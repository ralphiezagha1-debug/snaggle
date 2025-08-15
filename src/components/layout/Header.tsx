import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Wallet, Gavel, User, LogOut, CreditCard, Trophy, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  userCredits?: number;
  userName?: string;
  isAuthenticated?: boolean;
}

export const Header = ({ userCredits = 0, userName = "Guest", isAuthenticated = false }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Gavel className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            Snaggle
          </h1>
        </div>

        {/* Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                )}
              >
                Live Auctions
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/wallet"
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                )}
              >
                Buy Credits
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/how-it-works"
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                )}
              >
                How It Works
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {/* Credits Display */}
          {isAuthenticated && (
            <div className="flex items-center gap-2 bg-card border rounded-lg px-3 py-2">
              <Wallet className="w-4 h-4 text-auction-gold" />
              <span className="font-bold text-auction-gold">{userCredits}</span>
              <span className="text-xs text-muted-foreground">credits</span>
            </div>
          )}

          {/* User Menu */}
          {isAuthenticated ? (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 p-0">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        {userName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-4 space-y-2">
                      <div className="pb-2 border-b">
                        <p className="font-medium">{userName}</p>
                        <p className="text-sm text-muted-foreground">
                          {userCredits} bid credits remaining
                        </p>
                      </div>
                      
                      <NavigationMenuLink
                        href="/wallet"
                        className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-accent transition-colors"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Buy More Credits</span>
                      </NavigationMenuLink>
                      
                      <NavigationMenuLink
                        href="/my-auctions"
                        className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-accent transition-colors"
                      >
                        <Trophy className="w-4 h-4" />
                        <span>My Auctions</span>
                      </NavigationMenuLink>
                      
                      <NavigationMenuLink
                        href="/settings"
                        className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-accent transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </NavigationMenuLink>
                      
                      <div className="pt-2 border-t">
                        <button className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-accent transition-colors text-destructive">
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="gradient-primary">
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};