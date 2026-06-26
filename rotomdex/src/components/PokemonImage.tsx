'use client'

import { useState } from 'react'
import type { Pokemon } from '@/types/pokemon'
import Image from 'next/image'
import styles from './PokemonImage.module.css'
import { getForm } from '@/utils/PokemonMap'

interface PokemonImageProps {
  pokemon: Pokemon
  width?: string
  height?: string
  shinyLock?: boolean;
}

export default function PokemonImage({
  pokemon,
  width = '20vw',
  height = '20vh',
  shinyLock = false,
}: PokemonImageProps) {
  const [useShiny, setUseShiny] = useState(false)

  const handleClick = () => {
    if (!shinyLock) setUseShiny((v) => !v)
  }

  const paddedId = String(pokemon.species_id).padStart(4, '0')
  const form = getForm(pokemon.name, pokemon.species_name)
  const baseUrl = `/assets/pokemon/HOME${paddedId}`
  const formPath = form ? `${baseUrl}_${form}.png` : `${baseUrl}.png`
  const src = useShiny ? formPath.replace('.png', '_s.png') : formPath

  return (
    <div
      className={`${styles.imageContainer} ${useShiny ? styles.shiny : ''}`}
      style={{ width, height }}
    >
      <Image
        src={src}
        alt={pokemon.name}
        fill
        sizes={`${width}, ${height}`}
        style={{ objectFit: 'contain' }}
        onClick={handleClick}
        loading="eager"
      />
    </div>
  )
}