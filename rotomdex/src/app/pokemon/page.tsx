import type { Pokemon } from '@/types/pokemon'           // Importar tipo Pokemon de src/types/pokemon.ts
import { capitalize } from '@/utils/utils'               // Importar Funções de Utilidade
import PokemonFilters from '@/components/PokemonFilters' // Importar Filtros de Pokemon de pokemonFilters.tsx
import FilterBar from '@/components/FilterBar'           // Importar barra de filtros de FilterBar.tsx
import styles from '@/components/PokemonPage.module.css'
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

  const bySpecies = pokemon.reduce((acc, p) => {
    if (!acc[p.species_id]) acc[p.species_id] = []
    acc[p.species_id].push(p)
    return acc
  }, {} as Record<number, Pokemon[]>)

  // Verifica se o pokemon tem stats diferentes da forma base
  function hasDifferentStats(p: Pokemon): boolean {
    const forms = bySpecies[p.species_id]
    const base = forms.find((f) => f.name === f.species_name)
    
    if (!base || p.id === base.id) return false // É a própria forma base
    
    return ((p.hp !== base.hp)||(p.attack !== base.attack)||(p.defense !== base.defense)||(p.special_attack !== base.special_attack)||(p.special_defense !== base.special_defense)||(p.speed !== base.speed)) // Compara status com a forma base
  }

  // HTML
const pokemonList = pokemon
.filter((p) => (p.id < 10000) || (!hasDifferentStats(p)))
.map((p) => {
  const form = getForm(p.name, p.species_name);
  const baseUrl = `/assets/pokemon/HOME${String(p.species_id).padStart(4, '0')}`;
  
  let formPath = form
    ? `${baseUrl}_${form}.png` 
    : `${baseUrl}.png`;

  // if(!NOT_SHINY.includes(form)) formPath += '_s';
  // formPath += '.png';

  return (
    <li key={p.id}>
      <Link href={`/pokemon/${p.species_name}`} className={styles.card}>
        <Image
          src={formPath}
          alt={p.name}
          width={72}
          height={72}
          style={{ objectFit: 'contain' }}
        />

        <small className={styles.number}>#{p.id}</small>
        <strong className={styles.name}>{capitalize(p.name)}</strong>
        
        <span className={styles.type}>
          {capitalize(p.primary_type)}{getSecondaryType(p)}
        </span>
      </Link>
    </li>
  );
});

// No return, substitua o map por:
  return (
    <div className={styles.wrapper}>
      <Suspense fallback={<div>Carregando filtros...</div>}>
        <FilterBar>
         <PokemonFilters />
       </FilterBar>
     </Suspense>

      <h1>RotomDex</h1>
      <p>Pokémon Catalogados: {pokemon.length}</p>

      <ul className={styles.grid}>
        {pokemonList}
      </ul>
   </div>
  )
}