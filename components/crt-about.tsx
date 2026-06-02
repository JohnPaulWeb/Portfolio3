"use client"

const STATS = [
  { label: "PROJECTS COMPLETED", value: "45+", unit: "TOTAL" },
  { label: "YEARS FREELANCING", value: "3+", unit: "YEARS" },
  { label: "GAME SCRIPTS WRITTEN", value: "100+", unit: "SCRIPTS" },
  { label: "CHESS ELO ESTIMATE", value: "1500+", unit: "ELO" },
]

const TOOLS = [
  { name: "NEXT.JS / REACT", role: "FULL-STACK WEB APPS", status: "ACTIVE" },
  { name: "SOLIDITY / ETHERS", role: "SMART CONTRACTS / DAPPS", status: "ACTIVE" },
  { name: "NODE.JS / EXPRESS", role: "APIS & BACKEND SERVICES", status: "ACTIVE" },
  { name: "TAILWIND CSS", role: "RESPONSIVE LAYOUTS & DESIGN", status: "ACTIVE" },
  { name: "ROBLOX STUDIO / LUA", role: "MULTIPLAYER GAME SCRIPTING", status: "ACTIVE" },
  { name: "VS CODE & GIT", role: "PRIMARY WORKSPACE & CONTROL", status: "ACTIVE" },
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
              I am John Paul A. Braganza, a 17-year-old freelance developer with a deep passion for writing clean, efficient, and visual code. For the past 3 years, I have specialized in building robust full-stack applications, interactive frontends, and decentralized web3 systems.
            </p>
            <p>
              I love engineering systems that solve real-world problems. My stack includes React/Next.js for interfaces, Node.js for backend services, Solidity for smart contracts, and Tailwind CSS for styling. I enjoy creating pixel-perfect user interfaces that are fast, accessible, and delight users.
            </p>
            <p style={{ color: "var(--crt-brown-dim)" }}>
              When I'm not coding web applications or smart contracts, I script interactive gaming experiences in Roblox Studio using Lua, or play chess to sharpen my logical problem-solving and algorithmic thinking. I am always excited to learn new frameworks and build systems that stand out.
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
                AVAILABLE FOR SUMMER — SEND YOUR PROJECT IDEA
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
