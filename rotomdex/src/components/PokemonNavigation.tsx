'use client'

import { useRouter } from 'next/navigation'
import type { Pokemon } from '@/types/pokemon'
import styles from './PokemonNavigation.module.css'

interface PokemonNavigationProps {
  pokemon: Pokemon
}

export default function PokemonNavigation({ pokemon }: PokemonNavigationProps) {
  const router = useRouter()

  const handlePrevious = () => {
    const prevId = pokemon.species_id - 1
    if (prevId > 0) {
      router.push(`/pokemon/${prevId}`)
    }
  }

  const handleNext = () => {
    const nextId = pokemon.species_id + 1
    router.push(`/pokemon/${nextId}`)
  }

  return (
    <div className={styles.navigationButtons}>
      <button 
        onClick={handlePrevious}
        disabled={pokemon.species_id <= 1}
        title="- Pokémon"
      >
        ←
      </button>
      <button 
        onClick={handleNext}
        title="+ Pokémon"
      >
        →
      </button>
    </div>
  )
}
