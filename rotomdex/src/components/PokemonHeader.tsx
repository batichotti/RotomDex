import type { Pokemon } from '@/types/pokemon'
import TypeIcon from './TypeIcon'

export default function PokemonHeader({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <h1>#{pokemon.species_id} {pokemon.species_name.replace("-", " ")}</h1>
      <TypeIcon primary_type={pokemon.primary_type} secondary_type={pokemon.secondary_type}/>
    </div>
  )
}
