'use client'

import EggGroupSelect from './EggGroupSelect'
import { useRouter, useSearchParams } from "next/navigation"
import styles from './PokemonAdvFilters.module.css'

const GENERATIONS = [
    { key: 'generation-i',    label: 'Kanto'         }, 
    { key: 'generation-ii',   label: 'Johto'         }, 
    { key: 'generation-iii',  label: 'Hoenn'         },
    { key: 'generation-iv',   label: 'Sinnoh'        }, 
    { key: 'generation-v',    label: 'Unova'         }, 
    { key: 'generation-vi',   label: 'Kalos'         }, 
    { key: 'generation-vii',  label: 'Alola'         }, 
    { key: 'generation-viii', label: 'Galar & Hisui' }, 
    { key: 'generation-ix',   label: 'Paldea'        },
] as const;

export const EGG_GROUPS = [
    { key: 'indeterminate', label: 'Amorphous'    },
    { key: 'bug',           label: 'Bug'          }, 
    { key: 'dragon',        label: 'Dragon'       },
    { key: 'fairy',         label: 'Fairy'        },
    { key: 'ground',        label: 'Field'        },
    { key: 'flying',        label: 'Flying'       },
    { key: 'plant',         label: 'Grass'        },
    { key: 'humanshape',    label: 'Human-Like'   },
    { key: 'mineral',       label: 'Mineral'      },
    { key: 'monster',       label: 'Monster'      },
    { key: 'water1',        label: 'Water 1'      },
    { key: 'water2',        label: 'Water 2'      },
    { key: 'water3',        label: 'Water 3'      },
    { key: 'ditto',         label: 'Ditto'        },
    { key: 'no-eggs',       label: 'Undiscovered' }
] as const;

const BOOL_FILTERS = [
    { key: 'isLegendary',          label: 'Legendary'         },
    { key: 'isMythical',           label: 'Mythical'          },
    { key: 'isBaby',               label: 'Baby'              },
    { key: 'isMega',               label: 'Mega'              },
    { key: 'isGmax',               label: 'G-Max'             },
    { key: 'isRegionalForm',       label: 'Regional'          },
    { key: 'hasGenderDifferences', label: 'Gender Difference' },
    { key: 'formsSwitchable',      label: 'Forms Switchable'  },
] as const;

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