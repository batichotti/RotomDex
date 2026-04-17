import type { Pokemon } from '@/types/pokemon' // Importar tipo Pokemon de src/types/pokemon.ts

// Função para capitalizar strings
function capitalize(str: string){
  return str.charAt(0).toUpperCase() // Retorna o texto informado como o caractere na posição inicial em maiúsculo
       + str.slice(1);               // E uma substring da string original a partir do segundo caractere
}                                    // Dessa forma retornando o primeiro caractere em maiúsculo e o restante no original(minúsuculo)


// Função para tratar e devolver o tipo secundário de um Pokemon
function getSecondaryType(p: Pokemon){
  return (p.secondary_type === 'None')            // Pokemon não possui tipo secundário(= "None")
          ? ''                                    // Retorna uma string vazia
          : ` / ${capitalize(p.secondary_type)}`; // Retorna o tipo secundário com uma barra de separação e capitalizado
}

// Funcão principal: Home
export default async function Home(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon`) // Carrega todo o /pokemon do backend 
  const pokemon: Pokemon[] = await res.json()                           // Insere todos os elemento em um vetor de Pokemon em .json

  return(
    <main style={{padding: '1rem'}}>               {/*Abre a main e adiciona um espaçamento*/}
      <h1>RotomDex</h1>                            {/*Escreve "RotomDex no topo do site*/}
      <p>Pokémon Catalogados: {pokemon.length}</p> {/*Escreve o número total de registros no vetor*/}
      
      <ul style={{listStyle: 'none', padding: '0.5rem'}}> {/*Abre a lista, remove os bullet points e adiciona espaçamento*/}
        {pokemon.map((p) => (                             // Abre tsx e mapeia todos os elementos do vetor

          // Cria elemento da lista com ID como chave, borda inferior e espaçamento
          <li key={p.id} style={{borderBottom: '1px solid #ccc', padding: '0.25rem'}}> 
            
            {/*Conteúdo da linha, ID e Nome em negrito, tipo primário e secundário*/}
            <strong>#{p.id} {capitalize(p.name)}</strong> - {capitalize(p.primary_type)} {getSecondaryType(p)}
          </li> // Fecha elemento da linha
        ))} {/*Fecha loop do mapeamento e tsx*/}
      </ul>
    </main>
  )
}