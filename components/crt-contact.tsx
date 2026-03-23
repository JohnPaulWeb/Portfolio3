"use client"

import { useState } from "react"

const INFO_ROWS = [
  { k: "WEBSITE", v: "https://vercel.com/isseiyudos-projects" },
  { k: "TWITTER", v: "@isseiyudo" },
  { k: "DRIBBBLE", v: "dribbble.com/ayanokoji" },
  { k: "LINKEDIN", v: "linkedin.com/in/john-paul" },
  { k: "GITHUB", v: "github.com/JohnPaulWeb" },
  { k: "AVAILABILITY", v: "Available from February" },
]

const STATUS_BARS = [
  { name: "AVAILABILITY", val: 100 },
  { name: "CREATIVE ENERGY", val: 96 },
  { name: "COFFEE LEVEL", val: 85 },
  { name: "INBOX", val: 70 },
]

export function CRTContact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 1600)
  }

  function handleReset() {
    setSent(false)
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <section id="contact" className="px-6 py-24 max-w-6xl mx-auto">
      <div className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- SECTION 05 -----------------------------------------------
        </div>
        <h2
          className="glow"
          style={{ fontFamily: "VT323, monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
        >
          CONTACT.SH
        </h2>
        <div className="text-xs glow-dim tracking-widest mt-1">
          LET'S BUILD SOMETHING BEAUTIFUL TOGETHER
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left column: info + status */}
        <div className="space-y-6">

          <div className="p-6 crt-border" style={{ background: "var(--crt-paper)" }}>
            <div className="text-xs tracking-widest glow-dim mb-4">CONTACT INFO</div>
            <div className="space-y-3 text-sm" style={{ color: "var(--crt-brown)" }}>
              {INFO_ROWS.map(({ k, v }) => (
                <div key={k} className="flex gap-4">
                  <span
                    className="w-28 shrink-0 text-xs tracking-widest"
                    style={{ color: "var(--crt-brown-dim)" }}
                  >
                    {k}
                  </span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 crt-border" style={{ background: "var(--crt-paper)" }}>
            <div className="text-xs tracking-widest glow-dim mb-4">SYSTEM STATUS</div>
            <div className="space-y-3">
              {STATUS_BARS.map(({ name, val }) => (
                <div key={name} className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span style={{ color: "var(--crt-brown-dim)" }}>{name}</span>
                    <span style={{ color: "var(--crt-brown)" }}>{val}%</span>
                  </div>
                  <div className="h-1 w-full" style={{ background: "var(--crt-border-col)" }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${val}%`,
                        background: "var(--crt-amber)",
                        boxShadow: "0 0 6px var(--crt-amber)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right column: form */}
        <div className="p-6 crt-border" style={{ background: "var(--crt-paper)" }}>
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div
                className="text-6xl glow"
                style={{ fontFamily: "VT323, monospace" }}
              >
                SENT
              </div>
              <div className="text-xs tracking-widest glow-dim">
                TRANSMISSION COMPLETE
              </div>
              <div className="text-sm" style={{ color: "var(--crt-brown)" }}>
                Message received. I'll be back in touch soon.
              </div>
              <button
                onClick={handleReset}
                className="text-xs tracking-widest mt-4 px-4 py-2 transition-all duration-100"
                style={{ border: "1px solid var(--crt-border-col)", color: "var(--crt-brown-dim)" }}
              >
                [ SEND ANOTHER ]
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-xs tracking-widest glow-dim mb-2">
                $ ./compose_message.sh
              </div>

              <div>
                <label className="block text-xs tracking-widest mb-2 glow-dim">
                  YOUR_NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full text-sm px-3 py-2 outline-none transition-all duration-100"
                  style={{
                    background: "var(--crt-bg)",
                    border: "1px solid var(--crt-border-col)",
                    color: "var(--crt-brown)",
                    caretColor: "var(--crt-brown)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--crt-brown)"
                    e.currentTarget.style.boxShadow = "var(--crt-glow-sm)"
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--crt-border-col)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                />
              </div>

              <div>
                <label className="block text-xs tracking-widest mb-2 glow-dim">
                  YOUR_EMAIL
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full text-sm px-3 py-2 outline-none transition-all duration-100"
                  style={{
                    background: "var(--crt-bg)",
                    border: "1px solid var(--crt-border-col)",
                    color: "var(--crt-brown)",
                    caretColor: "var(--crt-brown)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--crt-brown)"
                    e.currentTarget.style.boxShadow = "var(--crt-glow-sm)"
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--crt-border-col)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                />
              </div>

              <div>
                <label className="block text-xs tracking-widest mb-2 glow-dim">
                  MESSAGE_BODY
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="w-full text-sm px-3 py-2 outline-none resize-none transition-all duration-100"
                  style={{
                    background: "var(--crt-bg)",
                    border: "1px solid var(--crt-border-col)",
                    color: "var(--crt-brown)",
                    caretColor: "var(--crt-brown)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--crt-brown)"
                    e.currentTarget.style.boxShadow = "var(--crt-glow-sm)"
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--crt-border-col)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 text-xs tracking-[0.3em] transition-all duration-100"
                style={{
                  border: "1px solid var(--crt-brown)",
                  color: sending ? "var(--crt-brown-dim)" : "var(--crt-brown-bright)",
                  background: "rgba(122,74,30,0.07)",
                }}
                onMouseEnter={(e) => {
                  if (!sending) {
                    e.currentTarget.style.background = "var(--crt-brown)"
                    e.currentTarget.style.color = "var(--crt-bg)"
                    e.currentTarget.style.boxShadow = "var(--crt-glow)"
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(122,74,30,0.07)"
                  e.currentTarget.style.color = "var(--crt-brown-bright)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                {sending ? "[ TRANSMITTING... ]" : "[ SEND MESSAGE ]"}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}
