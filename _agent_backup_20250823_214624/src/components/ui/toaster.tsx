import * as React from 'react'
import { useToast } from '@/components/ui/toast'

export function Toaster() {
  const { toasts, dismiss } = useToast()
  return (
    <div style={{ position:'fixed', right:16, bottom:16, display:'grid', gap:8, zIndex: 9999 }}>
      {toasts.map(({ id, title, description, action }) => (
        <div key={id} style={{ padding:12, border:'1px solid #ddd', borderRadius:8, background:'#fff', maxWidth:360 }}>
          {title && <div style={{ fontWeight:600, marginBottom:4 }}>{title}</div>}
          {description && <div style={{ opacity:0.8 }}>{description}</div>}
          {action}
          <button style={{ marginTop:8 }} onClick={() => dismiss(id)}>Close</button>
        </div>
      ))}
    </div>
  )
}
