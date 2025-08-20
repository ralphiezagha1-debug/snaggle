import * as React from 'react'

export type ToastActionElement = React.ReactNode
export type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: 'default' | 'destructive'
}

type ToastContextValue = {
  toasts: Toast[]
  toast: (t: Omit<Toast, 'id'>) => string
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])
  const toast = (t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [{ id, ...t }, ...prev])
    return id
  }
  const dismiss = (id: string) => setToasts((p) => p.filter((x) => x.id !== id))
  return <ToastContext.Provider value={{ toasts, toast, dismiss }}>{children}</ToastContext.Provider>
}

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext)
  if (!ctx) {
    // Provider-less fallback: don't crash, just no-op and warn once
    if (typeof window !== 'undefined' && !(window as any).__toast_warned__) {
      ;(window as any).__toast_warned__ = true
      console.warn('useToast used without <ToastProvider/> – using no-op fallback.')
    }
    return {
      toasts: [],
      toast: () => '',
      dismiss: () => {},
    }
  }
  return ctx
}
