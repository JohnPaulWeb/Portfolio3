"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "@/lib/theme-context"

// Custom SVG Piece renderer that matches the active theme dynamically
function ChessPiece({ type, color }: { type: string; color: "w" | "b" }) {
  const { theme } = useTheme()

  // Base styling variables depending on color and theme
  const strokeColor =
    theme === "crt"
      ? "var(--crt-brown)"
      : theme === "xp"
      ? "#000000"
      : "#111111"

  const fillColor =
    color === "w"
      ? theme === "crt"
        ? "var(--crt-bg)"
        : "#FFFFFF"
      : theme === "crt"
      ? "var(--crt-brown)"
      : theme === "xp"
      ? "#316AC5" // Windows XP classic blue for black pieces
      : "#555555" // Classic Mac gray for black pieces

  const secondaryColor = color === "w" ? strokeColor : fillColor

  const svgProps = {
    viewBox: "0 0 45 45",
    className: "w-10 h-10 md:w-11 md:h-11 transition-transform duration-150 active:scale-95 select-none",
    fill: fillColor,
    stroke: strokeColor,
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }

  switch (type) {
    case "P": // Pawn
      return (
        <svg {...svgProps}>
          <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 1.31.63 2.47 1.61 3.2.2.15.28.43.19.68l-.8 2.24c-.3.84-.3 1.76 0 2.6l.8 2.24c.09.25.01.53-.19.68-1.54 1.15-2.61 2.96-2.61 5.06h10c0-2.1-1.07-3.91-2.61-5.06-.2-.15-.28-.43-.19-.68l.8-2.24c.3-.84.3-1.76 0-2.6l-.8-2.24c-.09-.25-.01-.53.19-.68.98-.73 1.61-1.89 1.61-3.2 0-2.21-1.79-4-4-4z" />
          <path d="M12 36h21" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M14 38h17" fill="none" stroke={strokeColor} strokeWidth="2" />
        </svg>
      )
    case "R": // Rook
      return (
        <svg {...svgProps}>
          <path d="M9 39h27v-3H9v3zM12 36v-16h21v16H12z" />
          <path d="M12 20l3-3h15l3 3H12z" />
          <path d="M14 17v-4h4v2h5v-2h5v2h3v-2h4v4H14z" />
          <path d="M11 36h23" fill="none" stroke={strokeColor} strokeWidth="2" />
        </svg>
      )
    case "N": // Knight (Horse)
      return (
        <svg {...svgProps}>
          <path d="M 22,10 C 32.5,11 38.5,18 36,29 C 34,35 30,37.5 28,38.5 C 26,38 27.5,35.5 27.5,35.5 C 27.5,35.5 25,36.5 22.5,34.5 C 20,32.5 19.5,28.5 19.5,28.5 C 19.5,28.5 18,31 14,31.5 C 11.5,30 11.5,26 13,23 C 14.5,20 17,17 19.5,15.5 C 22,14 25,12 25,12 C 25,12 24,11 22,10 z" />
          <path d="M 24,18 C 24,18 24.5,17 25,17 C 25.5,17 26,18 26,18 C 26,18 25.5,19 25,19 C 24.5,19 24,18 24,18 Z" fill={strokeColor} />
          <path d="M 9,36 A 36,36 0 0,0 22.5,37 A 36,36 0 0,0 36,36 M 12,36 v 2 h 21 v -2 M 14,38 v 2.5 h 17 v -2.5" />
        </svg>
      )
    case "B": // Bishop
      return (
        <svg {...svgProps}>
          <path d="M 9,36 A 36,36 0 0,0 22.5,37 A 36,36 0 0,0 36,36" />
          <path d="M 15,32 C 17.5,34.5 20,35 22.5,35 C 25,35 27.5,34.5 30,32 C 30.5,29.5 31,25 31,20 C 31,14.5 28.5,10 22.5,10 C 16.5,10 14,14.5 14,20 C 14,25 14.5,29.5 15,32 Z" />
          <circle cx="22.5" cy="5" r="2" fill={secondaryColor} />
          <path d="M 17.5,18 L 27.5,14 M 22.5,11 v 10 M 20,15 h 5" />
          <path d="M 12,36 v 2 h 21 v -2 M 14,38 v 2.5 h 17 v -2.5" />
        </svg>
      )
    case "Q": // Queen
      return (
        <svg {...svgProps}>
          <path d="M 9,26 C 17.5,24.5 27.5,24.5 36,26 L 38.5,13.5 L 31,21 L 22.5,10.5 L 14,21 L 6.5,13.5 L 9,26 Z" />
          <circle cx="6" cy="12" r="1.5" fill={secondaryColor} />
          <circle cx="14" cy="19" r="1.5" fill={secondaryColor} />
          <circle cx="22.5" cy="9" r="1.5" fill={secondaryColor} />
          <circle cx="31" cy="19" r="1.5" fill={secondaryColor} />
          <circle cx="39" cy="12" r="1.5" fill={secondaryColor} />
          <path d="M 9,36 A 36,36 0 0,0 22.5,37 A 36,36 0 0,0 36,36 M 12,36 v 2 h 21 v -2 M 14,38 v 2.5 h 17 v -2.5" />
        </svg>
      )
    case "K": // King
      return (
        <svg {...svgProps}>
          <path d="M 22.5,11.5 V 6 M 20,8 h 5 M 22.5,16.5 L 22.5,32 M 12,36 A 36,36 0 0,0 22.5,37 A 36,36 0 0,0 36,36" />
          <path d="M 8.5,14 L 8.5,32 C 8.5,32 11.5,35 22.5,35 C 33.5,35 36.5,32 36.5,32 L 36.5,14 L 31,19.5 L 25.5,14 L 22.5,21.5 L 19.5,14 L 14,19.5 L 8.5,14 Z" />
          <path d="M 11.5,30 h 22" />
          <path d="M 12,36 v 2 h 21 v -2 M 14,38 v 2.5 h 17 v -2.5" />
        </svg>
      )
    default:
      return null
  }
}

// Initial board positions helper
const getInitialBoard = (): (string | null)[][] => [
  ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
  ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
  ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
]

// Determine if moves are within the board bounds
const inBounds = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8

