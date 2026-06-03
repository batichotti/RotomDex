import type { Pokemon } from '@/types/pokemon'           // Importar tipo Pokemon de src/types/pokemon.ts
import { capitalize } from '@/utils/utils'               // Importar Funções de Utilidade
import PokemonFilters from '@/components/PokemonFilters' // Importar Filtros de Pokemon de pokemonFilters.tsx
import FilterBar from '@/components/FilterBar'           // Importar barra de filtros de FilterBar.tsx
import styles from '@/components/PokemonPage.module.css'
import PokemonGrid from '@/components/PokemonGrid'
import { Suspense } from 'react'                         // Importar "Suspense" do React. Permite esperar algo carregar
import Link from 'next/link';
import Image from 'next/image';

// const NOT_SHINY = ['partner_cap', 'alola_cap', 'kalos_cap', 'unova_cap', 'sinnoh_cap', 'hoenn_cap', 'original_cap', 'rock_star', 'pop_star', 'phd', 'belle', 'libre', 'world_cap', 'totem', 'totem_disguised', 'totem_busted', 'stellar', 'gliding_build', 'swimming_build', 'limited_build', 'sprinting_build', 'low_power_mode', 'drive_mode','aquatic_mode', 'glide_mode', '_eternal']

// Função para tratar e devolver o tipo secundário de um Pokemon
function getSecondaryType(p: Pokemon){
  return (p.secondary_type === 'None')            // Pokemon não possui tipo secundário( = "None")
          ? ''
          : ` / ${capitalize(p.secondary_type)}`; // Retorna o tipo secundário com uma barra de separação e capitalizado
}

function getForm(name: string, speciesName: string){
  if(name === speciesName) return null;
  if (!name.startsWith(speciesName + '-')) return null;
  
  const suffix = name.slice(speciesName.length + 1).replaceAll('-', '_');; // ex: "_galar", "_alola"
  return suffix;
};

// Funcão principal: PokemonPage
export default async function PokemonPage({ searchParams }: { searchParams: Promise<Record<string, string>> }){
  const filters = await searchParams;  // Recebe os Parâmetros assim que resolvidos
  const query = new URLSearchParams(); // Recebe a Query dos parâmetros

  if (filters.type)  query.set('type',  filters.type);  // Se existir tipo nos filtros, adiciona na query
  if (filters.type2) query.set('type2', filters.type2); // Se existir tipo secundário, adiciona na query
  
  query.set('orderBy', filters.orderBy ?? 'id');   // Sempre envia, para a query, padrão 'id'
  query.set('order',   filters.order   ?? 'ASC');  // Sempre envia, para a query, padrão 'ASC'  

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon?${query}`, {cache: 'no-store'}); // Retorna a query do backend

  // Trata erros da API
  if (!res.ok) {
    const err = await res.json();
    return (
      <div style={{ paddingTop: 'var(--filterbar-height)'}}>
        <Suspense fallback={<div>Carregando filtros...</div>}>
          <FilterBar>
            <PokemonFilters/>
          </FilterBar>
        </Suspense>
        <h1>RotomDex</h1>
        <p style={{ color: 'red' }}>{err.message}</p>
      </div>
    );
  }
  
  const pokemon: Pokemon[] = await res.json(); // Converte a resposta da API em um json, e em array

  const variantComparisonKeys = [
    'primary_type',
    'secondary_type',
    'hp',
    'attack',
    'defense',
    'special_attack',
    'special_defense',
    'speed'
  ] as const;

  const pokemonById = new Map<number, Pokemon>(pokemon.map((entry) => [entry.id, entry]));

  function shouldShow(p: Pokemon, filter: boolean = false): boolean {
    if (p.id === p.species_id) return true;
    if (getForm(p.name, p.species_name) === 'gmax') return true;

    const base = pokemonById.get(p.species_id);
    if (!base) return filter;

    return variantComparisonKeys.some((key) => p[key] !== base[key]);
  }

  const hasFilter = !!(filters.type || filters.type2);
  const shownPokemon = pokemon.filter(p => shouldShow(p, hasFilter));

  // HTML
return (
  <div className={styles.wrapper}>
    <Suspense fallback={<div>Carregando filtros...</div>}>
      <FilterBar>
        <PokemonFilters />
      </FilterBar>
    </Suspense>

    <h1>RotomDex</h1>
    <PokemonGrid pokemon={shownPokemon} />
  </div>
  )
}