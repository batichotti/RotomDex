'use client'

import { useRouter } from 'next/navigation'
import type { Pokemon } from '@/types/pokemon'
import styles from './PokemonNavigation.module.css'
import { Beiruti } from 'next/font/google'

const beiruti = Beiruti({
  subsets: ['arabic', 'latin'],
  weight: 'variable',
  display: 'swap',
});

interface PokemonNavigationProps {
  pokemon: Pokemon
  prevPokemon?: { id: number; name: string } | null
  nextPokemon?: { id: number; name: string } | null
}

export default function PokemonNavigation({ pokemon, prevPokemon, nextPokemon }: PokemonNavigationProps) {
  const router = useRouter()

  return (
    <nav className={`${styles.navBar} ${beiruti.className}`}>
      <button
        className={styles.navBtn}
        onClick={() => prevPokemon && router.push(`/pokemon/${prevPokemon.name}`)}
        disabled={!prevPokemon}
        aria-label="Pokémon anterior"
      >
        <span className={styles.arrow}>←</span>
        <span className={styles.info}>
          <span className={styles.num}>#{String(prevPokemon?.id ?? 0).padStart(3, '0')}</span>
          <span className={styles.name}>{prevPokemon?.name.replaceAll('-', ' ') ?? '—'}</span>
        </span>
      </button>

      <span> #{pokemon.species_id} <b>{pokemon.name.replaceAll('-', ' ')}</b> </span>

      <button
        className={styles.navBtn}
        onClick={() => nextPokemon && router.push(`/pokemon/${nextPokemon.name}`)}
        disabled={!nextPokemon}
        aria-label="Próximo Pokémon"
      >
        <span className={`${styles.info} ${styles.infoRight}`}>
          <span className={styles.num}>#{String(nextPokemon?.id ?? 0).padStart(3, '0')}</span>
          <span className={styles.name}>{nextPokemon?.name.replaceAll('-', ' ') ?? '—'}</span>
        </span>
        <span className={styles.arrow}>→</span>
      </button>
    </nav>
  )
}