// Piece movement rule validations
function getValidMoves(
  r: number,
  c: number,
  board: (string | null)[][],
  hasKingMoved = { w: true, b: true },
  hasRookMoved = { wLeft: true, wRight: true, bLeft: true, bRight: true }
): [number, number][] {
  const piece = board[r][c]
  if (!piece) return []
  const color = piece[0] // "w" or "b"
  const type = piece[1] // "P", "R", "N", "B", "Q", "K"
  const moves: [number, number][] = []

  const isOpponent = (tr: number, tc: number) => {
    const p = board[tr][tc]
    return p !== null && p[0] !== color
  }
  const isEmpty = (tr: number, tc: number) => board[tr][tc] === null

  if (type === "P") {
    const dir = color === "w" ? -1 : 1
    // Step forward 1
    if (inBounds(r + dir, c) && isEmpty(r + dir, c)) {
      moves.push([r + dir, c])
      // Initial move 2 steps
      const startRow = color === "w" ? 6 : 1
      if (r === startRow && inBounds(r + 2 * dir, c) && isEmpty(r + 2 * dir, c)) {
        moves.push([r + 2 * dir, c])
      }
    }
    // Captures
    const diagonals = [[r + dir, c - 1], [r + dir, c + 1]]
    for (const [tr, tc] of diagonals) {
      if (inBounds(tr, tc) && isOpponent(tr, tc)) {
        moves.push([tr, tc])
      }
    }
  } else if (type === "R") {
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    for (const [dr, dc] of dirs) {
      let tr = r + dr
      let tc = c + dc
      while (inBounds(tr, tc)) {
        if (isEmpty(tr, tc)) {
          moves.push([tr, tc])
        } else {
          if (isOpponent(tr, tc)) moves.push([tr, tc])
          break
        }
        tr += dr
        tc += dc
      }
    }
  } else if (type === "N") {
    const jumps = [
      [r - 2, c - 1], [r - 2, c + 1],
      [r - 1, c - 2], [r - 1, c + 2],
      [r + 1, c - 2], [r + 1, c + 2],
      [r + 2, c - 1], [r + 2, c + 1]
    ]
    for (const [tr, tc] of jumps) {
      if (inBounds(tr, tc) && (isEmpty(tr, tc) || isOpponent(tr, tc))) {
        moves.push([tr, tc])
      }
    }
  } else if (type === "B") {
    const dirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    for (const [dr, dc] of dirs) {
      let tr = r + dr
      let tc = c + dc
      while (inBounds(tr, tc)) {
        if (isEmpty(tr, tc)) {
          moves.push([tr, tc])
        } else {
          if (isOpponent(tr, tc)) moves.push([tr, tc])
          break
        }
        tr += dr
        tc += dc
      }
    }
  } else if (type === "Q") {
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]
    for (const [dr, dc] of dirs) {
      let tr = r + dr
      let tc = c + dc
      while (inBounds(tr, tc)) {
        if (isEmpty(tr, tc)) {
          moves.push([tr, tc])
        } else {
          if (isOpponent(tr, tc)) moves.push([tr, tc])
          break
        }
        tr += dr
        tc += dc
      }
    }
  } else if (type === "K") {
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]
    for (const [dr, dc] of dirs) {
      const tr = r + dr
      const tc = c + dc
      if (inBounds(tr, tc) && (isEmpty(tr, tc) || isOpponent(tr, tc))) {
        moves.push([tr, tc])
      }
    }

    // Castling Logic
    const opponentColor = color === "w" ? "b" : "w"
    const kingMoved = color === "w" ? hasKingMoved.w : hasKingMoved.b

    if (!kingMoved) {
      // Kingside castling (King moves to col 6, Rook moves from col 7 to col 5)
      const rookRightMoved = color === "w" ? hasRookMoved.wRight : hasRookMoved.bRight
      if (!rookRightMoved && board[r][7] === `${color}R`) {
        if (isEmpty(r, 5) && isEmpty(r, 6)) {
          if (!isSquareThreatened(r, 4, opponentColor, board) &&
              !isSquareThreatened(r, 5, opponentColor, board) &&
              !isSquareThreatened(r, 6, opponentColor, board)) {
            moves.push([r, 6])
          }
        }
      }

      // Queenside castling (King moves to col 2, Rook moves from col 0 to col 3)
      const rookLeftMoved = color === "w" ? hasRookMoved.wLeft : hasRookMoved.bLeft
      if (!rookLeftMoved && board[r][0] === `${color}R`) {
        if (isEmpty(r, 1) && isEmpty(r, 2) && isEmpty(r, 3)) {
          if (!isSquareThreatened(r, 4, opponentColor, board) &&
              !isSquareThreatened(r, 3, opponentColor, board) &&
              !isSquareThreatened(r, 2, opponentColor, board)) {
            moves.push([r, 2])
          }
        }
      }
    }
  }
  return moves
}

// Evaluate if a square is currently threatened by a piece of specified color
function isSquareThreatened(tr: number, tc: number, attackerColor: "w" | "b", board: (string | null)[][]): boolean {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c]
      if (p && p[0] === attackerColor) {
        // Use pseudo-legal moves for threat checks to prevent infinite recursion
        const moves = getValidMoves(r, c, board)
        if (moves.some(([mr, mc]) => mr === tr && mc === tc)) {
          return true
        }
      }
    }
  }
  return false
}

// FIDE-compliant filter that ensures only moves that do not leave the King in check are permitted
function getLegalMoves(
  r: number,
  c: number,
  board: (string | null)[][],
  hasKingMoved = { w: true, b: true },
  hasRookMoved = { wLeft: true, wRight: true, bLeft: true, bRight: true }
): [number, number][] {
  const piece = board[r][c]
  if (!piece) return []
  const color = piece[0] as "w" | "b"
  const moves = getValidMoves(r, c, board, hasKingMoved, hasRookMoved)
  
  return moves.filter(([tr, tc]) => {
    // Clone board state
    const nextBoard = board.map(row => [...row])
    
    // Perform simulated move
    nextBoard[tr][tc] = piece
    nextBoard[r][c] = null
    
    // Simulate castling rook movement
    if (piece[1] === "K" && Math.abs(c - tc) === 2) {
      if (tc === 6) {
        nextBoard[r][5] = `${color}R`
        nextBoard[r][7] = null
      } else if (tc === 2) {
        nextBoard[r][3] = `${color}R`
        nextBoard[r][0] = null
      }
    }
    
    // Find King on simulated board
    let kingPos: [number, number] | null = null
    for (let kr = 0; kr < 8; kr++) {
      for (let kc = 0; kc < 8; kc++) {
        if (nextBoard[kr][kc] === `${color}K`) {
          kingPos = [kr, kc]
          break
        }
      }
    }
    
    if (!kingPos) return false
    
    // If the simulated move exposes the King to check, it is illegal
    const opponentColor = color === "w" ? "b" : "w"
    return !isSquareThreatened(kingPos[0], kingPos[1], opponentColor, nextBoard)
  })
}

// ── MINIMAX EVALUATION TABLES ──
const pawnTable = [
  [0,  0,  0,  0,  0,  0,  0,  0],
  [5, 10, 10,-20,-20, 10, 10,  5],
  [5, -5,-10,  0,  0,-10, -5,  5],
  [0,  0,  0, 20, 20,  0,  0,  0],
  [5,  5, 10, 25, 25, 10,  5,  5],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [0,  0,  0,  0,  0,  0,  0,  0]
]

const knightTable = [
  [-50,-40,-30,-30,-30,-30,-40,-50],
  [-40,-20,  0,  5,  5,  0,-20,-40],
  [-30,  5, 10, 15, 15, 10,  5,-30],
  [-30,  0, 15, 20, 20, 15,  0,-30],
  [-30,  5, 15, 20, 20, 15,  5,-30],
  [-30,  0, 10, 15, 15, 10,  0,-30],
  [-40,-20,  0,  0,  0,  0,-20,-40],
  [-50,-40,-30,-30,-30,-30,-40,-50]
]

const bishopTable = [
  [-20,-10,-10,-10,-10,-10,-10,-20],
  [-10,  5,  0,  0,  0,  0,  5,-10],
  [-10, 10, 10, 10, 10, 10, 10,-10],
  [-10,  0, 10, 10, 10, 10,  0,-10],
  [-10,  5,  5, 10, 10,  5,  5,-10],
  [-10,  0,  0, 10, 10,  0,  0,-10],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-20,-10,-10,-10,-10,-10,-10,-20]
]

const rookTable = [
  [0,  0,  0,  5,  5,  0,  0,  0],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [5, 10, 10, 10, 10, 10, 10,  5],
  [0,  0,  0,  0,  0,  0,  0,  0]
]

const queenTable = [
  [-20,-10,-10, -5, -5,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5,  5,  5,  5,  0,-10],
  [0,  0,  5,  5,  5,  5,  0, -5],
  [-5,  0,  5,  5,  5,  5,  0, -5],
  [-10,  5,  5,  5,  5,  5,  0,-10],
  [-10,  0,  5,  0,  0,  5,  0,-10],
  [-20,-10,-10, -5, -5,-10,-10,-20]
]

const kingTable = [
  [20, 30, 10,  0,  0, 10, 30, 20],
  [20, 20,  0,  0,  0,  0, 20, 20],
  [-10,-20,-20,-20,-20,-20,-20,-10],
  [-20,-30,-30,-40,-40,-30,-30,-20],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30]
]

// Evaluate the absolute board material & position value
function evaluateBoard(board: (string | null)[][]): number {
  let score = 0
  const pieceValues: Record<string, number> = {
    P: 100, N: 320, B: 330, R: 500, Q: 900, K: 20000
  }
  
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c]
      if (!piece) continue
      const color = piece[0]
      const type = piece[1]
      const val = pieceValues[type] || 0
      
      let bonus = 0
      const tableRow = color === "w" ? 7 - r : r
      const tableCol = c
      
      if (type === "P") bonus = pawnTable[tableRow][tableCol]
      else if (type === "N") bonus = knightTable[tableRow][tableCol]
      else if (type === "B") bonus = bishopTable[tableRow][tableCol]
      else if (type === "R") bonus = rookTable[tableRow][tableCol]
      else if (type === "Q") bonus = queenTable[tableRow][tableCol]
      else if (type === "K") bonus = kingTable[tableRow][tableCol]
      
      if (color === "w") {
        score += (val + bonus)
      } else {
        score -= (val + bonus)
      }
    }
  }
  return score
}

