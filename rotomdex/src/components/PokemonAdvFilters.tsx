'use client'

import { useRouter, useSearchParams } from "next/navigation"

const GENERATIONS = ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi', 'generation-vii', 'generation-viii', 'generation-ix'] as const;
const EGG_GROUPS = ['monster', 'water1', 'bug', 'flying', 'ground', 'fairy', 'plant', 'humanshape', 'water3', 'mineral', 'indeterminate', 'water2', 'ditto', 'dragon', 'no-eggs'] as const;

const BOOL_FILTERS = [
    { key: 'isLegendary',         label: 'Legendary'        },
    { key: 'isMythical',          label: 'Mythical'         },
    { key: 'isBaby',              label: 'Baby'             },
    { key: 'isMega',              label: 'Mega'             },
    { key: 'isGmax',              label: 'G-Max'             },
    { key: 'isRegionalForm',      label: 'Regional'          },
    { key: 'hasGenderDifferences', label: 'Gender Difference' },
    { key: 'formsSwitchable',     label: 'Forms Switchable'  },
]

export default function PokemonAdvancedFilters() {
    const router = useRouter()
    const params = useSearchParams()

    function handle(key: string, value: string) {
        const current = new URLSearchParams(params.toString())
        
        if(value) current.set(key, value)
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
        <div>
        
        <select value={params.get('generation') ?? ''} onChange={e => handle('generation', e.target.value)}>
            <option value=''>Geração</option>
            {GENERATIONS.map(g => <option key={g} value={g}>{g.replace('generation-', 'Gen ').toUpperCase()}</option>)}
        </select>

        <select value={params.get('eggGroup1') ?? ''} onChange={e => handle('eggGroup1', e.target.value)}>
            <option value=''>Egg Group</option>
            {EGG_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
        </select>

        {BOOL_FILTERS.map(({ key, label }) => {
            return (
                <span key={key}>
                    <span>{label}</span>

                    <button onClick={() => handleBool(key, 'true')}>✓</button>
                    <button onClick={() => handleBool(key, 'false')}>✗</button>
                </span>
            )
        })}

        </div>
    )
}