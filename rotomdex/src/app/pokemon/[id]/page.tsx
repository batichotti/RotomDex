import { redirect, notFound } from 'next/navigation'
import type { Pokemon } from '@/types/pokemon'
import type { Evolution } from '@/types/evolutions'
import type { TypeEffectiveness } from '@/types/type';
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
import PokemonTypeTable from '@/components/PokemonTypeTable';
import { getForm } from '@/utils/PokemonMap';

export default async function PokemonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const pokemonData = await safeFetch<Pokemon[]>(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/${id}`);
  const pokemon = pokemonData?.[0];

  if (!pokemon) notFound();

  if (id !== pokemon.name) {
    redirect(`/pokemon/${pokemon.name}`);
  }

  const secondaryType = pokemon.secondary_type?.trim();
  const hasSecondaryType = !!secondaryType && secondaryType.toLowerCase() !== 'none';

  let typeParams = `type=${pokemon.primary_type}`;

  if (hasSecondaryType) {
    typeParams += `&type2=${secondaryType}`;
  }

  const [evolutionData, movesData, typesData, prevData, nextData, altFormsData] = await Promise.all([
    safeFetch<Evolution[]>(`${process.env.NEXT_PUBLIC_API_URL}/pokemon-evolutions/${pokemon.id}`),
    safeFetch<PokemonMove[]>(`${process.env.NEXT_PUBLIC_API_URL}/pokemon-moves/pokemon/${pokemon.species_id}`),
    safeFetch<TypeEffectiveness[]>(`${process.env.NEXT_PUBLIC_API_URL}/types/defensive?${typeParams}`),
    pokemon.species_id > 1
      ? safeFetch<Pokemon[]>(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/${pokemon.species_id - 1}`)
      : Promise.resolve(null),
    pokemon.species_id < 1025
      ? safeFetch<Pokemon[]>(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/${pokemon.species_id + 1}`)
      : Promise.resolve(null),
    safeFetch<Pokemon[]>(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/${pokemon.species_name}`),
  ]);

  const prevPokemon = prevData?.[0] ? { id: prevData[0].species_id, name: prevData[0].name } : null;
  const nextPokemon = nextData?.[0] ? { id: nextData[0].species_id, name: nextData[0].name } : null;

  const pokemonForms = altFormsData?.filter((form) => getForm(form.name, pokemon.species_name)) ?? [];

  return (
    <>
      <PokemonNavigation pokemon={pokemon} prevPokemon={prevPokemon} nextPokemon={nextPokemon} alternativeForms={pokemonForms}/>

      <div className={styles.global}>
        <div className={styles.twoCol}>

          <div className={styles.leftCol}>
            <div className={styles.pokemonImageDataContainer}>
              <div className={styles.imageHeaderContainer}>
                <PokemonImage pokemon={pokemon} width={'20rem'} height={'20rem'} />
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
            <PokemonTypeTable types={typesData ?? []} />
            <PokemonMoves moves={movesData ?? []} />
          </div>

        </div>
      </div>
    </>
  );
}