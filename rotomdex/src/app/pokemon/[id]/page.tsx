import type { Pokemon } from '@/types/pokemon'
import { capitalize } from '@/utils/utils'
import Image from 'next/image'
import PokemonStats from '@/components/PokemonStats';
import TypeIcon from '@/components/TypeIcon';


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
      <Image 
        src={`/assets/pokemon/HOME${String(pokemon.species_id).padStart(4, '0')}.png`} 
        alt={`${pokemon.name}`} 
        width={256} // Ajuste o tamanho conforme preferir
        height={256}
        style={{ objectFit: 'contain' }}
        loading="eager"
      />
      
      <span>
        <h1>#{pokemon.species_id} - {capitalize(pokemon.species_name)}</h1>
        <TypeIcon primary_type={pokemon.primary_type} secondary_type={pokemon.secondary_type}/>
        <PokemonStats pokemon={pokemon} />
      </span>
    </div>
  )
}