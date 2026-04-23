import type { Pokemon } from '@/types/pokemon' // Importar tipo Pokemon de src/types/pokemon.ts
import PokemonFilters from '@/components/PokemonFilters'
import { Suspense } from 'react'

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
  const filters = await searchParams;
  const query = new URLSearchParams(); 

  if (filters.type)    query.set('type',    filters.type);
  if (filters.type2)   query.set('type2',   filters.type2);
  query.set('orderBy', filters.orderBy ?? 'id')   // sempre envia, padrão 'id'
  query.set('order',   filters.order   ?? 'ASC')  // sempre envia, padrão 'ASC' 

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon?${query}`, {cache: 'no-store'}); // Carrega todo o /pokemon do backend 
  const pokemon: Pokemon[] = await res.json();

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