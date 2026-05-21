import type { Moves } from '@/types/moves'             // Importar tipo Move de src/types/moves.ts
import { capitalize, formatStat } from '@/utils/utils' // Importar Funções de Utilidade
import MovesFilters from '@/components/MovesFilters'   // Importar Filtros de Move de movesFilters.tsx
import FilterBar from '@/components/FilterBar'         // Importar barra de filtros de FilterBar.tsx
import { Suspense } from 'react'                       // Imporat "Suspense" do React. Permite esperar algo carregar

export default async function MovesPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const filters = await searchParams;  // Recebe os Parâmetros assim que resolvidos
  const query = new URLSearchParams(); // Recebe a Query dos parâmetros

  if (filters.type)         query.set('type',         filters.type);         // Se existir tipo, adiciona na query
  if (filters.damage_class) query.set('damage_class', filters.damage_class); // Se existir classe, adiciona na query
  if (filters.pp)           query.set('pp',           filters.pp);           // Se existir pp, adiciona na query
  if (filters.accuracy)     query.set('accuracy',     filters.accuracy);     // Se existir acurácia, adiciona na query
  if (filters.power)        query.set('power',        filters.power);        // Se existir poder, adiciona na query
  // if (filters.fill)         query.set('fill',         filters.fill);         
  // if (filters.min)          query.set('min',          filters.min);  
  // if (filters.max)          query.set('max',          filters.max);

  query.set('orderBy', filters.orderBy ?? 'id');  // Sempre envia, para a query, padrão 'id'
  query.set('order',   filters.order   ?? 'ASC'); // Sempre envia, para a query, padrão 'ASC'  

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/moves?${query}`, { cache: 'no-store' }); // Retorna a query do backend

  // Trata erros da API
  if (!res.ok) {
    const err = await res.json()
    return (
      <div>
        <Suspense>
          <FilterBar>
            <MovesFilters/>
          </FilterBar>
        </Suspense>
        <h1>Moves</h1>
        <p style={{ color: 'red' }}>{err.message}</p>
      </div>
    )
  }

  const moves: Moves[] = await res.json() // Converte a resposta da API em um json, e em array

  // HTML
  return (
    <div>
      {/* Suspense necessário porque MovesFilters usa useSearchParams */}
      <Suspense>
        <FilterBar>
          <MovesFilters/>
        </FilterBar>
      </Suspense>

      <h1>Moves</h1>
      <p>Moves Catalogados: {moves.length}</p>

      <ul style={{ listStyle: 'none', padding: '0.5rem' }}>
        {moves.map((m) => (

          // Cria elemento da lista com ID como chave, borda inferior e espaçamento
          <li key={m.id} style={{ borderBottom: '1px solid #ccc', padding: '0.25rem' }}>
            
            {/*Conteúdo da linha, ID e Nome em negrito, tipo, classe, poder, pp e acurácia*/}
            <Link href={`/moves/${m.name}`}>
              <strong>#{m.id} {capitalize(m.name)}</strong>
                {' '} - {capitalize(m.type)} | {capitalize(m.damage_class)}
                {' '}| Pow: {formatStat(m.power)} | PP: {m.pp} | Acc: {formatStat(m.accuracy)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}