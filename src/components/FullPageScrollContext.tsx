import { createContext, useContext, useState, type ReactNode } from 'react'

type Direction = 'up' | 'down' | null

type FullPageScrollState = {
  index: number
  direction: Direction
}

type FullPageScrollContextValue = FullPageScrollState & {
  setState: (next: FullPageScrollState) => void
}

const FullPageScrollContext = createContext<FullPageScrollContextValue | undefined>(undefined)

export function FullPageScrollProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FullPageScrollState>({ index: 0, direction: null })

  return (
    <FullPageScrollContext.Provider value={{ ...state, setState }}>
      {children}
    </FullPageScrollContext.Provider>
  )
}

export function useFullPageScroll() {
  const ctx = useContext(FullPageScrollContext)
  if (!ctx) {
    throw new Error('useFullPageScroll must be used within FullPageScrollProvider')
  }
  return ctx
}

