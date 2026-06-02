import Link from 'next/link'
import type { Pokemon } from '@/types/pokemon'
import PokemonCardImage from '@/components/PokemonCardImage'
import PokemonCardInfo from '@/components/PokemonCardInfo'
import styles from '@/components/PokemonCard.module.css'

interface PokemonCardProps {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.name}`} className={styles.card}>
      <PokemonCardImage pokemon={pokemon} className={styles.cardImage} />
      <PokemonCardInfo pokemon={pokemon} className={styles.cardInfo} />
    </Link>
  )
}