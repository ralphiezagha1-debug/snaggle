import * as React from 'react'

type SheetProps = {
  children?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>

export function Sheet({ children }: SheetProps) {
  // Minimal shim: ignore control props, just render children
  return <>{children}</>
}

type Side = 'left' | 'right' | 'top' | 'bottom'
type SheetContentProps = React.HTMLAttributes<HTMLDivElement> & {
  side?: Side
  'data-mobile'?: string
  'data-sidebar'?: string
}

export function SheetContent({ children, className, style, ...rest }: SheetContentProps) {
  return (
    <div
      className={className as string}
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: 320,
        background: '#fff',
        borderLeft: '1px solid #ddd',
        padding: 16,
        ...(style as React.CSSProperties),
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
