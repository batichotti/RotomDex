'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import TypeButtonGroup from './TypeButtons'
import SortControls from './SortControls'
import styles from './PokemonFilters.module.css'

export default function PokemonFilters() {
    const router = useRouter()
    const params = useSearchParams()

    // Lógica de clique nos tipos:
    // - Sem seleção → vira primário
    // - Primário clicado → removido, secundário (se existir) promovido a primário
    // - Secundário clicado → removido
    // - Ambos selecionados e clicou em outro → bloqueado (não faz nada)
    function handleTypeClick(type: string) {
        const current = new URLSearchParams(params.toString())
        const type1 = current.get('type') ?? ''
        const type2 = current.get('type2') ?? ''

        if (type === type1) {
            // Remove primário; se havia secundário, ele vira primário
            if (type2) {
                current.set('type', type2)
                current.delete('type2')
            } else current.delete('type')
        
        } else if (type === type2) {
            // Remove secundário
            current.delete('type2')
        } else if (!type1) {
            // Nenhum selecionado → define primário
            current.set('type', type)
        } else if (!type2) {
            // Primário já existe → define secundário
            current.set('type2', type)
        }
        // Se ambos já estão selecionados e clicou em outro, não faz nada

        router.push(`/pokemon/?${current.toString()}`)
    }

    function handleSortChange(key: string, value: string) {
        const current = new URLSearchParams(params.toString())
        if (value) current.set(key, value)
        else current.delete(key)
        router.push(`/pokemon/?${current.toString()}`)
    }

    return (
        <div className={styles.filterContainer}>
            <TypeButtonGroup
                selectedType={params.get('type') ?? ''}
                selectedType2={params.get('type2') ?? ''}
                onTypeClick={handleTypeClick}
            />
            
            <SortControls
                orderBy={params.get('orderBy') ?? 'species_id'}
                order={params.get('order') ?? 'ASC'}
                onOrderByChange={value => handleSortChange('orderBy', value)}
                onOrderChange={value => handleSortChange('order', value)}
            />
        </div>
    )
}