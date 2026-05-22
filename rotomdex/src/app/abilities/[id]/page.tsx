import type { Abilities } from '@/types/abilities'
import { capitalize, formatStat } from '@/utils/utils'

export default async function AbilitiesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/abilities/${id}`)

  if (!res.ok) {
    return <div><h1>Habilidade não encontrado</h1></div>
  }

  const abilitie: Abilities = (await res.json())[0]; // Converte a resposta da API em um json, e em array
  
  if (!abilitie) {
    return <div><h1>Habilidade não encontrado</h1></div>
  }

  return (
    <div>
      <h1>#{abilitie.id} - {capitalize(abilitie.name)}</h1>
      <p>{abilitie.generation_introduced} - {abilitie.short_description}</p>
      {/* resto dos dados */}
    </div>
  )
}