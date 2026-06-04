import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'John Paul A. Braganza - Full-Stack & Blockchain Developer',
  description: 'Freelance Full-Stack & Blockchain Developer building high-performance web applications, retro games, and decentralized systems.',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Share+Tech+Mono&family=VT323:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-mono antialiased">
        {children}
      </body>
    </html>
  )
}
