'use client'

import { useState } from 'react'
import type { Pokemon } from '@/types/pokemon'
import Image from 'next/image'
import styles from './PokemonImage.module.css'

interface PokemonImageProps {
  pokemon: Pokemon
  width?: number
  height?: number
}

function getForm(name: string, speciesName: string) {
  if (name === speciesName) return null
  if (!name.startsWith(speciesName + '-')) return null
  return name.slice(speciesName.length + 1).replaceAll('-', '_')
}

export default function PokemonImage({ pokemon, width = 256, height = 256 }: PokemonImageProps) {
  const [useShiny, setUseShiny] = useState(false)

  const handleClick = () => {
    // toggle between normal and _s version
    setUseShiny((v) => !v)
  }

  const paddedId = String(pokemon.species_id).padStart(4, '0')
  const form = getForm(pokemon.name, pokemon.species_name)
  const baseUrl = `/assets/pokemon/HOME${paddedId}`
  const formPath = form ? `${baseUrl}_${form}.png` : `${baseUrl}.png`
  const src = useShiny ? formPath.replace('.png', '_s.png') : formPath

  return (
    <div className={`${styles.imageContainer} ${useShiny ? styles.shiny : ''}`}>
      <Image
        src={src}
        alt={`${pokemon.name}`}
        width={width}
        height={height}
        style={{ objectFit: 'contain' }}
        onClick={handleClick}
        loading="eager"
      />
    </div>
  )
}