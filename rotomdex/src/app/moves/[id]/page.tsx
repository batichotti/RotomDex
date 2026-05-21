import type { Moves } from '@/types/moves'
import { capitalize, formatStat } from '@/utils/utils'

export default async function MovesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/moves/${id}`)

  if (!res.ok) {
    return <div><h1>Movimento não encontrado</h1></div>
  }

  const move: Moves = (await res.json())[0]; // Converte a resposta da API em um json, e em array
  
  if (!move) {
    return <div><h1>Pokémon não encontrado</h1></div>
  }

  return (
    <div>
      <h1>#{move.id} - {capitalize(move.name)}</h1>
      <p>{capitalize(move.type)} | {capitalize(move.damage_class)}
      {' '}| Pow: {formatStat(move.power)} | PP: {move.pp} | Acc: {formatStat(move.accuracy)}</p>
      {/* resto dos dados */}
    </div>
  )
}