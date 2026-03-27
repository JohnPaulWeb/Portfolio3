"use client"

import { useEffect, useState } from "react"

const TICKER_ITEMS = [
  "▶ AVAILABLE FOR NEW PROJECTS — 2026",
  "◆ PRODUCT DESIGN  UX  UI  PROTOTYPING  INTERACTION",
  "▶ WORKING WITH EARLY-STAGE STARTUPS & AMBITIOUS FOUNDERS",
  "◆ CURRENTLY: HELPING FOUNDERS BUILD WORLD-CLASS PRODUCTS",
  "▶ MOVE FAST. ITERATE. PIXEL-PERFECT.",
  "◆ RECENT: AGORA  SKYAGENT  BRILLIANCE",
  "▶ SEND YOUR PROJECT IDEA — Ayanokoji",
  "◆ SIGNAL STRENGTH: 100%",
]

export function CRTTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div
      className="overflow-hidden border-y text-xs py-2 tracking-widest"
      style={{
        borderColor: "var(--crt-border-col)",
        background: "var(--crt-paper)",
        color: "var(--crt-brown-dim)",
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="px-8 shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function CRTHero() {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const id = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."))
    }, 500)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12"
      style={{ background: "var(--crt-bg)" }}
    >
      {/* Big title */}
      <div className="text-center relative z-10 w-full max-w-4xl mx-auto">
        {/* System prompt line */}
        <div className="text-xs tracking-[0.3em] mb-6 glow-dim">
          C:\PORTFOLIO\&gt; LOADING_John Paul{dots}
        </div>

        {/* Main name */}
        <h1
          className="glow flicker leading-none mb-4"
          style={{
            fontFamily: "VT323, monospace",
            fontSize: "clamp(3.5rem, 12vw, 10rem)",
            letterSpacing: "0.04em",
            color: "var(--crt-brown-bright)",
          }}
        >
          John Paul
        </h1>
        <h1
          className="glow flicker leading-none mb-4"
          style={{
            fontFamily: "VT323, monospace",
            fontSize: "clamp(3.5rem, 12vw, 10rem)",
            letterSpacing: "0.04em",
            color: "var(--crt-brown-bright)",
          }}
        >
          Braganza
        </h1>

        {/* Subtitle */}
        <div
          className="glow-sm mb-2"
          style={{
            fontFamily: "VT323, monospace",
            fontSize: "clamp(1.2rem, 4vw, 2rem)",
            color: "var(--crt-brown)",
            letterSpacing: "0.2em",
          }}
        >
          FREELANCE Web Developer
        </div>

        <div className="text-xs tracking-widest glow-dim mb-12">
          ◆ HELPING STARTUPS BUILD WORLD-CLASS PRODUCTS — AVAILABLE NOW ◆
        </div>

        {/* Terminal box */}
        <div
          className="crt-border text-left p-6 max-w-xl mx-auto text-sm leading-relaxed mb-10"
          style={{ background: "var(--crt-paper)" }}
        >
          <div className="space-y-2">
            <div>
              <span style={{ color: "var(--crt-brown-dim)" }}>$</span>{" "}
              <span className="glow-sm">whoami</span>
            </div>
            <div style={{ color: "var(--crt-brown)" }}>
              I work with early-stage startups and ambitious founders to bring clarity and craft into their ideas — building products their users are going to love.
            </div>
            <div className="mt-3">
              <span style={{ color: "var(--crt-brown-dim)" }}>$</span>{" "}
              <span className="glow-sm">cat ./approach.txt</span>
            </div>
            <div style={{ color: "var(--crt-brown-dim)" }} className="pl-4 space-y-0.5">
              <div>MOVE_FAST/</div>
              <div>ITERATE_TIL_CLARITY/</div>
              <div>PIXEL_PERFECT/</div>
            </div>
            <div className="mt-2">
              <span style={{ color: "var(--crt-brown-dim)" }}>$</span>{" "}
              <span className="glow-sm">./send_project_idea.sh</span>
              <span
                style={{
                  display: "inline-block",
                  animation: "blink 1s step-start infinite",
                  color: "var(--crt-brown-bright)",
                }}
              >
                █
              </span>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#work"
            className="text-xs tracking-[0.2em] px-6 py-3 transition-all duration-100"
            style={{
              border: "1px solid var(--crt-brown)",
              color: "var(--crt-brown-bright)",
              background: "rgba(122,74,30,0.07)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--crt-brown)"
              e.currentTarget.style.color = "var(--crt-bg)"
              e.currentTarget.style.boxShadow = "var(--crt-glow)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(122,74,30,0.07)"
              e.currentTarget.style.color = "var(--crt-brown-bright)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            [ VIEW WORK ]
          </a>
          <a
            href="#contact"
            className="text-xs tracking-[0.2em] px-6 py-3 transition-all duration-100"
            style={{
              border: "1px solid var(--crt-border-col)",
              color: "var(--crt-brown-dim)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--crt-brown)"
              e.currentTarget.style.color = "var(--crt-brown)"
              e.currentTarget.style.boxShadow = "var(--crt-glow-sm)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--crt-border-col)"
              e.currentTarget.style.color = "var(--crt-brown-dim)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            [ SEND PROJECT IDEA ]
          </a>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest glow-dim"
        style={{ animation: "blink 2s step-start infinite" }}
      >
        ▼ SCROLL DOWN ▼
      </div>
    </section>
  )
}
