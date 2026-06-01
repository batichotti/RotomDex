// src/components/PokemonGrid.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { capitalize } from '@/utils/utils'
import type { Pokemon } from '@/types/pokemon'
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
                  <Image
                    src={formPath}
                    alt={p.name}
                    width={128}
                    height={128}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className={styles.cardInfo}>
                  <small className={styles.number}>#{p.species_id}</small>
                  <strong className={styles.name}>{capitalize(p.name)}</strong>
                  <span className={styles.type}>
                    {capitalize(p.primary_type)}{getSecondaryType(p)}
                  </span>
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