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
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.photoURL} />
          <AvatarFallback>{user.displayName?.[0] || user.email?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.displayName || user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => auth.signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