// Recursive Minimax Search with Alpha-Beta Pruning
function minimax(
  board: (string | null)[][],
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  hasKingMoved: { w: boolean; b: boolean },
  hasRookMoved: { wLeft: boolean; wRight: boolean; bLeft: boolean; bRight: boolean }
): number {
  if (depth === 0) {
    return evaluateBoard(board)
  }
  
  const activeColor = isMaximizing ? "w" : "b"
  const moves: { from: [number, number]; to: [number, number] }[] = []
  
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c]
      if (p && p[0] === activeColor) {
        const legal = getLegalMoves(r, c, board, hasKingMoved, hasRookMoved)
        for (const [tr, tc] of legal) {
          moves.push({ from: [r, c], to: [tr, tc] })
        }
      }
    }
  }
  
  if (moves.length === 0) {
    const kingPos = findKing(activeColor, board)
    if (kingPos && isSquareThreatened(kingPos[0], kingPos[1], isMaximizing ? "b" : "w", board)) {
      // Checkmate
      return isMaximizing ? -999999 + (5 - depth) : 999999 - (5 - depth)
    }
    return 0 // Stalemate
  }
  
  if (isMaximizing) {
    let maxEval = -Infinity
    for (const move of moves) {
      const nextBoard = board.map(row => [...row])
      const p = nextBoard[move.from[0]][move.from[1]]!
      nextBoard[move.to[0]][move.to[1]] = p
      nextBoard[move.from[0]][move.from[1]] = null
      
      if (p[1] === "K" && Math.abs(move.from[1] - move.to[1]) === 2) {
        if (move.to[1] === 6) {
          nextBoard[move.from[0]][5] = "wR"
          nextBoard[move.from[0]][7] = null
        } else {
          nextBoard[move.from[0]][3] = "wR"
          nextBoard[move.from[0]][0] = null
        }
      }
      
      const nextKingMoved = { ...hasKingMoved, w: p[1] === "K" || hasKingMoved.w }
      const nextRookMoved = { ...hasRookMoved }
      if (p[1] === "R") {
        if (move.from[0] === 7 && move.from[1] === 0) nextRookMoved.wLeft = true
        if (move.from[0] === 7 && move.from[1] === 7) nextRookMoved.wRight = true
      }
      
      const score = minimax(nextBoard, depth - 1, alpha, beta, false, nextKingMoved, nextRookMoved)
      maxEval = Math.max(maxEval, score)
      alpha = Math.max(alpha, score)
      if (beta <= alpha) break
    }
    return maxEval
  } else {
    let minEval = Infinity
    for (const move of moves) {
      const nextBoard = board.map(row => [...row])
      const p = nextBoard[move.from[0]][move.from[1]]!
      nextBoard[move.to[0]][move.to[1]] = p
      nextBoard[move.from[0]][move.from[1]] = null
      
      if (p[1] === "K" && Math.abs(move.from[1] - move.to[1]) === 2) {
        if (move.to[1] === 6) {
          nextBoard[move.from[0]][5] = "bR"
          nextBoard[move.from[0]][7] = null
        } else {
          nextBoard[move.from[0]][3] = "bR"
          nextBoard[move.from[0]][0] = null
        }
      }
      
      const nextKingMoved = { ...hasKingMoved, b: p[1] === "K" || hasKingMoved.b }
      const nextRookMoved = { ...hasRookMoved }
      if (p[1] === "R") {
        if (move.from[0] === 0 && move.from[1] === 0) nextRookMoved.bLeft = true
        if (move.from[0] === 0 && move.from[1] === 7) nextRookMoved.bRight = true
      }
      
      const score = minimax(nextBoard, depth - 1, alpha, beta, true, nextKingMoved, nextRookMoved)
      minEval = Math.min(minEval, score)
      beta = Math.min(beta, score)
      if (beta <= alpha) break
    }
    return minEval
  }
}

// Find optimal move for Black player
function getBestMove(
  board: (string | null)[][],
  depth: number,
  hasKingMoved: { w: boolean; b: boolean },
  hasRookMoved: { wLeft: boolean; wRight: boolean; bLeft: boolean; bRight: boolean }
): { from: [number, number]; to: [number, number] } | null {
  const moves: { from: [number, number]; to: [number, number]; score: number }[] = []
  
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c]
      if (p && p[0] === "b") {
        const legal = getLegalMoves(r, c, board, hasKingMoved, hasRookMoved)
        for (const [tr, tc] of legal) {
          const nextBoard = board.map(row => [...row])
          nextBoard[tr][tc] = p
          nextBoard[r][c] = null
          
          if (p[1] === "K" && Math.abs(c - tc) === 2) {
            if (tc === 6) {
              nextBoard[r][5] = "bR"
              nextBoard[r][7] = null
            } else {
              nextBoard[r][3] = "bR"
              nextBoard[r][0] = null
            }
          }
          
          const nextKingMoved = { ...hasKingMoved, b: p[1] === "K" || hasKingMoved.b }
          const nextRookMoved = { ...hasRookMoved }
          if (p[1] === "R") {
            if (r === 0 && c === 0) nextRookMoved.bLeft = true
            if (r === 0 && c === 7) nextRookMoved.bRight = true
          }
          
          // Black (CPU) wants to minimize score, next turn is White (Maximizing)
          const score = minimax(nextBoard, depth - 1, -Infinity, Infinity, true, nextKingMoved, nextRookMoved)
          moves.push({ from: [r, c], to: [tr, tc], score })
        }
      }
    }
  }
  
  if (moves.length === 0) return null
  
  // Sort ascending since Black wants to minimize
  moves.sort((a, b) => a.score - b.score)
  
  // Select randomly from the best scoring moves to prevent repeating patterns
  const bestScore = moves[0].score
  const bestMoves = moves.filter(m => Math.abs(m.score - bestScore) < 10)
  return bestMoves[Math.floor(Math.random() * bestMoves.length)]
}

// ── RETRO WEB AUDIO SYNTHESIZER ──
let audioCtx: AudioContext | null = null

function playRetroSound(type: "select" | "move" | "capture" | "check" | "victory" | "defeat") {
  if (typeof window === "undefined") return
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume()
    }
    
    const playTone = (freq: number, duration: number, oscType: OscillatorType = "square", startTimeOffset = 0, volume = 0.04) => {
      if (!audioCtx) return
      const osc = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()
      
      osc.type = oscType
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + startTimeOffset)
      
      gainNode.gain.setValueAtTime(volume, audioCtx.currentTime + startTimeOffset)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + startTimeOffset + duration)
      
      osc.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      
      osc.start(audioCtx.currentTime + startTimeOffset)
      osc.stop(audioCtx.currentTime + startTimeOffset + duration)
    }
    
    switch (type) {
      case "select":
        playTone(580, 0.04, "sine", 0, 0.02) // soft high chirp
        break
      case "move":
        playTone(160, 0.07, "triangle", 0, 0.1) // triangle thud click
        playTone(750, 0.012, "sine", 0.003, 0.03) // tiny high pitch click
        break
      case "capture":
        // Laser frequency sweep
        {
          const osc = audioCtx.createOscillator()
          const gainNode = audioCtx.createGain()
          osc.type = "sawtooth"
          osc.frequency.setValueAtTime(400, audioCtx.currentTime)
          osc.frequency.exponentialRampToValueAtTime(70, audioCtx.currentTime + 0.2)
          
          gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2)
          
          osc.connect(gainNode)
          gainNode.connect(audioCtx.destination)
          osc.start()
          osc.stop(audioCtx.currentTime + 0.2)
        }
        break
      case "check":
        playTone(380, 0.1, "square", 0, 0.05)
        playTone(380, 0.1, "square", 0.14, 0.05)
        break
      case "victory":
        playTone(261.63, 0.07, "triangle", 0, 0.05) // C4
        playTone(329.63, 0.07, "triangle", 0.07, 0.05) // E4
        playTone(392.00, 0.07, "triangle", 0.14, 0.05) // G4
        playTone(523.25, 0.22, "triangle", 0.21, 0.05) // C5
        break
      case "defeat":
        playTone(329.63, 0.1, "sawtooth", 0, 0.03) // E4
        playTone(293.66, 0.1, "sawtooth", 0.1, 0.03) // D4
        playTone(261.63, 0.1, "sawtooth", 0.2, 0.03) // C4
        playTone(196.00, 0.3, "sawtooth", 0.3, 0.03) // G3
        break
    }
  } catch (e) {
    console.error("Audio playback error:", e)
  }
}

