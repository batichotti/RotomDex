'use client'

import { useRouter, useSearchParams } from "next/navigation"
import styles from './PokemonAdvFilters.module.css'

const GENERATIONS = [
    { key: 'generation-i',    value: 'Kanto'         }, 
    { key: 'generation-ii',   value: 'Johto'         }, 
    { key: 'generation-iii',  value: 'Hoenn'         },
    { key: 'generation-iv',   value: 'Sinnoh'        }, 
    { key: 'generation-v',    value: 'Unova'         }, 
    { key: 'generation-vi',   value: 'Kalos'         }, 
    { key: 'generation-vii',  value: 'Alola'         }, 
    { key: 'generation-viii', value: 'Galar & Hisui' }, 
    { key: 'generation-ix',   value: 'Paldea'        },
] as const;

const EGG_GROUPS = ['monster', 'water1', 'bug', 'flying', 'ground', 'fairy', 'plant', 'humanshape', 'water3', 'mineral', 'indeterminate', 'water2', 'ditto', 'dragon', 'no-eggs'] as const;

const BOOL_FILTERS = [
    { key: 'isLegendary',         label: 'Legendary'          },
    { key: 'isMythical',          label: 'Mythical'           },
    { key: 'isBaby',              label: 'Baby'               },
    { key: 'isMega',              label: 'Mega'               },
    { key: 'isGmax',              label: 'G-Max'              },
    { key: 'isRegionalForm',      label: 'Regional'           },
    { key: 'hasGenderDifferences', label: 'Gender Difference' },
    { key: 'formsSwitchable',     label: 'Forms Switchable'   },
]

export default function PokemonAdvancedFilters() {
    const router = useRouter()
    const params = useSearchParams()

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

    return(
        <div className={styles.advancedContainer}>

            <div className={styles.genGroup}>
                {GENERATIONS.map(g => {
                    const isActive = params.get('generation') === g.key
                    return (
                        <button
                            key={g.key}
                            className={`${styles.genBtn} ${isActive ? styles.genBtnActive : ''}`}
                            onClick={() => handle('generation', g.key)}
                        >
                            {g.value}
                        </button>
                    )
                })}
            </div>

            <select className={styles.select} value={params.get('eggGroup1') ?? ''} onChange={e => handle('eggGroup1', e.target.value)}>
                <option value=''>Egg Group</option>
                {EGG_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            {BOOL_FILTERS.map(({ key, label }) => {
                const value = params.get(key)
                return (
                    <span key={key} className={styles.boolGroup}>
                        <span className={styles.boolLabel}>{label}</span>
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
    )
}