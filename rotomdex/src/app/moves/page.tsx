import MovesFilters from '@/components/MovesFilters'
import { Suspense } from 'react'

// Tipo local para Moves (baseado em moves.entity.ts)
type Move = {
  id: number
  name: string
  type: string
  power: number | null
  pp: number
  accuracy: number | null
  effect_chance: number | null
  damage_class: string
  category: string | null
  generation_introduced: string
  description: string | null
}

// Capitaliza a primeira letra
function capitalize(str: string) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Exibe power, ou '—' se nulo (moves de status não têm power)
function formatStat(value: number | null) {
  return value != null ? String(value) : '—'
}

export default async function MovesPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const filters = await searchParams
  const query = new URLSearchParams()

  if (filters.type)         query.set('type',         filters.type)
  if (filters.damage_class) query.set('damage_class', filters.damage_class)
  if (filters.pp)           query.set('pp',           filters.pp)
  if (filters.accuracy)     query.set('accuracy',     filters.accuracy)
  if (filters.fill)         query.set('fill',         filters.fill)
  if (filters.min)          query.set('min',          filters.min)
  if (filters.max)          query.set('max',          filters.max)

  query.set('orderBy', filters.orderBy ?? 'name')
  query.set('order',   filters.order   ?? 'ASC')

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/moves?${query}`, { cache: 'no-store' })

  if (!res.ok) {
    const err = await res.json()
    return (
      <div style={{ padding: '1rem' }}>
        <h1>Moves</h1>
        <Suspense><MovesFilters /></Suspense>
        <p style={{ color: 'red' }}>{err.message}</p>
      </div>
    )
  }

  const moves: Move[] = await res.json()

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Moves</h1>

      {/* Suspense necessário porque MovesFilters usa useSearchParams */}
      <Suspense><MovesFilters /></Suspense>

      <p>Moves Catalogados: {moves.length}</p>

      <ul style={{ listStyle: 'none', padding: '0.5rem' }}>
        {moves.map((m) => (
          <li key={m.id} style={{ borderBottom: '1px solid #ccc', padding: '0.25rem' }}>
            <strong>#{m.id} {capitalize(m.name)}</strong>
            {' '}- {capitalize(m.type)} | {capitalize(m.damage_class)}
            {' '}| Pow: {formatStat(m.power)} | PP: {m.pp} | Acc: {formatStat(m.accuracy)}
          </li>
        ))}
      </ul>
    </div>
  )
}