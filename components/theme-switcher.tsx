"use client"

import { useTheme, type Theme } from "@/lib/theme-context"

// Static noise canvas for transition effect
function StaticCanvas() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 99999,
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 1px,
          rgba(0,0,0,0.15) 1px,
          rgba(0,0,0,0.15) 2px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 3px,
          rgba(255,255,255,0.05) 3px,
          rgba(255,255,255,0.05) 4px
        )`,
        mixBlendMode: "multiply",
      }}
      aria-hidden="true"
    />
  )
}

export function ThemeTransition() {
  const { transitioning, theme } = useTheme()
  if (!transitioning) return null

  const color =
    theme === "xp"  ? "#0A246A" :
    theme === "mac" ? "#888888" :
    "#4a2800"

  return (
    <>
      <StaticCanvas />
      <div
        className="theme-flash fixed inset-0 pointer-events-none"
        style={{
          zIndex: 99998,
          background: color,
          mixBlendMode: "hard-light",
        }}
        aria-hidden="true"
      />
    </>
  )
}

const THEMES: { id: Theme; label: string; icon: string; desc: string }[] = [
  { id: "crt",  label: "CRT",     icon: "█", desc: "Phosphor CRT Terminal" },
  { id: "xp",   label: "WIN XP",  icon: "⊞", desc: "Windows XP Luna" },
  { id: "mac",  label: "MAC OS",  icon: "⌘", desc: "Classic Mac OS 9" },
]

export function ThemeSwitcher() {
  const { theme, setTheme, transitioning } = useTheme()

  return (
    <div
      className="fixed bottom-6 right-6 z-[9990] flex flex-col gap-2"
      role="group"
      aria-label="Switch theme"
    >
      {/* Label */}
      <div
        className="text-center text-xs tracking-widest mb-1 px-1"
        style={{
          color:
            theme === "xp"  ? "#0A246A" :
            theme === "mac" ? "#333"    : "var(--crt-brown-dim)",
          fontFamily:
            theme === "xp"  ? "Tahoma, Arial, sans-serif" :
            theme === "mac" ? "Geneva, Charcoal, Arial, sans-serif" :
            "inherit",
          opacity: 0.7,
        }}
      >
        THEME
      </div>

      {THEMES.map((t) => {
        const isActive = theme === t.id
        const isXP = t.id === "xp"
        const isMac = t.id === "mac"

        /* ---- XP button style ---- */
        if (isXP) {
          return (
            <button
              key={t.id}
              onClick={() => !transitioning && setTheme(t.id)}
              title={t.desc}
              style={{
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: "11px",
                padding: "3px 10px 4px",
                border: isActive
                  ? "2px inset #ACA899"
                  : "2px outset #FFFFFF",
                background: isActive
                  ? "linear-gradient(to bottom, #C8D7E8 0%, #E3EEF8 40%, #C0D4E8 100%)"
                  : "linear-gradient(to bottom, #FFFFFF 0%, #E8E8E8 40%, #D0D0D0 100%)",
                color: "#000",
                cursor: transitioning ? "wait" : "pointer",
                minWidth: "80px",
                boxShadow: isActive ? "inset 1px 1px 2px rgba(0,0,0,0.3)" : "1px 1px 2px rgba(0,0,0,0.2)",
                transform: isActive ? "translateY(1px)" : "none",
                letterSpacing: 0,
              }}
            >
              {isActive ? "[ " : ""}{t.icon} {t.label}{isActive ? " ]" : ""}
            </button>
          )
        }

        /* ---- Mac button style ---- */
        if (isMac) {
          return (
            <button
              key={t.id}
              onClick={() => !transitioning && setTheme(t.id)}
              title={t.desc}
              style={{
                fontFamily: "Geneva, Charcoal, Arial, sans-serif",
                fontSize: "11px",
                padding: "2px 10px 3px",
                border: "1px solid #888888",
                borderTopColor: "#DDDDDD",
                borderLeftColor: "#DDDDDD",
                background: isActive
                  ? "linear-gradient(to bottom, #9999BB 0%, #7777AA 100%)"
                  : "linear-gradient(to bottom, #DDDDDD 0%, #AAAAAA 100%)",
                color: isActive ? "#FFF" : "#000",
                cursor: transitioning ? "wait" : "pointer",
                minWidth: "80px",
                boxShadow: isActive ? "inset 0 1px 2px rgba(0,0,0,0.4)" : "none",
                letterSpacing: 0,
                borderRadius: "3px",
              }}
            >
              {t.icon} {t.label}
            </button>
          )
        }

        /* ---- CRT button style ---- */
        return (
          <button
            key={t.id}
            onClick={() => !transitioning && setTheme(t.id)}
            title={t.desc}
            className="text-xs tracking-widest transition-all duration-100"
            style={{
              fontFamily: "var(--font-mono)",
              padding: "4px 10px",
              border: isActive ? "1px solid var(--crt-brown)" : "1px solid var(--crt-border-col)",
              background: isActive ? "rgba(122,74,30,0.12)" : "var(--crt-paper)",
              color: isActive ? "var(--crt-brown-bright)" : "var(--crt-brown-dim)",
              boxShadow: isActive ? "var(--crt-glow-sm)" : "none",
              cursor: transitioning ? "wait" : "pointer",
              minWidth: "80px",
            }}
          >
            {isActive ? "[ " : ""}{t.icon} {t.label}{isActive ? " ]" : ""}
          </button>
        )
      })}
    </div>
  )
}
