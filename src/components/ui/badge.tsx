import * as React from "react";
function cx(...c:(string|undefined)[]){return c.filter(Boolean).join(" ");}
export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & { variant?: "default"|"secondary"|"destructive"|"outline" };
export const Badge = React.forwardRef<HTMLSpanElement,BadgeProps>(({ className, variant="default", ...props }, ref) => (
  <span ref={ref} className={cx("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
    variant==="default"?"border-transparent bg-black/80 text-white":
    variant==="secondary"?"border-transparent bg-gray-200 text-gray-900":
    variant==="destructive"?"border-transparent bg-red-600 text-white":"border-gray-300 text-gray-900", className)} {...props} />
));
Badge.displayName = "Badge"; export default Badge;
