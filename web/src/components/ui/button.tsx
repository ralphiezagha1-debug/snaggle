import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl2 px-5 py-3 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-90 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 text-white border border-emerald-400/30 shadow-[0_0_12px_rgba(60,255,107,0.35)] hover:bg-neutral-800 hover:shadow-[0_0_18px_rgba(60,255,107,0.45)]",
        primary: "bg-neutral-900 text-white border border-emerald-400/30 shadow-[0_0_12px_rgba(60,255,107,0.35)] hover:bg-neutral-800 hover:shadow-[0_0_18px_rgba(60,255,107,0.45)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-emerald-400/60 text-emerald-300 hover:bg-emerald-400/10 hover:border-emerald-400/80",
        secondary: "bg-neutral-800 text-white border border-white/20 hover:bg-neutral-700",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "ghost-green": "border border-emerald-400/60 text-white hover:bg-emerald-400/10 hover:border-emerald-400/80",
        "quick-bid": "bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-[0_0_18px_rgba(60,255,107,0.45)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
