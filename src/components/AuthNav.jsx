import { Link } from "react-router-dom";
import { useAuth } from "../state/auth";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { auth } from "../lib/firebase";

export default function AuthNav() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Button variant="ghost">Loading...</Button>;
  }

  if (!user) {
    return <Link to="/signin"><Button>Sign In</Button></Link>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user.photoURL} />
          <AvatarFallback>{user.displayName?.[0] || user.email?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" collisionPadding={16} className="max-w-[calc(100vw-1rem)]">
        <DropdownMenuLabel>{user.displayName || user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/account">
          <DropdownMenuItem>Account</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => auth.signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
