'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const GENS = [3, 4, 5, 6, 7, 8, 9]

export default function AbilitiesFilters() {
    const router = useRouter()
    const params = useSearchParams()

    function handleChange(key: string, value: string) {
        const current = new URLSearchParams(params.toString())

        if (value) current.set(key, value)
        else current.delete(key)

        router.push(`/abilities?${current.toString()}`)
    }

    return (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>

            {/* Geração exata */}
            <select value={params.get('generation') ?? ''} onChange={e => handleChange('generation', e.target.value)}>
                <option value=''>Geração</option>
                {GENS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            {/* Geração mínima */}
            <select value={params.get('generation_min') ?? ''} onChange={e => handleChange('generation_min', e.target.value)}>
                <option value=''>Gen. mín.</option>
                {GENS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            {/* Geração máxima */}
            <select value={params.get('generation_max') ?? ''} onChange={e => handleChange('generation_max', e.target.value)}>
                <option value=''>Gen. máx.</option>
                {GENS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

        </div>
    )
}