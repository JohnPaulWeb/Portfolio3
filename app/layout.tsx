import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yadwinder Singh — Product Designer',
  description: 'Freelance Product Designer helping early-stage startups build world-class products through clarity, craft, and pixel-perfect design.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-mono antialiased">
        {children}
      </body>
    </html>
  )
}
