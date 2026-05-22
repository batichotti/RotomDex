import type { Abilities } from '@/types/abilities'           // Importar tipo Abilities de src/types/abilities.ts
import { capitalize } from '@/utils/utils'                   // Importar Funções de Utilidade
import AbilitiesFilters from '@/components/AbilitiesFilters' // Importar Filtros de Habilidades de AbilitiesFilters.tsx
import FilterBar from '@/components/FilterBar'               // Importar barra de filtros de FilterBar.tsx
import { Suspense } from 'react'                             // Importar "Suspense" do React. Permite esperar algo carregar
import Link from 'next/link'

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
            <div style={{ paddingTop: 'var(--filterbar-height)'}}>
                <Suspense>
                    <FilterBar>
                        <AbilitiesFilters/>
                    </FilterBar>
                </Suspense>
                <h1>Abilities</h1>
                <p style={{ color: 'red' }}>{err.message}</p>
            </div>
        )
    }

    const abilities: Abilities[] = await res.json()

    return (
        <div style={{ paddingTop: 'var(--filterbar-height)'}}>
            <Suspense>
                <FilterBar>
                    <AbilitiesFilters/>
                </FilterBar>
            </Suspense>

            <h1>Abilities</h1>
            <p>Habilidades Catalogadas: {abilities.length}</p>

            <ul style={{ listStyle: 'none', padding: '0.5rem' }}>
                {abilities.map((a) => (
                    <li key={a.id} style={{ borderBottom: '1px solid #ccc', padding: '0.25rem' }}>
                        <Link href={`/abilities/${a.name}`}>
                        <strong>#{a.id} {capitalize(a.name)}</strong> | {a.generation_introduced} - {a.short_description}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}