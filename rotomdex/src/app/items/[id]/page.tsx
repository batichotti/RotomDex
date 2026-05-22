import type { Items } from '@/types/items'
import { capitalize, formatStat } from '@/utils/utils'

export default async function MovesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`)

  if (!res.ok) {
    return <div><h1>Item não encontrado</h1></div>
  }

  const item: Items = (await res.json())[0]; // Converte a resposta da API em um json, e em array
  
  if (!item) {
    return <div><h1>Item não encontrado</h1></div>
  }

  return (
    <div>
      <h1>#{item.id} - {capitalize(item.name)}</h1>
      <p>{formatStat(item.cost)} | {formatStat(item.fling_power)} | {capitalize(item.category)} - {capitalize(item.description)}</p>
      {/* resto dos dados */}
    </div>
  )
}