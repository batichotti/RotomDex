import type { Pokemon } from '@/types/pokemon'
import TypeIcon from './TypeIcon'
import styles from './PokemonHeader.module.css'

export default function PokemonHeader({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className={styles.header}>
      <div className={styles.title}><p>#{pokemon.species_id}</p> <h1>{pokemon.name.replaceAll("-", " ")}</h1></div>
      <TypeIcon primary_type={pokemon.primary_type} secondary_type={pokemon.secondary_type}/>
    </div>
  )
}