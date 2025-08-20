import * as React from 'react'
export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = React.useState(false)
  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const query = '(max-width: ' + breakpoint + 'px)'
    const mql = window.matchMedia(query)
    const onChange = () => setIsMobile(mql.matches)
    onChange()
    mql.addEventListener?.('change', onChange)
    return () => mql.removeEventListener?.('change', onChange)
  }, [breakpoint])
  return isMobile
}
