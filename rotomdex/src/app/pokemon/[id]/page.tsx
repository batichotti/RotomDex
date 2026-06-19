import { redirect, notFound } from 'next/navigation'
import type { Pokemon } from '@/types/pokemon'
import type { Evolution } from '@/types/evolutions'
import PokemonHeader from '@/components/PokemonHeader';
import PokemonStats from '@/components/PokemonStats';
import PokemonImage from '@/components/PokemonImage';
import PokemonNavigation from '@/components/PokemonNavigation';
import PokemonData from '@/components/PokemonData';
import styles from './page.module.css';
import PokemonEvolutionTree from '@/components/PokemonEvolutionTree';
import PokemonMoves from '@/components/PokemonMoves';
import { safeFetch } from '@/utils/safefetch';
import { PokemonMove } from '@/types/moves';

export default async function PokemonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const pokemonData = await safeFetch<Pokemon[]>(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/${id}`);
  const pokemon = pokemonData?.[0];

  if (!pokemon) notFound();

  if (id !== pokemon.name) {
    redirect(`/pokemon/${pokemon.name}`);
  }

  const typeParams = new URLSearchParams({ type: pokemon.primary_type })
  if (pokemon.secondary_type && pokemon.secondary_type !== 'None') {
    typeParams.append('type2', pokemon.secondary_type)
  }

  const [evolutionData, movesData, abilityData, typesData, prevData, nextData] = await Promise.all([
    safeFetch<Evolution[]>(`${process.env.NEXT_PUBLIC_API_URL}/pokemon-evolutions/${pokemon.id}`),
    safeFetch<PokemonMove[]>(`${process.env.NEXT_PUBLIC_API_URL}/pokemon-moves/pokemon/${pokemon.species_id}`),
    safeFetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon-abilities/pokemon/${pokemon.id}`),
    safeFetch(`${process.env.NEXT_PUBLIC_API_URL}/types/defensive?${typeParams}`),
    pokemon.species_id > 1
      ? safeFetch<Pokemon[]>(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/${pokemon.species_id - 1}`)
      : Promise.resolve(null),
    pokemon.species_id < 1025
      ? safeFetch<Pokemon[]>(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/${pokemon.species_id + 1}`)
      : Promise.resolve(null),
  ]);

  const prevPokemon = prevData?.[0] ? { id: prevData[0].species_id, name: prevData[0].name } : null;
  const nextPokemon = nextData?.[0] ? { id: nextData[0].species_id, name: nextData[0].name } : null;

  return (
    <>
      <PokemonNavigation pokemon={pokemon} prevPokemon={prevPokemon} nextPokemon={nextPokemon}/>

      <div className={styles.global}>
        <div className={styles.twoCol}>

          <div className={styles.leftCol}>
            <div className={styles.pokemonImageDataContainer}>
              <div className={styles.imageHeaderContainer}>
                <PokemonImage pokemon={pokemon} />
                <PokemonHeader pokemon={pokemon} />
              </div>
              <div className={styles.pokemonData}>
                <PokemonData pokemon={pokemon} />
              </div>
            </div>
            <PokemonStats pokemon={pokemon} />
          </div>

          <div className={styles.rightCol}>
            <PokemonEvolutionTree evolution={evolutionData} />
            {/* <PokemonTypeTable types={typesData}/> */}
            <PokemonMoves  moves={movesData ?? []} />
          </div>

        </div>
      </div>
    </>
  );
}