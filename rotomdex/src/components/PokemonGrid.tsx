'use client'

import { useState } from 'react'
import type { Pokemon } from '@/types/pokemon'
import PokemonCard from '@/components/PokemonCard'
import styles from '@/components/PokemonGrid.module.css'

const PAGE_SIZE = 60

export default function PokemonGrid({ pokemon }: { pokemon: Pokemon[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const visible = pokemon.slice(0, visibleCount)
  const hasMore = visibleCount < pokemon.length

  return (
    <>
      <p>Pokémon Catalogados: {pokemon.length}</p>
      <p>Espécies Catalogadas: {new Set(pokemon.map((p) => p.species_id)).size}</p>

      <ul className={styles.grid}>
        {visible.map((p) => (
          <li key={p.id}>
            <PokemonCard pokemon={p} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className={styles.loadMore}>
          <button onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
            Exibir mais ({Math.min(PAGE_SIZE, pokemon.length - visibleCount)} restantes de {pokemon.length - visibleCount})
          </button>
        </div>
      )}
    </>
  )
}