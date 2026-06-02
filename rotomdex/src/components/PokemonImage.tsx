'use client'

import { useState } from 'react'
import type { Pokemon } from '@/types/pokemon'
import Image from 'next/image'

interface PokemonImageProps {
  pokemon: Pokemon
  width?: number
  height?: number
}

export default function PokemonImage({ pokemon, width = 256, height = 256 }: PokemonImageProps) {
  const [useShiny, setUseShiny] = useState(false)

  const handleClick = () => {
    // toggle between normal and _s version
    setUseShiny((v) => !v)
  }

  const paddedId = String(pokemon.species_id).padStart(4, '0')
  const src = `/assets/pokemon/HOME${paddedId}${useShiny ? '_s' : ''}.png`

  return (
    <Image
      src={src}
      alt={`${pokemon.name}`}
      width={width}
      height={height}
      style={{ objectFit: 'contain', cursor: 'pointer' }}
      onClick={handleClick}
      loading="eager"
    />
  )
}