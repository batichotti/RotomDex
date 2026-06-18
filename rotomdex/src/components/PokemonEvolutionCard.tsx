import type { Pokemon } from '@/types/pokemon'
import PokemonImage from './PokemonImage'

export default async function PokemonEvolutionCard({ pokemonId }: { pokemonId: number }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/${pokemonId}`)
    if (!res.ok) return null

    const data: Pokemon[] = await res.json()
    const pokemon = data?.[0]

    if (!pokemon) return null

    return <PokemonImage pokemon={pokemon}  width={120} height={120}/>
}