import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'RotomDex | A Competitve Pokédex',
  description: 'Competitive Pokédex',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar/>
        <main>{children}</main>
      </body>
    </html>
  )
}