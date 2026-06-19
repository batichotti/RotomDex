'use client'

import EggGroupSelect from './EggGroupSelect'
import { useRouter, useSearchParams } from "next/navigation"
import styles from './PokemonAdvFilters.module.css'
import { GENERATIONS, BOOL_FILTERS } from '@/utils/PokemonInfoMaps'

export default function PokemonAdvancedFilters() {
    const router = useRouter()
    const params = useSearchParams()

    const selectedGenerations = (params.get('generation') ?? '').split(',').filter(Boolean);

    function handle(key: string, value: string) {
        const current = new URLSearchParams(params.toString())

        if (value) current.set(key, value)
        else current.delete(key)
        
        router.push(`/pokemon/?${current.toString()}`)
    }

    function handleBool(key: string, value: 'true' | 'false') {
        const current = new URLSearchParams(params.toString())
        
        if (current.get(key) === value) current.delete(key)
        else current.set(key, value)
        
        router.push(`/pokemon/?${current.toString()}`)
    }

    function handleGen(genKey: string){
        const current = new URLSearchParams(params.toString());
        const next = selectedGenerations.includes(genKey)
            ? selectedGenerations.filter(g => g !== genKey)
            : [...selectedGenerations, genKey];

        if (next.length > 0) current.set('generation', next.join(','));
        else current.delete('generation');

        router.push(`/pokemon/?${current.toString()}`)
    }

    return(
        <div className={styles.advancedContainer}>

            <div className={styles.genGroup}>
                {GENERATIONS.map(g => {
                    const isActive = selectedGenerations.includes(g.key);
                    return (
                        <button
                            key={g.key}
                            className={`${styles.genBtn} ${isActive ? styles.genBtnActive : ''}`}
                            onClick={() => handleGen(g.key)}
                        >
                            {g.label}
                        </button>
                    )
                })}
            </div>

            <EggGroupSelect
                value={params.get('eggGroup1') ?? ''}
                onChange={(value) => handle('eggGroup1', value)}
            />

            <div className={styles.boolRow}>
                {BOOL_FILTERS.map(({ key, label }) => {
                    const value = params.get(key)
                    
                    return (
                        <span key={key} className={styles.boolGroup}>
                            <span className={styles.boolLabel}>{label}:</span>
                            <button
                                className={`${styles.boolBtn} ${value === 'true' ? styles.boolBtnTrueActive : ''}`}
                                onClick={() => handleBool(key, 'true')}
                            >✓</button>
                            <button
                                className={`${styles.boolBtn} ${value === 'false' ? styles.boolBtnFalseActive : ''}`}
                                onClick={() => handleBool(key, 'false')}
                            >✗</button>
                        </span>
                    )
                })}
            </div>

        </div>
    )
}