"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"

// Local cn helper
function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ")
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
      "hover:bg-muted hover:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
      "h-9 px-3",
      className
    )}
    {...props}
  />
))
Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle }
