'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import TypeButtonGroup from './TypeButtons'
import SortControls from './SortControls'
import styles from './PokemonFilters.module.css'

export default function PokemonFilters() {
    const router = useRouter()
    const params = useSearchParams()

    function handleChange(key: string, value: string) {
        const current = new URLSearchParams(params.toString())

        if (value) current.set(key, value)
        else current.delete(key)

        // Se houver tipo 2, mas não tipo 1, bloqueia
        if (key === 'type2' && value && !current.get('type')) return

        // Se type1 for removido, remove type2 também
        if (key === 'type' && !value) current.delete('type2')

        // Não permite type2 igual ao type1
        if (key === 'type2' && value === current.get('type')) return

        // Não permite type1 igual ao type2
        if (key === 'type' && value === current.get('type2')) return

        router.push(`/pokemon/?${current.toString()}`)
    }

    return (
        <div className={styles.filterContainer}>
            <TypeButtonGroup
                selectedType={params.get('type') ?? ''}
                selectedType2={params.get('type2') ?? ''}
                onTypeChange={value => handleChange('type', value)}
                onType2Change={value => handleChange('type2', value)}
            />
            <SortControls
                orderBy={params.get('orderBy') ?? 'species_id'}
                order={params.get('order') ?? 'ASC'}
                onOrderByChange={value => handleChange('orderBy', value)}
                onOrderChange={value => handleChange('order', value)}
            />
        </div>
    )
}