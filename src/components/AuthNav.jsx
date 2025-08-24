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
  DropdownMenuPortal,
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
    <div className="relative ml-auto min-w-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user.photoURL} />
          <AvatarFallback>{user.displayName?.[0] || user.email?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          collisionPadding={8}
          avoidCollisions
          className="w-56 max-w-[calc(100vw-1rem)] sm:max-w-[18rem] overflow-hidden"
        >
          <DropdownMenuLabel>{user.displayName || user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/account">
            <DropdownMenuItem>Account</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => auth.signOut()}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  </div>
  );
}
