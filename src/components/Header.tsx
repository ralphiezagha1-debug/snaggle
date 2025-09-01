import React from "react";

export type HeaderProps = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  // Props used across pages:
  userName?: string;
  isAuthenticated?: boolean;
  userCredits?: number;
};

export default function Header({
  title,
  className,
  children,
  userName,
  isAuthenticated,
  userCredits,
}: HeaderProps) {
  return (
    <header className={className ?? ""}>
      {title ? <h1>{title}</h1> : null}
      {/* Non-breaking placeholders for pages that pass these props */}
      {(userName || userCredits !== undefined || isAuthenticated !== undefined) ? (
        <div>
          {userName ? <span data-testid="userName">{userName}</span> : null}
          {userCredits !== undefined ? <span data-testid="userCredits">{String(userCredits)}</span> : null}
          {isAuthenticated !== undefined ? <span data-testid="isAuth">{String(isAuthenticated)}</span> : null}
        </div>
      ) : null}
      {children}
    </header>
  );
}
