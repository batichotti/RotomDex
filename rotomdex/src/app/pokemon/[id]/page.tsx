import type { Pokemon } from '@/types/pokemon'
import PokemonStats from '@/components/PokemonStats';
import PokemonHeader from '@/components/PokemonHeader';
import PokemonImage from '@/components/PokemonImage';


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

  return (
    <div>
      <PokemonImage pokemon={pokemon} />

      
      <span>
        <PokemonHeader pokemon={pokemon} />
        <PokemonStats pokemon={pokemon} />
      </span>
    </div>
  )
}