import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { Beiruti } from 'next/font/google'
import './globals.css'

const beiruti = Beiruti({
  subsets: ['arabic', 'latin'], // Beiruti supports both scripts
  weight: 'variable',           // Uses the continuous weight axis
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RotomDex | A Competitve Pokédex',
  description: 'Competitive Pokédex',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={beiruti.className}>
        <Navbar/>
        <main style={{ paddingTop: 'var(--navbar-height)' }}>
          {children}
        </main>
      </body>
    </html>
  )
}