// Calculate captured pieces dynamically based on board state
function getCapturedPieces(board: (string | null)[][]) {
  const initialCounts: Record<string, number> = {
    wP: 8, wN: 2, wB: 2, wR: 2, wQ: 1,
    bP: 8, bN: 2, bB: 2, bR: 2, bQ: 1
  }
  
  const currentCounts: Record<string, number> = {
    wP: 0, wN: 0, wB: 0, wR: 0, wQ: 0,
    bP: 0, bN: 0, bB: 0, bR: 0, bQ: 0
  }
  
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c]
      if (piece && piece[1] !== "K") {
        currentCounts[piece] = (currentCounts[piece] || 0) + 1
      }
    }
  }
  
  const captured: { w: string[]; b: string[] } = { w: [], b: [] }
  for (const piece in initialCounts) {
    const diff = initialCounts[piece] - (currentCounts[piece] || 0)
    if (diff > 0) {
      const color = piece[0]
      const type = piece[1]
      for (let i = 0; i < diff; i++) {
        if (color === "w") {
          captured.w.push(type) // White pieces captured by Black
        } else {
          captured.b.push(type) // Black pieces captured by White
        }
      }
    }
  }
  return captured
}

// Find a color's King on the board
const findKing = (color: "w" | "b", currentBoard: (string | null)[][]): [number, number] | null => {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = currentBoard[r][c]
      if (p === `${color}K`) return [r, c]
    }
  }
  return null
}


