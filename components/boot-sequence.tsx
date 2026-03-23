"use client"

import { useState, useEffect } from "react"

const BOOT_LINES = [
  "MY PORTFOLIO — Ayanokoji",
  "RAM CHECK... 640K OK",
  "LOADING DESIGN MODULES...",
  "PRODUCT_DESIGN.EXE ........ OK",
  "FIGMA.EXE ................. OK",
  "FRAMER.EXE ................ OK",
  "SIGNAL ACQUIRED [ ████████████ ] 100%",
  "WELCOME — Ayanokoji — WEB DEVELOPER",
  "> SYSTEM READY_",
]

interface BootSequenceProps {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedChars, setDisplayedChars] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (currentLine >= BOOT_LINES.length) {
      setTimeout(() => {
        setDone(true)
        setTimeout(onComplete, 600)
      }, 500)
      return
    }

    const line = BOOT_LINES[currentLine]
    if (displayedChars < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedChars((c) => c + 1)
      }, 18)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, line])
        setCurrentLine((l) => l + 1)
        setDisplayedChars(0)
      }, 80)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, displayedChars, onComplete])

  const currentText =
    currentLine < BOOT_LINES.length
      ? BOOT_LINES[currentLine].slice(0, displayedChars)
      : ""

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        background: "var(--crt-bg)",
        zIndex: 10000,
        opacity: done ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: done ? "none" : "all",
      }}
    >
      <div className="w-full max-w-2xl px-8 font-mono">
        <div className="mb-8 text-center">
          <div
            className="text-5xl glow"
            style={{ fontFamily: "VT323, monospace", letterSpacing: "0.1em" }}
          >
            Ayanokoji
          </div>
          <div className="text-xs glow-dim mt-1 tracking-widest">
            FREELANCE - Web Developer
          </div>
        </div>

        <div className="space-y-1 text-sm">
          {lines.map((line, i) => (
            <div key={i} className="glow-sm" style={{ color: "var(--crt-brown)" }}>
              {line}
            </div>
          ))}
          {currentLine < BOOT_LINES.length && (
            <div className="glow-sm" style={{ color: "var(--crt-brown-bright)" }}>
              {currentText}
              <span
                style={{
                  animation: "blink 0.8s step-start infinite",
                  display: "inline-block",
                }}
              >
                █
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
