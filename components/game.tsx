'use client'

import { useEffect, useRef, useState } from 'react'

// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────
interface GameMeta {
  id: string
  label: string
  keys: string
}

interface HudState {
  left: string
  center: string
  right: string
}

interface OverlayState {
  title: string
  body?: string
  btn?: { label: string; action: () => void } | null
  hint?: string
}

interface GameRef {
  onKey?: (e: KeyboardEvent, dir: 'down' | 'up') => void
}

interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; color: string
}

interface Bullet {
  x: number; y: number
  w: number; h: number
  speed: number
}

interface EnemyBullet extends Bullet {}

interface Enemy {
  x: number; y: number
  w: number; h: number
  alive: boolean
  dir: number
  type: number
}

interface Fighter {
  x: number; y: number
  w: number; h: number
  hp: number; maxhp: number
  vx: number; vy: number
  grounded: boolean
  dir: number
  atk: number; atkCd: number; hit: number
  color: string; name: string; score: number
}

interface Tank {
  x: number; y: number
  angle: number
  hp: number; maxhp: number
  cd: number
  color: string; id: number; score: number
}

interface TankBullet {
  x: number; y: number
  vx: number; vy: number
  owner: number
  life: number; bounces: number
}

interface Wall {
  x: number; y: number; w: number; h: number
}

interface Ball {
  x: number; y: number
  vx: number; vy: number
  r: number; color: string
}

// ─────────────────────────────────────────────
//  GAME REGISTRY
//  To add a new game, append an entry here and
//  implement its init function below.
// ─────────────────────────────────────────────
const GAMES: GameMeta[] = [
  { id: 'shooter', label: '🔫 Gun Shooter',  keys: '← → Move   |   SPACE Shoot' },
  { id: 'pvp',     label: '⚔️  PvP Fighter',  keys: 'P1: WASD + F punch   |   P2: Arrows + L punch' },
  { id: 'tank',    label: '🪖 Tank Battle',   keys: 'P1: WASD + F fire   |   P2: Arrows + L fire' },
  { id: 'dodge',   label: '🌀 Dodge Ball',    keys: 'Arrow keys or WASD to dodge everything' },
  // ── ADD YOUR OWN GAME BELOW ──────────────────────────────────────────────────
  // { id: 'mygame', label: '🎮 My Game', keys: 'Controls description here' },
]

