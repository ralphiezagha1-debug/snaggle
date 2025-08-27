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
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className="w-64 max-w-[90vw] whitespace-nowrap"
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
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Buy More Credits</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trophy className="mr-2 h-4 w-4" />
            <span>My Auctions</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
