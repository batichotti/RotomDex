import type { Pokemon } from '@/types/pokemon'           // Importar tipo Pokemon de src/types/pokemon.ts
import PokemonFilters from '@/components/PokemonFilters' // Importar Filtros de Pokemon de pokemonFilters.tsx
import PokemonAdvancedFilters from '@/components/PokemonAdvFilters'
import FilterBar from '@/components/FilterBar'           // Importar barra de filtros de FilterBar.tsx
import styles from '@/components/PokemonPage.module.css'
import PokemonGrid from '@/components/PokemonGrid'
import { shouldShow } from '@/utils/PokemonMap'
import PokemonErrorState from '@/components/PokemonErrorState'
import OrderBar from '@/components/OrderBar'
import { Suspense } from 'react'                         // Importar "Suspense" do React. Permite esperar algo carregar

const FILTERS = ['type', 'type2', 'generation', 'eggGroup1', 'eggGroup2', 'fill', 'min', 'max', 'isLegendary', 'isMythical', 'isBaby', 'hasGenderDifferences', 'formsSwitchable', 'isMega', 'isGmax', 'isRegionalForm'] as const;

// Funcão principal: PokemonPage
export default async function PokemonPage({ searchParams }: { searchParams: Promise<Record<string, string>> }){
  const filters = await searchParams;  // Recebe os Parâmetros assim que resolvidos
  const query = new URLSearchParams(); // Recebe a Query dos parâmetros

  let hasFilter = false;  
  for (const key of FILTERS) {
    const value = filters[key];
    if (value){query.set(key, value); hasFilter = true}
  }
  
  query.set('orderBy', filters.orderBy ?? 'species_id');   // Sempre envia, para a query, padrão 'id'
  query.set('order',   filters.order   ?? 'ASC');  // Sempre envia, para a query, padrão 'ASC'  

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon?${query}`, {cache: 'no-store'}); // Retorna a query do backend

  // Trata erros da API
  if (!res.ok) {
    const err = await res.json();
    return <PokemonErrorState message={err.message} />;
  }
  
  const pokemon: Pokemon[] = await res.json(); // Converte a resposta da API em um json, e em array
  const pokemonById = new Map<number, Pokemon>(pokemon.map(p => [p.id, p]));
  
  // const hasFilter = !!(value);
  const shownPokemon = pokemon.filter(p => shouldShow(p, pokemonById.get(p.species_id), hasFilter));

  // HTML
return (
  <div className={styles.wrapper}>
    <Suspense fallback={<div>Carregando filtros...</div>}>
      <FilterBar advanced={<PokemonAdvancedFilters />} >
        <PokemonFilters />
      </FilterBar>
    </Suspense>

    <Suspense fallback={null}>
      <OrderBar path="/pokemon" total={shownPokemon.length} species={new Set(shownPokemon.map((p) => p.species_id)).size} />
    </Suspense>
    
    <PokemonGrid pokemon={shownPokemon} />
  </div>
  )
}