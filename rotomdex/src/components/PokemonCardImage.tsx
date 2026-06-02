import type { Pokemon } from '@/types/pokemon'
import PokemonImage from '@/components/PokemonImage'

interface PokemonCardImageProps {
  pokemon: Pokemon
  className?: string
}

export default function PokemonCardImage({ pokemon, className }: PokemonCardImageProps) {
  return (
    <div className={className}>
      <PokemonImage pokemon={pokemon} width={196} height={196} />
    </div>
  )
}
