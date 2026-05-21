import type { Items } from '@/types/items'                   // Importar tipo Items
import { capitalize, formatStat } from '@/utils/utils'       // Importar Funções de Utilidade
import ItemsFilters from '@/components/ItemsFilters'         // Importar Filtros
import FilterBar from '@/components/FilterBar'               // Importar barra de filtros
import { Suspense } from 'react'                             // Importar "Suspense" do React
import Link from 'next/link'

export default async function ItensPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
    const filters = await searchParams;
    
    // CORREÇÃO AQUI: Passa todos os filtros de uma vez só!
    // Ele vai pegar cost, cost_min, cost_max, orderBy, etc., e montar a URL automaticamente.
    const query = new URLSearchParams(filters);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items?${query}`, { cache: 'no-store' })

    if (!res.ok) {
        const err = await res.json()
        return (
            <div style={{ paddingTop: 'var(--filterbar-height)'}}>
                <Suspense>
                    <FilterBar>
                        <ItemsFilters/>
                    </FilterBar>
                </Suspense>
                <h1>Itens</h1>
                <p style={{ color: 'red' }}>{err.message}</p>
            </div>
        )
    }

    const items: Items[] = await res.json()

    return (
        <div style={{ paddingTop: 'var(--filterbar-height)'}}>
            <Suspense>
                <FilterBar>
                    <ItemsFilters/>
                </FilterBar>
            </Suspense>

            <h1>Items</h1>
            <p>Itens Catalogados: {items.length}</p>

            <ul style={{ listStyle: 'none', padding: '0.5rem' }}>
                {items.map((i) => (
                    <li key={i.id} style={{ borderBottom: '1px solid #ccc', padding: '0.25rem' }}>
                        <Link href={`/items/${i.name}`}>
                        <strong>#{i.id} {capitalize(i.name)}</strong> | {formatStat(i.cost)} | {formatStat(i.fling_power)} | {capitalize(i.category)} - {capitalize(i.description)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}