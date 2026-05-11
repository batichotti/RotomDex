import type { Abilities } from '@/types/abilities'
import { capitalize } from '@/utils/utils'
import AbilitiesFilters from '@/components/AbilitiesFilters'
import { Suspense } from 'react'

export default async function AbilitiesPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
    const filters = await searchParams
    const query = new URLSearchParams()

    if (filters.generation)     query.set('generation',     filters.generation)
    if (filters.generation_min) query.set('generation_min', filters.generation_min)
    if (filters.generation_max) query.set('generation_max', filters.generation_max)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/abilities?${query}`, { cache: 'no-store' })

    if (!res.ok) {
        const err = await res.json()
        return (
            <div style={{ padding: '1rem' }}>
                <h1>Abilities</h1>
                <Suspense><AbilitiesFilters /></Suspense>
                <p style={{ color: 'red' }}>{err.message}</p>
            </div>
        )
    }

    const abilities: Abilities[] = await res.json()

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Abilities</h1>

            <Suspense><AbilitiesFilters /></Suspense>

            <p>Habilidades Catalogadas: {abilities.length}</p>

            <ul style={{ listStyle: 'none', padding: '0.5rem' }}>
                {abilities.map((a) => (
                    <li key={a.id} style={{ borderBottom: '1px solid #ccc', padding: '0.25rem' }}>
                        <strong>#{a.id} {capitalize(a.name)}</strong> | {a.generation_introduced} - {a.short_description}
                    </li>
                ))}
            </ul>
        </div>
    )
}