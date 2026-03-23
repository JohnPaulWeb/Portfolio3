"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/lib/theme-context"

export function CRTOverlay() {
  const noiseRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = noiseRef.current
    if (!canvas) return
    if (theme !== "crt") {
      const ctx = canvas.getContext("2d")
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let frame = 0

    const drawNoise = () => {
      frame++
      if (frame % 3 !== 0) {
        animId = requestAnimationFrame(drawNoise)
        return
      }

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() < 0.025 ? Math.random() * 50 : 0
        data[i]     = 120 + noise * 0.6
        data[i + 1] = 70  + noise * 0.3
        data[i + 2] = 20  + noise * 0.1
        data[i + 3] = noise * 2
      }

      ctx.putImageData(imageData, 0, 0)
      animId = requestAnimationFrame(drawNoise)
    }

    drawNoise()
    return () => cancelAnimationFrame(animId)
  }, [theme])

  if (theme !== "crt") return null

  return (
    <>
      <div
        className="crt-scanlines crt-vignette fixed inset-0 pointer-events-none"
        style={{ zIndex: 9997 }}
        aria-hidden="true"
      />
      <canvas
        ref={noiseRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9996, mixBlendMode: "multiply", opacity: 0.55 }}
        aria-hidden="true"
      />
    </>
  )
}

