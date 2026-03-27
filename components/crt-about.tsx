"use client"

const STATS = [
  { label: "PROJECTS COMPLETED", value: "50+", unit: "TOTAL" },
  { label: "YEARS EXPERIENCE", value: "4+", unit: "YEARS" },
  { label: "STARTUPS WORKED WITH", value: "20+", unit: "CLIENTS" },
  { label: "HAPPY FOUNDERS", value: "★★★★★", unit: "RATING" },
]

const TOOLS = [
  { name: "FIGMA", role: "UI / UX / PROTOTYPING", status: "ACTIVE" },
  { name: "FRAMER", role: "WEB DESIGN + MOTION", status: "ACTIVE" },
  { name: "NOTION", role: "RESEARCH + DOCS", status: "ACTIVE" },
  { name: "LOTTIE", role: "MICRO-INTERACTIONS", status: "ACTIVE" },
  { name: "WEBFLOW", role: "NO-CODE WEB", status: "ACTIVE" },
  { name: "VS CODE", role: "FRONT-END DEV", status: "IDLE" },
]

export function CRTAbout() {
  return (
    <section id="about" className="px-6 py-24 max-w-6xl mx-auto">
      <div className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- SECTION 04 -----------------------------------------------
        </div>
        <h2
          className="glow"
          style={{ fontFamily: "VT323, monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
        >
          ABOUT.TXT
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Left: bio + stats */}
        <div>
          <div
            className="p-6 crt-border text-sm leading-relaxed space-y-4 mb-8"
            style={{ background: "var(--crt-paper)", color: "var(--crt-brown)" }}
          >
            <div className="text-xs tracking-widest glow-dim mb-2">
              $ cat bio.txt
            </div>
            <p>
             I am John Paul A. Braganza a Freelancer at the of 17 years old, with a passion for crafting visually stunning and user-centric digital experiences. With a keen eye for detail and a commitment to excellence, I specialize in creating intuitive interfaces that seamlessly blend aesthetics with functionality.
            </p>
            <p>
              I collaborate closely with clients to understand their unique needs and translate them into compelling designs that resonate with their target audience. My expertise spans across various design tools and methodologies, allowing me to deliver innovative solutions that drive engagement and elevate brand presence.
            </p>
            <p style={{ color: "var(--crt-brown-dim)" }}>
              I like to create website and apps and games that are not only visually appealing but also provide an exceptional user experience. I am always eager to take on new challenges and push the boundaries of design to create impactful digital products.
            </p>
            <div className="pt-3" style={{ borderTop: "1px solid var(--crt-border-col)" }}>
              <span
                className="inline-flex items-center gap-2 text-xs tracking-widest"
                style={{ color: "var(--crt-amber)" }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--crt-amber)", boxShadow: "0 0 6px var(--crt-amber)", animation: "blink 2s step-start infinite" }}
                />
                AVAILABLE FOR FEBRUARY — SEND YOUR PROJECT IDEA
              </span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-0" style={{ border: "1px solid var(--crt-border-col)" }}>
            {STATS.map((s) => (
              <div
                key={s.label}
                className="p-4"
                style={{
                  borderRight: "1px solid var(--crt-border-col)",
                  borderBottom: "1px solid var(--crt-border-col)",
                  background: "var(--crt-paper)",
                }}
              >
                <div
                  className="glow"
                  style={{ fontFamily: "VT323, monospace", fontSize: "2rem" }}
                >
                  {s.value}
                </div>
                <div className="text-xs" style={{ color: "var(--crt-brown-dim)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: tools list */}
        <div>
          <div className="text-xs tracking-widest glow-dim mb-4">
            $ ls ./tools — {TOOLS.filter(t => t.status === "ACTIVE").length} ACTIVE
          </div>
          <div className="space-y-0" style={{ border: "1px solid var(--crt-border-col)" }}>
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="p-4 group cursor-pointer transition-all duration-100"
                style={{
                  borderBottom: "1px solid var(--crt-border-col)",
                  background: "var(--crt-paper)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(122,74,30,0.06)" }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--crt-paper)" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="group-hover:glow-sm transition-all"
                      style={{ fontFamily: "VT323, monospace", fontSize: "1.2rem", color: "var(--crt-brown-bright)" }}
                    >
                      {tool.name}
                    </span>
                    <div className="text-xs mt-0.5" style={{ color: "var(--crt-brown-dim)" }}>
                      {tool.role}
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--crt-brown-dim)" }}>
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{
                        background: tool.status === "ACTIVE" ? "var(--crt-amber)" : "var(--crt-brown-dim)",
                        boxShadow: tool.status === "ACTIVE" ? "0 0 6px var(--crt-amber)" : "none",
                      }}
                    />
                    {tool.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
