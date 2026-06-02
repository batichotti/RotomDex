// src/components/PokemonGrid.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { capitalize } from '@/utils/utils'
import type { Pokemon } from '@/types/pokemon'
import PokemonImage from '@/components/PokemonImage'
import PokemonHeader from '@/components/PokemonHeader'
import styles from '@/components/PokemonGrid.module.css'

const PAGE_SIZE = 60;

function getSecondaryType(p: Pokemon) {
  return p.secondary_type === 'None' ? '' : ` / ${capitalize(p.secondary_type)}`
}

function getForm(name: string, speciesName: string) {
  if (name === speciesName) return null
  if (!name.startsWith(speciesName + '-')) return null
  return name.slice(speciesName.length + 1).replaceAll('-', '_')
}

export default function PokemonGrid({ pokemon }: { pokemon: Pokemon[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const visible = pokemon.slice(0, visibleCount)
  const hasMore = visibleCount < pokemon.length

  return (
    <>
      <p>Pokémon Catalogados: {pokemon.length}</p>

      <ul className={styles.grid}>
        {visible.map((p) => {
          const form = getForm(p.name, p.species_name)
          const baseUrl = `/assets/pokemon/HOME${String(p.species_id).padStart(4, '0')}`
          const formPath = form ? `${baseUrl}_${form}.png` : `${baseUrl}.png`

          return (
            <li key={p.id}>
              <Link href={`/pokemon/${p.species_name}`} className={styles.card}>
                <div className={styles.cardImage}>
                  <PokemonImage pokemon={p} width={196} height={196} />
                </div>
                <div className={styles.cardInfo}>
                  <PokemonHeader pokemon={p} />
                </div>
              </Link>
            </li>
          )
        })}
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