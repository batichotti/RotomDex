import type { Pokemon } from '@/types/pokemon'           // Importar tipo Pokemon de src/types/pokemon.ts
import PokemonFilters from '@/components/PokemonFilters' // Importar Filtros de Pokemon de pokemonFilters.tsx
import { Suspense } from 'react'                         // Imporat "Suspense" do React. Permite esperar algo carregar

// Função para capitalizar strings
function capitalize(str: string){
  return str.charAt(0).toUpperCase() // Retorna o texto informado como o caractere na posição inicial em maiúsculo
       + str.slice(1);               // E uma substring da string original a partir do segundo caractere
}


// Função para tratar e devolver o tipo secundário de um Pokemon
function getSecondaryType(p: Pokemon){
  return (p.secondary_type === 'None')            // Pokemon não possui tipo secundário( = "None")
          ? ''
          : ` / ${capitalize(p.secondary_type)}`; // Retorna o tipo secundário com uma barra de separação e capitalizado
}

// Funcão principal: Home
export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string>> }){
  const filters = await searchParams;  // Recebe os Parâmetros assim que resolvidos
  const query = new URLSearchParams(); // Recebe a Query dos parâmetros

  if (filters.type)  query.set('type',  filters.type);  // Se existir tipo nos filtros, adiciona na query
  if (filters.type2) query.set('type2', filters.type2); // Se existir tipo secundário, adiciona na query
  
  query.set('orderBy', filters.orderBy ?? 'id')   // Sempre envia, para a query, padrão 'id'
  query.set('order',   filters.order   ?? 'ASC')  // Sempre envia, para a query, padrão 'ASC'  

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon?${query}`, {cache: 'no-store'}); // Retorna a query do backend

  // Trata erros da API
  if (!res.ok) {
    const err = await res.json();
    return (
      <div style={{ padding: '1rem' }}>
        <h1>RotomDex</h1>
        <Suspense><PokemonFilters /></Suspense>
        <p style={{ color: 'red' }}>{err.message}</p>
      </div>
    );
  }

  const pokemon: Pokemon[] = await res.json(); // Converte a resposta da API em um json, e em array

  // HTML
  return(
    <div style={{padding: '1rem'}}>
      <h1>RotomDex</h1>              

      {/* Suspense necessário porque PokemonFilters usa useSearchParams */}
      <Suspense> <PokemonFilters/> </Suspense>

      <p>Pokémon Catalogados: {pokemon.length}</p>
      
      <ul style={{listStyle: 'none', padding: '0.5rem'}}> {/*Abre a lista, remove os bullet points e adiciona espaçamento*/}
        {pokemon.map((p) => (

          // Cria elemento da lista com ID como chave, borda inferior e espaçamento
          <li key={p.id} style={{borderBottom: '1px solid #ccc', padding: '0.25rem'}}> 
            
            {/*Conteúdo da linha, ID e Nome em negrito, tipo primário e secundário*/}
            <strong>#{p.id} {capitalize(p.name)}</strong> - {capitalize(p.primary_type)} {getSecondaryType(p)}
          </li> 
        ))} 
      </ul>
    </div>
  )
}