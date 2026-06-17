"use client"

import { useState } from "react"
import { useTheme } from "@/lib/theme-context"

const NAV_ITEMS = [
  { label: "HOME",    href: "#home" },
  { label: "WORK",    href: "#work" },
  { label: "SKILLS",  href: "#skills" },
  { label: "CHESS",   href: "#chess" },
  { label: "ABOUT",   href: "#about" },
  { label: "CONTACT", href: "#contact" },
  { label: "Game",   href: "#game" },
]

/* ── Windows XP taskbar nav ───────────────────────────── */
function XPNav() {
  const [active, setActive] = useState("HOME")
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ fontFamily: "Tahoma, Arial, sans-serif" }}
    >
      {/* Titlebar */}
      <div
        style={{
          background: "linear-gradient(to bottom, #0A246A 0%, #316AC5 8%, #2563C7 50%, #1B54B8 100%)",
          padding: "3px 6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "#FFD700", fontWeight: "bold" }}>⊞</span>
          <span style={{ fontSize: "11px", color: "#FFFFFF", fontWeight: "bold", textShadow: "1px 1px 0 #0A246A" }}>
            John Paul  — Web Developer
          </span>
        </div>
        {/* Window controls */}
        <div style={{ display: "flex", gap: "2px" }}>
          {["_", "□", "✕"].map((c, i) => (
            <div
              key={i}
              style={{
                width: "18px", height: "16px",
                background: i === 2
                  ? "linear-gradient(to bottom, #E84040 0%, #C02020 100%)"
                  : "linear-gradient(to bottom, #4A90D8 0%, #3070C0 100%)",
                border: "1px outset #6AB0F8",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "9px", color: "#FFF", cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
      {/* Menu bar */}
      <div
        style={{
          background: "#ECE9D8",
          borderBottom: "1px solid #ACA899",
          padding: "1px 4px",
          display: "flex", alignItems: "center", gap: "0",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setActive(item.label)}
            style={{
              fontSize: "11px",
              padding: "2px 8px",
              color: "#000",
              background: active === item.label ? "#316AC5" : "transparent",
              color: active === item.label ? "#FFF" : "#000",
              color: active === item.label ? "#FFF" : "#000",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
          </a>
        ))}
        <div style={{ marginLeft: "auto", fontSize: "11px", color: "#444", padding: "2px 8px" }}>
          <span
            style={{
              display: "inline-block",
              width: "8px", height: "8px",
              borderRadius: "50%",
              background: "#4CAF50",
              boxShadow: "0 0 4px #4CAF50",
              marginRight: "4px",
              verticalAlign: "middle",
            }}
          />
          Online
        </div>
      </div>
    </nav>
  )
}

/* ── Classic Mac OS 9 menu bar nav ──────────────────────── */
function MacNav() {
  const [active, setActive] = useState("HOME")
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ fontFamily: "Geneva, Charcoal, Arial, sans-serif" }}
    >
      <div
        style={{
          background: "linear-gradient(to bottom, #DDDDDD 0%, #AAAAAA 100%)",
          borderBottom: "1px solid #888888",
          padding: "2px 8px",
          display: "flex",
          alignItems: "center",
          gap: "0",
          height: "22px",
        }}
      >
        {/* Apple menu */}
        <div
          style={{
            fontSize: "14px",
            padding: "0 10px",
            fontWeight: "bold",
            color: "#000",
            borderRight: "1px solid #888",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: "11px",
            fontWeight: "bold",
            color: "#000",
            padding: "0 12px",
            borderRight: "1px solid #888",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          John Paul
        </div>

        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setActive(item.label)}
            style={{
              fontSize: "11px",
              padding: "0 10px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              color: "#000",
              background: active === item.label
                ? "linear-gradient(to bottom, #0055CC 0%, #0044AA 100%)"
                : "transparent",
              color: active === item.label ? "#FFF" : "#000",
              textDecoration: "none",
              borderRadius: "0",
            }}
          >
            {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
          </a>
        ))}

        {/* Right: clock */}
        <div
          style={{
            marginLeft: "auto",
            fontSize: "11px",
            color: "#000",
            padding: "0 8px",
            borderLeft: "1px solid #888",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </nav>
  )
}

/* ── CRT terminal nav (original) ─────────────────────── */
function CRTNavInner() {
  const [active, setActive] = useState("HOME")
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 font-mono"
      style={{ borderBottom: "1px solid var(--crt-border-col)" }}
    >
      <div
        className="flex items-center justify-between px-6 py-3"
        style={{ background: "rgba(245,237,224,0.96)", backdropFilter: "blur(2px)" }}
      >
        <a
          href="#home"
          className="flex items-center gap-3 glow"
          style={{ fontFamily: "VT323, monospace", fontSize: "1.6rem" }}
        >
          <span style={{ color: "var(--crt-brown-bright)" }}>▶</span>
         John Paul 
        </a>

        <div className="hidden md:flex items-center gap-6 text-xs tracking-widest">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.label)}
              className="transition-all duration-100"
              style={{
                color: active === item.label ? "var(--crt-brown-bright)" : "var(--crt-brown-dim)",
                textShadow: active === item.label ? "var(--crt-glow-sm)" : "none",
              }}
            >
              {active === item.label ? `[ ${item.label} ]` : item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs" style={{ color: "var(--crt-brown-dim)" }}>
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: "var(--crt-amber)",
              boxShadow: "0 0 6px var(--crt-amber)",
              animation: "blink 2s step-start infinite",
            }}
          />
          ONLINE
        </div>

        <button
          className="md:hidden text-xs tracking-widest glow-sm"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{ color: "var(--crt-brown)" }}
        >
          {menuOpen ? "[ CLOSE ]" : "[ MENU ]"}
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden px-6 py-4 space-y-3 text-sm tracking-widest"
          style={{ background: "rgba(245,237,224,0.99)", borderTop: "1px solid var(--crt-border-col)" }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => { setActive(item.label); setMenuOpen(false) }}
              className="block"
              style={{ color: active === item.label ? "var(--crt-brown-bright)" : "var(--crt-brown-dim)" }}
            >
              {">"} {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ── Sleek Pro dark nav ─────────────────────────────── */
function ProNav() {
  const [active, setActive] = useState("HOME")
  const [scrolled, setScrolled] = useState(false)

  // Add shadow on scroll
  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // handled via inline onScroll — we use a simple global listener
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        background: "rgba(13,17,23,0.90)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #21262D",
        boxShadow: "0 1px 0 0 #30363D, 0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo / Name */}
        <a
          href="#home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #1F6FEB 0%, #00D2FF 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              fontWeight: 800,
              color: "#fff",
              boxShadow: "0 0 12px #1F6FEB66",
              flexShrink: 0,
            }}
          >
            JP
          </span>
          <span
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#E6EDF3",
              letterSpacing: "-0.01em",
            }}
          >
            John Paul
            <span style={{ color: "#58A6FF", marginLeft: "4px" }}>.</span>
          </span>
        </a>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {NAV_ITEMS.map((item) => {
            const isActiveItem = active === item.label
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActive(item.label)}
                style={{
                  fontSize: "13px",
                  fontWeight: isActiveItem ? 600 : 400,
                  padding: "6px 14px",
                  borderRadius: "6px",
                  color: isActiveItem ? "#58A6FF" : "#8B949E",
                  background: isActiveItem ? "rgba(88,166,255,0.10)" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  border: isActiveItem ? "1px solid rgba(88,166,255,0.25)" : "1px solid transparent",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  if (!isActiveItem) {
                    e.currentTarget.style.color = "#C9D1D9"
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActiveItem) {
                    e.currentTarget.style.color = "#8B949E"
                    e.currentTarget.style.background = "transparent"
                  }
                }}
              >
                {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
              </a>
            )
          })}
        </div>

        {/* Online pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            fontSize: "12px",
            color: "#3FB950",
            background: "rgba(63,185,80,0.10)",
            border: "1px solid rgba(63,185,80,0.25)",
            borderRadius: "20px",
            padding: "4px 12px",
            fontWeight: 500,
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#3FB950",
              boxShadow: "0 0 6px #3FB950",
              display: "inline-block",
              animation: "blink 2.5s step-start infinite",
            }}
          />
          Available
        </div>
      </div>
    </nav>
  )
}

/* ── Router ──────────────────────────────────── */
export function CRTNav() {
  const { theme } = useTheme()
  if (theme === "xp")  return <XPNav />
  if (theme === "mac") return <MacNav />
  if (theme === "pro") return <ProNav />
  return <CRTNavInner />
}