// ─────────────────────────────────────────────────────────────────────────────
export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const keysRef   = useRef<Record<string, boolean>>({})
  const animRef   = useRef<number | null>(null)
  const gameRef   = useRef<GameRef | null>(null)

  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [hud, setHud]               = useState<HudState>({ left: '', center: '', right: '' })
  const [overlay, setOverlay]       = useState<OverlayState | null>(null)
  const [keyHint, setKeyHint]       = useState<string>('')

  // ── key listeners ─────────────────────────────────────────────────────────
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keysRef.current[e.key]  = true
      keysRef.current[e.code] = true
      gameRef.current?.onKey?.(e, 'down')
      if (['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)) {
        e.preventDefault()
      }
    }
    const up = (e: KeyboardEvent) => {
      keysRef.current[e.key]  = false
      keysRef.current[e.code] = false
      gameRef.current?.onKey?.(e, 'up')
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup',   up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])

  // ── canvas resize ─────────────────────────────────────────────────────────
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current
      if (!c) return
      c.width  = c.offsetWidth
      c.height = c.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // ── switch game ───────────────────────────────────────────────────────────
  function switchGame(name: string) {
    if (animRef.current) { cancelAnimationFrame(animRef.current); animRef.current = null }
    gameRef.current = null
    keysRef.current = {}

    const meta = GAMES.find(g => g.id === name)
    setActiveGame(name)
    setKeyHint(meta?.keys ?? '')
    setHud({ left: '', center: '', right: '' })

    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    if      (name === 'shooter') initShooter(ctx, c, keysRef, animRef, gameRef, setHud, setOverlay)
    else if (name === 'pvp')     initPVP    (ctx, c, keysRef, animRef, gameRef, setHud, setOverlay)
    else if (name === 'tank')    initTank   (ctx, c, keysRef, animRef, gameRef, setHud, setOverlay)
    else if (name === 'dodge')   initDodge  (ctx, c, keysRef, animRef, gameRef, setHud, setOverlay)
    // ── ADD YOUR GAME ROUTE HERE ───────────────────────────────────────────
    // else if (name === 'mygame') initMyGame(ctx, c, keysRef, animRef, gameRef, setHud, setOverlay)
  }

  useEffect(() => {
    setOverlay({ title: '🕹️ ARCADE', body: 'Pick a game above to start playing.', btn: null })
  }, [])

  return (
    <div style={s.root}>
      <nav style={s.nav}>
        {GAMES.map(g => (
          <button
            key={g.id}
            style={{ ...s.navBtn, ...(activeGame === g.id ? s.navBtnActive : {}) }}
            onClick={() => switchGame(g.id)}
          >
            {g.label}
          </button>
        ))}
      </nav>

      <div style={s.area}>
        <canvas ref={canvasRef} style={s.canvas} />

        {(hud.left || hud.center || hud.right) && (
          <div style={s.hud}>
            <span style={s.hudBox}>{hud.left}</span>
            <span style={s.hudBox}>{hud.center}</span>
            <span style={s.hudBox}>{hud.right}</span>
          </div>
        )}

        {overlay && (
          <div style={s.overlay}>
            <h2 style={s.overlayTitle}>{overlay.title}</h2>
            {overlay.body && (
              <p style={s.overlayBody} dangerouslySetInnerHTML={{ __html: overlay.body }} />
            )}
            {overlay.btn && (
              <button style={s.startBtn} onClick={overlay.btn.action}>
                {overlay.btn.label}
              </button>
            )}
            {overlay.hint && <p style={s.overlayHint}>{overlay.hint}</p>}
          </div>
        )}

        {keyHint && activeGame && (
          <div style={s.keyHint}>{keyHint}</div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  root:         { display:'flex', flexDirection:'column', width:'100vw', height:'100vh', background:'#0a0a0f', fontFamily:'monospace' },
  nav:          { display:'flex', gap:4, padding:'8px 10px', background:'#111118', borderBottom:'1px solid #2a2a3a', flexShrink:0, flexWrap:'wrap' },
  navBtn:       { padding:'6px 14px', background:'#1a1a2e', border:'1px solid #333', color:'#888', cursor:'pointer', borderRadius:4, fontFamily:'monospace', fontSize:13, transition:'.15s' },
  navBtnActive: { background:'#4a3aff', borderColor:'#7a6aff', color:'#fff' },
  area:         { flex:1, position:'relative', overflow:'hidden' },
  canvas:       { display:'block', width:'100%', height:'100%' },
  hud:          { position:'absolute', top:8, left:8, right:8, display:'flex', justifyContent:'space-between', pointerEvents:'none' },
  hudBox:       { background:'rgba(0,0,0,.65)', border:'1px solid #333', padding:'3px 10px', borderRadius:4, fontSize:13, color:'#ddd' },
  overlay:      { position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,.82)', gap:14 },
  overlayTitle: { fontSize:30, color:'#fff', textShadow:'0 0 20px #7a6aff', margin:0 },
  overlayBody:  { color:'#aaa', fontSize:14, textAlign:'center', lineHeight:1.8, margin:0 },
  overlayHint:  { color:'#555', fontSize:12, margin:0 },
  startBtn:     { padding:'11px 32px', background:'#4a3aff', border:'none', color:'#fff', fontFamily:'monospace', fontSize:15, cursor:'pointer', borderRadius:6 },
  keyHint:      { position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)', background:'rgba(0,0,0,.6)', border:'1px solid #2a2a3a', padding:'4px 14px', borderRadius:4, fontSize:11, color:'#555', whiteSpace:'nowrap' },
}

// ─────────────────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function makeParticles() {
  const list: Particle[] = []
  function add(x: number, y: number, color: string, n = 12, speed = 6) {
    for (let i = 0; i < n; i++)
      list.push({ x, y, vx:(Math.random()-.5)*speed, vy:(Math.random()-.5)*speed, life:1, color })
  }
  function draw(ctx: CanvasRenderingContext2D) {
    for (let i = list.length - 1; i >= 0; i--) {
      const p = list[i]
      p.x += p.vx; p.y += p.vy; p.vx *= .9; p.vy *= .9; p.life -= .04
      ctx.globalAlpha = Math.max(0, p.life)
      ctx.fillStyle = p.color
      ctx.fillRect(p.x, p.y, 4, 4)
      ctx.globalAlpha = 1
      if (p.life <= 0) list.splice(i, 1)
    }
  }
  return { add, draw }
}

function gameLoop(animRef: React.MutableRefObject<number | null>, fn: () => void) {
  function tick() { fn(); animRef.current = requestAnimationFrame(tick) }
  animRef.current = requestAnimationFrame(tick)
}

// ─────────────────────────────────────────────────────────────────────────────
//  GAME 1 — GUN SHOOTER
// ─────────────────────────────────────────────────────────────────────────────
function initShooter(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  keysRef: React.MutableRefObject<Record<string, boolean>>,
  animRef: React.MutableRefObject<number | null>,
  gameRef: React.MutableRefObject<GameRef | null>,
  setHud: (h: HudState) => void,
  setOverlay: (o: OverlayState | null) => void
) {
  setOverlay({
    title: '🔫 Gun Shooter',
    body:  'Shoot the invaders before they reach you!',
    btn:   { label: 'Start Game', action: start },
    hint:  '← → Move   |   SPACE Shoot',
  })

  function start() {
    setOverlay(null)
    const W = canvas.width, H = canvas.height
    let score = 0, lives = 3, level = 1
    const player = { x: W / 2, y: H - 64, w: 40, h: 30, speed: 5 }
    let bullets: Bullet[] = [], eBullets: EnemyBullet[] = [], enemies: Enemy[] = []
    const parts = makeParticles()
    let shootCd = 0, eShootTimer = 0, over = false

    function spawnEnemies() {
      enemies = []
      const cols = Math.min(8 + level, 12), rows = Math.min(2 + level, 5)
      const ex = Math.max(20, (W - cols * 55) / 2)
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          enemies.push({ x: ex + c*55, y: 60 + r*45, w:36, h:28, alive:true, dir:1, type:r%3 })
    }
    spawnEnemies()

    const colors = ['#ff4a4a','#ffb84a','#4aff88']
    const drawEnemy = [
      (x:number,y:number,w:number,h:number,cl:string) => { ctx.fillStyle=cl; ctx.fillRect(x,y,w,h); ctx.fillStyle='#000'; ctx.fillRect(x+4,y+4,8,10); ctx.fillRect(x+w-12,y+4,8,10) },
      (x:number,y:number,w:number,h:number,cl:string) => { ctx.fillStyle=cl; ctx.beginPath(); ctx.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle='rgba(0,0,0,.5)'; ctx.beginPath(); ctx.ellipse(x+w/2-4,y+h/2-3,5,4,0,0,Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.ellipse(x+w/2+4,y+h/2-3,5,4,0,0,Math.PI*2); ctx.fill() },
      (x:number,y:number,w:number,h:number,cl:string) => { ctx.fillStyle=cl; ctx.beginPath(); ctx.moveTo(x+w/2,y); ctx.lineTo(x+w,y+h); ctx.lineTo(x,y+h); ctx.closePath(); ctx.fill() },
    ]

    gameRef.current = {
      onKey(e, dir) {
        if (dir === 'down' && e.code === 'Space' && !over && shootCd <= 0) {
          bullets.push({ x: player.x + player.w/2 - 3, y: player.y, w:6, h:18, speed:10 })
          shootCd = 12
        }
      }
    }

    gameLoop(animRef, () => {
      ctx.fillStyle = '#0a0a0f'; ctx.fillRect(0, 0, W, H)

      if (over) {
        ctx.fillStyle = lives <= 0 ? '#ff4a4a' : '#4aff88'
        ctx.font = 'bold 36px monospace'; ctx.textAlign = 'center'
        ctx.fillText(lives <= 0 ? 'GAME OVER' : 'YOU WIN!', W/2, H/2 - 20)
        ctx.fillStyle = '#aaa'; ctx.font = '18px monospace'
        ctx.fillText('Score: ' + score, W/2, H/2 + 18)
        ctx.fillStyle = '#555'; ctx.font = '13px monospace'
        ctx.fillText('Click the tab again to restart', W/2, H/2 + 48)
        ctx.textAlign = 'left'; parts.draw(ctx)
        setHud({ left:`Score: ${score}`, center:`Level: ${level}`, right:`Lives: ${'❤️'.repeat(Math.max(0,lives))}` })
        return
      }

      if (shootCd > 0) shootCd--
      if (keysRef.current['ArrowLeft'] || keysRef.current['KeyA']) player.x = Math.max(0, player.x - player.speed)
      if (keysRef.current['ArrowRight'] || keysRef.current['KeyD']) player.x = Math.min(W - player.w, player.x + player.speed)

      const alive = enemies.filter(e => e.alive)
      alive.forEach(e => { e.x += (1.2 + level * .25) * e.dir })
      if (alive.length > 0) {
        const minX = Math.min(...alive.map(e => e.x))
        const maxX = Math.max(...alive.map(e => e.x + e.w))
        if (minX < 5 || maxX > W - 5) {
          enemies.forEach(e => { if (e.alive) { e.dir *= -1; e.y += 22 } })
          if (alive.some(e => e.y + e.h > H - 90)) over = true
        }
      }
      if (alive.length === 0) { level++; spawnEnemies() }

      eShootTimer--
      if (eShootTimer <= 0 && alive.length) {
        const s = alive[Math.floor(Math.random() * alive.length)]
        eBullets.push({ x: s.x + s.w/2 - 3, y: s.y + s.h, w:6, h:14, speed: 4 + level * .4 })
        eShootTimer = Math.max(15, 55 - level * 5)
      }

      bullets = bullets.filter(b => {
        b.y -= b.speed
        if (b.y < 0) return false
        let hit = false
        enemies.forEach(e => {
          if (e.alive && b.x < e.x+e.w && b.x+b.w > e.x && b.y < e.y+e.h && b.y+b.h > e.y) {
            e.alive = false; score += 10 * level
            parts.add(e.x + e.w/2, e.y + e.h/2, colors[e.type]); hit = true
          }
        })
        if (!hit) { ctx.fillStyle='#ffe04a'; ctx.fillRect(b.x, b.y, b.w, b.h) }
        return !hit
      })

      eBullets = eBullets.filter(b => {
        b.y += b.speed
        if (b.y > H) return false
        if (b.x < player.x+player.w && b.x+b.w > player.x && b.y+b.h > player.y && b.y < player.y+player.h) {
          lives--; parts.add(player.x + player.w/2, player.y, '#ff4a4a', 20)
          if (lives <= 0) over = true
          return false
        }
        ctx.fillStyle = '#ff4a4a'; ctx.fillRect(b.x, b.y, b.w, b.h)
        return true
      })

      enemies.filter(e => e.alive).forEach(e => drawEnemy[e.type](e.x, e.y, e.w, e.h, colors[e.type]))

      ctx.fillStyle = '#4a9aff'
      ctx.fillRect(player.x, player.y + 10, player.w, player.h - 10)
      ctx.fillRect(player.x + player.w/2 - 4, player.y, 8, 14)

      parts.draw(ctx)
      setHud({ left:`Score: ${score}`, center:`Level: ${level}`, right:`Lives: ${'❤️'.repeat(Math.max(0,lives))}` })
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  GAME 2 — PVP FIGHTER
// ─────────────────────────────────────────────────────────────────────────────
function initPVP(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  keysRef: React.MutableRefObject<Record<string, boolean>>,
  animRef: React.MutableRefObject<number | null>,
  gameRef: React.MutableRefObject<GameRef | null>,
  setHud: (h: HudState) => void,
  setOverlay: (o: OverlayState | null) => void
) {
  setOverlay({
    title: '⚔️ PvP Fighter',
    body:  '<span style="color:#4a9aff">P1: WASD + F to punch</span><br/><span style="color:#ff6a4a">P2: Arrow keys + L to punch</span>',
    btn:   { label: 'Start Fight', action: start },
  })

  function start() {
    setOverlay(null)
    const W = canvas.width, H = canvas.height
    const ground = H - 80
    const parts = makeParticles()

    const mk = (x: number, color: string, name: string, dir: number): Fighter =>
      ({ x, y:ground, w:40, h:70, hp:100, maxhp:100, vx:0, vy:0, grounded:true, dir, atk:0, atkCd:0, hit:0, color, name, score:0 })

    let p1 = mk(W*.2, '#4a9aff', 'P1',  1)
    let p2 = mk(W*.7, '#ff6a4a', 'P2', -1)
    let over = false, winner: Fighter | null = null

    function punch(attacker: Fighter, defender: Fighter) {
      if (attacker.atkCd > 0) return
      attacker.atk = 15; attacker.atkCd = 25
      if (Math.abs(attacker.x - defender.x) < 120) {
        defender.hp -= 15 + Math.floor(Math.random() * 10)
        defender.hit = 15
        parts.add(defender.x + defender.w/2, defender.y + 20, '#ffdd44', 10)
        if (defender.hp <= 0) { defender.hp = 0; over = true; winner = attacker; attacker.score++ }
      }
    }

    gameRef.current = {
      onKey(e, dir) {
        if (dir !== 'down') return
        if (e.code === 'KeyW' && p1.grounded) { p1.vy = -14; p1.grounded = false }
        if (e.code === 'ArrowUp' && p2.grounded) { p2.vy = -14; p2.grounded = false }
        if (e.code === 'KeyF') punch(p1, p2)
        if (e.code === 'KeyL') punch(p2, p1)
      }
    }

    function drawFighter(p: Fighter) {
      ctx.globalAlpha = p.hit > 0 ? .6 : 1
      ctx.fillStyle = p.color
      ctx.fillRect(p.x + 5, p.y - p.h + 20, p.w - 10, p.h - 20)
      ctx.beginPath(); ctx.arc(p.x + p.w/2, p.y - p.h, 20, 0, Math.PI*2); ctx.fill()
      ctx.fillRect(p.x + 5, p.y - 20, 14, 22); ctx.fillRect(p.x + 21, p.y - 20, 14, 22)
      if (p.atk > 0) {
        ctx.fillStyle = 'rgba(255,255,255,.4)'
        ctx.fillRect(p.dir===1 ? p.x+p.w : p.x-30, p.y-p.h+35, 30, 12)
      }
      ctx.globalAlpha = 1
      ctx.fillStyle = p.color; ctx.font = 'bold 13px monospace'; ctx.textAlign = 'center'
      ctx.fillText(p.name, p.x + p.w/2, p.y - p.h - 28); ctx.textAlign = 'left'
    }

    gameLoop(animRef, () => {
      ctx.fillStyle = '#0a0a0f'; ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, ground + 1, W, H - ground)
      ctx.fillStyle = '#4a3aff'; ctx.fillRect(0, ground, W, 3)

      if (over && winner) {
        ctx.fillStyle = 'rgba(0,0,0,.7)'; ctx.fillRect(0, 0, W, H)
        ctx.fillStyle = winner.color; ctx.font = 'bold 40px monospace'; ctx.textAlign = 'center'
        ctx.fillText(winner.name + ' WINS!', W/2, H/2 - 20)
        ctx.fillStyle = '#aaa'; ctx.font = '16px monospace'
        ctx.fillText(`P1: ${p1.score}  |  P2: ${p2.score}`, W/2, H/2 + 16)
        ctx.fillStyle = '#555'; ctx.font = '13px monospace'
        ctx.fillText('Click the tab again to restart', W/2, H/2 + 46)
        ctx.textAlign = 'left'
        drawFighter(p1); drawFighter(p2); parts.draw(ctx)
        return
      }

      const spd = 4
      if (keysRef.current['KeyA']) p1.vx = -spd; else if (keysRef.current['KeyD']) p1.vx = spd; else p1.vx *= .7
      if (keysRef.current['ArrowLeft']) p2.vx = -spd; else if (keysRef.current['ArrowRight']) p2.vx = spd; else p2.vx *= .7

      ;[p1, p2].forEach(p => {
        p.vy += .7; p.x += p.vx; p.y += p.vy
        if (p.y >= ground) { p.y = ground; p.vy = 0; p.grounded = true }
        p.x = Math.max(0, Math.min(W - p.w, p.x))
        if (p.atk > 0) p.atk--; if (p.atkCd > 0) p.atkCd--; if (p.hit > 0) p.hit--
        p.dir = p === p1 ? (p1.x < p2.x ? 1 : -1) : (p2.x < p1.x ? -1 : 1)
      })

      parts.draw(ctx); drawFighter(p1); drawFighter(p2)

      const bw = Math.min(200, W * .28)
      ctx.fillStyle = '#333'; ctx.fillRect(20, 16, bw, 18)
      ctx.fillStyle = '#4a9aff'; ctx.fillRect(20, 16, bw * (p1.hp / p1.maxhp), 18)
      ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.strokeRect(20, 16, bw, 18)
      ctx.fillStyle = '#fff'; ctx.font = '12px monospace'; ctx.fillText(`P1 ${p1.hp}`, 24, 30)

      ctx.fillStyle = '#333'; ctx.fillRect(W - 20 - bw, 16, bw, 18)
      ctx.fillStyle = '#ff6a4a'; ctx.fillRect(W - 20 - bw, 16, bw * (p2.hp / p2.maxhp), 18)
      ctx.strokeRect(W - 20 - bw, 16, bw, 18)
      ctx.textAlign = 'right'; ctx.fillStyle = '#fff'; ctx.fillText(`P2 ${p2.hp}`, W - 24, 30); ctx.textAlign = 'left'

      setHud({ left:`P1 Score: ${p1.score}`, center:'PvP Fighter', right:`P2 Score: ${p2.score}` })
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  GAME 3 — TANK BATTLE
// ─────────────────────────────────────────────────────────────────────────────
function initTank(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  keysRef: React.MutableRefObject<Record<string, boolean>>,
  animRef: React.MutableRefObject<number | null>,
  gameRef: React.MutableRefObject<GameRef | null>,
  setHud: (h: HudState) => void,
  setOverlay: (o: OverlayState | null) => void
) {
  setOverlay({
    title: '🪖 Tank Battle',
    body:  '<span style="color:#4aff88">P1: WASD + F to fire</span><br/><span style="color:#ffb84a">P2: Arrow keys + L to fire</span><br/><br/>Bullets bounce off walls!',
    btn:   { label: 'Start Battle', action: start },
  })

  function start() {
    setOverlay(null)
    const W = canvas.width, H = canvas.height
    const walls: Wall[] = [
      { x:W*.35, y:H*.2,  w:80, h:16 },
      { x:W*.55, y:H*.6,  w:80, h:16 },
      { x:W*.2,  y:H*.5,  w:16, h:80 },
      { x:W*.7,  y:H*.3,  w:16, h:80 },
      { x:W*.44, y:H*.44, w:60, h:16 },
    ]
    let bullets: TankBullet[] = []
    const parts = makeParticles()
    let over = false, winner: Tank | null = null

    const mk = (x: number, y: number, angle: number, color: string, id: number): Tank =>
      ({ x, y, angle, hp:3, maxhp:3, cd:0, color, id, score:0 })

    let t1 = mk(80,    H/2, 0,        '#4aff88', 1)
    let t2 = mk(W-120, H/2, Math.PI,  '#ffb84a', 2)

    function fire(t: Tank) {
      if (t.cd > 0 || t.hp <= 0) return
      bullets.push({ x:t.x+Math.cos(t.angle)*28, y:t.y+Math.sin(t.angle)*28, vx:Math.cos(t.angle)*8, vy:Math.sin(t.angle)*8, owner:t.id, life:130, bounces:2 })
      t.cd = 30
    }

    function aabb(ax: number, ay: number, bx: number, by: number, bw: number, bh: number) {
      return ax > bx && ax < bx+bw && ay > by && ay < by+bh
    }

    gameRef.current = {
      onKey(e, dir) {
        if (dir !== 'down') return
        if (e.code === 'KeyF') fire(t1)
        if (e.code === 'KeyL') fire(t2)
      }
    }

    function drawTank(t: Tank) {
      if (t.hp <= 0) return
      ctx.save(); ctx.translate(t.x, t.y); ctx.rotate(t.angle)
      ctx.fillStyle = t.color
      ctx.fillRect(-18, -12, 36, 24)
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-14, -8, 28, 16)
      ctx.fillStyle = t.color; ctx.fillRect(0, -4, 26, 8)
      ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(-18,-14,36,4); ctx.fillRect(-18,10,36,4)
      ctx.restore()
      for (let i = 0; i < t.maxhp; i++) {
        ctx.fillStyle = i < t.hp ? t.color : '#333'
        ctx.fillRect(t.x - 18 + i*14, t.y - 32, 10, 6)
      }
    }

    gameLoop(animRef, () => {
      ctx.fillStyle = '#0d1117'; ctx.fillRect(0, 0, W, H)
      ctx.strokeStyle = 'rgba(255,255,255,.03)'; ctx.lineWidth = 1
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke() }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke() }
      walls.forEach(w => { ctx.fillStyle='#2a2a3e'; ctx.fillRect(w.x,w.y,w.w,w.h); ctx.strokeStyle='#3a3a5e'; ctx.strokeRect(w.x,w.y,w.w,w.h) })

      if (!over) {
        const spd = 2.5, rot = .045
        if (keysRef.current['KeyW'])      { t1.x += Math.cos(t1.angle)*spd; t1.y += Math.sin(t1.angle)*spd }
        if (keysRef.current['KeyS'])      { t1.x -= Math.cos(t1.angle)*spd; t1.y -= Math.sin(t1.angle)*spd }
        if (keysRef.current['KeyA'])      t1.angle -= rot
        if (keysRef.current['KeyD'])      t1.angle += rot
        if (keysRef.current['ArrowUp'])   { t2.x += Math.cos(t2.angle)*spd; t2.y += Math.sin(t2.angle)*spd }
        if (keysRef.current['ArrowDown']) { t2.x -= Math.cos(t2.angle)*spd; t2.y -= Math.sin(t2.angle)*spd }
        if (keysRef.current['ArrowLeft']) t2.angle -= rot
        if (keysRef.current['ArrowRight'])t2.angle += rot
        ;[t1, t2].forEach(t => { t.x=Math.max(20,Math.min(W-20,t.x)); t.y=Math.max(20,Math.min(H-20,t.y)); if(t.cd>0)t.cd-- })

        bullets = bullets.filter(b => {
          b.x += b.vx; b.y += b.vy; b.life--
          if (b.x < 0 || b.x > W) { b.vx *= -1; b.bounces-- }
          if (b.y < 0 || b.y > H) { b.vy *= -1; b.bounces-- }
          walls.forEach(w => { if (aabb(b.x,b.y,w.x,w.y,w.w,w.h)) { b.vx*=-1; b.vy*=-1; b.bounces-- } })
          ;[t1, t2].forEach(t => {
            if (t.hp > 0 && b.owner !== t.id && Math.hypot(b.x-t.x,b.y-t.y) < 22) {
              t.hp--; parts.add(b.x, b.y, t.color, 14)
              if (t.hp <= 0) { over=true; winner=(t.id===1?t2:t1); winner.score++ }
              b.life = 0
            }
          })
          ctx.fillStyle = '#ffe04a'; ctx.beginPath(); ctx.arc(b.x,b.y,5,0,Math.PI*2); ctx.fill()
          ctx.fillStyle = 'rgba(255,200,50,.25)'; ctx.beginPath(); ctx.arc(b.x,b.y,10,0,Math.PI*2); ctx.fill()
          return b.life > 0 && b.bounces >= 0
        })
      }

      parts.draw(ctx); drawTank(t1); drawTank(t2)

      if (over && winner) {
        ctx.fillStyle = 'rgba(0,0,0,.65)'; ctx.fillRect(0,0,W,H)
        ctx.fillStyle = winner.color; ctx.font = 'bold 38px monospace'; ctx.textAlign = 'center'
        ctx.fillText('P' + winner.id + ' WINS!', W/2, H/2 - 18)
        ctx.fillStyle = '#aaa'; ctx.font = '16px monospace'
        ctx.fillText(`P1: ${t1.score}  |  P2: ${t2.score}`, W/2, H/2 + 16)
        ctx.fillStyle = '#555'; ctx.font = '13px monospace'
        ctx.fillText('Click the tab again to restart', W/2, H/2 + 46)
        ctx.textAlign = 'left'
      }

      setHud({ left:`P1 ${'█'.repeat(t1.hp)}${'░'.repeat(t1.maxhp-t1.hp)}`, center:'Tank Battle', right:`${'░'.repeat(t2.maxhp-t2.hp)}${'█'.repeat(t2.hp)} P2` })
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  GAME 4 — DODGE BALL
// ─────────────────────────────────────────────────────────────────────────────
function initDodge(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  keysRef: React.MutableRefObject<Record<string, boolean>>,
  animRef: React.MutableRefObject<number | null>,
  gameRef: React.MutableRefObject<GameRef | null>,
  setHud: (h: HudState) => void,
  setOverlay: (o: OverlayState | null) => void
) {
  setOverlay({
    title: '🌀 Dodge Ball',
    body:  'Survive as long as possible — avoid everything!',
    btn:   { label: 'Start Dodging', action: start },
    hint:  'Arrow keys or WASD to move',
  })

  function start() {
    setOverlay(null)
    const W = canvas.width, H = canvas.height
    let player = { x:W/2, y:H/2, r:14, dead:false }
    let balls: Ball[] = []
    const parts = makeParticles()
    let score = 0, best = 0, spawnTimer = 0

    gameRef.current = {}

    gameLoop(animRef, () => {
      ctx.fillStyle = '#080810'; ctx.fillRect(0, 0, W, H)

      if (player.dead) {
        if (score > best) best = score
        ctx.fillStyle = '#ff4a4a'; ctx.font = 'bold 36px monospace'; ctx.textAlign = 'center'
        ctx.fillText('YOU DIED', W/2, H/2 - 30)
        ctx.fillStyle = '#aaa'; ctx.font = '18px monospace'
        ctx.fillText('Score: ' + score, W/2, H/2 + 10)
        ctx.fillStyle = '#555'; ctx.font = '13px monospace'
        ctx.fillText('Best: ' + best + '   |   Click tab to retry', W/2, H/2 + 42)
        ctx.textAlign = 'left'; parts.draw(ctx)
        return
      }

      const spd = 4
      if (keysRef.current['ArrowLeft'] || keysRef.current['KeyA']) player.x -= spd
      if (keysRef.current['ArrowRight'] || keysRef.current['KeyD']) player.x += spd
      if (keysRef.current['ArrowUp']   || keysRef.current['KeyW']) player.y -= spd
      if (keysRef.current['ArrowDown'] || keysRef.current['KeyS']) player.y += spd
      player.x = Math.max(player.r, Math.min(W - player.r, player.x))
      player.y = Math.max(player.r, Math.min(H - player.r, player.y))

      score++
      const diff = 1 + Math.floor(score / 200) * .5
      spawnTimer--
      if (spawnTimer <= 0) {
        const side = Math.floor(Math.random() * 4)
        let x = 0, y = 0, vx = 0, vy = 0
        const s = 2.5 + diff * .5
        if (side===0)      { x=Math.random()*W; y=-20;   vx=(Math.random()-.5)*3; vy=s }
        else if (side===1) { x=W+20; y=Math.random()*H;  vx=-s; vy=(Math.random()-.5)*3 }
        else if (side===2) { x=Math.random()*W; y=H+20;  vx=(Math.random()-.5)*3; vy=-s }
        else               { x=-20;  y=Math.random()*H;  vx=s;  vy=(Math.random()-.5)*3 }
        const r = 8 + Math.random() * 12
        balls.push({ x, y, vx, vy, r, color:`hsl(${Math.random()*360},100%,60%)` })
        spawnTimer = Math.max(20, 60 - diff * 8)
      }

      balls = balls.filter(b => {
        b.x += b.vx; b.y += b.vy
        if (!player.dead && Math.hypot(b.x - player.x, b.y - player.y) < b.r + player.r) {
          player.dead = true
          parts.add(player.x, player.y, '#4a9aff', 28, 10)
        }
        const gr = ctx.createRadialGradient(b.x-b.r*.3, b.y-b.r*.3, 1, b.x, b.y, b.r)
        gr.addColorStop(0, '#fff'); gr.addColorStop(.4, b.color); gr.addColorStop(1, 'rgba(0,0,0,.5)')
        ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2); ctx.fill()
        return b.x > -60 && b.x < W+60 && b.y > -60 && b.y < H+60
      })

      ctx.shadowColor = '#4a9aff'; ctx.shadowBlur = 16
      ctx.fillStyle = '#4a9aff'; ctx.beginPath(); ctx.arc(player.x, player.y, player.r, 0, Math.PI*2); ctx.fill()
      ctx.shadowBlur = 0
      ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.arc(player.x-5, player.y-4, 5, 0, Math.PI*2); ctx.fill()

      parts.draw(ctx)
      setHud({ left:`Score: ${score}`, center:'Dodge Ball', right:`Best: ${best}` })
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  ✏️  ADD YOUR OWN GAME BELOW THIS LINE
//
//  function initMyGame(
//    ctx: CanvasRenderingContext2D,
//    canvas: HTMLCanvasElement,
//    keysRef: React.MutableRefObject<Record<string, boolean>>,
//    animRef: React.MutableRefObject<number | null>,
//    gameRef: React.MutableRefObject<GameRef | null>,
//    setHud: (h: HudState) => void,
//    setOverlay: (o: OverlayState | null) => void
//  ) {
//    setOverlay({
//      title: '🎮 My Game',
//      body:  'Instructions here',
//      btn:   { label: 'Play', action: start },
//    })
//    function start() {
//      setOverlay(null)
//      const W = canvas.width, H = canvas.height
//      let score = 0
//      gameRef.current = {
//        onKey(e, dir) { /* handle keypress events */ }
//      }
//      gameLoop(animRef, () => {
//        ctx.fillStyle = '#0a0a0f'; ctx.fillRect(0, 0, W, H)
//        // read held keys: keysRef.current['KeyW'], keysRef.current['Space'], etc.
//        // draw with ctx (Canvas 2D API)
//        setHud({ left: 'Score: ' + score, center: 'My Game', right: '' })
//      })
//    }
//  }
// ─────────────────────────────────────────────────────────────────────────────