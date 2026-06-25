import type { Pokemon } from '@/types/pokemon'
import PokemonImage from './PokemonImage'
import Link from 'next/link'

export default async function PokemonEvolutionCard({ pokemonId }: { pokemonId: number }) {
    if (pokemonId === 9997 || pokemonId === 9996) pokemonId = 414;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/${pokemonId}`)
    if (!res.ok) return null

    const data: Pokemon[] = await res.json()
    const pokemon = data?.[0]

    if (!pokemon) return null

    return <Link href={`/pokemon/${pokemon.name}`}>
        <PokemonImage pokemon={pokemon}  width={'10rem'} height={'10rem'} shinyLock={true}/>
        </Link>
}
