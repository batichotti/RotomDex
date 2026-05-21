// Função para capitalizar strings
export function capitalize(str: string){
  if(!str) return "";  
  
  return str.charAt(0).toUpperCase() // Retorna o texto informado como o caractere na posição inicial em maiúsculo
       + str.slice(1);               // E uma substring da string original a partir do segundo caractere
}

// Exibe power, ou '—' se nulo (moves de status não têm power)
export function formatStat(value: number | null) {
  return (value == null || value == 0) ? '-' : String(value);
}