import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CreditCard, LogOut, Settings, Trophy, User } from "lucide-react"

interface UserMenuProps {
  userCredits?: number
  userName?: string
}

export function UserMenu({
  userCredits = 0,
  userName = "Guest",
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium whitespace-nowrap">
            {userCredits} Credits
          </div>
          <Avatar className="w-8 h-8">
            <AvatarFallback>
              {userName?.[0]?.toUpperCase()}{userName?.[1]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className="w-64 max-w-[90vw]"
          align="end"
          sideOffset={8}
        >
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {userCredits} bid credits remaining
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Link to="/credits">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Buy More Credits</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Link to="/my-auctions">
              <Trophy className="mr-2 h-4 w-4" />
              <span>My Auctions</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
