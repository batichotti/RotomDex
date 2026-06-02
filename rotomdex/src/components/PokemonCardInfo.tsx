import type { Pokemon } from '@/types/pokemon'
import PokemonHeader from '@/components/PokemonHeader'

interface PokemonCardInfoProps {
  pokemon: Pokemon
  className?: string
}

export default function PokemonCardInfo({ pokemon, className }: PokemonCardInfoProps) {
  return (
    <div className={className}>
      <PokemonHeader pokemon={pokemon} />
    </div>
  )
}
