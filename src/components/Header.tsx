import React from "react";

type HeaderProps = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function Header({ title, children, className }: HeaderProps) {
  return (
    <header className={className ?? ""}>
      {title ? <h1>{title}</h1> : null}
      {children}
    </header>
  );
}
