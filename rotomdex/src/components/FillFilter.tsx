'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './FillFilter.module.css'
import { STAT_FIELDS } from '@/utils/PokemonInfoMaps'

export default function FillFilter() {
    const router = useRouter()
    const params = useSearchParams()
    const [open, setOpen] = useState(false)

    const fill = params.get('fill') ?? ''
    const min = params.get('min') ?? ''
    const max = params.get('max') ?? ''

    function update(next: { fill?: string; min?: string; max?: string }) {
        const current = new URLSearchParams(params.toString())
        const merged = { fill, min, max, ...next }

        if (!merged.fill) {
            current.delete('fill')
            current.delete('min')
            current.delete('max')
        } else {
            current.set('fill', merged.fill)
            if (merged.min) current.set('min', merged.min)
            else current.delete('min')
            if (merged.max) current.set('max', merged.max)
            else current.delete('max')
        }

        router.push(`/pokemon/?${current.toString()}`)
    }

    const active = Boolean(fill)

    return (
        <>
            <button
                className={`${styles.triggerBtn} ${active ? styles.triggerBtnActive : ''}`}
                onClick={() => setOpen(o => !o)}
                aria-label="Filtro de stat"
                aria-expanded={open}
            >
                <img src={`/assets/flags/FilterButton.svg`} alt="Filter Button" width={20} height={20} />
            </button>

            <div className={styles.filterContainer}>
                <div className={`${styles.expandWrap} ${open ? styles.expandWrapOpen : ''}`}>
                    <select
                        className={styles.statSelect}
                        value={fill}
                        onChange={e => update({ fill: e.target.value })}
                    >
                        <option value="">Stat</option>
                        {STAT_FIELDS.map(opt => (
                            <option key={opt.key} value={opt.key}>{opt.label}</option>
                        ))}
                    </select>

                    <input
                        type="number"
                        inputMode="numeric"
                        className={styles.statInput}
                        placeholder="min"
                        value={min}
                        disabled={!active}
                        onChange={e => update({ min: e.target.value })}
                        />

                    <span className={styles.statDivider}>–</span>

                    <input
                        type="number"
                        inputMode="numeric"
                        className={styles.statInput}
                        placeholder="max"
                        value={max}
                        disabled={!active}
                        onChange={e => update({ max: e.target.value })}
                    />
                </div>
            </div>
        </>
    )
}