export function CRTChess() {
  const { theme } = useTheme()
  const [board, setBoard] = useState<(string | null)[][]>(getInitialBoard())
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null)
  const [validMoves, setValidMoves] = useState<[number, number][]>([])
  const [turn, setTurn] = useState<"w" | "b">("w")
  const [vsAI, setVsAI] = useState<boolean>(true)
  const [aiThinking, setAiThinking] = useState<boolean>(false)
  const [hasKingMoved, setHasKingMoved] = useState({ w: false, b: false })
  const [hasRookMoved, setHasRookMoved] = useState({ wLeft: false, wRight: false, bLeft: false, bRight: false })
  const [history, setHistory] = useState<{
    board: (string | null)[][];
    turn: "w" | "b";
    hasKingMoved: { w: boolean; b: boolean };
    hasRookMoved: { wLeft: boolean; wRight: boolean; bLeft: boolean; bRight: boolean };
  }[]>([])
  
  // Game states: "playing" | "check" | "win" | "loss" | "draw"
  const [gameState, setGameState] = useState<"playing" | "check" | "win" | "loss" | "draw">("playing")
  const [log, setLog] = useState<string[]>(["Chess.exe initiated.", "White's turn (You)."])
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium")
  const [soundOn, setSoundOn] = useState<boolean>(true)
  
  // Track the last turn the AI was triggered for (prevents duplicate AI moves)
  const aiTurnRef = useRef<"w" | "b" | null>(null)

  // Check game states (check, win, lose, draw)
  useEffect(() => {
    const whiteKingPos = findKing("w", board)
    const blackKingPos = findKing("b", board)

    if (!whiteKingPos) {
      setGameState("loss")
      addToLog("System: BLACK WINS. White King was captured.")
      if (soundOn) playRetroSound("defeat")
      return
    }
    if (!blackKingPos) {
      setGameState("win")
      addToLog("System: WHITE WINS. Black King was captured.")
      if (soundOn) playRetroSound("victory")
      return
    }

    const isWhiteInCheck = isSquareThreatened(whiteKingPos[0], whiteKingPos[1], "b", board)
    const isBlackInCheck = isSquareThreatened(blackKingPos[0], blackKingPos[1], "w", board)

    // Calculate total legal moves for the active player
    let activeLegalMovesCount = 0
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c]
        if (p && p[0] === turn) {
          const legal = getLegalMoves(r, c, board, hasKingMoved, hasRookMoved)
          activeLegalMovesCount += legal.length
        }
      }
    }

    if (activeLegalMovesCount === 0) {
      if (turn === "w") {
        if (isWhiteInCheck) {
          setGameState("loss")
          addToLog("System: BLACK WINS by Checkmate!")
          if (soundOn) playRetroSound("defeat")
        } else {
          setGameState("draw")
          addToLog("System: Draw by Stalemate.")
        }
      } else {
        if (isBlackInCheck) {
          setGameState("win")
          addToLog("System: WHITE WINS by Checkmate!")
          if (soundOn) playRetroSound("victory")
        } else {
          setGameState("draw")
          addToLog("System: Draw by Stalemate.")
        }
      }
    } else {
      if (isWhiteInCheck && turn === "w") {
        setGameState("check")
        addToLog("Warning: Your King is in CHECK!")
        if (soundOn) playRetroSound("check")
      } else if (isBlackInCheck && turn === "b") {
        setGameState("check")
        addToLog("System: Opponent King is in CHECK!")
        if (soundOn) playRetroSound("check")
      } else {
        setGameState("playing")
      }
    }
  }, [board, turn])

  const addToLog = (msg: string) => {
    setLog((prev) => [msg, ...prev].slice(0, 10))
  }

  // Handle Square clicks
  const handleSquareClick = (r: number, c: number) => {
    if (gameState === "win" || gameState === "loss" || gameState === "draw" || aiThinking) return

    const piece = board[r][c]

    // If a piece of our turn is selected
    if (piece && piece[0] === turn) {
      setSelectedSquare([r, c])
      const moves = getLegalMoves(r, c, board, hasKingMoved, hasRookMoved)
      setValidMoves(moves)
      if (soundOn) playRetroSound("select")
      return
    }

    // If an active piece moves to a highlighted spot
    if (selectedSquare) {
      const isHighlighted = validMoves.some(([mr, mc]) => mr === r && mc === c)
      if (isHighlighted) {
        makeMove(selectedSquare[0], selectedSquare[1], r, c)
      } else {
        // Cancel selection
        setSelectedSquare(null)
        setValidMoves([])
      }
    }
  }

  // Make Chess Move
  const makeMove = (fromR: number, fromC: number, toR: number, toC: number) => {
    const currentPiece = board[fromR][fromC]
    if (!currentPiece) return

    // Save history
    setHistory((prev) => [
      ...prev,
      {
        board: board.map((row) => [...row]),
        turn,
        hasKingMoved: { ...hasKingMoved },
        hasRookMoved: { ...hasRookMoved }
      }
    ])

    const nextBoard = board.map((row) => [...row])
    const capturedPiece = nextBoard[toR][toC]
    nextBoard[toR][toC] = currentPiece
    nextBoard[fromR][fromC] = null

    const color = currentPiece[0] // "w" or "b"
    const type = currentPiece[1]  // "K", "R", etc.

    // Handle Castling moves
    if (type === "K") {
      // Kingside castling
      if (fromC === 4 && toC === 6) {
        nextBoard[fromR][5] = `${color}R`
        nextBoard[fromR][7] = null
        addToLog(`${color === "w" ? "White" : "Black"}: Castled Kingside`)
      }
      // Queenside castling
      else if (fromC === 4 && toC === 2) {
        nextBoard[fromR][3] = `${color}R`
        nextBoard[fromR][0] = null
        addToLog(`${color === "w" ? "White" : "Black"}: Castled Queenside`)
      }

      setHasKingMoved((prev) => ({ ...prev, [color]: true }))
    }

    // Update rook moved state
    if (type === "R") {
      if (color === "w") {
        if (fromR === 7 && fromC === 0) setHasRookMoved((prev) => ({ ...prev, wLeft: true }))
        if (fromR === 7 && fromC === 7) setHasRookMoved((prev) => ({ ...prev, wRight: true }))
      } else {
        if (fromR === 0 && fromC === 0) setHasRookMoved((prev) => ({ ...prev, bLeft: true }))
        if (fromR === 0 && fromC === 7) setHasRookMoved((prev) => ({ ...prev, bRight: true }))
      }
    }

    // Capture of rooks updates rook moved flags
    if (toR === 7 && toC === 0) setHasRookMoved((prev) => ({ ...prev, wLeft: true }))
    if (toR === 7 && toC === 7) setHasRookMoved((prev) => ({ ...prev, wRight: true }))
    if (toR === 0 && toC === 0) setHasRookMoved((prev) => ({ ...prev, bLeft: true }))
    if (toR === 0 && toC === 7) setHasRookMoved((prev) => ({ ...prev, bRight: true }))

    // Pawn promotion (auto-promote to Queen)
    if (currentPiece[1] === "P" && (toR === 0 || toR === 7)) {
      nextBoard[toR][toC] = `${currentPiece[0]}Q`
      addToLog(`Pawn promoted to Queen!`)
    }

    if (soundOn) {
      if (capturedPiece) playRetroSound("capture")
      else playRetroSound("move")
    }

    setBoard(nextBoard)
    setSelectedSquare(null)
    setValidMoves([])

    // Log move
    const isCastlingMove = type === "K" && Math.abs(fromC - toC) === 2
    if (!isCastlingMove) {
      const pieceNames: Record<string, string> = { P: "Pawn", R: "Rook", N: "Knight", B: "Bishop", Q: "Queen", K: "King" }
      const colLabels = ["a", "b", "c", "d", "e", "f", "g", "h"]
      const rowLabels = ["8", "7", "6", "5", "4", "3", "2", "1"]
      const capText = capturedPiece ? ` x ${pieceNames[capturedPiece[1]]}` : ""
      addToLog(`${color === "w" ? "White" : "Black"}: ${pieceNames[type]} to ${colLabels[toC]}${rowLabels[toR]}${capText}`)
    }

    // Switch turns
    setTurn(turn === "w" ? "b" : "w")
  }

  // Minimax Chess AI for Black
  useEffect(() => {
    // Only trigger AI once when turn changes to "b"
    if (vsAI && turn === "b" && aiTurnRef.current !== "b" && (gameState === "playing" || gameState === "check")) {
      aiTurnRef.current = "b"
      setAiThinking(true)
      
      // Use a ref to capture the current board state for the AI thinking
      const boardSnapshot = board
      const kingMovedSnapshot = { ...hasKingMoved }
      const rookMovedSnapshot = { ...hasRookMoved }
      
      const thinkingDelay = setTimeout(() => {
        const depthMap = { easy: 1, medium: 2, hard: 3 }
        const currentDepth = depthMap[difficulty]
        
        let bestMove = null
        // 25% random moves on Easy difficulty
        if (difficulty === "easy" && Math.random() < 0.25) {
          const allLegalMoves: { from: [number, number]; to: [number, number] }[] = []
          for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
              const p = boardSnapshot[r][c]
              if (p && p[0] === "b") {
                const legal = getLegalMoves(r, c, boardSnapshot, kingMovedSnapshot, rookMovedSnapshot)
                for (const [tr, tc] of legal) {
                  allLegalMoves.push({ from: [r, c], to: [tr, tc] })
                }
              }
            }
          }
          if (allLegalMoves.length > 0) {
            bestMove = allLegalMoves[Math.floor(Math.random() * allLegalMoves.length)]
          }
        }

        if (!bestMove) {
          bestMove = getBestMove(boardSnapshot, currentDepth, kingMovedSnapshot, rookMovedSnapshot)
        }

        if (bestMove) {
          makeMove(bestMove.from[0], bestMove.from[1], bestMove.to[0], bestMove.to[1])
        }
        setAiThinking(false)
      }, 700)

      return () => clearTimeout(thinkingDelay)
    }
    
    // Reset ref when it's not Black's turn
    if (turn !== "b") {
      aiTurnRef.current = null
    }
  }, [turn, vsAI, gameState, difficulty])

  // Reset Game
  const resetGame = () => {
    aiTurnRef.current = null
    setBoard(getInitialBoard())
    setSelectedSquare(null)
    setValidMoves([])
    setTurn("w")
    setHistory([])
    setGameState("playing")
    setHasKingMoved({ w: false, b: false })
    setHasRookMoved({ wLeft: false, wRight: false, bLeft: false, bRight: false })
    setLog(["Game restarted.", "White's turn (You)."])
    if (soundOn) playRetroSound("select")
  }

  // Undo Last Move (White + AI response)
  const undoMove = () => {
    if (history.length < 2 || aiThinking) return
    // Undo 2 steps if playing vs AI to go back to white's previous turn
    const step = vsAI ? 2 : 1
    const targetIdx = history.length - step
    if (targetIdx >= 0) {
      const prev = history[targetIdx]
      aiTurnRef.current = null
      setBoard(prev.board)
      setTurn(prev.turn)
      setHasKingMoved(prev.hasKingMoved)
      setHasRookMoved(prev.hasRookMoved)
      setHistory(history.slice(0, targetIdx))
      setSelectedSquare(null)
      setValidMoves([])
      setGameState("playing")
      addToLog(`System: Undid last move(s).`)
      if (soundOn) playRetroSound("select")
    }
  }

  // Theme-specific UI Layout Rendering
  // ── CRT TERMINAL STYLING ──
  const renderCRT = () => {
    const captured = getCapturedPieces(board)

    const renderCapturedPieces = (pieces: string[], pieceColor: "w" | "b") => {
      return (
        <div className="flex flex-wrap gap-0.5 items-center min-h-[1.5rem] bg-black/10 px-2 py-0.5 rounded-sm border border-dashed border-[var(--crt-border-col)]/30">
          {pieces.length === 0 ? (
            <span className="text-[10px] opacity-45 italic">NO CAPTURES</span>
          ) : (
            pieces.map((type, idx) => (
              <div key={idx} className="w-5 h-5 shrink-0 scale-75 origin-center opacity-70 hover:opacity-100 transition-opacity">
                <ChessPiece type={type} color={pieceColor} />
              </div>
            ))
          )}
        </div>
      )
    }

    return (
      <div className="crt-border p-6 font-mono max-w-4xl mx-auto" style={{ background: "var(--crt-paper)" }}>
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between border-b pb-3 mb-6 gap-4" style={{ borderColor: "var(--crt-border-col)" }}>
          <div className="text-xs tracking-widest glow-dim">
            SYSTEM_EXEC: CHESS_ENGINE.SYS
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <button onClick={resetGame} className="glow-sm hover:glow">[ RESTART ]</button>
            <button onClick={undoMove} disabled={history.length < 2} className="disabled:opacity-40 glow-sm hover:glow">[ UNDO ]</button>
            <button onClick={() => setSoundOn(!soundOn)} className="glow-sm hover:glow">
              [ SOUND: {soundOn ? "ON" : "OFF"} ]
            </button>
            <button 
              onClick={() => {
                const diffs: ("easy" | "medium" | "hard")[] = ["easy", "medium", "hard"]
                const nextIdx = (diffs.indexOf(difficulty) + 1) % diffs.length
                setDifficulty(diffs[nextIdx])
              }} 
              className="glow-sm hover:glow"
            >
              [ AI: {difficulty === "easy" ? "NOVICE" : difficulty === "medium" ? "CASUAL" : "DEEP_BLUE"} ]
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Chess Board */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* CPU Header & Captured White Pieces */}
            <div className="w-full max-w-[28rem] md:max-w-[32rem] flex items-center justify-between text-xs mb-2 px-1">
              <span className="glow-sm font-semibold opacity-75">◆ CPU (BLACK) {aiThinking && " [PLANNING...]"}</span>
              {renderCapturedPieces(captured.w, "w")}
            </div>

            <div 
              className="border p-2 relative overflow-hidden" 
              style={{ 
                borderColor: "var(--crt-border-col)", 
                background: "var(--crt-bg)",
                boxShadow: "inset 0 0 10px rgba(120,60,10,0.15)"
              }}
            >
              <div className="grid grid-cols-8 gap-px bg-current" style={{ color: "var(--crt-border-col)" }}>
                {board.map((row, r) =>
                  row.map((piece, c) => {
                    const isSelected = selectedSquare && selectedSquare[0] === r && selectedSquare[1] === c
                    const isHighlighted = validMoves.some(([mr, mc]) => mr === r && mc === c)
                    const isDarkCell = (r + c) % 2 === 1
                    const isKingInCheckSquare = piece && piece[1] === "K" && piece[0] === turn && gameState === "check"

                    // Custom background coloring matching CRT warm phosphorus
                    const cellBg = isKingInCheckSquare
                      ? "rgba(220, 38, 38, 0.35)"
                      : isSelected
                      ? "rgba(196, 122, 26, 0.4)" // bright glowing amber
                      : isHighlighted
                      ? "rgba(196, 122, 26, 0.25)" // soft highlight
                      : isDarkCell
                      ? "var(--crt-paper)" // slightly darker
                      : "var(--crt-bg)"    // light cream

                    return (
                      <div
                        key={`${r}-${c}`}
                        onClick={() => handleSquareClick(r, c)}
                        className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center cursor-pointer transition-all duration-100 relative ${
                          isKingInCheckSquare ? "animate-pulse border-2 border-red-500 shadow-[inset_0_0_8px_#ef4444]" : ""
                        }`}
                        style={{ background: cellBg }}
                      >
                        {piece && <ChessPiece type={piece[1]} color={piece[0] as "w" | "b"} />}
                        {isHighlighted && !piece && (
                          <div 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ 
                              background: "var(--crt-amber)", 
                              boxShadow: "0 0 6px var(--crt-amber)" 
                            }} 
                          />
                        )}
                        {/* coordinates */}
                        {c === 0 && (
                          <span className="absolute top-0.5 left-1 text-[8px] opacity-40 select-none">
                            {8 - r}
                          </span>
                        )}
                        {r === 7 && (
                          <span className="absolute bottom-0.5 right-1 text-[8px] opacity-40 select-none">
                            {["a", "b", "c", "d", "e", "f", "g", "h"][c]}
                          </span>
                        )}
                      </div>
                    )
                  })
                )}
              </div>

              {/* CRT Game Over Overlay */}
              {(gameState === "win" || gameState === "loss" || gameState === "draw") && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 text-center p-6 border-2 border-[var(--crt-amber)] animate-fade-in font-mono">
                  <div className="text-xl md:text-2xl mb-2 tracking-widest text-[var(--crt-amber)] glow animate-pulse">
                    {gameState === "win" && "◆ WHITE WINS: CPU TERMINATED ◆"}
                    {gameState === "loss" && "◆ DEFEAT: SYSTEM OVERRIDE ◆"}
                    {gameState === "draw" && "◆ STALEMATE DRAW DETECTED ◆"}
                  </div>
                  <p className="text-xs text-[var(--crt-brown-dim)] mb-8 max-w-[280px] leading-relaxed">
                    {gameState === "win" && "Congratulations. You have checkmated the core chess engine system."}
                    {gameState === "loss" && "The CPU has checkmated your forces. System session terminated."}
                    {gameState === "draw" && "Both engines exhausted all paths. The retro system matches draw specifications."}
                  </p>
                  <button 
                    onClick={resetGame} 
                    className="px-5 py-2 border border-[var(--crt-amber)] text-[var(--crt-amber)] hover:bg-[var(--crt-amber)]/10 hover:shadow-[0_0_8px_var(--crt-amber)] transition-all text-xs tracking-wider cursor-pointer"
                  >
                    [ REBOOT MATCH ]
                  </button>
                </div>
              )}
            </div>

            {/* Player Header & Captured Black Pieces */}
            <div className="w-full max-w-[28rem] md:max-w-[32rem] flex items-center justify-between text-xs mt-2 px-1">
              <span className="glow-sm font-semibold opacity-75">◆ YOU (WHITE) {turn === "w" && " [YOUR TURN]"}</span>
              {renderCapturedPieces(captured.b, "b")}
            </div>
          </div>

          {/* Right: Game Diagnostics & Log */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border p-4 h-64 flex flex-col justify-between" style={{ borderColor: "var(--crt-border-col)", background: "var(--crt-bg)" }}>
              <div className="space-y-1 text-xs overflow-y-auto max-h-48 pr-2 scrollbar-none">
                {aiThinking && (
                  <div className="text-xs tracking-widest text-center py-2 animate-pulse" style={{ color: "var(--crt-amber)" }}>
                    ◆ CPU CALCULATING PATHS... ◆
                  </div>
                )}
                {log.map((line, idx) => (
                  <div 
                    key={idx} 
                    className={idx === 0 ? "glow-sm font-semibold" : "opacity-75"}
                    style={{ color: idx === 0 ? "var(--crt-brown-bright)" : "var(--crt-brown)" }}
                  >
                    {line.startsWith("Warning") || line.startsWith("System") ? "▶ " : "> "}
                    {line}
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-2 mt-2 flex items-center justify-between text-xs" style={{ borderColor: "var(--crt-border-col)" }}>
                <div>TURN: <span className="glow-sm font-bold">{turn === "w" ? "PLAYER (W)" : "CPU (B)"}</span></div>
                <div style={{ color: "var(--crt-amber)" }} className="glow-sm font-bold animate-pulse">
                  {gameState === "check" && "[ CHECK ]"}
                  {gameState === "win" && "[ SYSTEM WON ]"}
                  {gameState === "loss" && "[ SYSTEM TERMINATED ]"}
                  {gameState === "draw" && "[ STALEMATE ]"}
                </div>
              </div>
            </div>

            <div className="text-[10px] leading-relaxed opacity-60">
              * INSTRUCTIONS: Select any green outline cell to pick your piece. Highlighted circular spots demonstrate valid movement vectors. Eliminate the enemy King to win.
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── WINDOWS XP STYLING ──
  const renderXP = () => {
    const captured = getCapturedPieces(board)

    const renderCapturedPieces = (pieces: string[], pieceColor: "w" | "b") => {
      return (
        <div className="flex flex-wrap gap-0.5 items-center min-h-[22px] bg-white border border-[#ACA899] px-2 py-0.5 rounded-sm shadow-inner">
          {pieces.length === 0 ? (
            <span className="text-[9px] text-gray-400 italic">None</span>
          ) : (
            pieces.map((type, idx) => (
              <div key={idx} className="w-5 h-5 shrink-0 scale-75 origin-center opacity-80 hover:opacity-100 transition-opacity">
                <ChessPiece type={type} color={pieceColor} />
              </div>
            ))
          )}
        </div>
      )
    }

    return (
      <div 
        className="max-w-4xl mx-auto shadow-2xl border-2" 
        style={{ 
          borderColor: "#003399", 
          fontFamily: "Tahoma, Arial, sans-serif",
          background: "#ECE9D8"
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            background: "linear-gradient(to right, #0A246A 0%, #316AC5 30%, #2563C7 70%, #1D58BD 100%)",
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "12px" }}>🏆</span>
            <span style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: "13px", textShadow: "1px 1px 1px #0A246A" }}>
              Chess.exe v1.0
            </span>
          </div>
          {/* XP close/min controls */}
          <div className="flex gap-1">
            <div 
              onClick={resetGame}
              className="flex items-center justify-center text-white font-bold"
              style={{
                width: "21px", height: "21px",
                background: "linear-gradient(to bottom, #E84040 0%, #C02020 100%)",
                border: "1px outset #ff8888",
                cursor: "pointer", fontSize: "11px"
              }}
              title="Reset game"
            >
              ✕
            </div>
          </div>
        </div>

        {/* WinXP Menu Bar */}
        <div 
          className="border-b text-black"
          style={{ 
            borderColor: "#ACA899", 
            background: "#ECE9D8", 
            padding: "3px 6px", 
            fontSize: "11px",
            display: "flex",
            gap: "14px"
          }}
        >
          <span className="cursor-pointer hover:bg-[#316AC5] hover:text-white px-2 rounded-sm" onClick={resetGame}>Game (R)</span>
          <span className="cursor-pointer hover:bg-[#316AC5] hover:text-white px-2 rounded-sm" onClick={undoMove}>Undo (U)</span>
          <span 
            className="cursor-pointer hover:bg-[#316AC5] hover:text-white px-2 rounded-sm" 
            onClick={() => setSoundOn(!soundOn)}
          >
            {soundOn ? "🔊 Audio On" : "🔈 Audio Mute"}
          </span>
          <div className="cursor-pointer hover:bg-[#316AC5] hover:text-white px-2 rounded-sm relative group flex items-center gap-1">
            <span>Difficulty:</span>
            <span className="font-bold underline uppercase">{difficulty === "easy" ? "Novice" : difficulty === "medium" ? "Casual" : "Deep Blue"}</span>
            {/* Dropdown Menu */}
            <div className="hidden group-hover:flex flex-col absolute left-0 top-full bg-[#ECE9D8] border-2 border-[#ACA899] shadow-md py-1 z-30 min-w-[120px] text-black rounded-sm border-t-0">
              <div onClick={() => setDifficulty("easy")} className={`px-3 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer ${difficulty === "easy" ? "bg-[#316AC5] text-white font-bold" : ""}`}>Novice</div>
              <div onClick={() => setDifficulty("medium")} className={`px-3 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer ${difficulty === "medium" ? "bg-[#316AC5] text-white font-bold" : ""}`}>Casual</div>
              <div onClick={() => setDifficulty("hard")} className={`px-3 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer ${difficulty === "hard" ? "bg-[#316AC5] text-white font-bold" : ""}`}>Deep Blue</div>
            </div>
          </div>
        </div>

        {/* XP Body Container */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#D3D0C1]">
          {/* Board & Captures */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* CPU Stats */}
            <div className="w-full max-w-[28rem] md:max-w-[32rem] flex items-center justify-between text-xs mb-2 px-1 text-black font-bold">
              <span>🖥️ CPU (Black) {aiThinking && " thinking..."}</span>
              {renderCapturedPieces(captured.w, "w")}
            </div>

            <div 
              style={{
                border: "3px inset #FFFFFF",
                boxShadow: "1px 1px 4px rgba(0,0,0,0.4)",
                position: "relative"
              }}
            >
              <div className="grid grid-cols-8 gap-px bg-[#808080]">
                {board.map((row, r) =>
                  row.map((piece, c) => {
                    const isSelected = selectedSquare && selectedSquare[0] === r && selectedSquare[1] === c
                    const isHighlighted = validMoves.some(([mr, mc]) => mr === r && mc === c)
                    const isDarkCell = (r + c) % 2 === 1
                    const isKingInCheckSquare = piece && piece[1] === "K" && piece[0] === turn && gameState === "check"

                    const cellBg = isKingInCheckSquare
                      ? "#FF9999" // Red warning cell
                      : isSelected
                      ? "#FFD700" // Golden Highlight
                      : isHighlighted
                      ? "#A6CAF0" // Win XP Active Selected Light Blue
                      : isDarkCell
                      ? "#228B22" // Classic Windows green dark square
                      : "#F0E68C" // Classic Sand light square

                    return (
                      <div
                        key={`${r}-${c}`}
                        onClick={() => handleSquareClick(r, c)}
                        className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center cursor-pointer relative ${
                          isKingInCheckSquare ? "border-2 border-red-600 animate-pulse" : ""
                        }`}
                        style={{ background: cellBg }}
                      >
                        {piece && <ChessPiece type={piece[1]} color={piece[0] as "w" | "b"} />}
                        {isHighlighted && !piece && (
                          <div className="w-3 h-3 rounded-full bg-[#316AC5]" />
                        )}
                        {/* coordinates */}
                        {c === 0 && (
                          <span className="absolute top-0.5 left-1 text-[9px] text-[#333] select-none font-bold">
                            {8 - r}
                          </span>
                        )}
                        {r === 7 && (
                          <span className="absolute bottom-0.5 right-1 text-[9px] text-[#333] select-none font-bold">
                            {["a", "b", "c", "d", "e", "f", "g", "h"][c]}
                          </span>
                        )}
                      </div>
                    )
                  })
                )}
              </div>

              {/* XP Game Over Alert Window */}
              {(gameState === "win" || gameState === "loss" || gameState === "draw") && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 font-sans p-4">
                  <div className="bg-[#ECE9D8] border-2 border-[#003399] shadow-2xl w-full max-w-[280px] text-left rounded-sm">
                    <div className="bg-gradient-to-r from-[#0A246A] to-[#316AC5] px-2 py-1 flex items-center justify-between text-white font-bold text-xs">
                      <span>Chess.exe</span>
                      <button onClick={resetGame} className="bg-[#ff4500] hover:bg-[#ff6347] text-white font-bold px-1 border border-white text-[9px] rounded-xs cursor-pointer">✕</button>
                    </div>
                    <div className="p-4 flex gap-3 items-start bg-white text-black">
                      <span className="text-3xl select-none">
                        {gameState === "win" && "🏆"}
                        {gameState === "loss" && "☠️"}
                        {gameState === "draw" && "🤝"}
                      </span>
                      <div>
                        <h4 className="font-bold text-xs text-[#003399] mb-1">
                          {gameState === "win" && "Game Won!"}
                          {gameState === "loss" && "Game Lost!"}
                          {gameState === "draw" && "Draw Match"}
                        </h4>
                        <p className="text-[11px] text-[#555] leading-snug">
                          {gameState === "win" && "Congratulations! You checkmated the AI engine."}
                          {gameState === "loss" && "The computer opponent has checkmated your King."}
                          {gameState === "draw" && "The match has concluded with a draw."}
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#ECE9D8] border-t border-[#DCD9C9] p-3 flex justify-end gap-2">
                      <button 
                        onClick={resetGame} 
                        className="px-4 py-1 text-xs text-black border border-[#808080] bg-white hover:bg-gray-100 active:bg-gray-200 cursor-pointer rounded-xs"
                        style={{ boxShadow: "1px 1px 1px #888" }}
                      >
                        Reset
                      </button>
                      <button 
                        onClick={undoMove} 
                        className="px-4 py-1 text-xs text-black border border-[#808080] bg-white hover:bg-gray-100 active:bg-gray-200 cursor-pointer rounded-xs"
                        style={{ boxShadow: "1px 1px 1px #888" }}
                      >
                        Undo
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Player Stats */}
            <div className="w-full max-w-[28rem] md:max-w-[32rem] flex items-center justify-between text-xs mt-2 px-1 text-black font-bold">
              <span>👤 User (White) {turn === "w" && " your turn"}</span>
              {renderCapturedPieces(captured.b, "b")}
            </div>
          </div>

          {/* Diagnostics Panel */}
          <div className="lg:col-span-5 space-y-4 text-black">
            <div 
              className="p-4 flex flex-col justify-between border-2 border-white"
              style={{
                borderStyle: "inset",
                background: "#FFFFFF",
                height: "250px"
              }}
            >
              <div className="space-y-1 text-xs overflow-y-auto max-h-48 scrollbar-thin">
                {aiThinking && (
                  <div className="text-xs font-bold text-[#000080] py-1 animate-pulse">
                    ⏳ CPU is planning strategies...
                  </div>
                )}
                {log.map((line, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      color: line.startsWith("Warning") ? "#C00000" : line.startsWith("System") ? "#000080" : "#000000",
                      fontWeight: idx === 0 ? "bold" : "normal"
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* Status footer */}
              <div 
                style={{ 
                  borderTop: "2px solid #ACA899", 
                  paddingTop: "6px",
                  fontSize: "11px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold"
                }}
              >
                <div>Turn: <span style={{ color: "#316AC5" }}>{turn === "w" ? "White (You)" : "Black (CPU)"}</span></div>
                <div style={{ color: "#C00000" }}>
                  {gameState === "check" && "⚠️ CHECK"}
                  {gameState === "win" && "🎉 GAME WON"}
                  {gameState === "loss" && "💀 DEFEAT"}
                  {gameState === "draw" && "🤝 DRAW"}
                </div>
              </div>
            </div>
            
            {/* Status bar mock */}
            <div 
              style={{
                background: "#ECE9D8",
                border: "2px inset #FFFFFF",
                padding: "4px",
                fontSize: "10px",
                color: "#444"
              }}
            >
              For Help, click Undo or Restart. Enjoy playing!
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── CLASSIC MAC OS 9 STYLING ──
  const renderMac = () => {
    const captured = getCapturedPieces(board)

    const renderCapturedPieces = (pieces: string[], pieceColor: "w" | "b") => {
      return (
        <div className="flex flex-wrap gap-0.5 items-center min-h-[20px] bg-white border border-[#222] px-1 py-0.5 rounded-none shadow-none">
          {pieces.length === 0 ? (
            <span className="text-[8px] text-gray-400 font-semibold italic">Empty</span>
          ) : (
            pieces.map((type, idx) => (
              <div key={idx} className="w-5 h-5 shrink-0 scale-75 origin-center opacity-85">
                <ChessPiece type={type} color={pieceColor} />
              </div>
            ))
          )}
        </div>
      )
    }

    return (
      <div 
        className="max-w-4xl mx-auto shadow-xl border text-black" 
        style={{ 
          borderColor: "#222", 
          fontFamily: "Geneva, Charcoal, sans-serif",
          background: "#CCCCCC"
        }}
      >
        {/* Title bar with Classic Mac Stripes */}
        <div
          style={{
            background: "#CCCCCC",
            borderBottom: "1px solid #222222",
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
            position: "relative"
          }}
        >
          {/* Close square */}
          <div 
            onClick={resetGame}
            style={{
              width: "12px", height: "12px",
              border: "1px solid #222",
              background: "#DDDDDD",
              cursor: "pointer",
              marginRight: "12px"
            }}
            title="Close / Reset"
          />

          {/* Decorative Horizontal Stripes */}
          <div className="flex-1 flex flex-col gap-0.5 justify-center py-1">
            <div className="h-px bg-black opacity-30 w-full" />
            <div className="h-px bg-black opacity-30 w-full" />
            <div className="h-px bg-black opacity-30 w-full" />
            <div className="h-px bg-black opacity-30 w-full" />
          </div>

          <span 
            style={{ 
              color: "#000000", 
              fontWeight: "bold", 
              fontSize: "12px",
              padding: "0 10px",
              background: "#CCCCCC",
              zIndex: 2,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)"
            }}
          >
            Chess.app
          </span>

          {/* Right window widget */}
          <div style={{ display: "flex", gap: "2px", marginLeft: "12px" }}>
            <div style={{ width: "12px", height: "12px", border: "1px solid #222", background: "#DDD" }} />
            <div style={{ width: "12px", height: "12px", border: "1px solid #222", background: "#DDD" }} />
          </div>
        </div>

        {/* Mac OS Action Buttons */}
        <div className="flex items-center gap-1 p-2 bg-[#DDD] border-b border-[#888] text-xs">
          <button 
            onClick={resetGame}
            style={{
              border: "1px solid #444",
              background: "#CCC",
              fontSize: "11px",
              padding: "1px 8px",
              cursor: "pointer"
            }}
          >
            Restart
          </button>
          <button 
            onClick={undoMove}
            disabled={history.length < 2}
            style={{
              border: "1px solid #444",
              background: "#CCC",
              fontSize: "11px",
              padding: "1px 8px",
              cursor: "pointer",
              opacity: history.length < 2 ? 0.4 : 1
            }}
          >
            Undo
          </button>
          <button 
            onClick={() => setSoundOn(!soundOn)}
            style={{
              border: "1px solid #444",
              background: "#CCC",
              fontSize: "11px",
              padding: "1px 8px",
              cursor: "pointer"
            }}
          >
            Sound: {soundOn ? "On" : "Off"}
          </button>
          <button 
            onClick={() => {
              const diffs: ("easy" | "medium" | "hard")[] = ["easy", "medium", "hard"]
              const nextIdx = (diffs.indexOf(difficulty) + 1) % diffs.length
              setDifficulty(diffs[nextIdx])
            }}
            style={{
              border: "1px solid #444",
              background: "#CCC",
              fontSize: "11px",
              padding: "1px 8px",
              cursor: "pointer"
            }}
          >
            AI Level: {difficulty === "easy" ? "Novice" : difficulty === "medium" ? "Casual" : "Deep Blue"}
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Board & Captures */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* CPU Stats */}
            <div className="w-full max-w-[28rem] md:max-w-[32rem] flex items-center justify-between text-[11px] mb-2 px-1 font-bold">
              <span>● CPU Player (Black) {aiThinking && " calculating..."}</span>
              {renderCapturedPieces(captured.w, "w")}
            </div>

            <div style={{ border: "2px solid #000", position: "relative" }}>
              <div className="grid grid-cols-8 gap-0">
                {board.map((row, r) =>
                  row.map((piece, c) => {
                    const isSelected = selectedSquare && selectedSquare[0] === r && selectedSquare[1] === c
                    const isHighlighted = validMoves.some(([mr, mc]) => mr === r && mc === c)
                    const isDarkCell = (r + c) % 2 === 1
                    const isKingInCheckSquare = piece && piece[1] === "K" && piece[0] === turn && gameState === "check"

                    const cellBg = isKingInCheckSquare
                      ? "#CC3333"
                      : isSelected
                      ? "#AAAAAA" // Mac selected gray
                      : isHighlighted
                      ? "#CCCCCC" // Highlight
                      : isDarkCell
                      ? "#888888" // Mac OS 9 Charcoal square
                      : "#DDDDDD" // Platinum square

                    return (
                      <div
                        key={`${r}-${c}`}
                        onClick={() => handleSquareClick(r, c)}
                        className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center cursor-pointer border border-[#666] relative ${
                          isKingInCheckSquare ? "border-2 border-black animate-pulse" : ""
                        }`}
                        style={{ background: cellBg }}
                      >
                        {piece && <ChessPiece type={piece[1]} color={piece[0] as "w" | "b"} />}
                        {isHighlighted && !piece && (
                          <div className="w-2.5 h-2.5 bg-[#111] rounded-full" />
                        )}
                        {/* coordinates */}
                        {c === 0 && (
                          <span className="absolute top-0.5 left-1 text-[8px] text-[#222] select-none font-semibold">
                            {8 - r}
                          </span>
                        )}
                        {r === 7 && (
                          <span className="absolute bottom-0.5 right-1 text-[8px] text-[#222] select-none font-semibold">
                            {["a", "b", "c", "d", "e", "f", "g", "h"][c]}
                          </span>
                        )}
                      </div>
                    )
                  })
                )}
              </div>

              {/* Mac OS 9 Alert Window */}
              {(gameState === "win" || gameState === "loss" || gameState === "draw") && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#888888]/40 z-20 p-4">
                  <div className="bg-[#CCCCCC] border-2 border-black p-4 shadow-[3px_3px_0px_#000000] w-full max-w-[280px] text-left border-double">
                    <div className="border border-black p-3 bg-white text-black font-mono">
                      <h4 className="font-bold text-xs mb-2 border-b border-black pb-1 uppercase tracking-wider">
                        {gameState === "win" && "Alert: Game Won"}
                        {gameState === "loss" && "Alert: Game Lost"}
                        {gameState === "draw" && "Alert: Draw Match"}
                      </h4>
                      <p className="text-[10px] leading-relaxed mb-4">
                        {gameState === "win" && "White (User) has checkmated the CPU engine. Game Terminated."}
                        {gameState === "loss" && "Black (CPU) has checkmated White. User Terminated."}
                        {gameState === "draw" && "Match draw condition met. Neither player remains in play."}
                      </p>
                      <div className="flex justify-end gap-2 text-xs">
                        <button 
                          onClick={resetGame} 
                          className="border border-black px-3 py-0.5 bg-[#CCC] hover:bg-black hover:text-white cursor-pointer font-bold"
                        >
                          Restart
                        </button>
                        <button 
                          onClick={undoMove} 
                          className="border border-black px-3 py-0.5 bg-[#CCC] hover:bg-black hover:text-white cursor-pointer font-bold"
                        >
                          Undo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Player Stats */}
            <div className="w-full max-w-[28rem] md:max-w-[32rem] flex items-center justify-between text-[11px] mt-2 px-1 font-bold">
              <span>● User Player (White) {turn === "w" && " your turn"}</span>
              {renderCapturedPieces(captured.b, "b")}
            </div>
          </div>

          {/* Diagnostics */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              style={{
                border: "2px solid #555",
                background: "#FFF",
                height: "230px",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div className="space-y-1 text-xs overflow-y-auto max-h-40 scrollbar-none">
                {aiThinking && (
                  <div className="text-xs italic text-[#111] animate-pulse">
                    ● Computing optimal strategies...
                  </div>
                )}
                {log.map((line, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      color: "#000",
                      fontWeight: idx === 0 ? "bold" : "normal"
                    }}
                  >
                    • {line}
                  </div>
                ))}
              </div>

              {/* Status bar */}
              <div 
                style={{ 
                  borderTop: "1px solid #444", 
                  paddingTop: "6px",
                  fontSize: "11px",
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#000"
                }}
              >
                <div>Turn: {turn === "w" ? "White" : "Black (Mac)"}</div>
                <div style={{ fontWeight: "bold" }}>
                  {gameState === "check" && "Check"}
                  {gameState === "win" && "White Won"}
                  {gameState === "loss" && "Black Won"}
                  {gameState === "draw" && "Draw Match"}
                </div>
              </div>
            </div>

            <div style={{ fontSize: "10px", color: "#444" }}>
              Classic Mac Chess Engine. Scripted by John Paul A. Braganza.
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Switch styling layout depending on context
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto" id="chess">
      <div className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- SECTION 05 -----------------------------------------------
        </div>
        <h2
          className="glow"
          style={{ 
            fontFamily: theme === "xp" ? "Tahoma, sans-serif" : theme === "mac" ? "Geneva, sans-serif" : "VT323, monospace", 
            fontSize: "clamp(2.5rem,6vw,4.5rem)" 
          }}
        >
          CHESS.EXE
        </h2>
        <div className="text-xs glow-dim tracking-widest mt-1">
          PLAY A RETRO GAME WITH THE CPU PLAYER
        </div>
      </div>

      {theme === "xp" ? renderXP() : theme === "mac" ? renderMac() : renderCRT()}
    </section>
  )
}
