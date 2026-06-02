import { redirect } from 'next/navigation'
import type { Pokemon } from '@/types/pokemon'
import PokemonHeader from '@/components/PokemonHeader';
import PokemonStats from '@/components/PokemonStats';
import PokemonImage from '@/components/PokemonImage';
import PokemonNavigation from '@/components/PokemonNavigation';
import styles from './page.module.css';


export default async function PokemonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/${id}`)

  if (!res.ok) {
    return <div><h1>Pokémon não encontrado</h1></div>
  }

  const pokemon: Pokemon = (await res.json())[0]; // Converte a resposta da API em um json, e em array
  
  if (!pokemon) {
    return <div><h1>Pokémon não encontrado</h1></div>
  }

  if (id !== pokemon.name) {
    redirect(`/pokemon/${pokemon.name}`)
  }

  return (
    <div className={styles.pokemonContainer}>
      <div className={styles.imageHeaderContainer}>
        <PokemonImage pokemon={pokemon}/>
        <PokemonHeader pokemon={pokemon} />
      </div>
      <span>
        <PokemonStats pokemon={pokemon} />
        <PokemonNavigation pokemon={pokemon} />
      </span>
    </div>
  )
}