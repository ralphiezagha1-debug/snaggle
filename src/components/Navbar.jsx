import { Link } from "react-router-dom";
import { CreditsDisplay } from "./CreditsDisplay";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">Snaggle</Link>
        </div>
        <div className="space-x-4 hidden md:flex items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
          <Link to="/auctions" className="text-gray-700 hover:text-blue-500">Auctions</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
          <Link to="/faq" className="text-gray-700 hover:text-blue-500">FAQ</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-500">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-500">Contact</Link>
          <div className="flex items-center space-x-4">
            <CreditsDisplay />
            <DropdownMenu>
              <DropdownMenuTrigger>Profile</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
