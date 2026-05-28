import type { Pokemon } from '@/types/pokemon'           // Importar tipo Pokemon de src/types/pokemon.ts
import { capitalize } from '@/utils/utils'               // Importar Funções de Utilidade
import PokemonFilters from '@/components/PokemonFilters' // Importar Filtros de Pokemon de pokemonFilters.tsx
import FilterBar from '@/components/FilterBar'           // Importar barra de filtros de FilterBar.tsx
import { Suspense } from 'react'                         // Importar "Suspense" do React. Permite esperar algo carregar
import Link from 'next/link';
import Image from 'next/image';

// Função para tratar e devolver o tipo secundário de um Pokemon
function getSecondaryType(p: Pokemon){
  return (p.secondary_type === 'None')            // Pokemon não possui tipo secundário( = "None")
          ? ''
          : ` / ${capitalize(p.secondary_type)}`; // Retorna o tipo secundário com uma barra de separação e capitalizado
}

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

  // HTML
  // Substitui o <ul> e o map inteiro por isso:
return (
  <div style={{ paddingTop: 'var(--filterbar-height)' }}>
    <Suspense fallback={<div>Carregando filtros...</div>}>
      <FilterBar>
        <PokemonFilters />
      </FilterBar>
    </Suspense>

    <h1>RotomDex</h1>
    <p>Pokémon Catalogados: {pokemon.length}</p>

    <ul style={{
      listStyle: 'none',
      padding: '0.5rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(18vw, 1fr))',
      gap: '12px',
    }}>
      {pokemon.map((p) => (
        <li key={p.id}>
          <Link
            href={`/pokemon/${p.species_name}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '12px',
              textDecoration: 'none',
              color: 'inherit',
              background: '#fff',
            }}
          >
            {`/assets/pokemon/HOME${String(p.species_id).padStart(4, '0')}.png` ? (
              <Image
                src={`/assets/pokemon/HOME${String(p.species_id).padStart(4, '0')}.png`}
                alt={p.name}
                width={72}
                height={72}
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <div style={{ width: 72, height: 72, backgroundColor: '#eee', borderRadius: '50%' }} />
            )}
            <small style={{ color: '#aaa' }}>#{p.species_id}</small>
            <strong style={{ fontSize: '14px', textAlign: 'center' }}>{capitalize(p.name)}</strong>
            <span style={{ fontSize: '12px', color: '#888' }}>
              {capitalize(p.primary_type)}{getSecondaryType(p)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)
}