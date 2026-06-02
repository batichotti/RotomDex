import Link from 'next/link'
import type { Pokemon } from '@/types/pokemon'
import PokemonImage from '@/components/PokemonImage'
import PokemonHeader from '@/components/PokemonHeader'
import styles from '@/components/PokemonCard.module.css'

interface PokemonCardProps {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.species_name}`} className={styles.card}>
      <div className={styles.cardImage}>
        <PokemonImage pokemon={pokemon} width={196} height={196} />
      </div>
      <div className={styles.cardInfo}>
        <PokemonHeader pokemon={pokemon} />
      </div>
    </Link>
  )
}