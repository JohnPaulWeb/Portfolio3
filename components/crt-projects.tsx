"use client"

import Image from "next/image"
import { useState } from "react"

const WORKS = [
  {
    id: "WRK_001",
    title: "Mangaldan National High School",
    category: "WEBAPP — 2025",
    year: "2025",
    desc: "A minimalist shopping experience designed for easy discovery and quick checkout. Clean flows, intuitive browsing, frictionless purchase.",
    tags: ["Frontend", "Html, Css, Js", "FIGMA"],
    img: "/works/john.png",
    type: "webapp",
  },
  {
    id: "WRK_002",
    title: "Snake Game",
    category: "LANDING — 2025",
    year: "2025",
    desc: "Sleek, futuristic interface with dark theme aesthetics, playful gradients, and smooth micro-interactions — balancing minimalism with personality to showcase an AI agent playground.",
    tags: ["LANDING PAGE", "Html, CSS, JS", "PURE WEB"],
    img: "/works/snake.png",
    type: "landing",
  },
  {
    id: "WRK_003",
    title: "Riverside Web",
    category: "DASHBOARD — 2025",
    year: "2025",
    desc: "Complex billing, scheduling, and customer data translated into a clear, accessible, and efficient UI — simplifying core operational workflows for a growing business.",
    tags: ["DASHBOARD", "DATA VISUALISATION", "FIGMA"],
    img: "/works/riverside.png",
    type: "dashboard",
  },
]

export function CRTProjects() {
  return (
    <section id="work" className="px-6 py-24 max-w-6xl mx-auto">
      <div className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- SECTION 03 -----------------------------------------------
        </div>
        <h2
          className="glow"
          style={{ fontFamily: "VT323, monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
        >
          SELECTED_WORK
        </h2>
        <div className="text-xs glow-dim tracking-widest mt-1">
          {WORKS.length} PROJECTS — SORTED BY DATE DESC
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ border: "1px solid var(--crt-border-col)" }}>
        {WORKS.map((w) => (
          <WorkCard key={w.id} work={w} />
        ))}
        {/* See all projects card */}
        <div
          className="flex flex-col items-center justify-center p-10 cursor-pointer group transition-all duration-150"
          style={{
            background: "var(--crt-paper)",
            border: "1px solid var(--crt-border-col)",
            minHeight: "200px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(122,74,30,0.06)"
            e.currentTarget.style.borderColor = "var(--crt-brown)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--crt-paper)"
            e.currentTarget.style.borderColor = "var(--crt-border-col)"
          }}
        >
          <div
            className="text-2xl glow-sm group-hover:glow mb-3 tracking-widest"
            style={{ fontFamily: "VT323, monospace", color: "var(--crt-brown-bright)" }}
          >
            SEE ALL PROJECTS
          </div>
          <div className="text-xs tracking-widest" style={{ color: "var(--crt-brown-dim)" }}>
            ayanokoji.com/work
          </div>
          <div
            className="text-2xl mt-4 transition-transform duration-200 group-hover:translate-x-2"
            style={{ color: "var(--crt-brown-dim)" }}
          >
            ▶
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkCard({ work }: { work: (typeof WORKS)[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group cursor-pointer relative overflow-hidden"
      style={{
        background: "var(--crt-paper)",
        borderColor: "var(--crt-border-col)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <Image
          src={work.img}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-500"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            filter: "sepia(0.3) contrast(1.05)",
          }}
        />
        {/* Scanline overlay on image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(100,40,0,0.07) 3px,rgba(100,40,0,0.07) 4px)",
          }}
        />
        {/* Hover description overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-200"
          style={{
            background: "rgba(245,237,224,0.92)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <div className="text-xs tracking-widest mb-2" style={{ color: "var(--crt-brown-dim)" }}>
            {work.id}
          </div>
          <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--crt-brown)" }}>
            {work.desc}
          </p>
          <div className="flex gap-2 flex-wrap">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5"
                style={{ border: "1px solid var(--crt-border-col)", color: "var(--crt-brown-dim)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderTop: "1px solid var(--crt-border-col)" }}
      >
        <div>
          <div
            className="tracking-wider glow-sm"
            style={{ fontFamily: "VT323, monospace", fontSize: "1.3rem", color: "var(--crt-brown-bright)" }}
          >
            {work.title}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--crt-brown-dim)" }}>
            {work.category}
          </div>
        </div>
        <div className="text-xs" style={{ color: "var(--crt-brown-dim)" }}>
          {work.year}
        </div>
      </div>
    </div>
  )
}
