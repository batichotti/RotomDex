'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import styles from './FillFilter.module.css'
import { STAT_FIELDS } from '@/utils/PokemonInfoMaps'

export default function FillFilter() {
    const router = useRouter()
    const params = useSearchParams()

    const fill = params.get('fill') ?? ''
    const min = params.get('min') ?? ''
    const max = params.get('max') ?? ''

    function update(next: { fill?: string; min?: string; max?: string }) {
        const current = new URLSearchParams(params.toString())
        const merged = { fill, min, max, ...next }

        // Sem stat selecionado, não faz sentido manter min/max na URL
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

    function handleFillChange(value: string) {
        update({ fill: value })
    }

    function handleMinChange(value: string) {
        update({ min: value })
    }

    function handleMaxChange(value: string) {
        update({ max: value })
    }

    const active = Boolean(fill)

    return (
        <div className={`${styles.statRange} ${active ? styles.statRangeActive : ''}`}>
            <select
                className={styles.statSelect}
                value={fill}
                onChange={e => handleFillChange(e.target.value)}
            >
                <option value="">Stat</option>
                {STAT_FIELDS.map(opt => (
                    <option key={opt.key} value={opt.key}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <input
                type="number"
                inputMode="numeric"
                className={styles.statInput}
                placeholder="min"
                value={min}
                disabled={!active}
                onChange={e => handleMinChange(e.target.value)}
            />

            <span className={styles.statDivider}>–</span>

            <input
                type="number"
                inputMode="numeric"
                className={styles.statInput}
                placeholder="max"
                value={max}
                disabled={!active}
                onChange={e => handleMaxChange(e.target.value)}
            />
        </div>
    )
}