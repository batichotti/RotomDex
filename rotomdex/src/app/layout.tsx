import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RotomDex | A Competitve Pokédex',
  description: 'Competitive Pokédex',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}