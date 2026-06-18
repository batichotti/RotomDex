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

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function PokemonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const pokemonData = await safeFetch<Pokemon[]>(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/${id}`);
  const pokemon = pokemonData?.[0];

  if (!pokemon) notFound();

  if (id !== pokemon.name) {
    redirect(`/pokemon/${pokemon.name}`);
  }

  const [evolutionData, movesData, abilityData, typesData] = await Promise.all([
    safeFetch<Evolution[]>(`${process.env.NEXT_PUBLIC_API_URL}/pokemon-evolutions/${pokemon.id}`),
    safeFetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon-moves/pokemon/${pokemon.id}`),
    safeFetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon-abilities/pokemon/${pokemon.id}`),
    safeFetch(`${process.env.NEXT_PUBLIC_API_URL}/types/defensive?type=${pokemon.primary_type}&type2=${pokemon.secondary_type ?? ''}`),
  ]);

  return (
    <div className={styles.pokemonContainer}>
      <div className={styles.pokemonImageDataContainer}>
        <div className={styles.imageHeaderContainer}>
          <PokemonImage pokemon={pokemon} />
          <PokemonHeader pokemon={pokemon} />
        </div>
        <div className={styles.pokemonData}>
          <PokemonData pokemon={pokemon} />
        </div>
      </div>
      <span>
        <PokemonStats pokemon={pokemon} />
        <PokemonNavigation pokemon={pokemon} />
      </span>

    <PokemonEvolutionTree evolution={evolutionData} />

    </div>
  );
}