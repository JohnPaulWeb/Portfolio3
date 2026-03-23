"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Theme = "crt" | "xp" | "mac"

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
  transitioning: boolean
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "crt",
  setTheme: () => {},
  transitioning: false,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeRaw] = useState<Theme>("crt")
  const [transitioning, setTransitioning] = useState(false)

  const setTheme = useCallback((next: Theme) => {
    if (next === theme) return
    setTransitioning(true)
    setTimeout(() => {
      setThemeRaw(next)
      setTimeout(() => setTransitioning(false), 400)
    }, 350)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, transitioning }}>
      <div data-theme={theme} className="theme-root" style={{ minHeight: "100vh" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
